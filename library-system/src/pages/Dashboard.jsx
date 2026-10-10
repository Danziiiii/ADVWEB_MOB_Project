// src/pages/Dashboard.jsx

function Dashboard({ books }) {
  // Calculate live statistics from the books array
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === "Available").length;
  const borrowedBooks = books.filter(book => book.status === "Borrowed").length;

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Library Overview</h2>
      
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Books Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Total Books
          </span>
          <span className="text-4xl font-bold text-indigo-600">
            {totalBooks}
          </span>
        </div>

        {/* Available Books Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Available
          </span>
          <span className="text-4xl font-bold text-emerald-600">
            {availableBooks}
          </span>
        </div>

        {/* Borrowed Books Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Checked Out
          </span>
          <span className="text-4xl font-bold text-amber-600">
            {borrowedBooks}
          </span>
        </div>

      </div>

      {/* Recent Activity or Welcome Message */}
      <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Welcome to LibrarySys</h3>
        <p className="text-indigo-700">
          Navigate to the Inventory tab to manage your collection or Add Book to expand your library.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;