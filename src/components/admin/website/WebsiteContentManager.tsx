
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SolutionsPageManager from './SolutionsPageManager';
import CaseStudiesPageManager from './CaseStudiesPageManager';


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
          <Tabs defaultValue="solutions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1 h-auto">
              <TabsTrigger value="solutions" className="text-xs sm:text-sm px-2 py-2">Solutions</TabsTrigger>
              <TabsTrigger value="case-study" className="text-xs sm:text-sm px-2 py-2">Case Study</TabsTrigger>
            </TabsList>
            <TabsContent value="solutions" className="mt-4 sm:mt-6">
              <SolutionsPageManager />
            </TabsContent>
            
            <TabsContent value="case-study" className="mt-4 sm:mt-6">
              <CaseStudiesPageManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteContentManager;
