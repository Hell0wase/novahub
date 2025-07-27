import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ExternalLink } from 'lucide-react';

const Proxy = () => {
  const embeddedUrl = 'https://skryptonite.vercel.app/home';

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Web Portal</h1>
          </div>
          <p className="text-muted-foreground">
            Access web services through our integrated portal.
          </p>
        </div>

        {/* Embedded Site */}
        <Card className="h-[calc(100vh-200px)]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Browsing: {embeddedUrl}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(embeddedUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open in New Tab
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-60px)]">
            <iframe
              src={embeddedUrl}
              className="w-full h-full border-0 rounded-b-lg"
              title="Web Portal"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
            />
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This portal provides access to external web services. Please respect all terms of service and your institution's policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proxy;