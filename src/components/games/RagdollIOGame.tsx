import React, { useRef, useEffect } from 'react';

interface RagdollIOGameProps {
  onBack: () => void;
}

const RagdollIOGame: React.FC<RagdollIOGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paigerodeghero/academicwebsite@897c910c65e6c68b04c44a6b6eba0b99d0f2f2cf/TemplateData/style.css"> 
<script src="https://cdn.jsdelivr.net/gh/paigerodeghero/academicwebsite@897c910c65e6c68b04c44a6b6eba0b99d0f2f2cf/TemplateData/UnityProgress.js"></script> 
<script src="https://cdn.jsdelivr.net/gh/gertdoro/Kubeflow@cae221a7618ee671ab5f8aa8403f0e9921e4d1ab/releasing/Ragdoll-io.js"></script> 
<script> 
var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/gertdoro/Kubeflow@cae221a7618ee671ab5f8aa8403f0e9921e4d1ab/releasing/Ragdoll-io.json", {onProgress: UnityProgress,Module:{onRuntimeInitialized: function() {UnityProgress(gameInstance, "complete")}}}); 
</script> 
<script src=""></script> 
</head>
<body>
<div class="webgl-content"> 
<div id="gameContainer" style="width: 100vw; height: 100vh"></div> 
</div>
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
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Ragdoll.io Game"
      />
    </div>
  );
};

export default RagdollIOGame;