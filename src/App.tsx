import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import FAQ from '@/pages/FAQ';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

// Dashboard sub-pages
import Alerts from '@/pages/dashboard/Alerts';
import Monitor from '@/pages/dashboard/Monitor';
import Models from '@/pages/dashboard/Models';
import Analytics from '@/pages/dashboard/Analytics';
import Quality from '@/pages/dashboard/Quality';
import UsersPage from '@/pages/dashboard/Users';
import Security from '@/pages/dashboard/Security';
import EdgeAI from '@/pages/dashboard/EdgeAI';
import OCRDocs from '@/pages/dashboard/OCR';
import SystemHealth from '@/pages/dashboard/SystemHealth';

const STANDALONE_ROUTES = ['/login', '/register', '/forgot-password', '/dashboard', '/profile', '/settings'];

function AppShell() {
  const { pathname } = useLocation();
  const isStandalone = STANDALONE_ROUTES.some(r => pathname.startsWith(r));

  return (
    <>
      {!isStandalone && <Navbar />}
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard — role-based */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/alerts" element={<Alerts />} />
        <Route path="/dashboard/monitor" element={<Monitor />} />
        <Route path="/dashboard/models" element={<Models />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/quality" element={<Quality />} />
        <Route path="/dashboard/users" element={<UsersPage />} />
        <Route path="/dashboard/security" element={<Security />} />
        <Route path="/dashboard/edge" element={<EdgeAI />} />
        <Route path="/dashboard/ocr" element={<OCRDocs />} />
        <Route path="/dashboard/system" element={<SystemHealth />} />

        {/* User pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isStandalone && <Footer />}
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
