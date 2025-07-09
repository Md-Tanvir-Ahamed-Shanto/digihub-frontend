
import { useState, useEffect } from 'react';
import { serviceDataStore, Service, Feature } from '@/services/serviceData';

export const useServiceData = () => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    setFeatures(serviceDataStore.getFeatures());

    const unsubscribe = serviceDataStore.subscribe(() => {
      setFeatures(serviceDataStore.getFeatures());
    });

    return unsubscribe;
  }, []);

  const services = serviceDataStore.getServices();

  const addFeature = (feature: Feature) => {
    serviceDataStore.addFeature(feature);
  };

  const updateFeature = (feature: Feature) => {
    serviceDataStore.updateFeature(feature);
  };

  const deleteFeature = (featureId: string) => {
    serviceDataStore.deleteFeature(featureId);
  };

  return {
    services,
    features,
    addFeature,
    updateFeature,
    deleteFeature
  };
};
