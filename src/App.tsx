import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Programs from './components/Programs';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Founder from './components/Founder';
import Footer from './components/Footer';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

function App() {
  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <motion.div {...fadeInUp}>
          <Hero />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <Features />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Programs />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
          <About />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
          <WhyChoose />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
          <Services />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
          <Testimonials />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.7 }}>
          <FAQ />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.8 }}>
          <Contact />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.9 }}>
          <Founder />
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 1.0 }}>
          <Footer />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;