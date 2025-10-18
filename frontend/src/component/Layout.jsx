import { Link } from 'react-router-dom';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50">
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Email Spam Report</Link>
        <nav>
          <Link to="/history" className="px-3 py-1 hover:bg-indigo-600 rounded">History</Link>
        </nav>
      </div>
    </header>
    <main className="container mx-auto p-4">
      {children}
    </main>
    <footer className="text-center py-4 text-gray-600 text-sm">
      © 2025 Email Spam Report Tool
    </footer>
  </div>
);

export default Layout;
