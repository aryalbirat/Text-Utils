import { useState } from "react";
import TextCrudManager from "./TextCrudManager";

function TextBox() {
  // Local text utility state
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setText(e.target.value);
  const cleartext = () => setText("");
  const convertUpper = () => setText(text.toUpperCase());
  const convertLower = () => setText(text.toLowerCase());

  const handleSelectAll = () => {
    const textArea = document.querySelector("textarea#main-textarea");
    if (textArea) textArea.select();
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center pt-4 md:pt-9 px-2 pb-4">
      <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent mb-8 text-center drop-shadow-lg select-none">
        Transform & Save Your Text
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-5xl gap-6">
        
        {/* Text Utilities Section */}
        <div className="flex flex-col items-center gap-y-4 flex-1 bg-white/80 rounded-2xl shadow-2xl border border-blue-100 p-6 mb-10 md:mb-0 min-h-full">
          <div className="text-xl md:text-2xl font-bold mb-1 text-blue-800">Text Section</div>
          <textarea
            id="main-textarea"
            value={text}
            onChange={handleChange}
            className="w-full max-w-xs md:w-64 md:h-32 h-24 bg-slate-100 border-2 border-blue-200 rounded-lg p-2 md:p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
            placeholder="Enter text here"
          ></textarea>
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 rounded-md text-white p-2 text-xs md:text-base font-semibold shadow transition-all" onClick={cleartext}>
              Clear
            </button>
            <button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 rounded-md text-white p-2 text-xs md:text-base font-semibold shadow transition-all" onClick={convertUpper}>
              UpperCase
            </button>
            <button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 rounded-md text-white p-2 text-xs md:text-base font-semibold shadow transition-all" onClick={convertLower}>
              LowerCase
            </button>
            <button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 rounded-md text-white p-2 text-xs md:text-base font-semibold shadow transition-all" onClick={handleSelectAll}>
              Select All
            </button>
            <button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 rounded-md text-white p-2 text-xs md:text-base font-semibold shadow transition-all" onClick={handleCopy}>
              Copy
            </button>
          </div>
          <div className="text-xs md:text-base text-blue-700">No of words: {text.trim() ? text.trim().split(/\s+/).length : 0}</div>
          <h2 className="text-xs md:text-base text-blue-700">No of characters: {text.length}</h2>
        </div>
        {/* CRUD Section as separate component */}
        <div className="flex-1 min-h-full flex flex-col">
          <TextCrudManager
            text={text}
            setText={setText}
            editId={editId}
            setEditId={setEditId}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </div>
  );
}

export default TextBox;
