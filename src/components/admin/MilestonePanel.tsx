
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Eye,
  CheckSquare,
  XCircle,
  AlertCircle,
  Calculator,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApproveMilestoneModal from './ApproveMilestoneModal';
import ViewMilestoneModal from './ViewMilestoneModal';

const MilestonePanel = () => {
  const { toast } = useToast();
  const [approveMilestoneOpen, setApproveMilestoneOpen] = useState(false);
  const [viewMilestoneOpen, setViewMilestoneOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Group milestones by project
  const milestonesByProject = {
    'Health Coach CRM': [
      {
        id: 1,
        project: 'Health Coach CRM',
        client: 'Alex Thompson',
        partner: 'TechPro Solutions',
        title: 'Database Design & Setup',
        amount: 450,
        status: 'Pending Approval',
        dueDate: '2024-01-20',
        submittedDate: '2024-01-15',
        description: 'Complete database schema design and initial setup with user authentication, data models for client profiles, session tracking, and comprehensive reporting capabilities.',
        clientBudget: 5000
      }
    ],
    'E-commerce Platform': [
      {
        id: 2,
        project: 'E-commerce Platform',
        client: 'Sarah Johnson',
        partner: 'WebCraft Studio',
        title: 'UI/UX Design Phase',
        amount: 650,
        status: 'Approved',
        dueDate: '2024-01-25',
        submittedDate: '2024-01-12',
        description: 'Complete wireframes and visual designs for the entire e-commerce platform including product catalog, shopping cart, checkout process, and admin dashboard.',
        clientBudget: 8000
      }
    ],
    'Mobile Fitness App': [
      {
        id: 3,
        project: 'Mobile Fitness App',
        client: 'Mike Chen',
        partner: 'AppDev Team',
        title: 'Authentication System',
        amount: 300,
        status: 'Completed',
        dueDate: '2024-01-18',
        submittedDate: '2024-01-10',
        description: 'User registration, login, and authentication flow with social media integration, password recovery, and secure token management.',
        clientBudget: 4500
      }
    ],
    'Restaurant POS': [
      {
        id: 4,
        project: 'Restaurant POS',
        client: 'David Wilson',
        partner: 'SoftSolutions',
        title: 'Payment Integration',
        amount: 800,
        status: 'Rejected',
        dueDate: '2024-01-22',
        submittedDate: '2024-01-14',
        description: 'Integration with payment gateways and processing including credit card processing, digital wallets, and receipt generation.',
        clientBudget: 6500
      }
    ]
  };

  // Flatten milestones for summary stats
  const allMilestones = Object.values(milestonesByProject).flat();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'Approved':
        return <Badge variant="default" className="bg-green-600 text-white text-xs"><CheckCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'Completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs"><CheckSquare className="w-3 h-3 mr-1" />{status}</Badge>;
      case 'Rejected':
        return <Badge variant="destructive" className="text-xs"><XCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const handleApproveMilestone = (milestone: any) => {
    setSelectedMilestone(milestone);
    setApproveMilestoneOpen(true);
  };

  const handleViewMilestone = (milestone: any) => {
    setSelectedMilestone(milestone);
    setViewMilestoneOpen(true);
  };

  const handleReject = (milestoneId: number) => {
    toast({
      title: "Milestone Rejected",
      description: "The milestone has been rejected.",
    });
  };

  const summaryStats = {
    totalMilestones: allMilestones.length,
    pendingApproval: allMilestones.filter(m => m.status === 'Pending Approval').length,
    approved: allMilestones.filter(m => m.status === 'Approved').length,
    completed: allMilestones.filter(m => m.status === 'Completed').length,
    totalValue: allMilestones.reduce((sum, m) => sum + m.amount, 0)
  };

  const renderMilestoneTable = (milestones: any[], showActions = true) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Milestone</TableHead>
            <TableHead className="min-w-[120px]">Partner</TableHead>
            <TableHead className="min-w-[100px]">Partner Cost</TableHead>
            <TableHead className="min-w-[120px] hidden sm:table-cell">Client Budget</TableHead>
            <TableHead className="min-w-[120px]">Status</TableHead>
            <TableHead className="min-w-[100px] hidden md:table-cell">Due Date</TableHead>
            {showActions && <TableHead className="min-w-[200px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {milestones.map((milestone) => (
            <TableRow key={milestone.id}>
              <TableCell className="font-medium">{milestone.title}</TableCell>
              <TableCell>{milestone.partner}</TableCell>
              <TableCell className="font-medium">${milestone.amount}</TableCell>
              <TableCell className="text-blue-600 font-medium hidden sm:table-cell">
                ${milestone.clientBudget?.toLocaleString()}
              </TableCell>
              <TableCell>{getStatusBadge(milestone.status)}</TableCell>
              <TableCell className="hidden md:table-cell">{milestone.dueDate}</TableCell>
              {showActions && (
                <TableCell>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewMilestone(milestone)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    {milestone.status === 'Pending Approval' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveMilestone(milestone)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Calculator className="w-3 h-3 mr-1" />
                          Set Cost
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(milestone.id)}>
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Milestone Management</h2>
      </div>

      {/* Summary Cards - Reverted to single row with 5 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Milestones</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{summaryStats.totalMilestones}</p>
              </div>
              <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{summaryStats.pendingApproval}</p>
              </div>
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Approved</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{summaryStats.approved}</p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{summaryStats.completed}</p>
              </div>
              <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">${summaryStats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto">
          <TabsTrigger value="projects" className="text-xs sm:text-sm">By Project</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
          <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
          <TabsTrigger value="approved" className="text-xs sm:text-sm">Approved</TabsTrigger>
          <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          {Object.entries(milestonesByProject).map(([projectName, projectMilestones]) => (
            <Card key={projectName}>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    {projectName}
                  </div>
                </CardTitle>
                <div className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                  <div>Client: {projectMilestones[0]?.client}</div>
                  <div>Budget: ${projectMilestones[0]?.clientBudget?.toLocaleString()}</div>
                  <div>Milestones: {projectMilestones.length}</div>
                </div>
              </CardHeader>
              <CardContent>
                {renderMilestoneTable(projectMilestones)}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              {renderMilestoneTable(allMilestones)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                Pending Approval - Partner Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderMilestoneTable(allMilestones.filter(m => m.status === 'Pending Approval'))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Approved Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              {renderMilestoneTable(allMilestones.filter(m => m.status === 'Approved'), false)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              {renderMilestoneTable(allMilestones.filter(m => m.status === 'Completed'), false)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ApproveMilestoneModal 
        open={approveMilestoneOpen}
        onOpenChange={setApproveMilestoneOpen}
        milestone={selectedMilestone}
      />
      
      <ViewMilestoneModal 
        open={viewMilestoneOpen}
        onOpenChange={setViewMilestoneOpen}
        milestone={selectedMilestone}
      />
    </div>
  );
};

export default MilestonePanel;
