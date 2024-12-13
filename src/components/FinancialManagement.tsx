import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FinancialReport {
  id: number;
  report_date: string;
  report_type: string;
  data: string;
}

interface Invoice {
  id: number;
  customer_id: number;
  amount: number;
  due_date: string;
  status: string;
}

const FinancialManagement: React.FC = () => {
  const [financialReports, setFinancialReports] = useState<FinancialReport[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [newReport, setNewReport] = useState({ report_date: '', report_type: '', data: '' });
  const [newInvoice, setNewInvoice] = useState({ customer_id: 0, amount: 0, due_date: '', status: '' });

  useEffect(() => {
    fetchFinancialReports();
    fetchInvoices();
  }, []);

  const fetchFinancialReports = async () => {
    try {
      const response = await axios.get('/api/financial/reports', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFinancialReports(response.data);
    } catch (error) {
      console.error('Error fetching financial reports:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('/api/financial/invoices', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleAddReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/financial/reports', newReport, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewReport({ report_date: '', report_type: '', data: '' });
      fetchFinancialReports();
    } catch (error) {
      console.error('Error adding financial report:', error);
    }
  };

  const handleAddInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/financial/invoices', newInvoice, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewInvoice({ customer_id: 0, amount: 0, due_date: '', status: '' });
      fetchInvoices();
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  const handleUpdateInvoiceStatus = async (id: number, status: string) => {
    try {
      await axios.put(`/api/financial/invoices/${id}`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Financial Reports</h3>
        <form onSubmit={handleAddReport} className="mb-4">
          <input
            type="date"
            value={newReport.report_date}
            onChange={(e) => setNewReport({ ...newReport, report_date: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Report Type"
            value={newReport.report_type}
            onChange={(e) => setNewReport({ ...newReport, report_type: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Report Data (JSON)"
            value={newReport.data}
            onChange={(e) => setNewReport({ ...newReport, data: e.target.value })}
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Report</button>
        </form>

        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {financialReports.map((report) => (
              <tr key={report.id}>
                <td className="border p-2">{report.report_date}</td>
                <td className="border p-2">{report.report_type}</td>
                <td className="border p-2">{report.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Invoices</h3>
        <form onSubmit={handleAddInvoice} className="mb-4">
          <input
            type="number"
            placeholder="Customer ID"
            value={newInvoice.customer_id}
            onChange={(e) => setNewInvoice({ ...newInvoice, customer_id: parseInt(e.target.value) })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newInvoice.amount}
            onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) })}
            className="border p-2 mr-2"
          />
          <input
            type="date"
            value={newInvoice.due_date}
            onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Status"
            value={newInvoice.status}
            onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Invoice</button>
        </form>

        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Customer ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border p-2">{invoice.customer_id}</td>
                <td className="border p-2">${invoice.amount.toFixed(2)}</td>
                <td className="border p-2">{invoice.due_date}</td>
                <td className="border p-2">{invoice.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleUpdateInvoiceStatus(invoice.id, 'paid')}
                    className="bg-green-500 text-white p-1 rounded mr-2"
                  >
                    Mark Paid
                  </button>
                  <button
                    onClick={() => handleUpdateInvoiceStatus(invoice.id, 'cancelled')}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialManagement;

