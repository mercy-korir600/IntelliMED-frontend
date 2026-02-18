import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
   const navigate = useNavigate();

  // Brand Color: HSL(210, 40%, 28%) -> Hex: #2B4563
  const brandColor = "#2B4563";

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
                const response = await fetch('https://lp10zmh3-3000.uks1.devtunnels.ms/api/auth/login', {        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid credentials');
      }

      localStorage.setItem('auth_token', result.token);
    navigate('/RegisterPage');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Side: Branding & Visual */}
      <div 
        className="hidden md:flex md:w-1/2 lg:w-3/5 p-12 flex-col justify-between relative overflow-hidden text-white"
        style={{ backgroundColor: brandColor }}
      >
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tighter">
            Intelli<span className="opacity-60">MED</span>
          </h1>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Secure Access to Clinical Intelligence.
          </h2>
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            Welcome back. Please authenticate to access patient records, 
            diagnostic tools, and real-time vital monitoring.
          </p>
        </div>

        <div className="relative z-10 text-sm font-medium text-slate-400 tracking-widest uppercase">
          Precision • Privacy • Performance
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50 md:bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-500 font-medium">Enter your credentials to manage your clinic.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="physician@intellimed.com"
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-slate-50/50 md:bg-white"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <a href="#" className="text-[11px] font-bold text-slate-400 hover:text-[#2B4563] transition-colors uppercase tracking-tighter">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-slate-50/50 md:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.959 9.959 0 012.35-3.442M6.18 6.18A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.958 9.958 0 01-2.333 3.508M3 3l18 18"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 animate-pulse">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: brandColor }}
              className="w-full text-white font-bold py-5 rounded-2xl text-lg shadow-xl shadow-slate-200 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70 mt-4"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New to the platform?{' '}
              <a href="/SignupPage" className="font-black hover:underline" style={{ color: brandColor }}>
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}