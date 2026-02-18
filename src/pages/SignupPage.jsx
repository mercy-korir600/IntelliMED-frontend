import { useState } from 'react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const brandColor = "#2B4563";

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }
// tutafanya things are working
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://intelimed.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Firstname: formData.firstName,
          Lastname: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Registration failed');
      }

      console.log('User registered successfully:', result.message);
      // As per API docs, registration doesn't return an access token, so navigate to login
      window.location.href = '/LoginPage'; 
    } catch (err) {
      setError(err.message || 'Unable to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Column: Visual & Branding (Matches Login) */}
      <div 
        className="hidden md:flex md:w-1/2 lg:w-3/5 p-16 flex-col justify-between relative overflow-hidden"
        style={{ backgroundColor: brandColor }}
      >
        {/* Decorative Grid Pattern */}
         <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tighter text-white">
            Intelli<span className="opacity-50">MED</span>
          </h1>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Join the future of clinical management.
          </h2>
          <p className="text-slate-300 text-lg font-light leading-relaxed">
            Create your institutional account to begin managing patient outcomes with 
            integrated precision tools and real-time data analytics.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <span>HIPAA Compliant</span>
          <span>Enterprise Grade</span>
          <span>Secure Onboarding</span>
        </div>
      </div>

      {/* Right Column: Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-slate-50 md:bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">SIGNUP </h2>
            <p className="text-slate-500 mt-2">Initialize your healthcare provider profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                First Name 
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Dr. Alexander"
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-white"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Last Name 
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Pierce"
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-white"
              />
            </div>

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
                placeholder="office@medicalcenter.com"
                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-white"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none transition-all bg-white ${
                  formData.confirmPassword && formData.password !== formData.confirmPassword
                    ? 'border-red-300 focus:ring-red-100'
                    : 'border-slate-200 focus:ring-[#2B4563]/5 focus:border-[#2B4563]'
                }`}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: brandColor }}
              className="w-full text-white font-bold py-5 rounded-2xl text-lg shadow-xl shadow-slate-200 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70 mt-4"
            >
              {isLoading ? "Initializing..." : "SignUp"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 font-semibold">
              Already have an account?{' '}
              <a href="/LoginPage" className="font-black hover:underline transition-all" style={{ color: brandColor }}>
                Sign In 
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}