
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Feature {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  basePrice: number;
  isActive: boolean;
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Healthcare',
    description: 'Medical and healthcare solutions',
    icon: 'Heart',
    color: 'text-red-600'
  },
  {
    id: '2',
    name: 'EduTech',
    description: 'Educational technology solutions',
    icon: 'GraduationCap',
    color: 'text-blue-600'
  },
  {
    id: '3',
    name: 'E-commerce',
    description: 'Online retail and marketplace solutions',
    icon: 'ShoppingCart',
    color: 'text-green-600'
  },
  {
    id: '4',
    name: 'Finance',
    description: 'Financial and fintech solutions',
    icon: 'Banknote',
    color: 'text-yellow-600'
  },
  {
    id: '5',
    name: 'Real Estate',
    description: 'Property management and real estate solutions',
    icon: 'Home',
    color: 'text-purple-600'
  },
  {
    id: '6',
    name: 'Tourism',
    description: 'Travel and tourism solutions',
    icon: 'Plane',
    color: 'text-orange-600'
  },
  {
    id: '7',
    name: 'Logistics',
    description: 'Supply chain and logistics solutions',
    icon: 'Truck',
    color: 'text-gray-600'
  },
  {
    id: '8',
    name: 'Automotive',
    description: 'Automotive industry solutions',
    icon: 'Car',
    color: 'text-indigo-600'
  }
];

export const initialFeatures: Feature[] = [
  {
    id: '1',
    serviceId: '1',
    name: 'User Login System',
    description: 'Secure user authentication and authorization',
    basePrice: 20,
    isActive: true
  },
  {
    id: '2',
    serviceId: '1',
    name: 'Doctor Profile Management',
    description: 'Complete doctor profile and credentials management',
    basePrice: 30,
    isActive: true
  },
  {
    id: '3',
    serviceId: '1',
    name: 'Appointment Booking System',
    description: 'Online appointment scheduling and management',
    basePrice: 40,
    isActive: true
  },
  {
    id: '4',
    serviceId: '1',
    name: 'E-prescription Generator',
    description: 'Digital prescription creation and management',
    basePrice: 25,
    isActive: true
  },
  {
    id: '5',
    serviceId: '1',
    name: 'Health Report Upload & Download',
    description: 'Medical records and health report management',
    basePrice: 35,
    isActive: true
  },
  {
    id: '6',
    serviceId: '3',
    name: 'Product Catalog Management',
    description: 'Complete product listing and categorization',
    basePrice: 45,
    isActive: true
  },
  {
    id: '7',
    serviceId: '3',
    name: 'Shopping Cart & Checkout',
    description: 'Full e-commerce cart and payment processing',
    basePrice: 60,
    isActive: true
  },
  {
    id: '8',
    serviceId: '3',
    name: 'Order Management System',
    description: 'Order tracking and fulfillment management',
    basePrice: 50,
    isActive: true
  }
];

// Create a simple data store
class ServiceDataStore {
  private features: Feature[] = [...initialFeatures];
  private listeners: (() => void)[] = [];

  getServices(): Service[] {
    return services;
  }

  getFeatures(): Feature[] {
    return [...this.features];
  }

  addFeature(feature: Feature): void {
    this.features.push(feature);
    this.notifyListeners();
  }

  updateFeature(updatedFeature: Feature): void {
    this.features = this.features.map(f => 
      f.id === updatedFeature.id ? updatedFeature : f
    );
    this.notifyListeners();
  }

  deleteFeature(featureId: string): void {
    this.features = this.features.filter(f => f.id !== featureId);
    this.notifyListeners();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const serviceDataStore = new ServiceDataStore();
