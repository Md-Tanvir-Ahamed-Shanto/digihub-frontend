
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Service, Feature } from '@/services/serviceData';
import { Edit, Eye, Loader2 } from 'lucide-react';
import axiosInstance from '@/api/axios';
import { toast } from '@/hooks/use-toast';

interface ManageFeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  features: Feature[];
}

const ManageFeaturesModal = ({ open, onOpenChange, service, features }: ManageFeaturesModalProps) => {
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!service) return null;

  const serviceFeatures = features.filter(feature => feature.serviceId === service.id);

  const calculatePricing = (basePrice: number, taxPercentage: number = 30, profitPercentage: number = 40) => {
    const tax = Math.round(basePrice * (taxPercentage / 100));
    const profit = Math.round(basePrice * (profitPercentage / 100));
    const finalPrice = basePrice + tax + profit;
    
    return {
      basePrice,
      tax,
      profit,
      finalPrice
    };
  };

  const generateTotalQuote = () => {
    const totalBasePrice = serviceFeatures.reduce((sum, feature) => sum + feature.basePrice, 0);
    const totalTax = serviceFeatures.reduce((sum, feature) => 
      sum + Math.round(feature.basePrice * (30 / 100)), 0);
    const totalProfit = serviceFeatures.reduce((sum, feature) => 
      sum + Math.round(feature.basePrice * (40 / 100)), 0);
    const totalFinalPrice = totalBasePrice + totalTax + totalProfit;

    return {
      totalBasePrice,
      totalTax,
      totalProfit,
      totalFinalPrice,
      featureCount: serviceFeatures.length
    };
  };

  const quote = generateTotalQuote();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{service.name} - Manage Features</span>
          </DialogTitle>
          <DialogDescription>
            Configure features and pricing for the {service.name} service category
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-brand-primary">{serviceFeatures.length}</p>
                <p className="text-sm text-brand-gray-600">Total Features</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">${quote.totalBasePrice.toLocaleString()}</p>
                <p className="text-sm text-brand-gray-600">Total Base Price</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">${quote.totalFinalPrice.toLocaleString()}</p>
                <p className="text-sm text-brand-gray-600">Total Client Price</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Button 
                  onClick={() => setPreviewMode(!previewMode)}
                  className="w-full"
                  variant={previewMode ? "default" : "outline"}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {previewMode ? "Hide" : "Preview"} Quote
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Total Quote */}
          {previewMode && (
            <Card className="bg-brand-gray-50 border-2 border-brand-primary">
              <CardHeader>
                <CardTitle>Total Package Quote - {service.name}</CardTitle>
                <CardDescription>Complete pricing breakdown for all features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-brand-gray-900">Package Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Number of Features:</span>
                        <span className="font-medium">{quote.featureCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Partner Base Cost:</span>
                        <span className="font-medium">${quote.totalBasePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (30%):</span>
                        <span className="font-medium">${quote.totalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit (40%):</span>
                        <span className="font-medium">${quote.totalProfit.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total Client Price:</span>
                        <span className="text-brand-primary">${quote.totalFinalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-brand-gray-900">Included Features</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {serviceFeatures.map((feature) => (
                        <div key={feature.id} className="flex justify-between text-sm">
                          <span className="text-brand-gray-700">{feature.name}</span>
                          <span className="font-medium">
                            ${calculatePricing(feature.basePrice).finalPrice.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-gray-900">Features Configuration</h3>
            
            <div className="grid gap-4">
              {serviceFeatures.map((feature) => {
                const pricing = calculatePricing(feature.basePrice);
                
                return (
                  <Card key={feature.id} className="border-brand-gray-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{feature.name}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingFeature(feature)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <p className="text-brand-gray-600">Partner Base Price</p>
                          <p className="font-bold text-green-600">${pricing.basePrice.toLocaleString()}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">Read-only</Badge>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <p className="text-brand-gray-600">Tax (30%)</p>
                          <p className="font-bold text-blue-600">${pricing.tax.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded">
                          <p className="text-brand-gray-600">Profit (40%)</p>
                          <p className="font-bold text-purple-600">${pricing.profit.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-brand-primary bg-opacity-10 rounded">
                          <p className="text-brand-gray-600">Final Client Price</p>
                          <p className="font-bold text-brand-primary text-lg">${pricing.finalPrice.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <p className="text-brand-gray-600">Price Markup</p>
                          <p className="font-bold text-yellow-600">
                            {Math.round(((pricing.finalPrice - pricing.basePrice) / pricing.basePrice) * 100)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edit Feature Modal */}
        {editingFeature && (
          <Dialog open={!!editingFeature} onOpenChange={() => setEditingFeature(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Feature: {editingFeature.name}</DialogTitle>
                <DialogDescription>
                  Modify feature details and pricing structure
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="feature-name">Feature Name</Label>
                  <Input
                    id="feature-name"
                    defaultValue={editingFeature.name}
                    placeholder="Enter feature name"
                  />
                </div>
                <div>
                  <Label htmlFor="feature-description">Description</Label>
                  <Input
                    id="feature-description"
                    defaultValue={editingFeature.description}
                    placeholder="Enter feature description"
                  />
                </div>
                <div>
                  <Label htmlFor="base-price">Partner Base Price (Read-only)</Label>
                  <Input
                    id="base-price"
                    type="number"
                    value={editingFeature.basePrice}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-brand-gray-500 mt-1">
                    This price is set by the technical partner
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => setEditingFeature(null)} 
                    variant="outline" 
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1" 
                    disabled={isSubmitting}
                    onClick={async () => {
                      setIsSubmitting(true);
                      try {
                        await axiosInstance.put(`/features/${editingFeature.id}`, {
                          name: (document.getElementById('feature-name') as HTMLInputElement).value,
                          description: (document.getElementById('feature-description') as HTMLInputElement).value
                        });
                        
                        toast({
                          title: 'Success',
                          description: 'Feature updated successfully.'
                        });
                        
                        setEditingFeature(null);
                      } catch (error: any) {
                        toast({
                          title: 'Error',
                          description: error.response?.data?.message || 'Failed to update feature. Please try again.',
                          variant: 'destructive'
                        });
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageFeaturesModal;
