import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ExternalLink } from 'lucide-react';

const Proxy = () => {
  const embeddedUrl = 'https://skryptonite.vercel.app/home';
  
  const openInBlank = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
<title>Fullscreen Embed</title>
<style>
  html, body {
    height: 100%; /* Make sure the html and body take full height */
    margin: 0;     /* Remove default body margins */
    overflow: hidden; /* Prevent scrollbars if the embedded content is larger */
  }
  iframe {
    display: block; /* Prevent extra space below the iframe */
    width: 100%;
    height: 100%;
    border: none;   /* Remove the default border */
  }
</style>
</head>
<body>

  <iframe src="https://skryptonite.vercel.app/home"></iframe>

</body>
</html>`;
    
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Neon background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Application Portal</h1>
          </div>
          <p className="text-muted-foreground">
            Access web applications through our neon-powered portal.
          </p>
        </div>

        {/* Embedded Site */}
        <Card className="h-[calc(100vh-200px)] bg-card/30 backdrop-blur-lg border-2 border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={openInBlank}
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-300"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open in Fullscreen
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-60px)]">
            <iframe
              src={embeddedUrl}
              className="w-full h-full border-0 rounded-b-lg shadow-inner"
              title="Application Portal"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-navigation"
            />
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-6 p-4 bg-muted/20 backdrop-blur-sm rounded-lg border border-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.1)]">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This portal provides access to external web services. Please respect all terms of service and your institution's policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proxy;