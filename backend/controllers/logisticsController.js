import { pool } from '../db.js';

export const getShipments = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM shipments ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching shipments' });
  }
};

export const getShipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM shipments WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching shipment' });
  }
};

export const createShipment = async (req, res) => {
  const { origin, destination, items, status } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO shipments (origin, destination, items, status) VALUES (?, ?, ?, ?)',
      [origin, destination, JSON.stringify(items), status]
    );
    res.status(201).json({ id: result.insertId, origin, destination, items, status });
  } catch (err) {
    res.status(500).json({ error: 'Error creating shipment' });
  }
};

export const updateShipment = async (req, res) => {
  const { id } = req.params;
  const { origin, destination, items, status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE shipments SET origin = ?, destination = ?, items = ?, status = ? WHERE id = ?',
      [origin, destination, JSON.stringify(items), status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json({ id, origin, destination, items, status });
  } catch (err) {
    res.status(500).json({ error: 'Error updating shipment' });
  }
};

export const deleteShipment = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM shipments WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json({ message: 'Shipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting shipment' });
  }
};

export const optimizeRoute = async (req, res) => {
  const { shipmentIds } = req.body;
  try {
    // This is a placeholder for the AI/ML route optimization logic
    // In a real-world scenario, this would involve complex algorithms and possibly external AI services
    const optimizedRoute = await simulateRouteOptimization(shipmentIds);
    res.json({ optimizedRoute });
  } catch (err) {
    res.status(500).json({ error: 'Error optimizing route' });
  }
};

// Simulated route optimization function
const simulateRouteOptimization = async (shipmentIds) => {
  const [shipments] = await pool.query('SELECT * FROM shipments WHERE id IN (?)', [shipmentIds]);

  // Simulate optimization (this is a simplified example)
  const optimizedRoute = shipments.sort((a, b) => {
    const distanceA = calculateDistance(a.origin, a.destination);
    const distanceB = calculateDistance(b.origin, b.destination);
    return distanceA - distanceB;
  });

  return optimizedRoute;
};

// Simple distance calculation (for demonstration purposes)
const calculateDistance = (origin, destination) => {
  // In a real scenario, this would use actual geocoding and distance calculation
  return Math.abs(origin.charCodeAt(0) - destination.charCodeAt(0));
};

