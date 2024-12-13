import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Supplier {
  id: number;
  name: string;
  contact: string;
  address: string;
}

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', address: '' });
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/api/suppliers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/suppliers', newSupplier, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewSupplier({ name: '', contact: '', address: '' });
      fetchSuppliers();
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  const handleUpdateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSupplier) return;
    try {
      await axios.put(`/api/suppliers/${editingSupplier.id}`, editingSupplier, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEditingSupplier(null);
      fetchSuppliers();
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    try {
      await axios.delete(`/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Supplier Management</h2>
      
      <form onSubmit={handleAddSupplier} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Contact"
          value={newSupplier.contact}
          onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={newSupplier.address}
          onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Supplier</button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="border p-2">{supplier.name}</td>
              <td className="border p-2">{supplier.contact}</td>
              <td className="border p-2">{supplier.address}</td>
              <td className="border p-2">
                <button
                  onClick={() => setEditingSupplier(supplier)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSupplier(supplier.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSupplier && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Edit Supplier</h3>
            <form onSubmit={handleUpdateSupplier}>
              <input
                type="text"
                value={editingSupplier.name}
                onChange={(e) => setEditingSupplier({ ...editingSupplier, name: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editingSupplier.contact}
                onChange={(e) => setEditingSupplier({ ...editingSupplier, contact: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editingSupplier.address}
                onChange={(e) => setEditingSupplier({ ...editingSupplier, address: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Update</button>
              <button onClick={() => setEditingSupplier(null)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;

