import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface PolytrackGameProps {
  onBack: () => void;
}

const PolytrackGame = ({ onBack }: PolytrackGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <base href="https://cdn.jsdelivr.net/gh/genizy/polytrack@main/">
        <script>
          window.jkdfgnjkndfg = document.querySelector('base').href;
          fetch("simulation_worker.bundle.js").then(res => res.text()).then(text => {
            const blob = new Blob([text.replaceAll("replacethisplease", window.jkdfgnjkndfg)], { type: 'application/javascript' });
            window.simulationworker = URL.createObjectURL(blob);
          });
          const ogworker = window.Worker;
          window.Worker = function (scripturl, options) {
            if (typeof scripturl === 'string' && scripturl.toLowerCase() === "simulation_worker.bundle.js") {
              scripturl = window.simulationworker;
            }
            return new ogworker(scripturl, options);
          };
          window.Worker.prototype = ogworker.prototype;

          const ogfetch = window.fetch;
          window.fetch = async function (input, init) {
            if (typeof input === "string") {
              input = input.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
            } else if (input instanceof Request) {
              const newUrl = input.url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
              input = new Request(newUrl, input);
            }
            return ogfetch(input, init);
          };

          const ogxml = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function (method, url, ...rest) {
            if (typeof url === "string") {
              url = url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
            }
            return ogxml.call(this, method, url, ...rest);
          };
        </script>
        <link rel="manifest" href="manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          #screen { width: 100%; height: 100vh; }
          #ui { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
          #transition-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <canvas id="screen"></canvas>
        <div id="ui"></div>
        <div id="transition-layer"></div>
        <script type="module" src="main.bundle.js" defer></script>
      </body>
      </html>
    `;

    if (iframeRef.current) {
      const blob = new Blob([gameHtml], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      iframeRef.current.src = blobUrl;

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Polytrack
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Polytrack - Low-Poly Racing</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                title="Polytrack Game"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Use WASD or arrow keys to drive. Race through challenging low-poly tracks!</p>
        </div>
      </div>
    </div>
  );
};

export default PolytrackGame;