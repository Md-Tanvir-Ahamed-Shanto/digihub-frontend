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
  Building2,
  Code,
  DollarSign,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Eye,
  Send,
  Plus,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Wallet,
  FolderOpen,
  FileText,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ViewAssignedProjectsModal from "@/components/dashboard/ViewAssignedProjectsModal";
import ProjectViewModal from "@/components/dashboard/ProjectViewModal";
import SubmitOfferModal from "@/components/dashboard/SubmitOfferModal";
import AddMilestoneModal from "@/components/dashboard/AddMilestoneModal";
import WithdrawalRequestModal from "@/components/dashboard/WithdrawalRequestModal";
import DeveloperSettings from "@/components/dashboard/DeveloperSettings";
import axiosInstance from "@/api/axios";
import { format } from "date-fns";
import LeadViewModal from "@/components/dashboard/LeadViewModel";

const PartnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewAssignedProjectsOpen, setViewAssignedProjectsOpen] =
    useState(false);
  const [projectViewOpen, setProjectViewOpen] = useState(false);
  const [submitOfferOpen, setSubmitOfferOpen] = useState(false);
  const [addMilestoneOpen, setAddMilestoneOpen] = useState(false);
  const [withdrawalRequestOpen, setWithdrawalRequestOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadViewOpen, setLeadViewOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [isLoadingMilestones, setIsLoadingMilestones] = useState(false);
  const [projects, setProjects] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  console.log("withdrawals", withdrawals);


  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/partner-login");
  };

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setLeadViewOpen(true);
  };

  const fetchLeads = async () => {
    try {
      const response = await axiosInstance.get("/partner/leads");
      setLeads(response.data.data);
      console.log("leads", response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };
  const fetchWithdrawals = async () => {
    try {
      const response = await axiosInstance.get("/withdrawal/partner");
      setWithdrawals(response.data);
      console.log("withdrawals", response.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchWithdrawals();
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: FolderOpen },
    { id: "leads", label: "Leads", icon: MessageSquare },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "milestones", label: "Milestones", icon: CheckCircle },
    { id: "earnings", label: "Earnings", icon: TrendingUp },
    { id: "withdraw", label: "Withdraw", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Dummy data
  const statsData = [
    {
      title: "Total Projects",
      value: "8",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Earnings This Month",
      value: "$2,400",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Pending Withdrawals",
      value: "$600",
      icon: Wallet,
      color: "text-purple-600",
    },
  ];
  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(`/project/partner`, {
        // params: {
        //   clientId: user?.id
        // }
      });
      setProjects(response?.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const earnings = [
    {
      project: "Corporate Website",
      milestone: "CMS Integration",
      amount: "$250",
      datePaid: "2024-06-30",
      status: "Paid",
    },
    {
      project: "E-commerce App",
      milestone: "User Authentication",
      amount: "$350",
      datePaid: "2024-07-03",
      status: "Paid",
    },
    {
      project: "Real Estate CRM",
      milestone: "Database Schema",
      amount: "$300",
      datePaid: "2024-07-05",
      status: "Paid",
    },
    {
      project: "Real Estate CRM",
      milestone: "Dashboard UI",
      amount: "$400",
      datePaid: null,
      status: "Pending",
    },
  ];



  const notifications = [
    {
      type: "Project Assigned",
      message: 'New project "Restaurant POS" has been assigned to you',
      time: "2 hours ago",
      status: "new",
    },
    {
      type: "Milestone Approved",
      message: "Database Schema milestone approved for Real Estate CRM",
      time: "1 day ago",
      status: "success",
    },
    {
      type: "Payment Made",
      message: "$300 payment processed for Real Estate CRM milestone",
      time: "3 days ago",
      status: "success",
    },
    {
      type: "Offer Review",
      message: "Your offer for E-commerce App is under review",
      time: "5 days ago",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ASSIGNED_TO_PARTNER":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {status}
          </Badge>
        );
      case "PARTNER_OFFER_PROPOSED":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-700"
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
      case "Completed":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            {status}
          </Badge>
        );
      case "OFFER_SENT_TO_CLIENT":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {status}
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            {status}
          </Badge>
        );
      case "PAID":
        return (
          <Badge variant="default" className="bg-green-600 text-white">
            {status}
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setProjectViewOpen(true);
  };

  const handleSubmitOffer = (project: any) => {
    setSelectedProject(project);
    setSubmitOfferOpen(true);
  };

  const fetchMilestones = async () => {
    try {
      setIsLoadingMilestones(true);
      const milestonesData = [];

      for (const project of projects) {
        const response = await axiosInstance.get(
          `/milestone/partner/projects/${project.id}/milestones`
        );
        console.log("milestone response", response);
        if (
          response.data.milestones &&
          Array.isArray(response.data.milestones)
        ) {
          const projectMilestones = response.data.milestones.map(
            (milestone) => ({
              ...milestone,
              projectName: project.name || project.title,
            })
          );
          milestonesData.push(...projectMilestones);
        }
      }

      setMilestones(milestonesData);
    } catch (error) {
      toast({
        title: "Error fetching milestones",
        description:
          error.response?.data?.message || "Failed to load milestones",
      });
    } finally {
      setIsLoadingMilestones(false);
    }
  };

  const handleMilestoneAdded = () => {
    fetchMilestones();
  };

  useEffect(() => {
    if (projects.length > 0) {
      fetchMilestones();
    } else {
      setIsLoadingMilestones(false);
    }
  }, [projects]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Partner Dashboard</h2>
        <Button onClick={() => setViewAssignedProjectsOpen(true)}>
          <Eye className="w-4 h-4 mr-2" />
          View Assigned Projects
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest assigned projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {project.briefSnippet}
                  </p>
                  <p className="text-xs text-gray-500">
                    {project.submissionDate}
                  </p>
                </div>
                <div className="ml-4">{getStatusBadge(project.status)}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Latest updates and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.slice(0, 3).map((notification, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    notification.status === "success"
                      ? "bg-green-500"
                      : notification.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Brief</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Submission Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Estimated Cost
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="max-w-xs">
                      <div className="truncate font-medium">
                        {project.description}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(project.updatedAt, "yyyy-MM-dd HH:mm")}
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell className="hidden sm:table-cell font-medium">
                      {project.partnerCost || "Pending"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewProject(project)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {project.status === "Assigned" && (
                          <Button
                            size="sm"
                            onClick={() => handleSubmitOffer(project)}
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Submit Offer
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

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Leads</h2>
      </div>
      {leads.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-xl">No leads available</p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Brief</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Submission Date
                    </TableHead>
                    <TableHead>Status</TableHead>

                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="max-w-xs">
                        <div className="truncate font-medium">
                          {lead.description}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(lead.updatedAt, "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>

                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewLead(lead)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          {lead.status === "ASSIGNED_TO_PARTNER" && (
                            <Button
                              size="sm"
                              onClick={() => handleSubmitOffer(lead)}
                            >
                              <Send className="w-3 h-3 mr-1" />
                              Submit Offer
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
      )}
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Project Milestones</h2>
        <Button onClick={() => setAddMilestoneOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {isLoadingMilestones ? (
        <div className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : milestones.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <p className="text-gray-600">
              No milestones available. Create your first milestone by clicking
              the 'Add Milestone' button above.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Group milestones by project */}
          {Object.entries(
            milestones.reduce((acc, milestone) => {
              const projectName = milestone.projectName || "Uncategorized";
              if (!acc[projectName]) {
                acc[projectName] = [];
              }
              acc[projectName].push(milestone);
              return acc;
            }, {})
          ).map(([projectName, projectMilestones]) => (
            <div key={projectName} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                {projectName}
              </h3>
              <div className="grid gap-4">
                {(projectMilestones as any[]).map((milestone) => (
                  <Card key={milestone.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {milestone.title}
                        </CardTitle>
                        {getStatusBadge(milestone.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Cost</p>
                          <p className="font-semibold">${milestone.cost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold">
                            {milestone.duration} days
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Due Date</p>
                          <p className="font-semibold">
                            {milestone.dueDate
                              ? format(
                                  new Date(milestone.dueDate),
                                  "MMM dd, yyyy"
                                )
                              : "Not set"}
                          </p>
                        </div>
                      </div>
                      {milestone.description && (
                        <p className="text-sm text-gray-600 mt-4">
                          {milestone.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Earnings</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Earned
                </p>
                <p className="text-2xl font-bold text-gray-900">$1,200</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">$400</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-gray-900">$950</p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Detailed breakdown of your earnings</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Date Paid
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earnings.map((earning, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {earning.project}
                    </TableCell>
                    <TableCell>{earning.milestone}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {earning.amount}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {earning.datePaid || "Pending"}
                    </TableCell>
                    <TableCell>{getStatusBadge(earning.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWithdrawals = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Withdrawals</h2>
        <Button onClick={() => setWithdrawalRequestOpen(true)}>
          <Download className="w-4 h-4 mr-2" />
          Request Withdrawal
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Earned
                </p>
                <p className="text-2xl font-bold text-gray-900">$1,200</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">$400</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-gray-900">$950</p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
          <CardDescription>
            Track your withdrawal requests and payments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Request Date
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Paid Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-semibold">
                      {withdrawal.amount}
                    </TableCell>
                    <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {format(withdrawal.requestedAt, 'yyyy-MM-dd')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {withdrawal.processedAt ? format(withdrawal.processedAt, 'yyyy-MM-dd') : "N/A"}
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

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>

      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>
            Stay updated with project and payment notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div
                className={`w-3 h-3 rounded-full mt-2 ${
                  notification.status === "success"
                    ? "bg-green-500"
                    : notification.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {notification.type}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
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
        return renderMilestones();
      case "earnings":
        return renderEarnings();
      case "withdraw":
        return renderWithdrawals();
      case "notifications":
        return renderNotifications();
      case "settings":
        return <DeveloperSettings />;
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
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                  DIGIHUB AUST
                </h2>
                <p className="text-xs lg:text-sm text-gray-600">
                  Partner Portal
                </p>
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
              Partner Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-semibold">
                P
              </span>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>

      {/* Modals */}
      <ViewAssignedProjectsModal
        isOpen={viewAssignedProjectsOpen}
        onClose={() => setViewAssignedProjectsOpen(false)}
      />
      <ProjectViewModal
        isOpen={projectViewOpen}
        onClose={() => setProjectViewOpen(false)}
        project={selectedProject}
      />
      <LeadViewModal
        isOpen={leadViewOpen}
        onClose={() => setLeadViewOpen(false)}
        lead={selectedLead}
      />
      <SubmitOfferModal
        isOpen={submitOfferOpen}
        onClose={() => setSubmitOfferOpen(false)}
        project={selectedProject}
        fetchLead={fetchLeads}
      />
      <AddMilestoneModal
        isOpen={addMilestoneOpen}
        onClose={() => setAddMilestoneOpen(false)}
        onSuccess={handleMilestoneAdded}
      />
      <WithdrawalRequestModal
        isOpen={withdrawalRequestOpen}
        onClose={() => setWithdrawalRequestOpen(false)}
        fetchWithdrawals={fetchWithdrawals}
        availableBalance={1000}
      />
    </div>
  );
};

export default PartnerDashboard;
