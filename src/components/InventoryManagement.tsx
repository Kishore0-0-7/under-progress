import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  supplier_id: number;
}

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, supplier_id: 0 });
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory', newItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewItem({ name: '', quantity: 0, supplier_id: 0 });
      fetchInventory();
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      await axios.put(`/api/inventory/${editingItem.id}`, editingItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEditingItem(null);
      fetchInventory();
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/inventory/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchInventory();
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const handleAdjustQuantity = async (id: number, adjustment: number) => {
    try {
      await axios.patch(`/api/inventory/${id}/quantity`, { adjustment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchInventory();
    } catch (error) {
      console.error('Error adjusting inventory quantity:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      
      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Supplier ID"
          value={newItem.supplier_id}
          onChange={(e) => setNewItem({ ...newItem, supplier_id: parseInt(e.target.value) })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Item</button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Supplier ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.supplier_id}</td>
              <td className="border p-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white p-1 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAdjustQuantity(item.id, 1)}
                  className="bg-green-500 text-white p-1 rounded mr-2"
                >
                  +
                </button>
                <button
                  onClick={() => handleAdjustQuantity(item.id, -1)}
                  className="bg-orange-500 text-white p-1 rounded"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Edit Inventory Item</h3>
            <form onSubmit={handleUpdateItem}>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                value={editingItem.quantity}
                onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                value={editingItem.supplier_id}
                onChange={(e) => setEditingItem({ ...editingItem, supplier_id: parseInt(e.target.value) })}
                className="border p-2 mb-2 w-full"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Update</button>
              <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;

