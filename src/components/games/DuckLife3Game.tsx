import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface DuckLife3GameProps {
  onBack: () => void;
}

const DuckLife3Game: React.FC<DuckLife3GameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/AndreajnRcm4/b398dl2h74v@9a23fbb2373d743a564873251cbb57736ebc1f73/style.css" type="text/css" />
</head>
<body>
<script src="https://cdn.jsdelivr.net/gh/u-cvlassrom-y/google@main/ruffle.js"></script>
<object width="100%" height="100%">
    <param name="movie" value="https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo@aeb3030a3fb90987658ff4ee1063c64f6206152f/dl3/ducklife3game.swf">
    <embed src="https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo@aeb3030a3fb90987658ff4ee1063c64f6206152f/dl3/ducklife3game.swf" width="100%" height="100%">
</object>
</body>
</html>
    `;

    const blob = new Blob([gameHTML], { type: 'text/html' });
    const gameUrl = URL.createObjectURL(blob);

    if (iframeRef.current) {
      iframeRef.current.src = gameUrl;
    }

    return () => {
      URL.revokeObjectURL(gameUrl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Games
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Duck Life 3: Evolution
          </h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Duck Life 3: Evolution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[600px]">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0 rounded-lg"
                title="Duck Life 3 Game"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Evolution meets duck training in Duck Life 3!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DuckLife3Game;