
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  Eye, 
  Plus, 
  FileText, 
  Search,
  Filter,
  Mail,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateInvoiceModal from './CreateInvoiceModal';
import axiosInstance from '@/api/axios';

const InvoicePanel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isViewingInvoice, setIsViewingInvoice] = useState<string | null>(null);
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState<string | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);
  const fetchInvoices = async () => {
    try {
      const response = await axiosInstance.get('/invoice');
      setInvoices(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch invoices",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadInvoice = async (invoice) => {
    setIsDownloadingInvoice(invoice.invoiceNumber);
    try {
      // Generate invoice HTML
       const invoiceData = {
        invoiceNumber: invoice.invoiceNumber,
        companyInfo: {
          name: 'DIGIHUB',
          address: '123 Business Street\nTech Park\nDhaka, Bangladesh',
          phone: '+880 1234567890',
          email: 'info@digihub.com'
        },
        client: invoice.client,
        project: invoice.project,
        milestone: invoice.milestone,
        items: [{
          description: invoice.milestone?.title || invoice.project?.name || 'Project Services',
          quantity: 1,
          rate: invoice.amount,
          amount: invoice.amount
        }],
        amount: invoice.amount,
        gstEnabled: invoice.gstEnabled,
        gstAmount: invoice.gstAmount,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        dueDate: invoice.dueDate
      };

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast({
          title: "Error",
          description: "Please allow pop-ups to download the invoice",
          variant: "destructive"
        });
        return;
      }

      const invoiceHTML = generateInvoiceHTML(invoiceData);
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
      }, 500);

      toast({
        title: "Success",
        description: `Invoice ${invoice.invoiceNumber} has been generated for download.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate invoice",
        variant: "destructive"
      });
    } finally {
      setIsDownloadingInvoice(null);
    }
  };

  const handleViewInvoice = async (invoice) => {
    setIsViewingInvoice(invoice.invoiceNumber);
    try {
      // Generate invoice HTML
      const invoiceData = {
        invoiceNumber: invoice.invoiceNumber,
        companyInfo: {
          name: 'DIGIHUB',
          address: '123 Business Street\nTech Park\nDhaka, Bangladesh',
          phone: '+880 1234567890',
          email: 'info@digihub.com'
        },
        client: invoice.client,
        project: invoice.project,
        milestone: invoice.milestone,
        items: [{
          description: invoice.milestone?.title || invoice.project?.name || 'Project Services',
          quantity: 1,
          rate: invoice.amount,
          amount: invoice.amount
        }],
        amount: invoice.amount,
        gstEnabled: invoice.gstEnabled,
        gstAmount: invoice.gstAmount,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        dueDate: invoice.dueDate
      };

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast({
          title: "Error",
          description: "Please allow pop-ups to download the invoice",
          variant: "destructive"
        });
        return;
      }

      const invoiceHTML = generateInvoiceHTML(invoiceData);
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate invoice",
        variant: "destructive"
      });
    } finally {
      setIsViewingInvoice(null);
    }
  };


  const handleCreateInvoiceSuccess = () => {
    setCreateInvoiceOpen(false);
    fetchInvoices();
    toast({
      title: "Success",
      description: "Invoice created successfully",
    });
  };

  const getStatusBadge = (status) => {
    switch (status.toUpperCase()) {
      case 'PAID':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      case 'OVERDUE':
        return <Badge className="bg-red-100 text-red-800 border-red-200">{status}</Badge>;
      case 'DRAFT':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.milestone?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalInvoices: invoices.length,
    paidAmount: invoices.filter(inv => inv.status?.toUpperCase() === 'PAID')
      .reduce((sum, inv) => sum + (inv.total || 0), 0),
    pendingAmount: invoices.filter(inv => inv.status?.toUpperCase() === 'PENDING')
      .reduce((sum, inv) => sum + (inv.total || 0), 0),
    overdueAmount: invoices.filter(inv => inv.status?.toUpperCase() === 'OVERDUE')
      .reduce((sum, inv) => sum + (inv.total || 0), 0),
    totalGST: invoices.filter(inv => inv.status?.toUpperCase() === 'PAID')
      .reduce((sum, inv) => sum + (inv.gst || 0), 0),
    unpaidInvoices: invoices.filter(inv => inv.status?.toUpperCase() !== 'PAID').length
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Rest of the component remains the same, just update the data references
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Invoice Management</h2>
        <Button onClick={() => setCreateInvoiceOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Invoice Summary Cards - Reverted to single row with 5 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalInvoices}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                <p className="text-2xl font-bold text-green-600">${totalStats.paidAmount.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-yellow-600">${totalStats.pendingAmount.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total GST Collected</p>
                <p className="text-2xl font-bold text-purple-600">${totalStats.totalGST.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unpaid Invoices</p>
                <p className="text-2xl font-bold text-red-600">{totalStats.unpaidInvoices}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Invoices & Milestone Payments</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Milestone</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">GST</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.project?.name || 'N/A'}</TableCell>
              <TableCell className="hidden md:table-cell">{invoice.client?.name || 'N/A'}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-sm text-gray-600">{invoice.milestone?.title || 'N/A'}</span>
              </TableCell>
              <TableCell>${(invoice.amount || 0).toLocaleString()}</TableCell>
              {
                invoice.gstEnabled ? (
                <TableCell className="hidden sm:table-cell">${(invoice.gstAmount || 0)}</TableCell>
                ) : (
                  <TableCell className="hidden sm:table-cell">${(invoice.gstAmount || 0)}</TableCell>
                )
              }
              <TableCell className="font-medium">${(invoice.totalAmount || 0).toLocaleString()}</TableCell>
              <TableCell>{getStatusBadge(invoice.status || 'N/A')}</TableCell>
              <TableCell className="hidden lg:table-cell">
                {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'Not set'}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewInvoice(invoice)}
                    disabled={isViewingInvoice === invoice.invoiceNumber}
                  >
                    {isViewingInvoice === invoice.invoiceNumber ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownloadInvoice(invoice)}
                    disabled={isDownloadingInvoice === invoice.invoiceNumber}
                  >
                    {isDownloadingInvoice === invoice.invoiceNumber ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Download className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Invoice Modal */}
      <CreateInvoiceModal 
        open={createInvoiceOpen}
        onOpenChange={setCreateInvoiceOpen}
        onSuccess={handleCreateInvoiceSuccess}
      />
    </div>
  );
};



// Add generateInvoiceHTML function
const generateInvoiceHTML = (invoiceData) => {
  console.log("invoiceData", invoiceData)
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
        <p>${invoiceData.client.address || 'N/A'}</p>
        <p>Phone: ${invoiceData.client.phone || 'N/A'}</p>
        <p>Email: ${invoiceData.client.email || 'N/A'}</p>
        ${invoiceData.project.name ? `<p><strong>Project:</strong> ${invoiceData.project.name}</p>` : ''}
        ${invoiceData.milestone.title ? `<p><strong>Milestone:</strong> ${invoiceData.milestone.title}</p>` : ''}
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
          <span>Subtota:</span>
          <span>$${invoiceData.amount}</span>
        </div>
        <div class="total-row">
          <span>GST (10%):</span>
          <span>$${invoiceData.gstAmount}</span>
        </div>
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


export default InvoicePanel;