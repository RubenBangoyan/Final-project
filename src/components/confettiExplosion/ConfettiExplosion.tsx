import { useEffect } from "react";
import confetti from 'canvas-confetti'

const ConfettiExplosion = () => {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 300,
      origin: { y: 0.6 }
    });
  }, []);

  return null; 
};

export default ConfettiExplosion;
