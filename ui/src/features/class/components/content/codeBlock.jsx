import { useState } from "react";

export default function CodeBlock({ data, save }) {
  const [inputValue, setInputValue] = useState(data?.code || "");
  const [language, setLanguage] = useState(data?.language || "javascript");

  const supportedLanguages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "c++",
    "c#",
    "php",
    "ruby",
    "go",
    "json",
    "markup",
  ];

  const handleCodeChange = (e) => {
    setInputValue(e.target.value);
    // Sauvegarde en temps réel ou après un court délai (débouncing)
    save({ code: e.target.value, language });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    save({ code: inputValue, language: e.target.value });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Bloc de Code (Éditeur)
      </h3>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="code-language"
            className="text-sm font-medium text-gray-700"
          >
            Langage :
          </label>
          <select
            id="code-language"
            value={language}
            onChange={handleLanguageChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="code-input"
            className="text-sm font-medium text-gray-700"
          >
            Coller votre code ici :
          </label>
          <textarea
            id="code-input"
            value={inputValue}
            onChange={handleCodeChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows="10"
            placeholder="Copiez et collez votre code..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
