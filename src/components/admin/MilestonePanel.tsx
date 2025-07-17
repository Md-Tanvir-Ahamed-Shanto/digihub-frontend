import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  CheckSquare,
  XCircle,
  AlertCircle,
  Calculator,
  Users,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ApproveMilestoneModal from "./ApproveMilestoneModal";
import ViewMilestoneModal from "./ViewMilestoneModal";
import axiosInstance from "@/api/axios";

const MilestonePanel = () => {
  const { toast } = useToast();
  const [approveMilestoneOpen, setApproveMilestoneOpen] = useState(false);
  const [viewMilestoneOpen, setViewMilestoneOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  console.log("milestones", milestones);
  useEffect(() => {
    fetchProjects();
  }, []);

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

  const fetchMilestones = async () => {
    try {
      const milestonesData = [];
      for (const project of projects) {
        const response = await axiosInstance.get(
          `/milestone/admin/projects/${project.id}/milestones`
        );
        if (
          response.data.milestones &&
          Array.isArray(response.data.milestones)
        ) {
          const projectMilestones = response.data.milestones.map(
            (milestone) => ({
              ...milestone,
              projectName: project.name || project.title || "Untitled Project",
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
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (milestoneId) => {
    try {
      await axiosInstance.put(
        `/milestone/admin/milestones/${milestoneId}/reject`,
        {
          reason: "Rejected by admin",
        }
      );
      toast({
        title: "Success",
        description: "Milestone has been rejected.",
      });
      fetchMilestones();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to reject milestone",
        variant: "destructive",
      });
    }
  };

  const handleMilestoneApproved = () => {
    fetchMilestones();
  };

  useEffect(() => {
    if (projects.length > 0) {
      console.log("Call fetchMilestones");
      fetchMilestones();
    } else {
      setIsLoading(false);
    }
  }, [projects]);

  const milestonesByProject = {};
  milestones.forEach((milestone) => {
    const projectId = milestone.projectId;
    if (!milestonesByProject[projectId]) {
      milestonesByProject[projectId] = [];
    }
    milestonesByProject[projectId].push(milestone);
  });
  // Flatten milestones for summary stats
  const allMilestones = milestones;
  console.log("projects", projects);
  console.log("allMilestones", allMilestones);

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING_APPROVAL":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 text-xs"
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending Approval
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="default" className="bg-green-600 text-white text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 text-xs"
          >
            <CheckSquare className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="destructive" className="text-xs">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        );
    }
  };

  const summaryStats = {
    totalMilestones: allMilestones.length,
    pendingApproval: allMilestones.filter((m) => m.status === "PENDING").length,
    approved: allMilestones.filter((m) => m.status === "APPROVED").length,
    completed: allMilestones.filter((m) => m.status === "COMPLETED").length,
    totalValue: allMilestones.reduce(
      (sum, m) => sum + parseInt(m.cost || 0),
      0
    ),
  };

  const handleApproveMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setApproveMilestoneOpen(true);
  };

  const handleViewMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setViewMilestoneOpen(true);
  };

  const renderMilestoneTable = (milestones, showActions = true) => (
    <div className="overflow-x-auto">
      {milestones.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Milestone</TableHead>
              <TableHead className="min-w-[120px]">Project</TableHead>
              <TableHead className="min-w-[120px]">Partner</TableHead>
              <TableHead className="min-w-[100px]">Cost</TableHead>
              <TableHead className="min-w-[120px] hidden sm:table-cell">
                Timeline
              </TableHead>
              <TableHead className="min-w-[120px]">Status</TableHead>
              {showActions && (
                <TableHead className="min-w-[200px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow key={milestone.id}>
                <TableCell className="font-medium">{milestone.title}</TableCell>
                <TableCell>{milestone.projectName}</TableCell>
                <TableCell>
                  {typeof milestone.partner === "object"
                    ? milestone.partner?.name || "N/A"
                    : milestone.partner || "N/A"}
                </TableCell>
                <TableCell className="font-medium">
                  ${milestone.cost?.toLocaleString() || 0}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {milestone.duration || 0} days
                </TableCell>
                <TableCell>{getStatusBadge(milestone.status)}</TableCell>

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
                      {milestone.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApproveMilestone(milestone)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Calculator className="w-3 h-3 mr-1" />
                            Set Cost
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(milestone.id)}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
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
      ) : (
        <div className="text-center py-4 text-gray-500">
          No milestones found
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Milestone Management
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Milestones
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {summaryStats.totalMilestones}
                </p>
              </div>
              <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Pending Approval
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {summaryStats.pendingApproval}
                </p>
              </div>
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Approved
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {summaryStats.approved}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Completed
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {summaryStats.completed}
                </p>
              </div>
              <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Value
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  ${summaryStats.totalValue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto">
          <TabsTrigger value="projects" className="text-xs sm:text-sm">
            By Project
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs sm:text-sm">
            Pending
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-xs sm:text-sm">
            Approved
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs sm:text-sm">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          {projects.map((project) => {
            const projectMilestones = milestonesByProject[project.id] || [];
            const totalValue = projectMilestones.reduce(
              (sum, m) => sum + parseInt(m.cost || 0),
              0
            );
            const pendingCount = projectMilestones.filter(
              (m) => m.status === "PENDING"
            ).length;
            const approvedCount = projectMilestones.filter(
              (m) => m.status === "APPROVED"
            ).length;
            const completedCount = projectMilestones.filter(
              (m) => m.status === "COMPLETED"
            ).length;

            return (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      {project.name || project.title || "Untitled Project"}
                    </div>
                  </CardTitle>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                    <div>
                      Client:{" "}
                      {typeof project.client === "object"
                        ? project.client?.name || "N/A"
                        : project.client || "N/A"}
                    </div>
                    <div>Total Value: ${totalValue.toLocaleString()}</div>
                    <div className="flex gap-4">
                      <span>Total: {projectMilestones.length}</span>
                      <span>Pending: {pendingCount}</span>
                      <span>Approved: {approvedCount}</span>
                      <span>Completed: {completedCount}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderMilestoneTable(projectMilestones)}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Milestones</CardTitle>
            </CardHeader>
            <CardContent>{renderMilestoneTable(allMilestones)}</CardContent>
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
              {renderMilestoneTable(
                allMilestones.filter((m) => m.status === "PENDING")
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Approved Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              {renderMilestoneTable(
                allMilestones.filter((m) => m.status === "APPROVED"),
                false
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              {renderMilestoneTable(
                allMilestones.filter((m) => m.status === "COMPLETED"),
                false
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ApproveMilestoneModal
        open={approveMilestoneOpen}
        onOpenChange={setApproveMilestoneOpen}
        milestone={selectedMilestone}
        onSuccess={handleMilestoneApproved}
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
