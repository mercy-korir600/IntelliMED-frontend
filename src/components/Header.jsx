import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={22} height={22}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={22} height={22}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const brandColor = "#2B4563";

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Register', path: '/RegisterPage' },
    { name: 'Patients', path: '/PatientsPage' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-slate-200/50 bg-[#2A4A63]   backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-4 group transition-all duration-300 hover:opacity-90">
        
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-baseline leading-none text-white" >
              Intelli<span className="text-white italic">MED</span>
            </h1>
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.25em] mt-1.5 leading-none">
              Health Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl group
                  ${isActive ? 'text-blue-900' : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Hover/Active Pill */}
                {isActive ? (
                  <div className="absolute inset-0 bg-blue-50 rounded-xl -z-0 border border-blue-100/50" />
                ) : (
                  <div className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 rounded-xl -z-0 transition-all duration-300 scale-95 group-hover:scale-100" />
                )}
              </Link>
            );
          })}
          
          <div className="h-5 w-[1px] bg-slate-200 mx-4" />

          {/* Action Button */}
          
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-2xl text-slate-600 bg-white border border-slate-200 shadow-sm active:scale-90 transition-transform"
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          {navLinks.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className={`text-base font-bold p-4 rounded-xl transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-slate-600' : 'text-slate-00 active:bg-slate-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
