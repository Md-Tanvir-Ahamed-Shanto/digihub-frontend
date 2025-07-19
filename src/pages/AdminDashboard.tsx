import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FolderOpen, 
  Settings, 
  DollarSign,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Download,
  Eye,
  UserCheck,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Send,
  Globe,
  Mail,
  Cog
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import ViewLeadModal from '@/components/admin/ViewLeadModal';
import AddLeadModal from '@/components/admin/AddLeadModal';
import AssignLeadModal from '@/components/admin/AssignLeadModal';
import CreateClientOfferModal from '@/components/admin/CreateClientOfferModal';
import ViewProjectModal from '@/components/admin/ViewProjectModal';
import NewProjectModal from '@/components/admin/NewProjectModal';
import FinancePanel from '@/components/admin/FinancePanel';
import InvoicePanel from '@/components/admin/InvoicePanel';
import MilestonePanel from '@/components/admin/MilestonePanel';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ViewPartnerModal from '@/components/admin/ViewPartnerModal';
import AddPartnerModal from '@/components/admin/AddPartnerModal';
import WebsiteContentManager from '@/components/admin/website/WebsiteContentManager';
import SubmissionsPanel from '@/components/admin/SubmissionsPanel';
import PagesManager from '@/components/admin/PagesManager';
import AdminSettings from '@/components/admin/AdminSettings';
import axiosInstance from '@/api/axios';
import { format } from "date-fns";
import GenerateInvoice from './GenerateInvoice';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewLeadOpen, setViewLeadOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [assignLeadOpen, setAssignLeadOpen] = useState(false);
  const [createClientOfferOpen, setCreateClientOfferOpen] = useState(false);
  const [viewProjectOpen, setViewProjectOpen] = useState(false);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [viewPartnerOpen, setViewPartnerOpen] = useState(false);
  const [addPartnerOpen, setAddPartnerOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partners, setPartners] = useState([]);
  const [isLoadingPartners, setIsLoadingPartners] = useState(false);
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [projects, setProjects] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  const fetchLeads = async () => {
    try {
      const response = await axiosInstance.get(`/lead`);
      setLeads(response.data.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };


  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/project');
      setProjects(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive"
      });
    }
  };
console.log("all projects", projects)
  const fetchPartners = async () => {
    try {
      setIsLoadingPartners(true);
      const response = await axiosInstance.get('/partner');
      setPartners(response.data);
      setIsLoadingPartners(false);
      console.log("partner", response.data)
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partners. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingPartners(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchPartners();
    fetchProjects();
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'partners', label: 'Partners', icon: Building2 },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'generate-invoice', label: 'Generate Invoices', icon: FileText },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'websites', label: 'Websites', icon: Globe },
    { id: 'submissions', label: 'Submissions', icon: Mail },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Cog }
  ];

  const kpiData = [
    { title: 'Total Projects', value: '24', change: '+12%', icon: FolderOpen, color: 'text-blue-600' },
    { title: 'Total Revenue', value: '$48,500', change: '+8%', icon: DollarSign, color: 'text-green-600' },
    { title: 'GST Collected', value: '$4,230', change: '+15%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Profit After Expenses', value: '$12,340', change: '+5%', icon: TrendingUp, color: 'text-emerald-600' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 22100 },
    { month: 'May', revenue: 19800 },
    { month: 'Jun', revenue: 25400 },
    { month: 'Jul', revenue: 28900 }
  ];

  const recentActivity = [
    { type: 'Project Update', description: 'Health Coach CRM milestone completed', time: '2 hours ago', status: 'success' },
    { type: 'Payment Received', description: '$1,100 from Sarah Johnson', time: '4 hours ago', status: 'success' },
    { type: 'New Lead', description: 'E-commerce site project submitted', time: '6 hours ago', status: 'pending' },
    { type: 'Partner Assignment', description: 'TechPro assigned to CRM project', time: '1 day ago', status: 'info' }
  ];



  const supportTickets = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      projectName: 'E-commerce Platform',
      partner: 'TechPro Solutions',
      issueType: 'Bug Report',
      priority: 'High',
      status: 'Open',
      dateSubmitted: '2024-01-15',
      description: 'Payment gateway integration is not working properly. Users are unable to complete purchases.',
      lastUpdate: '2024-01-15'
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      projectName: 'Mobile Fitness App',
      partner: 'AppDev Team',
      issueType: 'Feature Request',
      priority: 'Medium',
      status: 'Forwarded',
      dateSubmitted: '2024-01-14',
      description: 'Client wants to add social media sharing functionality to the app.',
      lastUpdate: '2024-01-14'
    },
    {
      id: 3,
      clientName: 'Lisa Anderson',
      projectName: 'Corporate Website',
      partner: 'WebCraft Studio',
      issueType: 'Technical Issue',
      priority: 'Low',
      status: 'Resolved',
      dateSubmitted: '2024-01-13',
      description: 'Website loading speed is slower than expected on mobile devices.',
      lastUpdate: '2024-01-13'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
        case 'ACTIVE': 
        return <Badge variant="default" className="bg-green-600 text-white">{status}</Badge>;
      case 'ASSIGNED_TO_PARTNER':
        return <Badge variant="outline" className="border-purple-200 text-purple-800">{status}</Badge>;
      case 'OFFER_SENT_TO_CLIENT':
        return <Badge variant="outline" className="border-blue-200 text-blue-800">{status}</Badge>;
      case 'ACCEPTED_AND_CONVERTED':
        return <Badge variant="default" className="bg-emerald-600 text-white">{status}</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-blue-600 text-white">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setViewLeadOpen(true);
  };

  const handleAssignLead = (lead: any) => {
    setSelectedLead(lead);
    setAssignLeadOpen(true);
  };

  const handleCreateClientOffer = (lead: any) => {
    setSelectedLead(lead);
    setCreateClientOfferOpen(true);
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setViewProjectOpen(true);
  };

  const handleViewPartner = (partner: any) => {
    setSelectedPartner(partner);
    setViewPartnerOpen(true);
  };

  const handleViewTicket = (ticket: any) => {
    toast({
      title: "Viewing Ticket",
      description: `Opening detailed view for ticket #${ticket.id} from ${ticket.clientName}.`,
    });
  };

  const handleForwardToPartner = (ticket: any) => {
    toast({
      title: "Issue Forwarded",
      description: `Support ticket #${ticket.id} has been forwarded to ${ticket.partner}.`,
    });
  };

  const handleViewPage = (page: any) => {
    toast({
      title: "Opening Page",
      description: `Opening page "${page.title}" in preview mode.`,
    });
  };

  const getFeedbackStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge variant="destructive">{status}</Badge>;
      case 'Forwarded':
        return <Badge variant="outline" className="border-blue-200 text-blue-800">{status}</Badge>;
      case 'Resolved':
        return <Badge variant="default" className="bg-green-600 text-white">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">{priority}</Badge>;
      case 'Medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">{priority}</Badge>;
      case 'Low':
        return <Badge variant="outline" className="border-green-200 text-green-800">{priority}</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <Button className="w-fit">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-sm text-green-600">{kpi.change}</p>
                </div>
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Month</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
        <Button onClick={() => setAddLeadOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead className="hidden md:table-cell">Project Brief</TableHead>
                  <TableHead className="hidden sm:table-cell">Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Partner Offer</TableHead>
                  <TableHead className="hidden lg:table-cell">Timeline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">{lead.description}</TableCell>
                    <TableCell className="hidden sm:table-cell">{ format(new Date(lead.createdAt), "dd MMM yyyy")}</TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {lead.partnerOffer ? (
                        <span className="text-green-600 font-medium">{lead.partnerOffer}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {lead.partnerTimeline ? (
                        <span className="text-blue-600">{lead.partnerTimeline}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {
                          lead.status !== 'ACCEPTED_AND_CONVERTED' && (
                            <Button size="sm" variant="outline" onClick={() => handleViewLead(lead)}>
                          <Eye className="w-3 h-3" />
                        </Button>
                          )
                        }
                        {lead.status === 'PENDING' && (
                          <Button size="sm" variant="outline" onClick={() => handleAssignLead(lead)}>
                            <UserCheck className="w-3 h-3" />
                          </Button>
                        )}
                        {lead.partnerProposedCost && lead.status === 'PARTNER_OFFER_PROPOSED' && (
                          <Button size="sm" variant="outline" onClick={() => handleCreateClientOffer(lead)}>
                            <Send className="w-3 h-3" />
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
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <Button onClick={() => setNewProjectOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Partner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{project?.client?.name}</TableCell>
                    <TableCell className="hidden lg:table-cell">{project?.partner?.name}</TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleViewProject(project)}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPartners = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Partners</h2>
        <Button onClick={() => setAddPartnerOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Skills</TableHead>
                  <TableHead className="hidden lg:table-cell">Industry Experience</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingPartners ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading partners...
                    </TableCell>
                  </TableRow>
                ) : partners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No partners found
                    </TableCell>
                  </TableRow>
                ) : (
                  partners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell>{partner.email}</TableCell>
                      <TableCell>
                        <Badge variant={partner.isActive ? 'default' : 'secondary'}>
                          {partner.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {partner.skillSet?.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}                          
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {partner.industryExp?.map((exp, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {exp}
                            </Badge>
                          ))}                          
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => handleViewPartner(partner)}>
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Support Feedback</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-red-200 text-red-800">
            {supportTickets.filter(t => t.status === 'Open').length} Open
          </Badge>
          <Badge variant="outline" className="border-blue-200 text-blue-800">
            {supportTickets.filter(t => t.status === 'Forwarded').length} Forwarded
          </Badge>
          <Badge variant="outline" className="border-green-200 text-green-800">
            {supportTickets.filter(t => t.status === 'Resolved').length} Resolved
          </Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Project</TableHead>
                  <TableHead className="hidden lg:table-cell">Partner</TableHead>
                  <TableHead>Issue Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supportTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.clientName}</TableCell>
                    <TableCell className="hidden md:table-cell">{ticket.projectName}</TableCell>
                    <TableCell className="hidden lg:table-cell">{ticket.partner}</TableCell>
                    <TableCell>{ticket.issueType}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {getPriorityBadge(ticket.priority)}
                    </TableCell>
                    <TableCell>
                      {getFeedbackStatusBadge(ticket.status)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{ticket.dateSubmitted}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewTicket(ticket)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        {ticket.status === 'Open' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleForwardToPartner(ticket)}
                          >
                            <Send className="w-3 h-3" />
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
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'leads':
        return renderLeads();
      case 'projects':
        return renderProjects();
      case 'milestones':
        return <MilestonePanel />;
      case 'partners':
        return renderPartners();
      case 'finance':
        return <FinancePanel />;
      case 'invoices':
        return <InvoicePanel />;
      case 'generate-invoice':
        return <GenerateInvoice />;
      case 'websites':
        return <WebsiteContentManager />;
      case 'submissions':
        return <SubmissionsPanel />;
      case 'settings':
        return <AdminSettings />;
      case 'feedback':
        return renderFeedback();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed scrolling issue */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-gray-900">DIGIHUB AUST</h2>
                <p className="text-xs lg:text-sm text-gray-600">Admin Portal</p>
              </div>
            </div>
            <button 
              className="lg:hidden p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Made navigation scrollable */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50 text-sm lg:text-base mt-4"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden p-2 rounded-lg bg-white border border-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">DIGIHUB AUST Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-semibold">A</span>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>

      {/* Modals */}
      <ViewLeadModal 
        open={viewLeadOpen}
        onOpenChange={setViewLeadOpen}
        lead={selectedLead}
      />
      <AddLeadModal 
        open={addLeadOpen}
        onOpenChange={setAddLeadOpen}
      />
      <AssignLeadModal 
        open={assignLeadOpen}
        onOpenChange={setAssignLeadOpen}
        lead={selectedLead}
        fetchLeads={fetchLeads}
      />
      <CreateClientOfferModal 
        open={createClientOfferOpen}
        onOpenChange={setCreateClientOfferOpen}
        lead={selectedLead}
        onOfferCreated={fetchLeads}
      />
      <ViewProjectModal 
        open={viewProjectOpen}
        onOpenChange={setViewProjectOpen}
        project={selectedProject}
        fetchProject={fetchProjects}
      />
      <NewProjectModal 
        open={newProjectOpen}
        onOpenChange={setNewProjectOpen}
      />
      <ViewPartnerModal 
        open={viewPartnerOpen}
        onOpenChange={setViewPartnerOpen}
        partner={selectedPartner}
        fetchPartners={fetchPartners}
      />
      <AddPartnerModal 
        open={addPartnerOpen}
        onOpenChange={setAddPartnerOpen}
        onPartnerAdded={fetchPartners}
      />
    </div>
  );
};

export default AdminDashboard;
