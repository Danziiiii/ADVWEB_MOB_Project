import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBook from "./pages/AddBook";
import BookInventory from "./pages/BookInventory";
import Dashboard from "./pages/Dashboard";
import "./App.css";


function App() {

  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    // New books default to Available with no borrower
    const bookWithId = { ...newBook, id: Date.now(), status: "Available", borrower: "" };
    setBooks([...books, bookWithId]);
  };

  const handleDeleteBook = (idToDelete) => {
    const updatedBooks = books.filter((book) => book.id !== idToDelete);
    setBooks(updatedBooks);
  };

  // 2. Add the Checkout / Return function
  const handleToggleBorrow = (id, newStatus, borrowerName = "") => {
    // .map() creates a new array, updating ONLY the book that matches the ID
    const updatedBooks = books.map((book) => 
      book.id === id ? { ...book, status: newStatus, borrower: borrowerName } : book
    );
    setBooks(updatedBooks);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6">
          <Routes>
            <Route path="/" element={<Dashboard books={books} />} />
            <Route 
              path="/inventory" 
              element={
                <BookInventory 
                  books={books} 
                  onDeleteBook={handleDeleteBook} 
                  onToggleBorrow={handleToggleBorrow} // <-- Pass the new function
                />
              } 
            />
            <Route path="/add-book" element={<AddBook onAddBook={handleAddBook} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;