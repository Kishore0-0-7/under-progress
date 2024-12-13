import { pool } from '../db.js';

export const getSuppliers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM suppliers ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching suppliers' });
  }
};

export const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM suppliers WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching supplier' });
  }
};

export const addSupplier = async (req, res) => {
  const { name, contact, address } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO suppliers (name, contact, address) VALUES (?, ?, ?)',
      [name, contact, address]
    );
    res.status(201).json({ id: result.insertId, name, contact, address });
  } catch (err) {
    res.status(500).json({ error: 'Error adding supplier' });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, contact, address } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE suppliers SET name = ?, contact = ?, address = ? WHERE id = ?',
      [name, contact, address, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json({ id, name, contact, address });
  } catch (err) {
    res.status(500).json({ error: 'Error updating supplier' });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting supplier' });
  }
};

export const getSupplierInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT i.* FROM inventory i JOIN suppliers s ON i.supplier_id = s.id WHERE s.id = ?',
      [id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching supplier inventory' });
  }
};

