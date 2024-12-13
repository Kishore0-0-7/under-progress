import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Shipment {
  id: number;
  origin: string;
  destination: string;
  items: string;
  status: string;
}

const LogisticsManagement: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [newShipment, setNewShipment] = useState({ origin: '', destination: '', items: '', status: '' });
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get('/api/logistics', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  };

  const handleAddShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/logistics', newShipment, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewShipment({ origin: '', destination: '', items: '', status: '' });
      fetchShipments();
    } catch (error) {
      console.error('Error adding shipment:', error);
    }
  };

  const handleUpdateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShipment) return;
    try {
      await axios.put(`/api/logistics/${editingShipment.id}`, editingShipment, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEditingShipment(null);
      fetchShipments();
    } catch (error) {
      console.error('Error updating shipment:', error);
    }
  };

  const handleDeleteShipment = async (id: number) => {
    try {
      await axios.delete(`/api/logistics/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchShipments();
    } catch (error) {
      console.error('Error deleting shipment:', error);
    }
  };

  const handleOptimizeRoute = async () => {
    try {
      const response = await axios.post('/api/logistics/optimize', { shipmentIds: shipments.map(s => s.id) }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Optimized route:', response.data.optimizedRoute);
      // You can update the UI here to show the optimized route
    } catch (error) {
      console.error('Error optimizing route:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Logistics Management</h2>
      
      <form onSubmit={handleAddShipment} className="mb-4">
        <input
          type="text"
          placeholder="Origin"
          value={newShipment.origin}
          onChange={(e) => setNewShipment({ ...newShipment, origin: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Destination"
          value={newShipment.destination}
          onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Items (comma-separated)"
          value={newShipment.items}
          onChange={(e) => setNewShipment({ ...newShipment, items: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Status"
          value={newShipment.status}
          onChange={(e) => setNewShipment({ ...newShipment, status: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Shipment</button>
      </form>

      <button onClick={handleOptimizeRoute} className="bg-green-500 text-white p-2 rounded mb-4">Optimize Route</button>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Origin</th>
            <th className="border p-2">Destination</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td className="border p-2">{shipment.origin}</td>
              <td className="border p-2">{shipment.destination}</td>
              <td className="border p-2">{shipment.items}</td>
              <td className="border p-2">{shipment.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => setEditingShipment(shipment)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteShipment(shipment.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingShipment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Edit Shipment</h3>
            <form onSubmit={handleUpdateShipment}>
              <input
                type="text"
                value={editingShipment.origin}
                onChange={(e) => setEditingShipment({ ...editingShipment, origin: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editingShipment.destination}
                onChange={(e) => setEditingShipment({ ...editingShipment, destination: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editingShipment.items}
                onChange={(e) => setEditingShipment({ ...editingShipment, items: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editingShipment.status}
                onChange={(e) => setEditingShipment({ ...editingShipment, status: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Update</button>
              <button onClick={() => setEditingShipment(null)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticsManagement;

