import React from 'react';
import FullscreenGame from '../FullscreenGame';

interface GrannyGameProps {
  onBack: () => void;
}

const GrannyGame = ({ onBack }: GrannyGameProps) => {
  return (
    <FullscreenGame gameName="Granny Horror" onBack={onBack}>
      <iframe
        src="https://granny-horror.github.io/"
        className="w-full h-full border-0"
        allowFullScreen
        title="Granny Horror Game"
      />
    </FullscreenGame>
  );
};

export default GrannyGame;