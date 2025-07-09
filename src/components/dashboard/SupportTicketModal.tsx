
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SupportTicket {
  id: number;
  subject: string;
  priority: string;
  status: string;
  date: string;
}

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: SupportTicket | null;
}

const SupportTicketModal = ({ isOpen, onClose, ticket }: SupportTicketModalProps) => {
  const [reply, setReply] = useState('');
  const { toast } = useToast();

  if (!ticket) return null;

  const handleReply = () => {
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully."
    });
    setReply('');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Responded': { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800' },
      'Open': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Closed': { variant: 'secondary' as const, className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'secondary' as const, className: '' };
    return <Badge variant={config.variant} className={config.className}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-gray-100 text-gray-800'
    };
    
    const className = priorityConfig[priority as keyof typeof priorityConfig] || 'bg-gray-100 text-gray-800';
    return <Badge variant="secondary" className={className}>{priority}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Support Ticket Details</DialogTitle>
          <DialogDescription>
            View and respond to your support ticket
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                  <div className="flex gap-2">
                    {getPriorityBadge(ticket.priority)}
                    {getStatusBadge(ticket.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Created Date</p>
                    <p className="font-semibold">{ticket.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ticket ID</p>
                    <p className="font-semibold">#{ticket.id}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Original Message:</p>
                  <p className="text-gray-900">{ticket.subject}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {ticket.status !== 'Closed' && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Add Reply</h4>
                  <Textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={3}
                  />
                  <Button 
                    onClick={handleReply}
                    className="bg-brand-primary hover:bg-brand-primary/90"
                    disabled={!reply.trim()}
                  >
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportTicketModal;
