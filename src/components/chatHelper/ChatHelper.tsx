import { useEffect } from 'react';

export const ChatHelper = () => {

  // if (true) return null;

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://bot.jaicp.com/chatwidget/UExlQkiu:277a2573c21e756ca11202de98b066372280154e/justwidget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};
