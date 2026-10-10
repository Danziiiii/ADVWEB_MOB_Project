// src/pages/AddBook.jsx
import { useState } from "react";

function AddBook({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const newBook = { title, author, isbn };
    onAddBook(newBook);
    
    alert(`Success! "${title}" has been added to the library.`);
    
    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a New Book</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="e.g., The Pragmatic Programmer"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input 
            type="text" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="e.g., Andrew Hunt"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
          <input 
            type="text" 
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="e.g., 978-0135957059"
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
        >
          Save Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;