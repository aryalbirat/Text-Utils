import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getTexts, createText, updateText, deleteText } from "../api/texts";

function TextCrudManager({
  text,
  setText,
  editId,
  setEditId,
  loading,
  setLoading,
  error,
  setError
}) {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      fetchTexts();
    }
    // eslint-disable-next-line
  }, []);

  const fetchTexts = async () => {
    setLoading(true);
    try {
      const data = await getTexts();
      setTexts(data);
      setError("");
    } catch (err) {
      if (err.message.includes('Session expired') || err.message.includes('No authentication token')) {
        // Clear invalid token and reload to show login form
        localStorage.removeItem('jwt_token');
        window.location.reload();
      } else {
        setError(err.message || "Failed to load texts");
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      if (editId) {
        await updateText(editId, text);
        setEditId(null);
      } else {
        await createText(text);
      }
      setText("");
      await fetchTexts();
    } catch (err) {
      if (err.message.includes('Session expired') || err.message.includes('No authentication token')) {
        localStorage.removeItem('jwt_token');
        window.location.reload();
      } else {
        setError(err.message || "Failed to save text");
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteText(id);
      await fetchTexts();
    } catch (err) {
      if (err.message.includes('Session expired') || err.message.includes('No authentication token')) {
        localStorage.removeItem('jwt_token');
        window.location.reload();
      } else {
        setError(err.message || "Failed to delete text");
      }
    }
    setLoading(false);
  };

  // Don't render anything if not authenticated
  if (!localStorage.getItem('jwt_token')) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">Saved Texts</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {loading ? (
        <div className="text-center text-blue-600">Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {texts.length === 0 && (
            <li className="text-gray-500 text-center py-4">No texts found.</li>
          )}
          {texts.map((item) => (
            <li key={item._id} className="flex items-center justify-between py-3">
              <span className="text-gray-800 text-lg break-words flex-1">{item.content}</span>
              <div className="flex gap-2 ml-4">
                <button
                  className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 rounded-md text-white px-3 py-1 font-semibold shadow transition-all"
                  onClick={() => {
                    setText(item.content);
                    setEditId(item._id);
                  }}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 rounded-md text-white px-3 py-1 font-semibold shadow transition-all"
                  onClick={() => handleDelete(item._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className={`bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 rounded-md text-white p-2 w-40 mt-4 font-semibold shadow transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSave}
        disabled={loading}
      >
        {editId ? 'Update Saved Text' : 'Save'}
      </button>
    </div>
  );
}

TextCrudManager.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  editId: PropTypes.string,
  setEditId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
};

export default TextCrudManager;
