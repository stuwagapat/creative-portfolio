import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { BentoPortfolio } from './components/BentoPortfolio';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setLoadingComplete(true), 100);
  };

  return (
    <div className="relative min-h-screen bg-[#F6F4F0] overflow-x-hidden">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Custom Cursor - Hidden on mobile */}
      <CustomCursor />

      {/* Main Content */}
      <main className="relative z-10">
        {loadingComplete && <BentoPortfolio />}
      </main>
    </div>
  );
}

export default App;
