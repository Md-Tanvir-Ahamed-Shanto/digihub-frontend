import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, DollarSign, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useServiceData } from '@/hooks/useServiceData';
import { Feature } from '@/services/serviceData';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface CalculationResult {
  basePrice: number;
  agencyMargin: number;
  subtotal: number;
  tax: number;
  finalPrice: number;
  selectedFeatures: Feature[];
}

const ServiceCalculator = () => {
  const { toast } = useToast();
  const { services, features } = useServiceData();
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);

  const getServiceFeatures = (serviceId: string) => {
    return features.filter(feature => feature.serviceId === serviceId && feature.isActive);
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedFeatures([]);
    setCalculation(null);
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculatePrice = () => {
    if (!selectedService || selectedFeatures.length === 0) {
      toast({
        title: "Error",
        description: "Please select a service and at least one feature.",
        variant: "destructive"
      });
      return;
    }

    const selectedFeatureObjects = features.filter(f => selectedFeatures.includes(f.id));
    const basePrice = selectedFeatureObjects.reduce((sum, feature) => sum + feature.basePrice, 0);
    
    // Calculate agency margin as 150% of base price (1.5 times the base price)
    const agencyMargin = Math.round(basePrice * 1.5);
    const subtotal = basePrice + agencyMargin;
    
    // Calculate tax as 30% of subtotal
    const tax = Math.round(subtotal * 0.3);
    const finalPrice = subtotal + tax;

    const result: CalculationResult = {
      basePrice,
      agencyMargin,
      subtotal,
      tax,
      finalPrice,
      selectedFeatures: selectedFeatureObjects
    };

    setCalculation(result);

    toast({
      title: "Calculation Complete",
      description: `Final price: $${finalPrice.toLocaleString()}`
    });
  };

  const generateQuote = () => {
    if (!calculation) return;

    const serviceName = services.find(s => s.id === selectedService)?.name || 'Unknown Service';
    const date = new Date().toLocaleDateString();
    
    const quoteData = {
      service: serviceName,
      date,
      features: calculation.selectedFeatures.map(f => ({ name: f.name, price: f.basePrice })),
      pricing: {
        basePrice: calculation.basePrice,
        agencyMargin: calculation.agencyMargin,
        subtotal: calculation.subtotal,
        tax: calculation.tax,
        finalPrice: calculation.finalPrice
      }
    };

    // In a real application, this would generate and download a PDF
    console.log('Quote Data:', quoteData);
    
    toast({
      title: "Quote Generated",
      description: "Quote has been prepared for download."
    });
  };

  const serviceFeatures = selectedService ? getServiceFeatures(selectedService) : [];
  const selectedServiceName = services.find(s => s.id === selectedService)?.name;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-brand-gray-900">Price Calculator</h3>
          <p className="text-sm text-brand-gray-600">Calculate development costs for client projects</p>
        </div>
        <Calculator className="w-8 h-8 text-brand-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selection Panel */}
        <div className="space-y-6">
          {/* Service Selection */}
          <Card className="border-brand-gray-200">
            <CardHeader>
              <CardTitle className="text-base">Select Service</CardTitle>
              <CardDescription>Choose the service category for your project</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedService} onValueChange={handleServiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Feature Selection */}
          {selectedService && (
            <Card className="border-brand-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Select Features</CardTitle>
                <CardDescription>
                  Choose the features required for your {selectedServiceName} project
                </CardDescription>
              </CardHeader>
              <CardContent>
                {serviceFeatures.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-brand-gray-600">No features available for this service</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {serviceFeatures.map(feature => (
                      <div key={feature.id} className="flex items-start space-x-3 p-3 border border-brand-gray-200 rounded-lg">
                        <Checkbox
                          id={feature.id}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <label htmlFor={feature.id} className="text-sm font-medium text-brand-gray-900 cursor-pointer">
                              {feature.name}
                            </label>
                            <Badge variant="secondary" className="text-xs">
                              ${feature.basePrice}
                            </Badge>
                          </div>
                          <p className="text-xs text-brand-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Calculate Button */}
          {selectedService && selectedFeatures.length > 0 && (
            <Button onClick={calculatePrice} className="w-full bg-brand-primary hover:bg-brand-primary/90">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Price
            </Button>
          )}
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {calculation ? (
            <>
              {/* Pricing Breakdown */}
              <Card className="border-brand-gray-200">
                <CardHeader>
                  <CardTitle className="text-base">Pricing Breakdown</CardTitle>
                  <CardDescription>
                    Detailed cost calculation for {selectedServiceName} project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-gray-600">Base Price ({calculation.selectedFeatures.length} features)</span>
                      <span className="font-medium">${calculation.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-gray-600">Agency Margin (150%)</span>
                      <span className="font-medium">${calculation.agencyMargin.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm text-brand-gray-600">Subtotal</span>
                      <span className="font-medium">${calculation.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-gray-600">Tax (30%)</span>
                      <span className="font-medium">${calculation.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-lg">
                      <span className="font-semibold text-brand-gray-900">Final Client Price</span>
                      <span className="font-bold text-brand-primary">${calculation.finalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Features Summary */}
              <Card className="border-brand-gray-200">
                <CardHeader>
                  <CardTitle className="text-base">Selected Features</CardTitle>
                  <CardDescription>Features included in this estimate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {calculation.selectedFeatures.map(feature => (
                      <div key={feature.id} className="flex justify-between items-center p-2 bg-brand-gray-50 rounded">
                        <span className="text-sm text-brand-gray-900">{feature.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          ${feature.basePrice}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button onClick={generateQuote} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </>
          ) : (
            <Card className="border-brand-gray-200">
              <CardContent className="p-8 text-center">
                <DollarSign className="w-12 h-12 text-brand-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-brand-gray-900 mb-2">No Calculation Yet</h3>
                <p className="text-brand-gray-600">
                  Select a service and features to see the pricing breakdown
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCalculator;
