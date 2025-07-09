
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Package, DollarSign, Search, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useServiceData } from '@/hooks/useServiceData';
import { Feature } from '@/services/serviceData';

const TechnicalPartnerCatalog = () => {
  const { toast } = useToast();
  const { services, features, addFeature, updateFeature, deleteFeature } = useServiceData();
  const [selectedService, setSelectedService] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [viewingService, setViewingService] = useState<string | null>(null);

  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    basePrice: 0,
    serviceId: selectedService === 'all' ? '1' : selectedService
  });

  const filteredFeatures = features.filter(feature => {
    const matchesService = selectedService === 'all' || feature.serviceId === selectedService;
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && matchesSearch;
  });

  const handleAddFeature = () => {
    const serviceId = selectedService === 'all' ? '1' : selectedService;
    if (!newFeature.name || !newFeature.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const feature: Feature = {
      id: Date.now().toString(),
      serviceId: serviceId,
      name: newFeature.name,
      description: newFeature.description,
      basePrice: newFeature.basePrice,
      isActive: true
    };

    addFeature(feature);
    setNewFeature({ name: '', description: '', basePrice: 0, serviceId: serviceId });
    setIsAddFeatureModalOpen(false);

    toast({
      title: "Success",
      description: "Feature added successfully."
    });
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature);
  };

  const handleUpdateFeature = () => {
    if (!editingFeature) return;

    updateFeature(editingFeature);
    setEditingFeature(null);

    toast({
      title: "Success",
      description: "Feature updated successfully."
    });
  };

  const handleDeleteFeature = (featureId: string) => {
    deleteFeature(featureId);
    toast({
      title: "Success",
      description: "Feature deleted successfully."
    });
  };

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.name || 'Unknown Service';
  };

  const getServiceFeatures = (serviceId: string) => {
    return features.filter(feature => feature.serviceId === serviceId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-brand-gray-900">Technical Partner Catalog</h3>
          <p className="text-sm text-brand-gray-600">Manage your service features and pricing</p>
        </div>
        <Dialog open={isAddFeatureModalOpen} onOpenChange={setIsAddFeatureModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Feature</DialogTitle>
              <DialogDescription>
                Create a new feature and assign it to a service
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="service-select">Service</Label>
                <Select value={selectedService === 'all' ? '1' : selectedService} onValueChange={(value) => {
                  setSelectedService(value);
                  setNewFeature({ ...newFeature, serviceId: value });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="feature-name">Feature Name</Label>
                <Input
                  id="feature-name"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                  placeholder="Enter feature name"
                />
              </div>
              <div>
                <Label htmlFor="feature-description">Description</Label>
                <Input
                  id="feature-description"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  placeholder="Enter feature description"
                />
              </div>
              <div>
                <Label htmlFor="base-price">Base Price ($)</Label>
                <Input
                  id="base-price"
                  type="number"
                  value={newFeature.basePrice}
                  onChange={(e) => setNewFeature({ ...newFeature, basePrice: Number(e.target.value) })}
                  placeholder="Enter base price"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddFeature} className="flex-1">
                  Add Feature
                </Button>
                <Button onClick={() => setIsAddFeatureModalOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Service Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => {
          const serviceFeatures = getServiceFeatures(service.id);
          const totalPrice = serviceFeatures.reduce((sum, feature) => sum + feature.basePrice, 0);
          
          return (
            <Card key={service.id} className="border-brand-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  {service.name}
                  <Badge variant="secondary">{serviceFeatures.length} features</Badge>
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-brand-gray-600">Total Base Price:</span>
                    <span className="font-bold text-brand-primary">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setViewingService(service.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Features
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedService(service.id);
                        setIsAddFeatureModalOpen(true);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
            <Input
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {services.map(service => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Features List */}
      <div className="grid gap-4">
        {filteredFeatures.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-brand-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-brand-gray-900 mb-2">No features found</h3>
              <p className="text-brand-gray-600 mb-4">
                {selectedService !== 'all' ? 'No features found for the selected service' : 'Start by adding your first feature'}
              </p>
              <Button onClick={() => setIsAddFeatureModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredFeatures.map(feature => (
            <Card key={feature.id} className="border-brand-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-base">{feature.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {getServiceName(feature.serviceId)}
                      </Badge>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditFeature(feature)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteFeature(feature.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">
                      ${feature.basePrice}
                    </span>
                    <span className="text-sm text-brand-gray-600">base price</span>
                  </div>
                  <Badge className={feature.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {feature.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* View Service Features Modal */}
      {viewingService && (
        <Dialog open={!!viewingService} onOpenChange={() => setViewingService(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {services.find(s => s.id === viewingService)?.name} Features
              </DialogTitle>
              <DialogDescription>
                All features for this service category
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {getServiceFeatures(viewingService).map(feature => (
                <Card key={feature.id} className="border-brand-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-brand-gray-900">{feature.name}</h4>
                        <p className="text-sm text-brand-gray-600 mt-1">{feature.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-brand-primary">
                          ${feature.basePrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-brand-gray-500">Base Price</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="border-t pt-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-brand-gray-900">
                    Total: ${getServiceFeatures(viewingService).reduce((sum, feature) => sum + feature.basePrice, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Feature Modal */}
      {editingFeature && (
        <Dialog open={!!editingFeature} onOpenChange={() => setEditingFeature(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Feature</DialogTitle>
              <DialogDescription>
                Update feature details and pricing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-feature-name">Feature Name</Label>
                <Input
                  id="edit-feature-name"
                  value={editingFeature.name}
                  onChange={(e) => setEditingFeature({ ...editingFeature, name: e.target.value })}
                  placeholder="Enter feature name"
                />
              </div>
              <div>
                <Label htmlFor="edit-feature-description">Description</Label>
                <Input
                  id="edit-feature-description"
                  value={editingFeature.description}
                  onChange={(e) => setEditingFeature({ ...editingFeature, description: e.target.value })}
                  placeholder="Enter feature description"
                />
              </div>
              <div>
                <Label htmlFor="edit-base-price">Base Price ($)</Label>
                <Input
                  id="edit-base-price"
                  type="number"
                  value={editingFeature.basePrice}
                  onChange={(e) => setEditingFeature({ ...editingFeature, basePrice: Number(e.target.value) })}
                  placeholder="Enter base price"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleUpdateFeature} className="flex-1">
                  Update Feature
                </Button>
                <Button onClick={() => setEditingFeature(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TechnicalPartnerCatalog;
