import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { getTemplates } from './services/api';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Templates from './pages/Templates';
import TemplateDetail from './pages/TemplateDetail';
import Order from './pages/Order';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = { duration: 0.35, ease: 'easeInOut' };


function AnimatedRoutes() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    window.scrollTo(0, 0);
    // Wake up backend if it's sleeping (Render free tier)
    getTemplates().catch(() => {});
  }, [location.pathname]);

  return (
    <>
      {!isAdminPage && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/:id" element={<TemplateDetail />} />
            <Route path="/order" element={<Order />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center pt-16 bg-dark-900">
                <div className="text-center px-4">
                  <p className="text-8xl font-display font-black gradient-text mb-4">404</p>
                  <p className="text-white text-xl font-semibold mb-2">Page Not Found</p>
                  <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              </div>
            } />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 selection:bg-primary-500/30">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
