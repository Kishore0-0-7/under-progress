import { pool } from '../db.js';

export const getInventory = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching inventory' });
  }
};

export const getInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM inventory WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching inventory item' });
  }
};

export const addInventoryItem = async (req, res) => {
  const { name, quantity, supplier_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO inventory (name, quantity, supplier_id) VALUES (?, ?, ?)',
      [name, quantity, supplier_id]
    );
    res.status(201).json({ id: result.insertId, name, quantity, supplier_id });
  } catch (err) {
    res.status(500).json({ error: 'Error adding inventory item' });
  }
};

export const updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, supplier_id } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE inventory SET name = ?, quantity = ?, supplier_id = ? WHERE id = ?',
      [name, quantity, supplier_id, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json({ id, name, quantity, supplier_id });
  } catch (err) {
    res.status(500).json({ error: 'Error updating inventory item' });
  }
};

export const deleteInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM inventory WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting inventory item' });
  }
};

export const adjustInventoryQuantity = async (req, res) => {
  const { id } = req.params;
  const { adjustment } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE inventory SET quantity = quantity + ? WHERE id = ?',
      [adjustment, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    const [updatedItem] = await pool.query('SELECT * FROM inventory WHERE id = ?', [id]);
    res.json(updatedItem[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error adjusting inventory quantity' });
  }
};

