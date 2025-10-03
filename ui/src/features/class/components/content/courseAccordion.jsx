import React, { useState, useImperativeHandle } from "react";
import Accordion from "./Accordion"; // Votre composant Accordion
import AccordionItem from "./AccordionItem"; // Votre composant AccordionItem

export default function CourseAccordion({ data, save, renderContent }) {
  // Initialisation de la structure des données d'accordéon
  const initialItems =
    data?.items && data.items.length > 0
      ? data.items
      : [{ id: "item-1", title: "Nouvel Élément", content: [] }];

  const [items, setItems] = useState(initialItems);
  const [openItemId, setOpenItemId] = useState(initialItems[0]?.id || null);

  const handleToggle = (itemId) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: `Nouvel Élément ${items.length + 1}`,
      content: [],
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    save({ items: updatedItems });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    if (updatedItems.length === 0) {
      const emptyItem = [
        { id: "item-1", title: "Nouvel Élément", content: [] },
      ];
      setItems(emptyItem);
      setOpenItemId("item-1");
      save({ items: emptyItem });
    } else {
      setItems(updatedItems);
      // Ajuster l'élément ouvert si nécessaire
      if (!updatedItems.some((item) => item.id === openItemId)) {
        setOpenItemId(updatedItems[0]?.id || null);
      }
      save({ items: updatedItems });
    }
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, title: newTitle } : item
    );
    setItems(updatedItems);
    save({ items: updatedItems });
  };

  const handleContentSave = (itemId, contentIndex, newContentData) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        const newContent = [...item.content];
        newContent[contentIndex] = {
          ...newContent[contentIndex],
          ...newContentData,
        };
        return { ...item, content: newContent };
      }
      return item;
    });
    setItems(updatedItems);
    save({ items: updatedItems });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Conteneur d'Accordéon
      </h3>

      <Accordion>
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            title={
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent border-none outline-none focus:outline-blue-500 rounded px-1 w-full"
              />
            }
            isOpen={item.id === openItemId}
            toggleAccordion={() => handleToggle(item.id)}
            options={
              items.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(index);
                  }}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  &times;
                </button>
              )
            }
          >
            <div className="p-4 border rounded-md border-gray-200">
              {/* Rendu des composants enfants de l'accordéon */}
              {item.content.length > 0 ? (
                // Votre composant parent (CourseEditor) devra rendre le contenu.
                renderContent(item.content, item.id)
              ) : (
                <p className="text-gray-500">
                  Cet élément d'accordéon est vide.
                </p>
              )}
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <button
        onClick={handleAddItem}
        className="mt-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        + Ajouter un élément
      </button>
    </div>
  );
}
