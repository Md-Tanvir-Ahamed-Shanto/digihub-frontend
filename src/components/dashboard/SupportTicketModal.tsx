
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/api/axios';

interface SupportResponse {
  userType: string;
  id: number;
  message: string;
  createdAt: string;
  userName: string;
}

interface SupportTicket {
  id: number;
  subject: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
  projectId: number;
  projectName: string;
  responses: SupportResponse[];
}

interface SupportTicketModalProps {
  open: boolean;
  onClose: () => void;
  ticket: SupportTicket | null;
  onReply: (ticketId: number, message: string) => Promise<void>;
}

const SupportTicketModal = ({ open, onClose, ticket, onReply }: SupportTicketModalProps) => {
  const [reply, setReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  if (!ticket) return null;

  const handleReply = async () => {
    if (!reply.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a reply message',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onReply(ticket.id, reply);
      setReply('');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to send reply. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = async () => {
    try {
      if(user.role === 'partner'){
       const res= await axiosInstance.put(`/support/partner/issues/${ticket.id}/close`);
       if(res.status === 200){
        onClose();
      }
      }else if(user.role === 'admin'){
        const res= await axiosInstance.put(`/support/admin/issues/${ticket.id}/close`);
        if(res.status === 200){
        onClose();
      }
      }
      
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast({
        title: 'Error',
        description: 'Failed to close ticket. Please try again.',
        variant: 'destructive'
      });
    } finally {
      onClose();
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'HIGH': 'bg-red-100 text-red-800',
      'MEDIUM': 'bg-yellow-100 text-yellow-800',
      'LOW': 'bg-gray-100 text-gray-800'
    };
    
    const className = priorityConfig[priority as keyof typeof priorityConfig] || 'bg-gray-100 text-gray-800';
    return <Badge variant="secondary" className={className}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'OPEN': { className: 'bg-green-100 text-green-800' },
      'IN_PROGRESS': { className: 'bg-blue-100 text-blue-800' },
      'CLOSED': { className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { className: 'bg-gray-100 text-gray-800' };
    return <Badge variant="secondary" className={config.className}>{status}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
                    <p className="font-semibold">
                      {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Project</p>
                    <p className="font-semibold">{ticket.projectName}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Description:</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{ticket.description}</p>
                </div>

                {ticket.responses.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Responses</h4>
                    {ticket.responses.map((response) => (
                      <div key={response.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            {/* <p className="font-medium">{user.role == response.userType}</p> */}
                            <p className="text-sm text-gray-600">
                              {format(new Date(response.createdAt), 'MMM dd, yyyy HH:mm')}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {user.role.toUpperCase() == response.userType.toUpperCase() ? user.name : response.userType}
                          </Badge>
                        </div>
                        <p className="text-gray-900 whitespace-pre-wrap">{response.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {ticket.status !== 'CLOSED' && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Add Reply</h4>
                  <Textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={3}
                    disabled={isSubmitting}
                  />
                    
                  </div>
                  <div className='flex mt-5 justify-between'>
                  <Button 
                    onClick={handleReply}
                    className="bg-brand-primary hover:bg-brand-primary/90"
                    disabled={!reply.trim() || isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reply'}
                  </Button>
                  <Button 
                    onClick={handleClose}
                    className="bg-red-400 hover:bg-red-500"
                    disabled={user.role === 'client'}
                  >
                    Close
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
