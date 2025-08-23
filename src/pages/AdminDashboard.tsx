import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Cog,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ViewLeadModal from "@/components/admin/ViewLeadModal";
import AddLeadModal from "@/components/admin/AddLeadModal";
import AssignLeadModal from "@/components/admin/AssignLeadModal";
import CreateClientOfferModal from "@/components/admin/CreateClientOfferModal";
import ViewProjectModal from "@/components/admin/ViewProjectModal";
import NewProjectModal from "@/components/admin/NewProjectModal";
import FinancePanel from "@/components/admin/FinancePanel";
import InvoicePanel from "@/components/admin/InvoicePanel";
import MilestonePanel from "@/components/admin/MilestonePanel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ViewPartnerModal from "@/components/admin/ViewPartnerModal";
import AddPartnerModal from "@/components/admin/AddPartnerModal";
import WebsiteContentManager from "@/components/admin/website/WebsiteContentManager";
import SubmissionsPanel from "@/components/admin/SubmissionsPanel";
import AdminSettings from "@/components/admin/AdminSettings";
import axiosInstance from "@/api/axios";
import { format } from "date-fns";
import GenerateInvoice from "./GenerateInvoice";
import SupportTicketModal from "@/components/dashboard/SupportTicketModal";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
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
  const [supportTicketOpen, setSupportTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const fetchLeads = async () => {
    try {
      const response = await axiosInstance.get(`/lead`);
      setLeads(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleTicketReply = async (ticketId, message) => {
    try {
      await axiosInstance.post(`/support/partner/issues/${ticketId}/reply`, {
        message,
      });
      toast({
        title: "Success",
        description: "Reply sent successfully",
      });
      fetchSupportTickets();
      setSupportTicketOpen(false);
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/project");
      setProjects(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    }
  };
  console.log("all projects", projects);
  const fetchPartners = async () => {
    try {
      setIsLoadingPartners(true);
      const response = await axiosInstance.get("/partner");
      setPartners(response.data);
      setIsLoadingPartners(false);
      console.log("partner", response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
      toast({
        title: "Error",
        description: "Failed to fetch partners. Please try again.",
        variant: "destructive",
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
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Leads", icon: Users },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "milestones", label: "Milestones", icon: CheckCircle },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "partners", label: "Partners", icon: Building2 },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "generate-invoice", label: "Generate Invoices", icon: FileText },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "websites", label: "Websites", icon: Globe },
    { id: "submissions", label: "Submissions", icon: Mail },
    { id: "settings", label: "Settings", icon: Cog },
  ];

  const totalProject = projects.reduce((acc, project) => {
    acc.total = (acc.total || 0) + 1;
    acc.offerPrice = (parseInt(acc.offerPrice) || 0) + parseInt(project.offerPrice);
    acc.partnerCost = (parseInt(acc.partnerCost) || 0) + parseInt(project.partnerCost);
    acc.adminMargin = (parseInt(acc.adminMargin) || 0) + parseInt(project.adminMargin);
    return acc;
  }, {});

  console.log("totalProject", totalProject);

const GST_RATE = import.meta.env.VITE_PUBLIC_GST_RATE;

  const kpiData = [
    {
      title: "Total Projects",
      value: totalProject.total || 0,
      change: "+12%",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: totalProject.adminMargin || 0,
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "GST Collected",
      value: ((parseInt(totalProject.partnerCost) + parseInt(totalProject.adminMargin))) * GST_RATE || 0,
      change: "+15%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    // {
    //   title: "Profit After Expenses",
    //   value: totalProject.profit || 0,
    //   change: "+5%",
    //   icon: TrendingUp,
    //   color: "text-emerald-600",
    // },
  ];

  const revenueData = projects.map((project) => ({
    month: project.createdAt.slice(0, 7),
    revenue: project.revenue,
  }));

  const recentActivity = projects.map((project) => ({
    type: "Project Update",
    description: project.title,
    time: project.createdAt,
    status: project.status,
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            {status}
          </Badge>
        );
      case "ACTIVE":
        return (
          <Badge variant="default" className="bg-green-600 text-white">
            {status}
          </Badge>
        );
      case "ASSIGNED_TO_PARTNER":
        return (
          <Badge
            variant="outline"
            className="border-purple-200 text-purple-800"
          >
            {status}
          </Badge>
        );
      case "OFFER_SENT_TO_CLIENT":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-800">
            {status}
          </Badge>
        );
      case "ACCEPTED_AND_CONVERTED":
        return (
          <Badge variant="default" className="bg-emerald-600 text-white">
            {status}
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge variant="outline" className="bg-blue-600 text-white">
            {status}
          </Badge>
        );
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

  const fetchSupportTickets = async () => {
    try {
      setIsLoadingTickets(true);
      const response = await axiosInstance.get(`/support/admin/issues`);
      setSupportTickets(response.data.data);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      toast({
        title: "Error",
        description: "Failed to fetch support tickets",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setSupportTicketOpen(true);
  };

  useEffect(() => {
    fetchSupportTickets();
  }, []);

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
                  <p className="text-sm font-medium text-gray-600">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
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
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
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
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === "success"
                      ? "bg-green-500"
                      : activity.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
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
                  <TableHead className="hidden md:table-cell">
                    Project Brief
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Date Submitted
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Partner Offer
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Timeline
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {lead.description}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {format(new Date(lead.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {lead.partnerOffer ? (
                        <span className="text-green-600 font-medium">
                          {lead.partnerOffer}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {lead.partnerTimeline ? (
                        <span className="text-blue-600">
                          {lead.partnerTimeline}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {lead.status !== "ACCEPTED_AND_CONVERTED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewLead(lead)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        )}
                        {lead.status === "PENDING" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAssignLead(lead)}
                          >
                            <UserCheck className="w-3 h-3" />
                          </Button>
                        )}
                        {lead.partnerProposedCost &&
                          lead.status === "PARTNER_OFFER_PROPOSED" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCreateClientOffer(lead)}
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
                  <TableHead className="hidden lg:table-cell">
                    Partner
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {project?.client?.name}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {project?.partner?.name}
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProject(project)}
                      >
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
                  <TableHead className="hidden lg:table-cell">
                    Industry Experience
                  </TableHead>
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
                      <TableCell className="font-medium">
                        {partner.name}
                      </TableCell>
                      <TableCell>{partner.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={partner.isActive ? "default" : "secondary"}
                        >
                          {partner.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {partner.skillSet?.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {partner.industryExp?.map((exp, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewPartner(partner)}
                        >
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Support</h2>
        {/* <Button
                className="bg-brand-primary hover:bg-brand-primary/90"
                onClick={() => setRaiseIssueOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Raise Issue
              </Button> */}
      </div>

      <Card className="border-brand-gray-200">
        <CardContent className="p-0">
          {isLoadingTickets ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
          ) : supportTickets?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No support tickets found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-brand-gray-200">
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supportTickets?.map((ticket) => (
                  <TableRow key={ticket.id} className="border-brand-gray-200">
                    <TableCell>
                      <p className="font-medium text-gray-900">
                        {ticket.subject}
                      </p>
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          ticket.priority === "HIGH"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell className="text-gray-600">
                      {format(new Date(ticket.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "leads":
        return renderLeads();
      case "projects":
        return renderProjects();
      case "milestones":
        return <MilestonePanel />;
      case "partners":
        return renderPartners();
      case "finance":
        return <FinancePanel />;
      case "invoices":
        return <InvoicePanel />;
      case "generate-invoice":
        return <GenerateInvoice />;
      case "websites":
        return <WebsiteContentManager />;
      case "submissions":
        return <SubmissionsPanel />;
      case "settings":
        return <AdminSettings />;
      case "feedback":
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
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                  DIGIHUB AUST
                </h2>
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
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              DIGIHUB AUST Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-semibold">
                A
              </span>
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
        fetchLeads={fetchLeads}
      />
      <AddLeadModal open={addLeadOpen} onOpenChange={setAddLeadOpen} />
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
      <NewProjectModal open={newProjectOpen} onOpenChange={setNewProjectOpen} />
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
      <SupportTicketModal
        open={supportTicketOpen}
        onClose={() => setSupportTicketOpen(false)}
        ticket={selectedTicket}
        fetchTickets={fetchSupportTickets}
        onReply={handleTicketReply}
      />
    </div>
  );
};

export default AdminDashboard;
