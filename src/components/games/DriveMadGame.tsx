import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface DriveMadGameProps {
  onBack: () => void;
}

const DriveMadGame = ({ onBack }: DriveMadGameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHtml = `
      <!DOCTYPE html>
      <html lang="en-us">
      <head>
        <base href="https://cdn.jsdelivr.net/gh/genizy/dmad-poki@49b5ab6b987f5f3be58f9dae59c92e8fc1aab9b0/">
        <script>
        window.assgdd = {
          "ancestorOrigins": {
              "0": "https://games.poki.com",
              "1": "https://poki.com"
          },
          "href": "https://f9564e4e-ef25-4e4b-ba67-cb11a1576bbd.poki-gdn.com/cc1bc57a-e355-4696-97c2-097bf6188606/index.html?country=US&url_referrer=https%3A%2F%2Fpoki.com%2F&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fdrive-mad&hoist=yes&nonPersonalized=n&cloudsavegames=n&familyFriendly=n&categories=78%2C93%2C96%2C103%2C377%2C390%2C400%2C893%2C929%2C1126%2C1139%2C1140%2C1141%2C1143%2C1147%2C1163%2C1185%2C1190%2C1193%2C1197&special_condition=landing&game_id=f9564e4e-ef25-4e4b-ba67-cb11a1576bbd&game_version_id=cc1bc57a-e355-4696-97c2-097bf6188606&inspector=0",
          "origin": "https://f9564e4e-ef25-4e4b-ba67-cb11a1576bbd.poki-gdn.com",
          "protocol": "https:",
          "host": "f9564e4e-ef25-4e4b-ba67-cb11a1576bbd.poki-gdn.com",
          "hostname": "f9564e4e-ef25-4e4b-ba67-cb11a1576bbd.poki-gdn.com",
          "port": "",
          "pathname": "/cc1bc57a-e355-4696-97c2-097bf6188606/index.html",
          "search": "?country=US&url_referrer=https%3A%2F%2Fpoki.com%2F&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fdrive-mad&hoist=yes&nonPersonalized=n&cloudsavegames=n&familyFriendly=n&categories=78%2C93%2C96%2C103%2C377%2C390%2C400%2C893%2C929%2C1126%2C1139%2C1140%2C1141%2C1143%2C1147%2C1163%2C1185%2C1190%2C1193%2C1197&special_condition=landing&game_id=f9564e4e-ef25-4e4b-ba67-cb11a1576bbd&game_version_id=cc1bc57a-e355-4696-97c2-097bf6188606&inspector=0",
          "hash": ""
        }
        </script>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Drive Mad</title>
        <meta name="description" content="">
        <meta name="google" content="notranslate">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <link rel="stylesheet" href="webapp/fancade.css">
        <link rel="icon" href="webapp/favicon.ico">
        <script src="poki-sdk.js"></script>
        <style>
          body { margin: 0; padding: 0; overflow: hidden; background: #000; }
          #canvas_border { width: 100%; height: 100vh; }
          canvas { width: 100%; height: 100%; }
        </style>
      </head>
      <body id="body">
        <div id="modal_parent">
          <div id="modal_content">
            <span id="modal_close_button">&times;</span>
            <div id="store_link_modal_content" class="modal_inner"></div>
            <div id="share_file_modal_content" class="modal_inner"></div>
          </div>
        </div>
        <div id="canvas_border" class="emscripten_border">
          <div id="play_content" class="middle center">
            <div class="edge">
              <div class="box">
                <div class="black">
                  <img src="webapp/cover.jpg" class="cover">
                  <p class="title">Drive Mad</p>
                  <p class="author">Fancade</p>
                </div>
              </div>
            </div>
            <div id="progress_or_play">
              <progress id="progress" class="loading" value="0" max="100"></progress>
            </div>
            <p class="description"></p>
          </div>
          <canvas class="emscripten" id="canvas" tabindex=-1></canvas>
          <div id="gradient"></div>
          <div id="webview_content"></div>
        </div>
        <script type="text/javascript" src="webapp/source_min.js"></script>
        <script type="text/javascript" src="webapp/index.js"></script>
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
            Drive Mad
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Drive Mad - Crazy Car Stunts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                ref={iframeRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                title="Drive Mad Game"
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Use arrow keys or WASD to drive. Balance your car and reach the finish line!</p>
        </div>
      </div>
    </div>
  );
};

export default DriveMadGame;