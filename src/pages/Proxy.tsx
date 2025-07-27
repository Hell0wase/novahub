import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Shield, ArrowLeft, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Proxy = () => {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    let formattedUrl = url.trim();
    
    // Add protocol if missing
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      new URL(formattedUrl); // Validate URL
      setCurrentUrl(formattedUrl);
      toast({
        title: "Success",
        description: "Website loaded successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleClearProxy = () => {
    setCurrentUrl('');
    setUrl('');
  };

  const popularSites = [
    { name: 'Google', url: 'https://google.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'Wikipedia', url: 'https://wikipedia.org' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Reddit', url: 'https://reddit.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
  ];

  const handleQuickAccess = (siteUrl: string) => {
    setUrl(siteUrl);
    setCurrentUrl(siteUrl);
    toast({
      title: "Loading",
      description: "Loading website...",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Web Proxy</h1>
          </div>
          <p className="text-muted-foreground">
            Browse the web securely through our proxy. Access blocked websites and maintain your privacy.
          </p>
        </div>

        {/* Proxy Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Enter Website URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter URL (e.g., github.com or https://github.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Go"}
                </Button>
                {currentUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearProxy}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>

            {/* Quick Access */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Quick Access:</h3>
              <div className="flex flex-wrap gap-2">
                {popularSites.map((site) => (
                  <Button
                    key={site.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAccess(site.url)}
                    className="text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {site.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proxy Display */}
        {currentUrl ? (
          <Card className="h-[600px]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Browsing: {currentUrl}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(currentUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open in New Tab
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-60px)]">
              <iframe
                src={currentUrl}
                className="w-full h-full border-0 rounded-b-lg"
                title="Proxy Browser"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="h-96 flex items-center justify-center">
            <CardContent className="text-center">
              <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Ready to Browse</h3>
              <p className="text-muted-foreground">
                Enter a website URL above to start browsing through the proxy
              </p>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This proxy is for educational purposes. Please respect website terms of service and your institution's policies. Some websites may not work properly due to security restrictions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proxy;