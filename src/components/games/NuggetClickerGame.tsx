import React, { useRef, useEffect } from 'react';

interface NuggetClickerGameProps {
  onBack: () => void;
}

const NuggetClickerGame: React.FC<NuggetClickerGameProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const gameHTML = `
<html>
<head>
<meta http-equiv="origin-trial" content="A9AxgGSwmnfgzzkyJHILUr3H8nJ/3D+57oAsL4DBt4USlng4jZ0weq+fZtHC/Qwwn6gd4QSa5DzT3OBif+kXVA0AAAB4eyJvcmlnaW4iOiJodHRwczovL2ltYXNkay5nb29nbGVhcGlzLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9">
<meta http-equiv="origin-trial" content="AlK2UR5SkAlj8jjdEc9p3F3xuFYlF6LYjAML3EOqw1g26eCwWPjdmecULvBH5MVPoqKYrOfPhYVL71xAXI1IBQoAAAB8eyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiV2ViVmlld1hSZXF1ZXN0ZWRXaXRoRGVwcmVjYXRpb24iLCJleHBpcnkiOjE3NTgwNjcxOTksImlzU3ViZG9tYWluIjp0cnVlfQ==">
</head>
<body data-new-gr-c-s-loaded="14.1202.0">
<div id="fr" data='<iframe width="100%" height="100%" src="https://script.google.com/macros/s/AKfycbzjgnGGeTNL2DTjJzVx3WGvsLjEyA47O6xYss-ijTLWWwrQv9siK9Gn_QqNDlDkrc27/exec" frameborder="0" allowfullscreen></iframe>'>
<iframe width="100%" height="100%" src="https://script.google.com/macros/s/AKfycbzjgnGGeTNL2DTjJzVx3WGvsLjEyA47O6xYss-ijTLWWwrQv9siK9Gn_QqNDlDkrc27/exec" frameborder="0" allowfullscreen=""></iframe>
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
        title="Nugget Clicker Game"
      />
    </div>
  );
};

export default NuggetClickerGame;