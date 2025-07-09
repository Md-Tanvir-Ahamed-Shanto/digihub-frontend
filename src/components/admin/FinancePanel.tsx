
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  Plus,
  FileText,
  Calculator
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const FinancePanel = () => {
  const { toast } = useToast();
  const [expenseForm, setExpenseForm] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const financialSummary = {
    totalRevenue: 48500,
    gstCollected: 4230,
    totalExpenses: 12400,
    profitAfterExpenses: 31870
  };

  const revenueData = [
    { month: 'Jan', revenue: 12500, expenses: 3200 },
    { month: 'Feb', revenue: 15800, expenses: 2800 },
    { month: 'Mar', revenue: 18200, expenses: 3100 },
    { month: 'Apr', revenue: 22100, expenses: 3500 },
    { month: 'May', revenue: 19800, expenses: 2900 },
    { month: 'Jun', revenue: 25400, expenses: 3800 },
    { month: 'Jul', revenue: 28900, expenses: 4200 }
  ];

  const expenseBreakdown = [
    { name: 'Office Rent', value: 4500, color: '#8884d8' },
    { name: 'Software Licenses', value: 2400, color: '#82ca9d' },
    { name: 'Marketing', value: 1800, color: '#ffc658' },
    { name: 'Utilities', value: 1200, color: '#ff7300' },
    { name: 'Travel', value: 800, color: '#00ff88' },
    { name: 'Equipment', value: 1700, color: '#ff0066' }
  ];

  const expenses = [
    { id: 1, category: 'Office Rent', amount: 2500, date: '2024-01-01', description: 'Monthly office rent' },
    { id: 2, category: 'Software Licenses', amount: 480, date: '2024-01-05', description: 'Adobe Creative Suite' },
    { id: 3, category: 'Marketing', amount: 800, date: '2024-01-10', description: 'Google Ads campaign' },
    { id: 4, category: 'Utilities', amount: 320, date: '2024-01-15', description: 'Internet and electricity' }
  ];

  const gstReporting = [
    { period: 'Q4 2023', collected: 4230, paid: 4230, status: 'Filed', dueDate: '2024-01-28' },
    { period: 'Q3 2023', collected: 3850, paid: 3850, status: 'Filed', dueDate: '2023-10-28' },
    { period: 'Q2 2023', collected: 4100, paid: 4100, status: 'Filed', dueDate: '2023-07-28' }
  ];

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Expense Added",
      description: `${expenseForm.category} expense of $${expenseForm.amount} has been recorded.`,
    });
    setExpenseForm({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Finance Management</h2>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${financialSummary.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GST Collected</p>
                <p className="text-2xl font-bold text-gray-900">${financialSummary.gstCollected.toLocaleString()}</p>
                <p className="text-sm text-purple-600">+15% from last month</p>
              </div>
              <Receipt className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">${financialSummary.totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-red-600">+3% from last month</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-gray-900">${financialSummary.profitAfterExpenses.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Month Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Month</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="expenses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="gst">GST Reporting</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Expense Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Expense</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={expenseForm.category} onValueChange={(value) => setExpenseForm({...expenseForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office-rent">Office Rent</SelectItem>
                        <SelectItem value="software">Software Licenses</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={expenseForm.description}
                      onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                      placeholder="Enter expense description..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Add Expense
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Expenses List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="font-medium">{expense.category}</TableCell>
                          <TableCell>${expense.amount}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gst" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GST Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>GST Collected</TableHead>
                    <TableHead>GST Paid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gstReporting.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.period}</TableCell>
                      <TableCell>${report.collected.toLocaleString()}</TableCell>
                      <TableCell>${report.paid.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.dueDate}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <FileText className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Expense Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancePanel;
