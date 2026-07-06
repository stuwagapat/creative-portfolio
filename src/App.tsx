import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { CreativePlayground } from './components/CreativePlayground';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setLoadingComplete(true), 100);
  };

  return (
    <div className="relative min-h-screen bg-neutral-50">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Custom Cursor - Hidden on mobile */}
      <CustomCursor />

      {/* Background Effects */}
      <BackgroundEffects />

      {/* Navigation */}
      {loadingComplete && <Navigation />}

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />

        <SelectedWorks />

        <About />

        <Skills />

        <CreativePlayground />

        <Contact />

        <Footer />
      </main>
    </div>
  );
}

export default App;
