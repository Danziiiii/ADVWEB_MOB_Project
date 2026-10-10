// src/pages/BookInventory.jsx
import { useState } from "react";

function BookInventory({ books, onDeleteBook, onToggleBorrow }) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowerName, setBorrowerName] = useState("");
  
  // 1. ADDED: State for the search bar
  const [searchQuery, setSearchQuery] = useState("");

  const handleActionClick = (book) => {
    setSelectedBook(book);
    if (book.status === "Available") {
      setBorrowerName(""); 
      setCheckoutModalOpen(true);
    } else {
      setReturnModalOpen(true);
    }
  };

  const handleConfirmCheckout = () => {
    if (borrowerName.trim() === "") return; 
    onToggleBorrow(selectedBook.id, "Borrowed", borrowerName);
    setCheckoutModalOpen(false);
    setSelectedBook(null);
  };

  const handleConfirmReturn = () => {
    onToggleBorrow(selectedBook.id, "Available", "");
    setReturnModalOpen(false);
    setSelectedBook(null);
  };

  // 2. ADDED: Filter the books based on the search query
  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Library Inventory</h2>
        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
          {/* UPDATED: Now shows filtered count instead of total books */}
          {filteredBooks.length} Books
        </span>
      </div>

      {/* 3. ADDED: The Search Input field right above the table */}
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search by title or author..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Title</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Author</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Borrower</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* 4. UPDATED: Changed books.map to filteredBooks.map */}
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm text-gray-500">{book.id}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{book.title}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{book.author}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    book.status === "Available" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 italic">
                  {book.borrower || "-"}
                </td>
                <td className="py-3 px-4 text-sm text-right space-x-3">
                  <button 
                    onClick={() => handleActionClick(book)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    {book.status === "Available" ? "Checkout" : "Return"}
                  </button>
                  <button 
                    onClick={() => onDeleteBook(book.id)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* ADDED: Show a message if no books match the search */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No books found matching your search.
          </div>
        )}
      </div>

      {/* --- CUSTOM CHECKOUT MODAL --- */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Checkout Book</h3>
            <p className="text-sm text-gray-600 mb-4">
              Who is borrowing <span className="font-semibold">"{selectedBook?.title}"</span>?
            </p>
            <input 
              type="text" 
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              placeholder="Enter borrower name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmCheckout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CUSTOM RETURN MODAL --- */}
      {returnModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Return Book</h3>
            <p className="text-sm text-gray-600 mb-4">
              Is <span className="font-semibold">{selectedBook?.borrower}</span> returning <span className="font-semibold">"{selectedBook?.title}"</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setReturnModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmReturn}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
              >
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookInventory;