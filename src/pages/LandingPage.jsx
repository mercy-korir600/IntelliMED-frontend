import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Patient Registration",
    description:
      "Quick enrollment with comprehensive information capture and digital record creation.",
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80",
  },
  {
    title: "Vital Tracking",
    description:
      "Record height, weight, and automatic BMI calculations with real-time health alerts.",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80",
  },
  {
    title: "Health Assessments",
    description:
      "Tailored assessments and diagnostic tools based on specific patient health status.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
  },
  {
    title: "Patient Listing",
    description:
      "Centralized database to view all patients with health status and historical data.",
    image:
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1200&q=80",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Custom Primary Color mapped to Tailwind-friendly Hex: #2B4563
  const primaryColor = "bg-[#2B4563]";
  const primaryText = "text-[#2B4563]";
  const primaryBorder = "border-[#2B4563]";

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className={`text-3xl font-black tracking-tighter ${primaryText}`}>
              IntelliMED
            </h1>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] hidden sm:block">
              Healthcare Management
            </span>
          </div>
        
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <h2 className={`text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 ${primaryText}`}>
              Modernizing <br />
              <span className="text-slate-400">Patient Outcomes.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed">
                Empowering healthcare providers with real-time vital tracking, intelligent registration, and comprehensive patient insights.
            </p>
            <div className="flex flex-wrap gap-4">
          <Link to="/SignupPage">
  <button className={`${primaryColor} hover:opacity-90 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-2xl shadow-slate-200 transition-all active:scale-95`}>
    Access System
  </button>
</Link>
             

            </div>
          </div>
          
          <div className="relative lg:h-[500px]">
            <div className={`absolute -inset-4 ${primaryColor} opacity-[0.03] rounded-[40px] transform rotate-3`} />
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
              alt="Medical Dashboard"
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl border border-slate-100"
            />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h3 className={`text-sm font-black uppercase tracking-[0.2em] mb-4 ${primaryText}`}>
                System Modules
              </h3>
              <h2 className="text-4xl font-bold text-slate-800">Operational Excellence</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={prevSlide} className="p-4 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={nextSlide} className="p-4 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <div className={`relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl ${primaryColor}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-50 transition-transform duration-[5000ms]"
                  style={{ transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b3d] via-transparent to-transparent flex flex-col justify-end p-12 md:p-20">
                  <div className={`transition-all duration-700 ${index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                    <h4 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {feature.title}
                    </h4>
                    <p className="text-xl text-slate-200 max-w-2xl font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Progress Bars */}
            <div className="absolute top-10 left-10 right-10 flex gap-3 z-20">
              {features.map((_, index) => (
                <div key={index} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-white transition-all duration-[5000ms] ease-linear ${index === currentIndex ? "w-full" : "w-0"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm font-medium">© 2026 IntelliMED Systems. Secure Enterprise Environment.</p>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}