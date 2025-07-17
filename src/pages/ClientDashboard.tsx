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
  User,
  FolderOpen,
  FileText,
  DollarSign,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Calendar,
  Clock,
  FileDown,
  Plus,
  Wrench,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import NewProjectModal from "@/components/dashboard/NewProjectModal";
import ProjectDetailsModal from "@/components/dashboard/ProjectDetailsModal";
import PaymentGatewayModal from "@/components/dashboard/PaymentGatewayModal";
import ManageSubscriptionModal from "@/components/dashboard/ManageSubscriptionModal";
import RaiseIssueModal from "@/components/dashboard/RaiseIssueModal";
import SupportTicketModal from "@/components/dashboard/SupportTicketModal";
import ClientSettings from "@/components/dashboard/ClientSettings";
import axiosInstance from "@/api/axios";
import { format } from "date-fns";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal states
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [paymentGatewayOpen, setPaymentGatewayOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    description: "",
  });
  const [manageSubscriptionOpen, setManageSubscriptionOpen] = useState(false);
  const [raiseIssueOpen, setRaiseIssueOpen] = useState(false);
  const [supportTicketOpen, setSupportTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [offer, setOffer] = useState([]);
  const [projects, setProjects] = useState([]);
  // const [milestones, setMilestones] = useState([]);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/client-login");
  };

  const fetchOffer = async () => {
    try {
      const response = await axiosInstance.get(`/client/my-leads`);
      setOffer(response?.data?.data);
  
    } catch (error) {
      console.error("Error fetching offer:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(`/project/client`,{
        params: {
          clientId: user?.id
        }
      });
      setProjects(response?.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  // const fetchMilestones = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/milestone/projects/${user?.id}`);
  //     setMilestones(response?.data?.data);
  //   } catch (error) {
  //     console.error("Error fetching milestones:", error);
  //   }
  // };

  const offers = offer?.filter(
    (item) => item.status === "OFFER_SENT_TO_CLIENT"
  );
  const pendingProjects = offer?.filter(
    (item) => item.status === "PENDING"
  );
console.log("project", projects)
  useEffect(() => {
    fetchProjects();
    fetchOffer();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      fetchMilestones();
    } else {
      setIsLoadingMilestones(false);
    }
  }, [projects]);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: FolderOpen },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "offers", label: "Offers", icon: DollarSign },
    { id: "milestones", label: "Milestones", icon: CheckCircle },
    { id: "invoices", label: "Invoices", icon: FileDown },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "support", label: "Support", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];
const activeProject = projects?.filter((item) => item.status === "ACTIVE");
const pendingOffer = projects?.filter((item) => item.status === "OFFER_SENT_TO_CLIENT");  
const paymentDue = activeProject?.filter((item) => item.paymentStatus === "PAYMENT_DUE");
const completedProject = activeProject?.filter((item) => item.status === "COMPLETED");
  // Mock data
  const dashboardStats = [
    {
      title: "Active Projects",
      value: activeProject?.length || 0,
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Pending Offers",
      value: pendingOffer?.length || 0,
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    {
      title: "Payments Due",
      value: paymentDue?.length || 0,
      icon: DollarSign,
      color: "text-red-600",
    },
    {
      title: "Completed Projects",
      value: completedProject?.length || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];


  const [milestones, setMilestones] = useState([]);
  const [isLoadingMilestones, setIsLoadingMilestones] = useState(true);

  const fetchMilestones = async () => {
    try {
      setIsLoadingMilestones(true);
      const milestonesData = [];

      for (const project of projects) {
        const response = await axiosInstance.get(
          `/milestone/client/projects/${project.id}/milestones`
        );
        if (response.data && Array.isArray(response.data)) {
          const projectMilestones = response.data.map(milestone => ({
            ...milestone,
            projectName: project.name || project.title
          }));
          milestonesData.push(...projectMilestones);
        }
      }

      setMilestones(milestonesData);
    } catch (error) {
      toast({
        title: "Error fetching milestones",
        description: error.response?.data?.message || "Failed to load milestones",
      });
    } finally {
      setIsLoadingMilestones(false);
    }
  };

  const invoices = [
    {
      id: 1,
      number: "INV-0021",
      project: "Healthcare CRM",
      amount: "$1,320",
      date: "2025-07-06",
    },
    {
      id: 2,
      number: "INV-0020",
      project: "E-commerce Store",
      amount: "$850",
      date: "2025-06-28",
    },
    {
      id: 3,
      number: "INV-0019",
      project: "Mobile App",
      amount: "$1,200",
      date: "2025-06-15",
    },
  ];

  const supportTickets = [
    {
      id: 1,
      subject: "Delay in second milestone delivery",
      status: "Responded",
      date: "2025-07-05",
      priority: "High",
    },
    {
      id: 2,
      subject: "Login issue on dashboard",
      status: "Closed",
      date: "2025-07-03",
      priority: "Medium",
    },
    {
      id: 3,
      subject: "Feature request for analytics",
      status: "Open",
      date: "2025-07-06",
      priority: "Low",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "PENDING": {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-800",
      },
      "OFFER_SENT_TO_CLIENT": {
        variant: "secondary" as const,
        className: "bg-blue-100 text-blue-800",
      },
      "OFFER_ACCEPTED_BY_CLIENT": {
        variant: "secondary" as const,
        className: "bg-green-100 text-green-800",
      },
      "ACTIVE": {
        variant: "secondary" as const,
        className: "bg-green-100 text-green-800",
      },
      "COMPLETED": {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-800",
      },
      "PAID": {
        variant: "secondary" as const,
        className: "bg-green-100 text-green-800",
      },
      "UNPAID": {
        variant: "secondary" as const,
        className: "bg-red-100 text-red-800",
      },
      "PENDING_PAYMENT": {
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800",
      },
      "RESPONDED": {
        variant: "secondary" as const,
        className: "bg-blue-100 text-blue-800",
      },
      "OPEN": {
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800",
      },
      "CLOSED": {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-800",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      variant: "secondary" as const,
      className: "",
    };
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const handleAcceptOffer = async (offerId: number) => {
    try {
      const response = await axiosInstance.post(`/lead/${offerId}/accept-offer`);
      if(response.status === 200) {
        toast({
          title: "Offer Accepted",
          description:
            "The project offer has been accepted and work will begin soon.",
        });
        fetchOffer();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while accepting the offer.",
      });
    }
  };

  const handleRejectOffer = async (offerId: number) => {
    try {
      const response = await axiosInstance.post(`/lead/${offerId}/reject-offer`);
      if(response.status === 200) {
        toast({
          title: "Offer Rejected",
          description:
            "The project offer has been rejected.",
        });
        fetchOffer();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while rejecting the offer.",
      });
    }
  };

  const handlePayMilestone = (milestoneId: number) => {
    const milestone = milestones.find((m) => m.id === milestoneId);
    if (milestone) {
      setPaymentDetails({
        amount: milestone.amount,
        description: `${milestone.project} - ${milestone.title}`,
      });
      setPaymentGatewayOpen(true);
    }
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setProjectDetailsOpen(true);
  };

  const handleDownloadInvoice = (invoiceId: number) => {
    toast({
      title: "Download Started",
      description: "Your invoice is being downloaded...",
    });
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setSupportTicketOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h2>
              <Button
                className="bg-brand-primary hover:bg-brand-primary/90"
                onClick={() => setNewProjectOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="border-brand-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-brand-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-brand-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            {/* <Card className="border-brand-gray-200">
              <CardHeader>
                <CardTitle className="text-brand-primary">
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest updates on your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        New offer received
                      </p>
                      <p className="text-sm text-gray-600">
                        Real Estate Portal - $1,320 for 12 days
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Milestone completed
                      </p>
                      <p className="text-sm text-gray-600">
                        E-commerce Store - Payment Gateway Setup
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
            {projects?.length === 0 ? (
              <div className="flex justify-center items-center">
                <p className="text-gray-600 text-center text-lg">
                  No projects found!
                </p>
              </div>
            ) : (
              <Card className="border-brand-gray-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-brand-gray-200">
                        <TableHead>Project Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects?.map((project) => (
                        <TableRow
                          key={project.id}
                          className="border-brand-gray-200"
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">
                                {project.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {project.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(project.status)}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {format(project.updatedAt, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                              onClick={() => handleViewProject(project)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                        {pendingProjects?.map((project) => (
                        <TableRow
                          key={project.id}
                          className="border-brand-gray-200"
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">
                                {project.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {project.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(project.status)}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {format(project.updatedAt, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                              onClick={() => handleViewProject(project)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "offers":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Pending Offers</h2>
            {offers?.length === 0 && (
              <div className="flex justify-center items-center">
                <p className="text-gray-600 text-center text-lg">
                  No offers found!
                </p>
              </div>
            )}
            <div className="grid gap-4">
              {offers.map((offer) => (
                <Card key={offer.id} className="border-brand-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {offer.projectTitle}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {offer.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium">
                              Total: {offer.offerPrice}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>Timeline: {offer.timeline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleRejectOffer(offer.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleAcceptOffer(offer.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "milestones":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Project Milestones
            </h2>
            {isLoadingMilestones ? (
              <div className="flex items-center justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : milestones.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-gray-600">No milestones available.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {milestones.map((milestone) => (
                  <Card key={milestone.id} className="border-brand-gray-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {milestone.title}
                            </h3>
                            {getStatusBadge(milestone.status)}
                          </div>
                          <p className="text-gray-600 mb-2">
                            {milestone.projectName || milestone.project}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-medium">
                                ${milestone.cost || milestone.amount}
                              </span>
                            </div>
                            {milestone.timeline && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span>{milestone.timeline} days</span>
                              </div>
                            )}
                            {milestone.dueDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span>Due: {milestone.dueDate}</span>
                              </div>
                            )}
                          </div>
                          {milestone.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {milestone.description}
                            </p>
                          )}
                        </div>
                        {milestone.status === "Unpaid" && (
                          <Button
                            onClick={() => handlePayMilestone(milestone.id)}
                            className="bg-brand-primary hover:bg-brand-primary/90"
                          >
                            <CreditCard className="w-4 h-4 mr-1" />
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case "invoices":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
            <Card className="border-brand-gray-200">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-brand-gray-200">
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow
                        key={invoice.id}
                        className="border-brand-gray-200"
                      >
                        <TableCell className="font-medium">
                          {invoice.number}
                        </TableCell>
                        <TableCell>{invoice.project}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {invoice.amount}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {invoice.date}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "maintenance":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Maintenance Subscription
            </h2>
            <Card className="border-brand-gray-200">
              <CardHeader>
                <CardTitle className="text-brand-primary">
                  Monthly Maintenance Plan
                </CardTitle>
                <CardDescription>
                  $75/month – includes 24/7 uptime monitoring, backups, and
                  minor updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-medium text-gray-900">Current Status</p>
                    <p className="text-sm text-gray-600">
                      Active until August 15, 2025
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Auto-renewal</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setManageSubscriptionOpen(true)}
                    >
                      Manage
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Payment Method</span>
                    <span className="text-sm text-gray-600">**** 4242</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card className="border-brand-gray-200">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-brand-gray-200">
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-brand-gray-200">
                      <TableCell>2025-07-01</TableCell>
                      <TableCell>$75.00</TableCell>
                      <TableCell>{getStatusBadge("Paid")}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Support</h2>
              <Button
                className="bg-brand-primary hover:bg-brand-primary/90"
                onClick={() => setRaiseIssueOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Raise Issue
              </Button>
            </div>

            <Card className="border-brand-gray-200">
              <CardContent className="p-0">
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
                    {supportTickets.map((ticket) => (
                      <TableRow
                        key={ticket.id}
                        className="border-brand-gray-200"
                      >
                        <TableCell>
                          <p className="font-medium text-gray-900">
                            {ticket.subject}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              ticket.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell className="text-gray-600">
                          {ticket.date}
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
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return <ClientSettings />;

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {activeTab}
            </h2>
            <Card className="border-brand-gray-200">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>
                  {activeTab} features will be added here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This section is being prepared for new content.
                </p>
              </CardContent>
            </Card>
          </div>
        );
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

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-brand-gray-200 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 lg:p-6 border-b border-brand-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6 lg:w-8 lg:h-8 text-brand-primary" />
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-brand-gray-900">
                  Client Portal
                </h2>
                <p className="text-xs lg:text-sm text-brand-gray-600">
                  Welcome Back
                </p>
              </div>
            </div>
            <button
              className="lg:hidden p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-brand-gray-600" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                activeTab === item.id
                  ? "bg-brand-primary text-white"
                  : "text-brand-gray-700 hover:bg-brand-gray-100"
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
              className="lg:hidden p-2 rounded-lg bg-white border border-brand-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-brand-gray-600" />
            </button>
            <h1 className="text-2xl lg:text-3xl font-bold text-brand-gray-900">
              Client Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-brand-gray-600 cursor-pointer hover:text-brand-primary" />
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-semibold">
                C
              </span>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>

      {/* Modals */}
      <NewProjectModal
        isOpen={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
      />
      <ProjectDetailsModal
        isOpen={projectDetailsOpen}
        onClose={() => setProjectDetailsOpen(false)}
        project={selectedProject}
      />
      <PaymentGatewayModal
        isOpen={paymentGatewayOpen}
        onClose={() => setPaymentGatewayOpen(false)}
        amount={paymentDetails.amount}
        description={paymentDetails.description}
      />
      <ManageSubscriptionModal
        isOpen={manageSubscriptionOpen}
        onClose={() => setManageSubscriptionOpen(false)}
      />
      <RaiseIssueModal
        isOpen={raiseIssueOpen}
        onClose={() => setRaiseIssueOpen(false)}
      />
      <SupportTicketModal
        isOpen={supportTicketOpen}
        onClose={() => setSupportTicketOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default ClientDashboard;
