import React, { forwardRef, useImperativeHandle, useState } from "react";
import Tab, { tabContext } from "./tab"; // Votre composant Tab principal
import TabBody from "./TabBody";
import TabContent from "./TabContent";
import TabItem from "./TabItem";
import TabList from "./TabList";

export default function CourseTabs({ data, save, renderContent }) {
  // Initialisation de la structure des données d'onglets
  const initialTabs =
    data?.tabs && data.tabs.length > 0
      ? data.tabs
      : [{ id: "tab-1", title: "Nouvel Onglet", content: [] }];

  const [tabs, setTabs] = useState(initialTabs);
  // L'index de l'onglet actif est géré ici
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Gestion des changements de l'onglet actif
  const handleTabSelection = (index) => {
    setActiveTabIndex(index);
  };

  // Fonction de gestion de l'ajout d'un onglet
  const handleAddTab = () => {
    const newTab = {
      id: `tab-${tabs.length + 1}`,
      title: `Nouvel Onglet ${tabs.length + 1}`,
      content: [],
    };
    const updatedTabs = [...tabs, newTab];
    setTabs(updatedTabs);
    setActiveTabIndex(updatedTabs.length - 1);
    save({ tabs: updatedTabs });
  };

  // Fonction de gestion de la suppression d'un onglet
  const handleDeleteTab = (index) => {
    const updatedTabs = tabs.filter((_, i) => i !== index);
    if (updatedTabs.length === 0) {
      const emptyTab = [{ id: "tab-1", title: "Nouvel Onglet", content: [] }];
      setTabs(emptyTab);
      setActiveTabIndex(0);
      save({ tabs: emptyTab });
    } else {
      setTabs(updatedTabs);
      setActiveTabIndex(Math.min(activeTabIndex, updatedTabs.length - 1));
      save({ tabs: updatedTabs });
    }
  };

  // Fonction pour mettre à jour le titre d'un onglet
  const handleTitleChange = (index, newTitle) => {
    const updatedTabs = tabs.map((tab, i) =>
      i === index ? { ...tab, title: newTitle } : tab
    );
    setTabs(updatedTabs);
    save({ tabs: updatedTabs });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Conteneur d'Onglets
      </h3>

      <Tab value={tabs[activeTabIndex]?.id}>
        <TabList>
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center">
              <TabItem value={tab.id} onClick={() => handleTabSelection(index)}>
                <input
                  type="text"
                  value={tab.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent border-none outline-none focus:outline-blue-500 rounded px-1"
                />
              </TabItem>
              {tabs.length > 1 && (
                <button
                  onClick={() => handleDeleteTab(index)}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddTab}
            className="ml-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            +
          </button>
        </TabList>

        <TabBody>
          {tabs.map((tab) => (
            <TabContent key={tab.id} value={tab.id}>
              <div className="mt-4 p-4 border rounded-md border-gray-200">
                {tab.content.length > 0 ? (
                  renderContent(tab.content, activeTabIndex)
                ) : (
                  <p className="text-gray-500">
                    Cet onglet est vide pour l'instant. Ajoutez du contenu via
                    le panneau principal.
                  </p>
                )}
              </div>
            </TabContent>
          ))}
        </TabBody>
      </Tab>
    </div>
  );
}
