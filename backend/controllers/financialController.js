import { pool } from '../db.js';

export const getFinancialReports = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM financial_reports ORDER BY report_date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching financial reports' });
  }
};

export const getFinancialReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM financial_reports WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Financial report not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching financial report' });
  }
};

export const createFinancialReport = async (req, res) => {
  const { report_date, report_type, data } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO financial_reports (report_date, report_type, data) VALUES (?, ?, ?)',
      [report_date, report_type, JSON.stringify(data)]
    );
    res.status(201).json({ id: result.insertId, report_date, report_type, data });
  } catch (err) {
    res.status(500).json({ error: 'Error creating financial report' });
  }
};

export const updateFinancialReport = async (req, res) => {
  const { id } = req.params;
  const { report_date, report_type, data } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE financial_reports SET report_date = ?, report_type = ?, data = ? WHERE id = ?',
      [report_date, report_type, JSON.stringify(data), id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Financial report not found' });
    }
    res.json({ id, report_date, report_type, data });
  } catch (err) {
    res.status(500).json({ error: 'Error updating financial report' });
  }
};

export const deleteFinancialReport = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM financial_reports WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Financial report not found' });
    }
    res.json({ message: 'Financial report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting financial report' });
  }
};

export const createInvoice = async (req, res) => {
  const { customer_id, amount, due_date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO invoices (customer_id, amount, due_date, status) VALUES (?, ?, ?, ?)',
      [customer_id, amount, due_date, 'pending']
    );
    res.status(201).json({ id: result.insertId, customer_id, amount, due_date, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating invoice' });
  }
};

export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { customer_id, amount, due_date, status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE invoices SET customer_id = ?, amount = ?, due_date = ?, status = ? WHERE id = ?',
      [customer_id, amount, due_date, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json({ id, customer_id, amount, due_date, status });
  } catch (err) {
    res.status(500).json({ error: 'Error updating invoice' });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices ORDER BY due_date');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching invoices' });
  }
};

export const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM invoices WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching invoice' });
  }
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM invoices WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting invoice' });
  }
};

