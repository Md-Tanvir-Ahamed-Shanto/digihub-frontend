
import { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateInvoiceModal from './CreateInvoiceModal';

const InvoicePanel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);

  const invoices = [
    { 
      id: 'INV-2024-001', 
      project: 'Health Coach CRM', 
      client: 'Alex Thompson', 
      milestone: 'Database Design & Setup',
      amount: 2000, 
      gst: 180, 
      total: 2180, 
      status: 'Paid', 
      date: '2024-01-15',
      dueDate: '2024-01-30',
      paymentDate: '2024-01-25'
    },
    { 
      id: 'INV-2024-002', 
      project: 'E-commerce Platform', 
      client: 'Sarah Johnson', 
      milestone: 'UI/UX Design Phase',
      amount: 1320, 
      gst: 118.8, 
      total: 1438.8, 
      status: 'Pending', 
      date: '2024-01-20',
      dueDate: '2024-02-04',
      paymentDate: null
    },
    { 
      id: 'INV-2024-003', 
      project: 'Mobile Fitness App', 
      client: 'Mike Chen', 
      milestone: 'Authentication System',
      amount: 2500, 
      gst: 225, 
      total: 2725, 
      status: 'Overdue', 
      date: '2024-01-10',
      dueDate: '2024-01-25',
      paymentDate: null
    },
    { 
      id: 'INV-2024-004', 
      project: 'Restaurant POS', 
      client: 'David Wilson', 
      milestone: 'Payment Integration',
      amount: 1800, 
      gst: 162, 
      total: 1962, 
      status: 'Draft', 
      date: '2024-01-22',
      dueDate: '2024-02-06',
      paymentDate: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">{status}</Badge>;
      case 'Draft':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded successfully.`,
    });
  };

  const handleViewInvoice = (invoiceId: string) => {
    toast({
      title: "Opening Invoice",
      description: `Opening invoice ${invoiceId} in preview mode.`,
    });
  };

  const handleSendReminder = (invoice: any) => {
    toast({
      title: "Payment Reminder Sent",
      description: `Payment reminder email sent to ${invoice.client} for invoice ${invoice.id}.`,
    });
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.milestone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalInvoices: invoices.length,
    paidAmount: invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0),
    pendingAmount: invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.total, 0),
    overdueAmount: invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.total, 0),
    totalGST: invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.gst, 0),
    unpaidInvoices: invoices.filter(inv => inv.status !== 'Paid').length
  };

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
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.project}</TableCell>
                    <TableCell className="hidden md:table-cell">{invoice.client}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-gray-600">{invoice.milestone}</span>
                    </TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">${invoice.gst.toFixed(2)}</TableCell>
                    <TableCell className="font-medium">${invoice.total.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{invoice.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewInvoice(invoice.id)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        {(invoice.status === 'Pending' || invoice.status === 'Overdue') && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSendReminder(invoice)}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                        )}
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
      />
    </div>
  );
};

export default InvoicePanel;
