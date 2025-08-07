import { useState, useMemo } from "react";
import { Histogram } from "@upsetjs/plots";

export default function HistogramEditor({ data, save }) {
  const [selection, setSelection] = useState(null);
  const [values, setValues] = useState(
    data ?? { title: "", label: "", elems: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { title, elems, label } = values;
    console.log(elems);
    save({ title, label, elems: JSON.parse(elems) });
  };

  return (
    <div className="p-6 border rounded-lg shadow bg-white space-y-4">
      <h2 className="text-md font-bold">Histogramme</h2>
      <p className="text-sm text-gray-500"></p>

      <div className="space-y-2">
        <label
          htmlFor="hist-title"
          className="text-sm font-medium text-gray-700"
        >
          Titre
        </label>
        <input
          id="hist-title"
          type="text"
          value={values.title}
          onChange={handleChange}
          name="title"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="hist-description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <input
          type="text"
          value={values.label}
          onChange={handleChange}
          name="label"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="hist-value"
          className="text-sm font-medium text-gray-700"
        >
          Donnees
        </label>
        <textarea
          value={values.elems}
          onChange={handleChange}
          name="elems"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          save
        </button>
      </div>

      {data && (
        <div className="border rounded p-4 bg-gray-50 overflow-auto">
          <Histogram
            selection={selection}
            onHover={setSelection}
            width={500}
            height={100}
            elems={data.elems}
            attr="a"
            title={data.title}
            label={data.label}
            actions={false}
          />
        </div>
      )}
    </div>
  );
}
