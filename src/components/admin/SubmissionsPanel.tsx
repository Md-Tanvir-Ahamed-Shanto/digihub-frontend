
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Eye, 
  Reply, 
  Search, 
  Filter,
  Calendar,
  User,
  MessageSquare,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubmissionsPanel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replySubject, setReplySubject] = useState('');

  const submissions = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      subject: 'Website Development Inquiry',
      message: 'I need a professional website for my restaurant business. Can you help me with this?',
      date: '2024-01-20',
      status: 'New',
      phone: '+1234567890'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      subject: 'E-commerce Platform',
      message: 'Looking for an e-commerce solution for my fashion brand. What packages do you offer?',
      date: '2024-01-18',
      status: 'Replied',
      phone: '+1987654321'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@tech.com',
      subject: 'Mobile App Development',
      message: 'I have an idea for a mobile app. Can we schedule a consultation?',
      date: '2024-01-15',
      status: 'New',
      phone: '+1122334455'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>;
      case 'Replied':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
      case 'Closed':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleReply = (submission: any) => {
    setSelectedSubmission(submission);
    setReplySubject(`Re: ${submission.subject}`);
    setReplyMessage('');
    setReplyModalOpen(true);
  };

  const sendReply = () => {
    if (!replyMessage.trim() || !replySubject.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reply Sent",
      description: `Your reply has been sent to ${selectedSubmission?.email}`,
    });
    
    setReplyModalOpen(false);
    setReplyMessage('');
    setReplySubject('');
    setSelectedSubmission(null);
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Form Submissions</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.status === 'New').length}
                </p>
              </div>
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Replied</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.status === 'Replied').length}
                </p>
              </div>
              <Reply className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">All Submissions</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search submissions..."
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
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="hidden sm:table-cell min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[150px]">Subject</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{submission.email}</TableCell>
                    <TableCell className="max-w-xs truncate">{submission.subject}</TableCell>
                    <TableCell className="hidden md:table-cell">{submission.date}</TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">View</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Submission Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <Label>Name</Label>
                                  <p className="font-medium">{submission.name}</p>
                                </div>
                                <div>
                                  <Label>Email</Label>
                                  <p className="font-medium">{submission.email}</p>
                                </div>
                                <div>
                                  <Label>Phone</Label>
                                  <p className="font-medium">{submission.phone}</p>
                                </div>
                                <div>
                                  <Label>Date</Label>
                                  <p className="font-medium">{submission.date}</p>
                                </div>
                                <div className="sm:col-span-2">
                                  <Label>Subject</Label>
                                  <p className="font-medium">{submission.subject}</p>
                                </div>
                                <div className="sm:col-span-2">
                                  <Label>Message</Label>
                                  <p className="text-gray-700 whitespace-pre-wrap">{submission.message}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          onClick={() => handleReply(submission)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Reply className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Reply</span>
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

      {/* Reply Modal */}
      <Dialog open={replyModalOpen} onOpenChange={setReplyModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Reply</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                value={selectedSubmission?.email || ''}
                disabled
                className="bg-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply message..."
                rows={6}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={sendReply} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
              <Button variant="outline" onClick={() => setReplyModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionsPanel;
