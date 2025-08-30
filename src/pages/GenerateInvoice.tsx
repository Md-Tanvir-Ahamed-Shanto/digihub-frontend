import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash2, Calendar, DollarSign, FileText, Eye, Zap, Save, List, Trash } from 'lucide-react';
import axios from 'axios';
import axiosInstance from '@/api/axios';

// Separate Invoice Preview Component
const InvoicePreview = ({ invoiceData, onAutoDownload }) => {
  // Function to generate the HTML content for the invoice
  const generateInvoiceHTML = (invoiceData) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>
          /* Basic styling for the invoice print view */
          body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
          .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .company-info { text-align: left; }
          .invoice-info { text-align: right; }
          .client-info { margin-bottom: 30px; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .invoice-table th, .invoice-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          .invoice-table th { background-color: #f8f9fa; font-weight: bold; }
          .totals { text-align: right; margin-top: 20px; }
          .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .total-amount { font-weight: bold; font-size: 1.2em; border-top: 2px solid #333; padding-top: 8px; }
          .status { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 0.9em; }
          .status.pending { background-color: #fef3c7; color: #d97706; }
          .status.paid { background-color: #d1fae5; color: #059669; }
          .status.overdue { background-color: #fee2e2; color: #dc2626; }
          /* Hide print buttons when printing */
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div class="company-info">
            <h2>${invoiceData.companyInfo.name}</h2>
            <p>${invoiceData.companyInfo.address.replace(/\n/g, '<br>')}</p>
            <p>Phone: ${invoiceData.companyInfo.phone}</p>
            <p>Email: ${invoiceData.companyInfo.email}</p>
          </div>
          <div class="invoice-info">
            <h1>INVOICE</h1>
            <p><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Due Date:</strong> ${invoiceData.dueDate ? new Date(invoiceData.dueDate).toLocaleDateString() : 'Not specified'}</p>
            <p><strong>Status:</strong> <span class="status ${invoiceData.status.toLowerCase()}">${invoiceData.status}</span></p>
          </div>
        </div>

        <div class="client-info">
          <h3>Bill To:</h3>
          <p><strong>${invoiceData.client.name}</strong></p>
          <p>${invoiceData.client.address}</p>
          <p>Phone: ${invoiceData.client.phone}</p>
          <p>Email: ${invoiceData.client.email}</p>
          ${invoiceData.project.name ? `<p><strong>Item:</strong> ${invoiceData.project.name}</p>` : ''}
          ${invoiceData.milestone.name ? `<p><strong>Milestone:</strong> ${invoiceData.milestone.name}</p>` : ''}
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>$${parseFloat(item.rate || 0).toFixed(2)}</td>
                <td>$${parseFloat(item.amount || 0).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>$${invoiceData.amount}</span>
          </div>
          ${invoiceData.gstEnabled ? `
            <div class="total-row">
              <span>GST (10%):</span>
              <span>$${invoiceData.gstAmount}</span>
            </div>
          ` : ''}
          <div class="total-row total-amount">
            <span>Total Amount:</span>
            <span>$${invoiceData.totalAmount}</span>
          </div>
        </div>

        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Print Invoice</button>
        </div>
      </body>
      </html>
    `;
  };

  // Handles the download of the invoice by opening a new window and printing
  const downloadInvoice = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        // Use a custom message box instead of alert()
        const messageBox = document.createElement('div');
        messageBox.innerHTML = `
          <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
            <p>Please allow pop-ups for this site to download the invoice.</p>
            <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
          </div>
        `;
        document.body.appendChild(messageBox);
        return;
      }
      
      const invoiceHTML = generateInvoiceHTML(invoiceData);
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();
      
      // Auto-trigger print dialog after a short delay
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } catch (error) {
      console.error('Error generating invoice:', error);
      // Use a custom message box instead of alert()
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Error generating invoice. Please try again.</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
    }
  };

  // Auto-download when component mounts if requested
  useEffect(() => {
    if (onAutoDownload) {
      setTimeout(() => {
        downloadInvoice();
      }, 1000);
    }
  }, [onAutoDownload, invoiceData]); // Added invoiceData to dependency array for completeness

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Invoice Preview</h1>
        <div className="flex gap-4">
          <button
            onClick={downloadInvoice}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            Back to Generator
          </button>
        </div>
      </div>

      {/* Invoice Preview Display */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">{invoiceData.companyInfo.name}</h2>
            <p className="text-gray-600 whitespace-pre-line">{invoiceData.companyInfo.address}</p>
            <p className="text-gray-600">Phone: {invoiceData.companyInfo.phone}</p>
            <p className="text-gray-600">Email: {invoiceData.companyInfo.email}</p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-600"><strong>Invoice #:</strong> {invoiceData.invoiceNumber}</p>
            <p className="text-gray-600"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p className="text-gray-600"><strong>Due Date:</strong> {invoiceData.dueDate ? new Date(invoiceData.dueDate).toLocaleDateString() : 'Not specified'}</p>
            <p className="text-gray-600">
              <strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
                invoiceData.status === 'PAID' ? 'bg-green-100 text-green-800' :
                invoiceData.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {invoiceData.status}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
          <p className="font-semibold">{invoiceData.client.name}</p>
          <p className="text-gray-600">{invoiceData.client.address}</p>
          <p className="text-gray-600">Phone: {invoiceData.client.phone}</p>
          <p className="text-gray-600">Email: {invoiceData.client.email}</p>
          {invoiceData.project.name && <p className="text-gray-600"><strong>Item:</strong> {invoiceData.project.name}</p>}
          {invoiceData.milestone.name && <p className="text-gray-600"><strong>Milestone:</strong> {invoiceData.milestone.name}</p>}
        </div>

        <table className="w-full border-collapse mb-8 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Description</th>
              <th className="border border-gray-300 p-3 text-left w-24">Quantity</th>
              <th className="border border-gray-300 p-3 text-left w-24">Rate</th>
              <th className="border border-gray-300 p-3 text-left w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-3">{item.description}</td>
                <td className="border border-gray-300 p-3">{item.quantity}</td>
                <td className="border border-gray-300 p-3">${parseFloat(item.rate || 0).toFixed(2)}</td>
                <td className="border border-gray-300 p-3">${parseFloat(item.amount || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <div className="inline-block">
            <div className="flex justify-between mb-2 min-w-64">
              <span>Subtotal:</span>
              <span className="font-medium">${invoiceData.amount}</span>
            </div>
            {invoiceData.gstEnabled && (
              <div className="flex justify-between mb-2">
                <span>GST (10%):</span>
                <span className="font-medium">${invoiceData.gstAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t-2 border-gray-300 pt-2">
              <span>Total Amount:</span>
              <span>${invoiceData.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to generate invoice with data from outside (for auto-download)
// This function is exposed globally for potential external use cases
const generateInvoiceFromData = (data, autoDownload = false) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    // Use a custom message box instead of alert()
    const messageBox = document.createElement('div');
    messageBox.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
        <p>Please allow pop-ups for this site to download the invoice.</p>
        <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
      </div>
    `;
    document.body.appendChild(messageBox);
    return;
  }

  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${data.invoiceNumber}</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .company-info { text-align: left; }
        .invoice-info { text-align: right; }
        .client-info { margin-bottom: 30px; }
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .invoice-table th, .invoice-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .invoice-table th { background-color: #f8f9fa; font-weight: bold; }
        .totals { text-align: right; margin-top: 20px; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .total-amount { font-weight: bold; font-size: 1.2em; border-top: 2px solid #333; padding-top: 8px; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 0.9em; }
        .status.pending { background-color: #fef3c7; color: #d97706; }
        .status.paid { background-color: #d1fae5; color: #059669; }
        .status.overdue { background-color: #fee2e2; color: #dc2626; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <div class="company-info">
          <h2>${data.companyInfo.name}</h2>
          <p>${data.companyInfo.address.replace(/\n/g, '<br>')}</p>
          <p>Phone: ${data.companyInfo.phone}</p>
          <p>Email: ${data.companyInfo.email}</p>
        </div>
        <div class="invoice-info">
          <h1>INVOICE</h1>
          <p><strong>Invoice #:</strong> ${data.invoiceNumber}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> ${data.dueDate ? new Date(data.dueDate).toLocaleDateString() : 'Not specified'}</p>
          <p><strong>Status:</strong> <span class="status ${data.status.toLowerCase()}">${data.status}</span></p>
        </div>
      </div>

      <div class="client-info">
        <h3>Bill To:</h3>
        <p><strong>${data.client.name}</strong></p>
        <p>${data.client.address}</p>
        <p>Phone: ${data.client.phone}</p>
        <p>Email: ${data.client.email}</p>
        ${data.project.name ? `<p><strong>Item:</strong> ${data.project.name}</p>` : ''}
        ${data.milestone.name ? `<p><strong>Milestone:</strong> ${data.milestone.name}</p>` : ''}
      </div>

      <table class="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${data.items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>$${parseFloat(item.rate || 0).toFixed(2)}</td>
              <td>$${parseFloat(item.amount || 0).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="totals">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>$${data.amount}</span>
        </div>
        ${data.gstEnabled ? `
          <div class="total-row">
            <span>GST (10%):</span>
            <span>$${data.gstAmount}</span>
          </div>
        ` : ''}
        <div class="total-row total-amount">
          <span>Total Amount:</span>
          <span>$${data.totalAmount}</span>
        </div>
      </div>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Print Invoice</button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(invoiceHTML);
  printWindow.document.close();
  printWindow.focus();

  if (autoDownload) {
    setTimeout(() => {
      printWindow.print();
    }, 1000);
  }
};

// Export for external use
if (typeof window !== 'undefined') {
  (window as any).generateInvoiceFromData = generateInvoiceFromData;
}

const GenerateInvoice = () => {
  const [currentView, setCurrentView] = useState('generator');
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    amount: '0.00',
    gstAmount: '0.00',
    totalAmount: '0.00',
    gstEnabled: false,
    status: 'PENDING',
    dueDate: '',
    client: {
      name: '',
      email: '',
      address: '',
      phone: ''
    },
    project: {
      name: '',
      description: ''
    },
    milestone: {
      name: '',
      description: ''
    },
    items: [
      { description: '', quantity: 1, rate: '0.00', amount: '0.00' }
    ],
    companyInfo: {
      name: '',
      address: '',
      phone: '',
      email: ''
    }
  });
  
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [showSavedInvoices, setShowSavedInvoices] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Effect to calculate totals whenever items or gstEnabled changes
  useEffect(() => {
    calculateTotals();
  }, [invoice.items, invoice.gstEnabled]);

  // Handles changes in form inputs (non-item fields)
  const handleInputChange = (section, field, value) => {
    if (section) {
      setInvoice(prev => ({
        ...prev,
        [section]: {
          ...(prev[section] || {}),
          [field]: value
        }
      }));
    } else {
      setInvoice(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handles changes in invoice item fields
  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    
    // Recalculate item amount if quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      const quantity = parseFloat(newItems[index].quantity.toString()) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      newItems[index].amount = (quantity * rate).toFixed(2);
    }
    
    setInvoice(prev => ({ ...prev, items: newItems }));
    // Totals will be recalculated by the useEffect hook
  };

  // Adds a new item row to the invoice
  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: '0.00', amount: '0.00' }]
    }));
  };

  // Removes an item row from the invoice
  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice(prev => ({ ...prev, items: newItems }));
    // Totals will be recalculated by the useEffect hook
  };

  // Calculates subtotal, GST, and total amount
  const calculateTotals = () => {
    const subtotal = invoice.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const gstRate = 0.10; // 10% GST
    const gstAmount = invoice.gstEnabled ? subtotal * gstRate : 0;
    const totalAmount = subtotal + gstAmount;
    
    setInvoice(prev => ({
      ...prev,
      amount: subtotal.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    }));
  };

  // Toggles GST calculation on/off
  const toggleGST = () => {
    setInvoice(prev => ({ ...prev, gstEnabled: !prev.gstEnabled }));
    // Totals will be recalculated by the useEffect hook
  };

  // Generates a unique invoice number
  const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const random = Math.random().toString(36).substr(2, 3).toUpperCase(); // 3 random alphanumeric chars
    setInvoice(prev => ({ ...prev, invoiceNumber: `INV-${timestamp}-${random}` }));
  };
  
  // Fetch all saved invoices
  const fetchSavedInvoices = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/generated-invoices');
      
      // Check if response data is valid JSON and not HTML
      if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE html>')) {
        throw new Error('Received HTML instead of JSON. API endpoint may be incorrect or server is returning an error page.');
      }
      
      // Ensure we have a valid array of invoices
      let invoices = Array.isArray(response.data) ? response.data : [];
      
      // Validate each invoice has required properties
      invoices = invoices.map(inv => {
        // Ensure inv is an object
        if (typeof inv !== 'object' || inv === null) {
          return {
            id: Math.random().toString(36).substr(2, 9),
            invoiceNumber: 'Unknown',
            client: { name: 'N/A', email: '', address: '', phone: '' },
            totalAmount: '0.00',
            status: 'PENDING'
          };
        }
        
        return {
          ...inv,
          client: inv.client && typeof inv.client === 'object' ? inv.client : { name: 'N/A', email: '', address: '', phone: '' },
          invoiceNumber: inv.invoiceNumber || 'Unknown',
          totalAmount: inv.totalAmount || '0.00',
          status: inv.status || 'PENDING'
        };
      });
      
      setSavedInvoices(invoices);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Failed to fetch saved invoices</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      setIsLoading(false);
    }
  };
  
  // Save invoice to backend
  const saveInvoice = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSaving(true);
      
      // Create a clean copy of the invoice data to send
      const invoiceToSave = {
        ...invoice,
        // Ensure all required objects exist
        client: invoice.client || { name: '', email: '', address: '', phone: '' },
        project: invoice.project || { name: '', description: '' },
        milestone: invoice.milestone || { name: '', description: '' },
        companyInfo: invoice.companyInfo || { name: '', address: '', phone: '', email: '' },
        items: Array.isArray(invoice.items) && invoice.items.length > 0 
          ? invoice.items 
          : [{ description: '', quantity: 1, rate: '0.00', amount: '0.00' }]
      };
      
      const response = await axiosInstance.post('/generated-invoices', invoiceToSave);
      
      // Check if response is valid
      if (response.data && typeof response.data === 'object') {
        // Add the newly saved invoice to the list
        setSavedInvoices(prev => [...prev, response.data]);
      } else {
        // If response is not as expected, refresh the invoice list
        await fetchSavedInvoices();
      }
      
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Invoice saved successfully!</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      setIsSaving(false);
      
      // Refresh the list of saved invoices if they're being displayed
      if (showSavedInvoices) {
        fetchSavedInvoices();
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Failed to save invoice</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      setIsSaving(false);
    }
  };
  
  // Delete invoice from backend
  const deleteInvoice = async (id) => {
    if (!id) {
      console.error('Cannot delete invoice: Invalid ID');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    
    try {
      setIsLoading(true);
      const response = await axiosInstance.delete(`/generated-invoices/${id}`);
      
      // Check if response is HTML instead of expected data
      if (response.data && typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE html>')) {
        throw new Error('Received HTML instead of JSON. API endpoint may be incorrect or server is returning an error page.');
      }
      
      // Update local state to remove the deleted invoice
      setSavedInvoices(prev => prev.filter(invoice => invoice.id !== id));
      
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Invoice deleted successfully!</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      
      // Refresh the list to ensure we have the latest data
      fetchSavedInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Failed to delete invoice</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load invoice data from backend
  const loadInvoice = async (id) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/generated-invoices/${id}`);
      
      // Check if response data is valid JSON object and not HTML or string
      if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE html>')) {
        throw new Error('Received HTML instead of JSON. API endpoint may be incorrect or server is returning an error page.');
      }
      
      // Ensure we have a valid object
      const loadedInvoice = typeof response.data === 'object' && response.data !== null 
        ? response.data 
        : { invoiceNumber: '', status: 'PENDING', dueDate: '' };
      
      // Format the date properly
      if (loadedInvoice.dueDate) {
        loadedInvoice.dueDate = new Date(loadedInvoice.dueDate).toISOString().split('T')[0];
      }
      
      // Ensure all required objects exist
      if (!loadedInvoice.client || typeof loadedInvoice.client !== 'object') {
        loadedInvoice.client = { name: '', email: '', address: '', phone: '' };
      }
      if (!loadedInvoice.project || typeof loadedInvoice.project !== 'object') {
        loadedInvoice.project = { name: '', description: '' };
      }
      if (!loadedInvoice.milestone || typeof loadedInvoice.milestone !== 'object') {
        loadedInvoice.milestone = { name: '', description: '' };
      }
      if (!loadedInvoice.companyInfo || typeof loadedInvoice.companyInfo !== 'object') {
        loadedInvoice.companyInfo = { name: '', address: '', phone: '', email: '' };
      }
      if (!loadedInvoice.items || !Array.isArray(loadedInvoice.items) || loadedInvoice.items.length === 0) {
        loadedInvoice.items = [{ description: '', quantity: 1, rate: '0.00', amount: '0.00' }];
      }
      
      setInvoice(loadedInvoice);
      setShowSavedInvoices(false);
      setIsLoading(false);
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Invoice loaded successfully!</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
    } catch (error) {
      console.error('Error loading invoice:', error);
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Failed to load invoice</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      setIsLoading(false);
    }
  };
  
  // Toggle saved invoices display
  const toggleSavedInvoices = () => {
    if (!showSavedInvoices) {
      fetchSavedInvoices();
    }
    setShowSavedInvoices(!showSavedInvoices);
  };

  // Triggers manual download of the invoice
  const manualDownload = () => {
    if (validateForm()) {
      generateInvoiceFromData(invoice, false);
    }
  };

  // Triggers auto-download (opens print dialog) of the invoice
  const autoDownload = () => {
    if (validateForm()) {
      generateInvoiceFromData(invoice, true);
    }
  };

  // Switches to the preview view
  const previewInvoice = () => {
    if (validateForm()) {
      setCurrentView('preview');
    }
  };

  // Validates required fields before generating/previewing invoice
  const validateForm = () => {
    if (!invoice.invoiceNumber) {
      // Use a custom message box instead of alert()
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Please enter an invoice number.</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      return false;
    }
    if (!invoice.client.name) {
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Please enter client name.</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      return false;
    }
    if (!invoice.client.email) {
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Please enter client email.</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      return false;
    }
    if (invoice.items.length === 0 || invoice.items.some(item => !item.description)) {
      const messageBox = document.createElement('div');
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
          <p>Please add at least one invoice item with a description.</p>
          <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      return false;
    }
    return true;
  };

  // Render InvoicePreview component if currentView is 'preview'
  if (currentView === 'preview') {
    return <InvoicePreview invoiceData={invoice} onAutoDownload={false} />;
  }

  // Main Invoice Generator UI
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 font-sans">
      <div className=" w-full mx-auto p-6 bg-white rounded-xl shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Invoice Generator</h1>
          <p className="text-gray-600 text-lg">Create professional invoices with GST calculations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Invoice Details */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Invoice Details
              </h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Invoice Number"
                    value={invoice.invoiceNumber}
                    onChange={(e) => handleInputChange(null, 'invoiceNumber', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                  <button
                    onClick={generateInvoiceNumber}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    <Zap className="w-4 h-4 mr-2" /> Generate
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      value={invoice.dueDate}
                      required
                      onChange={(e) => handleInputChange(null, 'dueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      id="status"
                      value={invoice.status}
                      onChange={(e) => handleInputChange(null, 'status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="OVERDUE">Overdue</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gstEnabled"
                    checked={invoice.gstEnabled}
                    onChange={toggleGST}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="gstEnabled" className="ml-2 block text-base text-gray-900 cursor-pointer">
                    Enable GST (10%)
                  </label>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-green-50 p-6 rounded-lg shadow-inner border border-green-200">
              <h2 className="text-xl font-semibold mb-4 text-green-800">To Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="To Name"
                  value={invoice.client?.name || ''}
                  onChange={(e) => handleInputChange('client', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                />
                <input
                  type="email"
                  placeholder="To Email"
                  value={invoice.client?.email || ''}
                  onChange={(e) => handleInputChange('client', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                />
                <input
                  type="text"
                  placeholder="To Phone"
                  value={invoice.client?.phone || ''}
                  onChange={(e) => handleInputChange('client', 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                />
                <textarea
                  placeholder="to Address"
                  value={invoice.client?.address || ''}
                  onChange={(e) => handleInputChange('client', 'address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                />
              </div>
            </div>

            {/* Project & Milestone */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-200">
              <h2 className="text-xl font-semibold mb-4 text-purple-800">Items Type</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={invoice.project?.name || ''}
                  onChange={(e) => handleInputChange('project', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                />
                <textarea
                  placeholder="Item Description"
                  value={invoice.project?.description || ''}
                  onChange={(e) => handleInputChange('project', 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                />
                {/* <input
                  type="text"
                  placeholder="Milestone Name (Optional)"
                  value={invoice.milestone.name}
                  onChange={(e) => handleInputChange('milestone', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                /> */}
              </div>
            </div>
          </div>

          {/* Right Column - Items & Company Info */}
          <div className="space-y-6">
            {/* Company Information */}
            <div className="bg-yellow-50 p-6 rounded-lg shadow-inner border border-yellow-200">
              <h2 className="text-xl font-semibold mb-4 text-yellow-800">From Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="From Name"
                  value={invoice.companyInfo?.name || ''}
                  onChange={(e) => handleInputChange('companyInfo', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                />
                <textarea
                  placeholder="From Address"
                  value={invoice.companyInfo?.address || ''}
                  onChange={(e) => handleInputChange('companyInfo', 'address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={invoice.companyInfo?.phone || ''}
                  onChange={(e) => handleInputChange('companyInfo', 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={invoice.companyInfo?.email || ''}
                  onChange={(e) => handleInputChange('companyInfo', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                />
              </div>
            </div>

            {/* Invoice Items */}
            <div className="bg-red-50 p-6 rounded-lg shadow-inner border border-red-200">
              <h2 className="text-xl font-semibold mb-4 text-red-800">Invoice Items</h2>
              <div className="space-y-4">
                {invoice.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 items-end">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                      min="1"
                    />
                    <input
                      type="number"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                      step="0.01"
                    />
                    <input
                      type="text"
                      placeholder="Amount"
                      value={item.amount}
                      readOnly
                      className="w-28 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-md flex items-center justify-center"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addItem}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </button>
              </div>
            </div>

            {/* Totals Display */}
            <div className="bg-indigo-50 p-6 rounded-lg shadow-inner border border-indigo-200 text-right">
              <h2 className="text-xl font-semibold mb-4 text-indigo-800">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-indigo-700">${invoice.amount}</span>
                </div>
                {invoice.gstEnabled && (
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-700">GST (10%):</span>
                    <span className="font-semibold text-indigo-700">${invoice.gstAmount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-2xl font-bold border-t-2 border-indigo-300 pt-4 mt-4">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-indigo-900">${invoice.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
         
          <button
            onClick={manualDownload}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download className="w-5 h-5 mr-2" /> Print Invoice
          </button>
        
          <button
            onClick={saveInvoice}
            disabled={isSaving}
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5 mr-2" /> {isSaving ? 'Saving...' : 'Save Invoice'}
          </button>
          <button
            onClick={toggleSavedInvoices}
            className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <List className="w-5 h-5 mr-2" /> {showSavedInvoices ? 'Hide Saved Invoices' : 'Show Saved Invoices'}
          </button>
        </div>
        
        {/* Saved Invoices Section */}
        {showSavedInvoices && (
          <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Saved Invoices</h2>
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              </div>
            ) : savedInvoices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Invoice Number</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Client</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Amount</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Due Date</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedInvoices.map((inv) => (
                      <tr key={inv.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{inv.invoiceNumber}</td>
                        <td className="py-3 px-4 text-gray-800">{inv.client && inv.client.name ? inv.client.name : 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-800">${inv.totalAmount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            inv.status === 'PAID' ? 'bg-green-100 text-green-800' :
                            inv.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'Not specified'}
                        </td>
                        <td className="py-3 px-4 space-x-2">
                          <button
                            onClick={() => loadInvoice(inv.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            title="Load Invoice"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteInvoice(inv.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            title="Delete Invoice"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                No saved invoices found. Create and save an invoice to see it here.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateInvoice;
