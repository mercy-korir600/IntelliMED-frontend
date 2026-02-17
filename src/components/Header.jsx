import { useState } from 'react';
import { Link } from 'react-router-dom';

// Simple icons with refined stroke weights
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={24} height={24}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={24} height={24}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const brandColor = "#2B4563";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/60 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: brandColor }}
          >
            I
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter leading-none" style={{ color: brandColor }}>
              Intelli<span className="text-slate-400">MED</span>
            </h1>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">
              Healthcare Management
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { name: 'Dashboard', path: '/' },
            { name: 'Register', path: '/RegisterPage' },
            { name: 'Patients', path: '/PatientsPage' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="h-6 w-[1px] bg-slate-200 mx-4" />

        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 bg-slate-50 border border-slate-200"
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4">
          <Link 
            to="/" 
            className="text-lg font-bold text-slate-900 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/PatientsPage" 
            className="text-lg font-bold text-slate-900 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Patients
          </Link>
        </div>
      )}
    </header>
  );
}