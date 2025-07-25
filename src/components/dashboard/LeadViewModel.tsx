import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface Lead {
  id: number;
  description: string;
  status: string;
  updatedAt: string;
  timeline: string;
  partnerProposedCost: string;
}

interface LeadViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const LeadViewModal = ({ isOpen, onClose, lead }: LeadViewModalProps) => {
  if (!lead) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ASSIGNED_TO_PARTNER':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{status}</Badge>;
      case 'PARTNER_OFFER_PROPOSED':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">{status}</Badge>;
      case 'Active':
        return <Badge variant="default" className="bg-green-600 text-white">{status}</Badge>;
      case 'Completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>
            Detailed information about the lead
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Lead Brief</h3>
                  {getStatusBadge(lead.status)}
                </div>
                <p className="text-gray-600">{lead.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Submission Date</p>
                    <p className="font-semibold">{format(lead.updatedAt, 'yyyy-MM-dd')}</p>
                  </div>
                 <div>
                   {
                     lead.status === 'PARTNER_OFFER_PROPOSED' ? (
                      <div>
                        <p className="text-sm text-gray-600">Your Proposed Cost</p>
                        <p className="font-semibold">{lead.partnerProposedCost || 'To be determined'}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">Admin Offer Cost</p>
                        <p className="font-semibold">{lead.partnerProposedCost || 'To be determined'}</p>
                      </div>
                    )
                   }

                 </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-semibold">{lead.timeline || 'To be determined'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">{lead.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadViewModal;
