import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">SCM System</div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-200">Dashboard</Link></li>
          <li><Link to="/suppliers" className="hover:text-blue-200">Suppliers</Link></li>
          <li><Link to="/inventory" className="hover:text-blue-200">Inventory</Link></li>
          <li><Link to="/logistics" className="hover:text-blue-200">Logistics</Link></li>
          <li><Link to="/financial" className="hover:text-blue-200">Financial</Link></li>
          <li><button onClick={handleLogout} className="hover:text-blue-200">Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

