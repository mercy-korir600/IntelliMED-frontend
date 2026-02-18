import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, RotateCcw, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

export default function RegisterPage() {
  const navigate = useNavigate();
  const brandColor = "#2B4563";
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    patientNo: '',
    registrationDate: todayStr,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setFormData(prev => ({ ...prev, patientNo: `P-${randomNum}` }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth' && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      dob: formData.dateOfBirth,
    };

    try {
      const response = await fetch('https://intelimed.up.railway.app/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });

      const result = await response.json();
      
      // LOG THIS: Check your browser console to see exactly what the API returns
      console.log('Full API Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to register patient');
      }

    
            const createdId = result.patientId ||
                              result.id ||
                              result._id ||
                              result.data?.patientId ||
                              result.data?.id ||
                              result.patient?.id ||
                              result.data?._id;
      if (createdId) {
        console.log('Navigating to Vitals with ID:', createdId);
        navigate(`/VitalsPage/${createdId}`, { 
          state: { 
            patientId: createdId, 
            name: `${formData.firstName} ${formData.lastName}` 
          } 
        });
      } else {
       
        console.warn('Patient created but ID missing from response. Using fallback route.');
        navigate('/VitalsPage');
      }

    } catch (error) {
      console.error('Registration Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#2B4563]/10 rounded-lg">
              <UserPlus className="w-5 h-5 text-[#2B4563]" />
            </div>
      <h2 className="text-3xl font-black tracking-tight text-[#2A4A63] uppercase">

              Patients Registration
            </h2>
          </div>
          <p className="text-slate-400 font-bold text-xs lowercase tracking-widest">
           Enter patient information to register new patient
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(43,69,99,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-black lowercase tracking-[0.25em]" style={{ color: brandColor }}>
                  Personal Information
                </h3>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: 'firstName', label: 'First Name', placeholder: 'Alexander' },
                  { id: 'middleName', label: 'Middle Name', placeholder: 'Optional' },
                  { id: 'lastName', label: 'Last Name', placeholder: 'Pierce' }
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      {field.label} {field.id !== 'middleName' && '*'}
                    </label>
                    <input
                      type="text"
                      name={field.id}
                      required={field.id !== 'middleName'}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-slate-50 font-semibold text-slate-700"
                    />
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Gender Assignment *
                  </label>
                  <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData(p => ({...p, gender: g}))}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                          formData.gender === g 
                          ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' 
                          : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    max={todayStr}
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-slate-50 font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: brandColor }}>
                  System Identifiers
                </h3>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Patient Reference ID
                  </label>
                  <div className="px-5 py-3 bg-white border border-slate-200 rounded-xl font-mono font-black text-[#2B4563]">
                    {formData.patientNo}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Registration Date
                  </label>
                  <div className="px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-500">
                    {formData.registrationDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-8 py-4 text-slate-400 font-black uppercase tracking-[0.2em] hover:text-slate-600 transition-colors text-[10px] flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Record
              </button>
              <button
                type="submit"
                disabled={!formData.firstName || !formData.lastName || !formData.gender || !formData.dateOfBirth}
                style={{ backgroundColor: brandColor }}
                className="flex-1 text-white font-black uppercase tracking-[0.15em] py-5 rounded-2xl text-sm shadow-xl shadow-slate-200 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
              >
                Register & Record Vitals <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}