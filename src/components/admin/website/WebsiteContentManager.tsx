
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HomePageManager from './HomePageManager';
import SolutionsPageManager from './SolutionsPageManager';
import CaseStudiesPageManager from './CaseStudiesPageManager';
import HowItWorksPageManager from './HowItWorksPageManager';
import AboutPageManager from './AboutPageManager';
import ContactPageManager from './ContactPageManager';

const WebsiteContentManager = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Website Content Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Manage Website Pages</CardTitle>
          <CardDescription className="text-sm sm:text-base">Update content for all public-facing website pages</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1 h-auto">
              <TabsTrigger value="home" className="text-xs sm:text-sm px-2 py-2">Home</TabsTrigger>
              <TabsTrigger value="solutions" className="text-xs sm:text-sm px-2 py-2">Solutions</TabsTrigger>
              <TabsTrigger value="case-study" className="text-xs sm:text-sm px-2 py-2">Case Study</TabsTrigger>
              <TabsTrigger value="how-it-works" className="text-xs sm:text-sm px-2 py-2">How It Works</TabsTrigger>
              <TabsTrigger value="about" className="text-xs sm:text-sm px-2 py-2">About</TabsTrigger>
              <TabsTrigger value="contact" className="text-xs sm:text-sm px-2 py-2">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="home" className="mt-4 sm:mt-6">
              <HomePageManager />
            </TabsContent>
            
            <TabsContent value="solutions" className="mt-4 sm:mt-6">
              <SolutionsPageManager />
            </TabsContent>
            
            <TabsContent value="case-study" className="mt-4 sm:mt-6">
              <CaseStudiesPageManager />
            </TabsContent>
            
            <TabsContent value="how-it-works" className="mt-4 sm:mt-6">
              <HowItWorksPageManager />
            </TabsContent>
            
            <TabsContent value="about" className="mt-4 sm:mt-6">
              <AboutPageManager />
            </TabsContent>
            
            <TabsContent value="contact" className="mt-4 sm:mt-6">
              <ContactPageManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteContentManager;
