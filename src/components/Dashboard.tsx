import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Supply Chain Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/suppliers" className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600">
          <h2 className="text-xl font-bold mb-2">Supplier Management</h2>
          <p>Manage your suppliers and their information</p>
        </Link>
        <Link to="/inventory" className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600">
          <h2 className="text-xl font-bold mb-2">Inventory Management</h2>
          <p>Track and manage your inventory levels</p>
        </Link>
        <Link to="/logistics" className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600">
          <h2 className="text-xl font-bold mb-2">Logistics Management</h2>
          <p>Manage shipments and optimize routes</p>
        </Link>
        <Link to="/financial" className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:bg-red-600">
          <h2 className="text-xl font-bold mb-2">Financial Management</h2>
          <p>Handle invoices and financial reports</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

