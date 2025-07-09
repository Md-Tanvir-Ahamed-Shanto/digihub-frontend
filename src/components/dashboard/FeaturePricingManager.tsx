
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useServiceData } from '@/hooks/useServiceData';
import { Service, Feature } from '@/services/serviceData';
import { Edit, Save, DollarSign } from 'lucide-react';

const FeaturePricingManager = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [editingFeatures, setEditingFeatures] = useState<Record<string, boolean>>({});
  const [featurePrices, setFeaturePrices] = useState<Record<string, number>>({});
  const [featureNotes, setFeatureNotes] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { services, features, updateFeature } = useServiceData();

  // Simulate assigned categories for this partner
  const assignedCategoryIds = ['1', '2', '4']; // Healthcare, EduTech, Finance
  const assignedCategories = services.filter(service => assignedCategoryIds.includes(service.id));

  const selectedCategory = services.find(service => service.id === selectedCategoryId);

  const handleEditFeature = (featureId: string) => {
    setEditingFeatures(prev => ({
      ...prev,
      [featureId]: true
    }));
  };

  const handleSaveFeature = (featureId: string, feature: Feature) => {
    const newPrice = featurePrices[featureId] || feature.basePrice;
    const note = featureNotes[featureId] || '';

    const updatedFeature = {
      ...feature,
      basePrice: newPrice
    };

    updateFeature(updatedFeature);

    setEditingFeatures(prev => ({
      ...prev,
      [featureId]: false
    }));

    toast({
      title: "Price Updated",
      description: `Base price for ${feature.name} has been updated to $${newPrice.toLocaleString()}`
    });
  };

  const handlePriceChange = (featureId: string, price: string) => {
    const numericPrice = parseFloat(price) || 0;
    setFeaturePrices(prev => ({
      ...prev,
      [featureId]: numericPrice
    }));
  };

  const handleNoteChange = (featureId: string, note: string) => {
    setFeatureNotes(prev => ({
      ...prev,
      [featureId]: note
    }));
  };

  const getFeaturePrice = (feature: Feature) => {
    return featurePrices[feature.id] || feature.basePrice;
  };

  const getFeatureNote = (feature: Feature) => {
    return featureNotes[feature.id] || '';
  };

  const getCategoryFeatures = (categoryId: string) => {
    return features.filter(feature => feature.serviceId === categoryId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-gray-900">Feature Pricing</h2>
          <p className="text-brand-gray-600">Set base prices for features in your assigned categories</p>
        </div>
      </div>

      {/* Category Selection */}
      <Card className="border-brand-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-brand-secondary" />
            <span>Select Service Category</span>
          </CardTitle>
          <CardDescription>
            Choose a category to manage feature pricing. You can only edit categories assigned to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category-select">Assigned Categories</Label>
              <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service category" />
                </SelectTrigger>
                <SelectContent>
                  {assignedCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center space-x-2">
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {getCategoryFeatures(category.id).length} features
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {assignedCategories.length === 0 && (
              <div className="text-center py-8">
                <p className="text-brand-gray-500">No categories assigned to you yet.</p>
                <p className="text-sm text-brand-gray-400">Contact the admin to get categories assigned.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features Pricing Table */}
      {selectedCategory && (
        <Card className="border-brand-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>{selectedCategory.name} - Features Pricing</span>
            </CardTitle>
            <CardDescription>
              Set your base production cost for each feature. Admin will handle tax and profit margin calculations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {getCategoryFeatures(selectedCategory.id).map((feature) => {
                const isEditing = editingFeatures[feature.id];
                const currentPrice = getFeaturePrice(feature);
                const currentNote = getFeatureNote(feature);

                return (
                  <Card key={feature.id} className="border border-brand-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{feature.name}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                        {!isEditing ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditFeature(feature.id)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Price
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleSaveFeature(feature.id, feature)}
                            className="bg-brand-secondary hover:bg-brand-secondary/90"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`price-${feature.id}`}>
                              Base Production Cost
                            </Label>
                            {isEditing ? (
                              <Input
                                id={`price-${feature.id}`}
                                type="number"
                                value={currentPrice}
                                onChange={(e) => handlePriceChange(feature.id, e.target.value)}
                                placeholder="Enter base price"
                                className="text-lg font-semibold"
                              />
                            ) : (
                              <div className="p-3 bg-green-50 rounded-md border">
                                <p className="text-2xl font-bold text-green-600">
                                  ${currentPrice.toLocaleString()}
                                </p>
                              </div>
                            )}
                          </div>

                          <div>
                            <Label htmlFor={`note-${feature.id}`}>
                              Notes (Optional)
                            </Label>
                            {isEditing ? (
                              <Textarea
                                id={`note-${feature.id}`}
                                value={currentNote}
                                onChange={(e) => handleNoteChange(feature.id, e.target.value)}
                                placeholder="Add any notes about this feature pricing..."
                                rows={3}
                              />
                            ) : (
                              <div className="p-3 bg-gray-50 rounded-md border min-h-[80px]">
                                <p className="text-brand-gray-700">
                                  {currentNote || "No notes added"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label>Price Breakdown (Admin Controlled)</Label>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                <span className="text-sm text-brand-gray-600">Your Base Price:</span>
                                <span className="font-semibold text-green-600">
                                  ${currentPrice.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                                <span className="text-sm text-brand-gray-600">+ Tax (30%):</span>
                                <span className="font-semibold text-blue-600">
                                  ${Math.round(currentPrice * 0.30).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                                <span className="text-sm text-brand-gray-600">+ Profit (40%):</span>
                                <span className="font-semibold text-purple-600">
                                  ${Math.round(currentPrice * 0.40).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-brand-primary bg-opacity-10 rounded border-2 border-brand-primary">
                                <span className="font-medium text-brand-gray-900">Final Client Price:</span>
                                <span className="text-xl font-bold text-brand-primary">
                                  ${(currentPrice + Math.round(currentPrice * 0.30) + Math.round(currentPrice * 0.40)).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
                            <p className="text-sm text-yellow-800">
                              <strong>Note:</strong> You can only set the base production cost. 
                              Tax and profit margins are automatically calculated by the admin system.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      {selectedCategory && (
        <Card className="bg-brand-gray-50 border-brand-primary">
          <CardHeader>
            <CardTitle>Category Summary</CardTitle>
            <CardDescription>
              Overview of all features in {selectedCategory.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-primary">
                  {getCategoryFeatures(selectedCategory.id).length}
                </p>
                <p className="text-sm text-brand-gray-600">Total Features</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${getCategoryFeatures(selectedCategory.id).reduce((sum, f) => sum + getFeaturePrice(f), 0).toLocaleString()}
                </p>
                <p className="text-sm text-brand-gray-600">Total Base Cost</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  ${getCategoryFeatures(selectedCategory.id).reduce((sum, f) => 
                    sum + getFeaturePrice(f) + Math.round(getFeaturePrice(f) * 0.30) + Math.round(getFeaturePrice(f) * 0.40), 0
                  ).toLocaleString()}
                </p>
                <p className="text-sm text-brand-gray-600">Total Client Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    ((getCategoryFeatures(selectedCategory.id).reduce((sum, f) => 
                      sum + Math.round(getFeaturePrice(f) * 0.30) + Math.round(getFeaturePrice(f) * 0.40), 0
                    ) / getCategoryFeatures(selectedCategory.id).reduce((sum, f) => sum + getFeaturePrice(f), 0)) * 100)
                  )}%
                </p>
                <p className="text-sm text-brand-gray-600">Avg. Markup</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeaturePricingManager;
