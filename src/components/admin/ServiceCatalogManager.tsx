
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, BookOpen, DollarSign, Building, ShoppingCart, Truck, MapPin, Car } from 'lucide-react';
import { useServiceData } from '@/hooks/useServiceData';

const ServiceCatalogManager = () => {
  const { services, features } = useServiceData();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showPricing, setShowPricing] = useState(false);

  const handleViewPricing = (service: any) => {
    setSelectedService(service);
    setShowPricing(true);
  };

  const getServiceIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Heart': Heart,
      'GraduationCap': BookOpen,
      'ShoppingCart': ShoppingCart,
      'Banknote': DollarSign,
      'Home': Building,
      'Plane': MapPin,
      'Truck': Truck,
      'Car': Car
    };
    return iconMap[iconName] || Heart;
  };

  const getServiceFeatures = (serviceId: string) => {
    return features.filter(feature => feature.serviceId === serviceId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-gray-900">Service Catalog</h2>
          <p className="text-brand-gray-600">Manage service categories and features</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => {
          const ServiceIcon = getServiceIcon(service.icon);
          const serviceFeatures = getServiceFeatures(service.id);
          
          return (
            <Card key={service.id} className="border-brand-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center`}>
                  <ServiceIcon className={`w-8 h-8 ${service.color}`} />
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription>
                  {serviceFeatures.length} features available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={() => handleViewPricing(service)}
                    className="bg-brand-primary hover:bg-brand-primary/90 w-full"
                  >
                    View Pricing
                  </Button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-brand-gray-700">Sample Features:</p>
                  <div className="space-y-1">
                    {serviceFeatures.slice(0, 3).map((feature) => (
                      <div key={feature.id} className="flex items-center justify-between">
                        <span className="text-brand-gray-600 text-xs">{feature.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          ${feature.basePrice.toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                    {serviceFeatures.length > 3 && (
                      <p className="text-xs text-brand-gray-500">
                        +{serviceFeatures.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Base Pricing Modal */}
      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedService && (
                <>
                  {(() => {
                    const ServiceIcon = getServiceIcon(selectedService.icon);
                    return <ServiceIcon className={`w-6 h-6 ${selectedService.color}`} />;
                  })()}
                  <span>{selectedService.name} - Base Pricing</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Base prices for all features in the {selectedService?.name} service category
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-4">
              <div className="grid gap-3">
                {getServiceFeatures(selectedService.id).map((feature) => (
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
              </div>
              
              <div className="border-t pt-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-brand-gray-900">
                    Total Base Price: ${getServiceFeatures(selectedService.id).reduce((sum, feature) => sum + feature.basePrice, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-brand-gray-600">
                    Sum of all {getServiceFeatures(selectedService.id).length} features
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceCatalogManager;
