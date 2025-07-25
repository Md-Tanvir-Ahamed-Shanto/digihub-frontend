import { useCallback, useEffect, useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Loader2,
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
import axios from "axios";
import { format } from 'date-fns';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

// --- Stripe Initialization (Load outside component for performance) ---
// Ensure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is correctly set in your .env.local
// const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//     ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
//     : Promise.reject(new Error("Stripe Publishable Key is not set."));

// const stripePromise = loadStripe("sdfsdf");
const API_BASE_URL = 'http://localhost:3000/api';

// --- PaymentForm Component (handles Stripe PaymentElement) ---
const CheckoutForm = ({ clientSecret, onPaymentSuccess, onPaymentError, paymentStatus, setPaymentStatus }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setPaymentStatus('processing');
        onPaymentError(null); // Clear previous errors

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setPaymentStatus('error');
            onPaymentError(submitError.message);
            return;
        }

        try {
            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/dashboard/client/profile`, // Adjust this URL as needed post-payment
                },
                redirect: 'if_required' // Crucial for handling 3D Secure etc.
            });

            if (error) {
                setPaymentStatus('error');
                onPaymentError(error.message);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                setPaymentStatus('success');
                onPaymentSuccess(paymentIntent);
            } else {
                setPaymentStatus('idle');
                onPaymentError(`Unexpected payment intent status: ${paymentIntent?.status}`);
            }
        } catch (error) {
            console.error("Stripe confirmPayment error:", error);
            setPaymentStatus('error');
            onPaymentError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PaymentElement />
            <button
                type="submit"
                className={`w-full px-4 py-2 rounded-md font-semibold transition-colors duration-200
                           ${!stripe || paymentStatus === 'processing'
                             ? 'bg-blue-400 cursor-not-allowed'
                             : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                disabled={!stripe || paymentStatus === 'processing'}
            >
                {paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
            </button>
            {paymentStatus === 'error' && <p className="text-red-500 text-sm mt-2">{paymentStatus.message}</p>}
        </form>
    );
};



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
  const [raiseIssueOpen, setRaiseIssueOpen] = useState(false);
  const [supportTicketOpen, setSupportTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [offer, setOffer] = useState([]);
  const [projects, setProjects] = useState([]);
  // const [milestones, setMilestones] = useState([]);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
 const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isManageSubscriptionOpen, setManageSubscriptionOpen] = useState(false); // Controls modal/dialog visibility
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentRequestError, setPaymentRequestError] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | processing | success | error

        const getStatusText = (status) => {
        switch (status) {
            case 'COMPLETED': return 'Paid';
            case 'ACTIVE': return 'Active';
            case 'PENDING': return 'Pending';
            case 'FAILED': return 'Failed';
            case 'INACTIVE': return 'Inactive';
            case 'CANCELLED': return 'Cancelled';
            case 'EXPIRED': return 'Expired';
            case 'No Subscription': return 'No Subscription';
            default: return status;
        }
    };

    const fetchSubscriptionData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token'); // Get your auth token
            const response = await axios.get(`${API_BASE_URL}/subscriptions/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubscription(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
            if (err.response && err.response.status === 404) {
                setSubscription(null); // Explicitly set to null if no subscription found
            } else {
                console.error("Error fetching subscription:", err.response?.data?.message || err.message);
                alert("Error fetching subscription: " + (err.response?.data?.message || "Failed to load subscription details."));
            }
        }
    }, []);

    useEffect(() => {
        fetchSubscriptionData();
    }, [fetchSubscriptionData]);


    // Function to initiate Stripe Payment Intent creation
    const initiatePayment = async () => {
        setPaymentStatus('processing');
        setPaymentRequestError(null);
        try {
            const token = localStorage.getItem('token');
            // If client has no subscription, create a temporary one (if your backend allows)
            // Or ensure they've selected a plan first before calling this.
            // For now, assuming if subscription is null, we implicitly assume they want to buy the default $75 plan
            // The backend's create-subscription-payment-intent needs the subscription ID.
            // If it's a new subscription, you might need an admin route or a different client route to *create* the subscription first,
            // then proceed to pay.
            // For simplicity, this assumes the subscription record already exists (even if PENDING/INACTIVE).
            // If `subscription` is null here, it means `getMyMaintenanceSubscription` returned 404.
            // In a real app, you might route them to a "choose plan" page.
            // For this flow, we will assume an initial subscription record is created by admin or on signup.
            // If subscription is null, alert user to contact support or select a plan first.
            if (!subscription || !subscription.id) {
                alert("Please contact support to initiate your subscription or select a plan.");
                setPaymentStatus('idle');
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/payments/create-subscription-payment-intent`,
                { maintenanceSubscriptionId: subscription.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setClientSecret(response.data.clientSecret);
            setPaymentStatus('idle'); // Ready for client-side payment
        } catch (err) {
            console.error("Error initiating payment:", err);
            setPaymentStatus('error');
            setPaymentRequestError(err.response?.data?.message || 'Failed to initiate payment. Please try again.');
            alert("Payment Initiation Failed: " + (err.response?.data?.message || "Could not prepare payment. Please try again."));
        }
    };

    const handlePaymentSuccess = (paymentIntent) => {
        console.log("Payment successful:", paymentIntent);
        fetchSubscriptionData(); // Re-fetch to update UI after successful payment (webhook will update DB)
        setClientSecret(null); // Clear client secret
        alert("Payment Successful! Your subscription has been updated.");
        setTimeout(() => setManageSubscriptionOpen(false), 1000); // Close modal after delay
    };

    const handlePaymentError = (errorMessage) => {
        console.error("Payment failed:", errorMessage);
        // Error message already displayed by CheckoutForm
    };

    if (error && error.response && error.response.status !== 404) {
        return (
            <div className="text-center p-8 text-red-600">
                <p className="mb-4">Error: {error.response?.data?.message || "Failed to load subscription data."}</p>
                <button
                    onClick={fetchSubscriptionData}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Retry
                </button>
            </div>
        );
    }

    const hasActiveSubscription = subscription && subscription.status === 'ACTIVE';
    const isPendingOrInactive = subscription && (subscription.status === 'PENDING' || subscription.status === 'INACTIVE' || subscription.status === 'EXPIRED');
    const noSubscription = !subscription;





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

  const fetchSupportTickets = async () => {
    try {
      setIsLoadingTickets(true);
      const response = await axiosInstance.get(`/support/client/${user?.id}/issues`);
      setSupportTickets(response.data.data);
    } catch (error) {
      console.error('Error fetching support tickets:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch support tickets',
        variant: 'destructive'
      });
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleCreateIssue = async (issueData) => {
    try {
      await axiosInstance.post('/support/issues', issueData);
      toast({
        title: 'Success',
        description: 'Support ticket created successfully',
      });
      fetchSupportTickets();
      setRaiseIssueOpen(false);
    } catch (error) {
      console.error('Error creating support ticket:', error);
      toast({
        title: 'Error',
        description: 'Failed to create support ticket',
        variant: 'destructive'
      });
    }
  };

  const handleTicketReply = async (ticketId, message) => {
    try {
      await axiosInstance.post(`/support/client/issues/${ticketId}/reply`, { message });
      toast({
        title: 'Success',
        description: 'Reply sent successfully',
      });
      fetchSupportTickets();
      setSupportTicketOpen(false);
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to send reply',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchOffer();
  }, []);

  useEffect(() => {
    if (activeTab === 'support') {
      fetchSupportTickets();
    }
  }, [activeTab]);

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
        if (response.data.milestones && Array.isArray(response.data.milestones)) {
          const projectMilestones = response.data.milestones.map(milestone => ({
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

  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axiosInstance.get('/invoice/client');
      setInvoices(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch invoices",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadInvoice = async (invoice) => {
    try {
      const invoiceData = {
        invoiceNumber: invoice.id,
        companyInfo: {
          name: 'DIGIHUB',
          address: '123 Business Street\nTech Park\nDhaka, Bangladesh',
          phone: '+880 1234567890',
          email: 'info@digihub.com'
        },
        client: user,
        project: invoice.project,
        milestone: invoice.milestone,
        items: [{
          description: invoice.milestone?.title || invoice.project?.name || 'Project Services',
          quantity: 1,
          rate: invoice.amount,
          amount: invoice.amount
        }],
        amount: invoice.amount,
        gstEnabled: invoice.gstEnabled,
        gstAmount: invoice.gstAmount,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        dueDate: invoice.dueDate
      };

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast({
          title: "Error",
          description: "Please allow pop-ups to download the invoice",
          variant: "destructive"
        });
        return;
      }

      const invoiceHTML = generateInvoiceHTML(invoiceData);
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
      }, 500);

      toast({
        title: "Success",
        description: `Invoice ${invoice.id} has been generated for download.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate invoice",
        variant: "destructive"
      });
    };
  };
console.log("user", user)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "PENDING": {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-800",
      },
      "APPROVED": {
        variant: "secondary" as const,
        className: "bg-green-100 text-green-800",
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
        amount: milestone.clientCost,
        description: `pay for ${milestone.title}`,
      });
      setPaymentGatewayOpen(true);
    }
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setProjectDetailsOpen(true);
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
            {(projects?.length  === 0) &&( pendingProjects?.length === 0) ? (
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
                                ${milestone.invoices[0]?.totalAmount || "N/A"}
                              </span>
                            </div>
                            {milestone.timeline && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span>{milestone.duration} days</span>
                              </div>
                            )}
                              {milestone.invoices[0]?.dueDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span>Due: {format(milestone.invoices[0]?.dueDate, "MMM d, yyyy")}</span>
                              </div>
                            )}
                          </div>
                          {milestone.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {milestone.description}
                            </p>
                          )}
                        </div>
                        {milestone.invoices[0]?.status === "PENDING" && (
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
            {isLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <Card className="border-brand-gray-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-brand-gray-200">
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Milestone</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>GST</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
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
                            {invoice.id}
                          </TableCell>
                          <TableCell>{invoice.project?.name || 'N/A'}</TableCell>
                          <TableCell>{invoice.milestone?.title || 'N/A'}</TableCell>
                          <TableCell>${(invoice.amount || 0).toLocaleString()}</TableCell>
                          <TableCell>${(invoice.gstAmount || 0).toLocaleString()}</TableCell>
                          <TableCell className="font-medium text-green-600">
                            ${(invoice.totalAmount || 0).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className=""
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'Not set'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                              onClick={() => handleDownloadInvoice(invoice)}
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
            )}
          </div>
        );

      case "maintenance":
        return (
        //     <div className="p-4 md:p-8 max-w-4xl mx-auto">
        //     <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        //         Maintenance Subscription
        //     </h2>

        //     <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        //         <h3 className="text-xl font-bold text-blue-600 mb-3">
        //             Monthly Maintenance Plan
        //         </h3>
        //         <p className="text-gray-600 mb-5">
        //             ${subscription?.pricePerMonth?.toFixed(2) || '75.00'}/month – includes 24/7 uptime monitoring, backups, and
        //             minor updates
        //         </p>

        //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 border-b pb-4">
        //             <div>
        //                 <p className="font-semibold text-gray-700">Current Status</p>
        //                 {hasActiveSubscription && (
        //                     <p className="text-sm text-gray-500 mt-1">
        //                         Active until {subscription.nextBillingDate ? format(new Date(subscription.nextBillingDate), 'MMMM dd, yyyy') : 'N/A'}
        //                     </p>
        //                 )}
        //                 {isPendingOrInactive && (
        //                     <p className="text-sm text-orange-600 mt-1">
        //                         {subscription.status === 'PENDING' ? 'Payment pending or initial setup required.' :
        //                          subscription.status === 'INACTIVE' ? 'Inactive. Please renew.' :
        //                          subscription.status === 'EXPIRED' ? 'Expired. Please renew.' : ''}
        //                     </p>
        //                 )}
        //                 {noSubscription && (
        //                     <p className="text-sm text-gray-500 mt-1">No active subscription found.</p>
        //                 )}
        //             </div>
        //             <span className={`px-3 py-1 rounded-full text-xs font-semibold mt-3 sm:mt-0
        //                 ${(hasActiveSubscription) ? 'bg-green-100 text-green-700' :
        //                   (isPendingOrInactive) ? 'bg-yellow-100 text-yellow-700' :
        //                   'bg-red-100 text-red-700'}`
        //             }>
        //                 {getStatusText(subscription?.status || 'No Subscription')}
        //             </span>
        //         </div>

        //         <div className="flex flex-col gap-3">
        //             {hasActiveSubscription && (
        //                 <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
        //                     <span className="font-semibold text-gray-700">Auto-renewal</span>
        //                     <button
        //                         className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        //                         onClick={() => setManageSubscriptionOpen(true)}
        //                     >
        //                         Manage
        //                     </button>
        //                 </div>
        //             )}
        //              {noSubscription || isPendingOrInactive ? (
        //                 <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
        //                     <span className="font-semibold text-blue-700">Get Started!</span>
        //                     <button
        //                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        //                         onClick={() => setManageSubscriptionOpen(true)}
        //                     >
        //                         {noSubscription ? 'Subscribe Now' : 'Renew Subscription'}
        //                     </button>
        //                 </div>
        //              ) : null}

        //             {hasActiveSubscription && (
        //                 <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
        //                     <span className="font-semibold text-gray-700">Payment Method</span>
        //                     <span className="text-gray-500">**** 4242</span> {/* Static for now, typically fetched from Stripe Customer object */}
        //                 </div>
        //             )}
        //         </div>
        //     </div>

        //     {/* Payment History */}
        //     <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        //         <h3 className="text-xl font-bold text-gray-800 mb-4">Payment History</h3>
        //         <div className="overflow-x-auto">
        //             <table className="min-w-full divide-y divide-gray-200">
        //                 <thead className="bg-gray-50">
        //                     <tr>
        //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
        //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
        //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        //                         <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody className="bg-white divide-y divide-gray-200">
        //                     {subscription && subscription.payments && subscription.payments.length > 0 ? (
        //                         subscription.payments.map((payment) => (
        //                             <tr key={payment.id}>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.paidAt ? format(new Date(payment.paidAt), 'yyyy-MM-dd') : 'N/A'}</td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${payment.amount?.toFixed(2) || '0.00'}</td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getStatusText(payment.status)}</td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        //                                     {payment.status === 'COMPLETED' ? (
        //                                         <button className="text-blue-600 hover:text-blue-900 focus:outline-none">
        //                                             Download
        //                                         </button>
        //                                     ) : (
        //                                         <span className="text-gray-400">-</span>
        //                                     )}
        //                                 </td>
        //                             </tr>
        //                         ))
        //                     ) : (
        //                         <tr>
        //                             <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
        //                                 No payment history found.
        //                             </td>
        //                         </tr>
        //                     )}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>

        //     {/* Manage/Payment Dialog (Tailwind CSS Modal) */}
        //     {isManageSubscriptionOpen && (
        //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        //             <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up">
        //                 <div className="flex justify-between items-center mb-5">
        //                     <h3 className="text-xl font-bold text-gray-800">
        //                         {noSubscription ? 'Subscribe to Maintenance Plan' : (hasActiveSubscription ? 'Manage Subscription' : 'Renew Subscription')}
        //                     </h3>
        //                     <button
        //                         onClick={() => {
        //                             setManageSubscriptionOpen(false);
        //                             setClientSecret(null); // Clear client secret when closing
        //                             setPaymentRequestError(null);
        //                             setPaymentStatus('idle');
        //                         }}
        //                         className="text-gray-500 hover:text-gray-700 text-2xl"
        //                     >
        //                         &times;
        //                     </button>
        //                 </div>
        //                 <p className="text-gray-600 mb-5">
        //                     {noSubscription ? (
        //                         `Start your monthly maintenance plan for $${subscription?.pricePerMonth?.toFixed(2) || '75.00'}/month.`
        //                     ) : (
        //                         `Your current plan is $${subscription?.pricePerMonth?.toFixed(2) || '75.00'}/month. Manage auto-renewal or make a payment.`
        //                     )}
        //                 </p>

        //                 {!clientSecret ? (
        //                     <>
        //                         <div className="mb-6">
        //                             <p className="font-bold text-lg text-gray-700 mb-1">Total Amount Due:</p>
        //                             <p className="text-3xl font-bold text-blue-600">
        //                                 ${(subscription?.pricePerMonth?.toNumber() * (1 + GST_RATE)).toFixed(2) || (75 * (1 + GST_RATE)).toFixed(2)} BDT
        //                                 <span className="text-sm font-normal text-gray-500 ml-2"> (incl. {GST_RATE * 100}% GST)</span>
        //                             </p>
        //                             {paymentRequestError && (
        //                                 <p className="text-red-500 text-sm mt-3">{paymentRequestError}</p>
        //                             )}
        //                             {/* Display a message if no subscription exists for starting payment */}
        //                             {noSubscription && (
        //                                 <p className="text-sm text-red-500 mt-3">
        //                                     A subscription record must exist to process payment. Please contact support.
        //                                 </p>
        //                             )}
        //                         </div>
        //                         <div className="text-right">
        //                             <button
        //                                 type="button"
        //                                 onClick={initiatePayment}
        //                                 className={`px-6 py-3 rounded-md font-semibold transition-colors duration-200
        //                                            ${paymentStatus === 'processing' || noSubscription // Disable if no subscription or processing
        //                                              ? 'bg-blue-400 cursor-not-allowed'
        //                                              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        //                                 disabled={paymentStatus === 'processing' || noSubscription} // Disable if no subscription
        //                             >
        //                                 {paymentStatus === 'processing' ? 'Processing...' : (noSubscription ? 'Subscription Required' : 'Make Next Payment')}
        //                             </button>
        //                         </div>
        //                     </>
        //                 ) : (
        //                     <Elements stripe={stripePromise} options={{ clientSecret }}>
        //                         <CheckoutForm
        //                             clientSecret={clientSecret}
        //                             onPaymentSuccess={handlePaymentSuccess}
        //                             onPaymentError={handlePaymentError}
        //                             paymentStatus={paymentStatus}
        //                             setPaymentStatus={setPaymentStatus}
        //                         />
        //                     </Elements>
        //                 )}
        //             </div>
        //         </div>
        //     )}
        // </div>

        <div>Ntg</div>
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
                        <TableRow
                          key={ticket.id}
                          className="border-brand-gray-200"
                        >
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
      {/* <ManageSubscriptionModal
        isOpen={manageSubscriptionOpen}
        onClose={() => setManageSubscriptionOpen(false)}
      /> */}
      <RaiseIssueModal
        open={raiseIssueOpen}
        onClose={() => setRaiseIssueOpen(false)}
        onSubmit={handleCreateIssue}
        projects={projects}
      />
      <SupportTicketModal
        open={supportTicketOpen}
        onClose={() => setSupportTicketOpen(false)}
        ticket={selectedTicket}
        onReply={handleTicketReply}
      />
    </div>
  );
};

export default ClientDashboard;


const generateInvoiceHTML = (invoice) => {
  console.log("invoice", invoice)


  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice #${invoice.invoiceNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .invoice-header { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .company-info { text-align: right; }
        .invoice-details { margin-bottom: 30px; }
        .client-info { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .total-section { text-align: right; }
        .status { padding: 6px 12px; border-radius: 4px; display: inline-block; }
        .status-paid { background: #dcfce7; color: #166534; }
        .status-pending { background: #fef9c3; color: #854d0e; }
        .status-overdue { background: #fee2e2; color: #991b1b; }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <div>
          <h1>INVOICE</h1>
          <p>Invoice #${invoice.invoiceNumber}</p>
        </div>
        <div class="company-info">
          <h2>${invoice.companyInfo.name}</h2>
          <p>${invoice.companyInfo.address.replace(/\n/g, '<br/>')}</p>
          <p>Phone: ${invoice.companyInfo.phone}</p>
          <p>Email: ${invoice.companyInfo.email}</p>
        </div>
      </div>

      <div class="invoice-details">
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
        <div class="status status-${invoice.status.toLowerCase()}">
          ${invoice.status}
        </div>
      </div>

      <div class="client-info">
        <h3>Bill To:</h3>
        <p>${invoice.client?.name || invoice.client?.email.charAt(0).toUpperCase() || ''}</p>
        <p>${invoice.client?.email || ''}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>${item.rate}</td>
              <td>${item.amount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total-section">
        <p><strong>Subtotal:</strong> ${invoice.amount}</p>
        ${invoice.gstEnabled ? `<p><strong>GST:</strong> ${invoice.gstAmount}</p>` : ''}
        <h3>Total: ${invoice.totalAmount}</h3>
      </div>
    </body>
    </html>
  `;
};
