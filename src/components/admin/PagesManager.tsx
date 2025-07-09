import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText,
  Globe,
  Calendar,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PagesManagerProps {
  onViewPage?: (page: any) => void;
}

const PagesManager = ({ onViewPage }: PagesManagerProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [createPageOpen, setCreatePageOpen] = useState(false);
  const [editPageOpen, setEditPageOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'draft'
  });

  const pages = [
    {
      id: 1,
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      status: 'Published',
      lastModified: '2024-01-20',
      wordCount: 1250
    },
    {
      id: 2,
      title: 'Terms and Conditions',
      slug: 'terms-conditions',
      status: 'Published',
      lastModified: '2024-01-18',
      wordCount: 2100
    },
    {
      id: 3,
      title: 'Refund Policy',
      slug: 'refund-policy',
      status: 'Draft',
      lastModified: '2024-01-15',
      wordCount: 800
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
      case 'Draft':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      case 'Archived':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreatePage = () => {
    if (!pageData.title || !pageData.slug || !pageData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Page Created",
      description: `Page "${pageData.title}" has been created successfully.`,
    });
    
    setCreatePageOpen(false);
    setPageData({ title: '', slug: '', content: '', status: 'draft' });
  };

  const handleEditPage = (page: any) => {
    setSelectedPage(page);
    setPageData({
      title: page.title,
      slug: page.slug,
      content: 'Sample content...',
      status: page.status.toLowerCase()
    });
    setEditPageOpen(true);
  };

  const handleUpdatePage = () => {
    toast({
      title: "Page Updated",
      description: `Page "${pageData.title}" has been updated successfully.`,
    });
    
    setEditPageOpen(false);
    setPageData({ title: '', slug: '', content: '', status: 'draft' });
    setSelectedPage(null);
  };

  const handleDeletePage = (pageId: number) => {
    toast({
      title: "Page Deleted",
      description: "The page has been deleted successfully.",
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleViewPage = (page: any) => {
    if (onViewPage) {
      onViewPage(page);
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Pages Management</h2>
        <Button onClick={() => setCreatePageOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Page
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{pages.length}</p>
              </div>
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {pages.filter(p => p.status === 'Published').length}
                </p>
              </div>
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {pages.filter(p => p.status === 'Draft').length}
                </p>
              </div>
              <Edit className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">All Pages</CardTitle>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Title</TableHead>
                  <TableHead className="hidden sm:table-cell min-w-[150px]">URL Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Modified</TableHead>
                  <TableHead className="hidden lg:table-cell">Word Count</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">/{page.slug}</code>
                    </TableCell>
                    <TableCell>{getStatusBadge(page.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{page.lastModified}</TableCell>
                    <TableCell className="hidden lg:table-cell">{page.wordCount} words</TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewPage(page)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditPage(page)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeletePage(page.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Page Modal */}
      <Dialog open={createPageOpen} onOpenChange={setCreatePageOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  value={pageData.title}
                  onChange={(e) => {
                    setPageData(prev => ({ 
                      ...prev, 
                      title: e.target.value,
                      slug: generateSlug(e.target.value)
                    }));
                  }}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={pageData.slug}
                  onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-slug"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">URL: /{pageData.slug}</p>
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={pageData.status} onValueChange={(value) => setPageData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="content">Page Content *</Label>
              <Textarea
                id="content"
                value={pageData.content}
                onChange={(e) => setPageData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter page content..."
                rows={8}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreatePage} className="flex-1">
                Create Page
              </Button>
              <Button variant="outline" onClick={() => setCreatePageOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Page Modal */}
      <Dialog open={editPageOpen} onOpenChange={setEditPageOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Page Title *</Label>
                <Input
                  id="edit-title"
                  value={pageData.title}
                  onChange={(e) => setPageData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <Label htmlFor="edit-slug">URL Slug *</Label>
                <Input
                  id="edit-slug"
                  value={pageData.slug}
                  onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-slug"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">URL: /{pageData.slug}</p>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={pageData.status} onValueChange={(value) => setPageData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-content">Page Content *</Label>
              <Textarea
                id="edit-content"
                value={pageData.content}
                onChange={(e) => setPageData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter page content..."
                rows={8}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={handleUpdatePage} className="flex-1">
                Update Page
              </Button>
              <Button variant="outline" onClick={() => setEditPageOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PagesManager;
