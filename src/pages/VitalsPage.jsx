import { useState, useEffect } from 'react';
import Header from '../components/Header'; 
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Activity, Scale, Ruler, ArrowRight } from 'lucide-react';

export default function VitalsPage() {
  const navigate = useNavigate();
  const brandColor = "#2B4563";
  
  const [patientName, setPatientName] = useState('');
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    height: '',
    weight: '',
  });
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    const patient = sessionStorage.getItem('currentPatient');
    if (patient) {
      const patientData = JSON.parse(patient);
      setPatientName(`${patientData.firstName} ${patientData.lastName}`);
    } else {
      // Safety: redirect to registration if no patient in session
      navigate('/RegisterPage');
    }
  }, [navigate]);

  const calculateBMI = (height, weight) => {
    if (height && weight && height > 0) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
      setBmi(Math.round(calculatedBMI * 10) / 10);
    } else {
      setBmi(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (name === 'height' || name === 'weight') {
      calculateBMI(
        name === 'height' ? value : newFormData.height,
        name === 'weight' ? value : newFormData.weight
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bmi === null) return;

    const vitalsData = {
      ...formData,
      bmi,
      patientName,
      recordedAt: new Date().toISOString(),
    };

    sessionStorage.setItem('currentVitals', JSON.stringify(vitalsData));

    // Automated Diagnostic Routing Logic
    if (bmi <= 25) {
      navigate('/GeneralAssessmentPage');
    } else {
      navigate('/OverweightAssessmentPage');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation & Title */}
        <div className="mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#2B4563] transition-colors mb-6"
          >
            <ChevronLeft className="w-3 h-3" />
            Return to Case Profile
          </button>
          
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Vital <span className="text-slate-400">Metrics</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Record physical measurements for clinical analysis and path determination.
          </p>
        </div>

        {/* Institutional Card */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(43,69,99,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Patient Header Box */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-0.5">
                    Active Subject
                  </label>
                  <h3 className="text-xl font-bold text-slate-800">{patientName || 'Loading Patient...'}</h3>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block md:text-right">
                  Examination Date
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="bg-white px-4 py-2 rounded-xl font-bold text-slate-700 border border-slate-200 outline-none focus:ring-2 focus:ring-[#2B4563]/10 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Entry Fields */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-1">
                  <Ruler className="w-3 h-3 text-slate-400" />
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Height (cm)
                  </label>
                </div>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 175"
                  className="w-full px-6 py-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all text-xl font-bold bg-slate-50/50"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-1">
                  <Scale className="w-3 h-3 text-slate-400" />
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Weight (kg)
                  </label>
                </div>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 70"
                  className="w-full px-6 py-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all text-xl font-bold bg-slate-50/50"
                />
              </div>
            </div>

            {/* BMI Display Card */}
            <div className={`relative overflow-hidden rounded-[2rem] border transition-all duration-700 p-8 ${
              bmi === null ? 'bg-slate-50 border-slate-100' : 
              bmi >= 25 ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100'
            }`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-2">
                    Calculated BMI
                  </span>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="text-7xl font-black tracking-tighter" style={{ color: bmi === null ? '#cbd5e1' : brandColor }}>
                      {bmi !== null ? bmi : '--.-'}
                    </span>
                    <span className="text-slate-400 font-bold text-lg">kg/m²</span>
                  </div>
                </div>

                {bmi !== null && (
                  <div className="flex flex-col items-center md:items-end gap-4">
                    <div className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-lg ${
                      bmi >= 25 ? 'bg-orange-500 shadow-orange-200' : 'bg-emerald-500 shadow-emerald-200'
                    }`}>
                      {bmi <= 18.5 ? 'Underweight' : bmi < 25 ? 'Normal Range' : 'Risk Range Identified'}
                    </div>
                    <p className="text-slate-500 text-xs font-bold text-center md:text-right max-w-[220px] leading-relaxed uppercase tracking-tighter">
                      {bmi >= 25 
                        ? "Action: Automated routing to Overweight Assessment path."
                        : "Action: Proceeding to standard clinical evaluation path."}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Dynamic Progress Bar */}
              <div className="absolute bottom-0 left-0 h-2 bg-slate-200/30 w-full">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${bmi >= 25 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                  style={{ width: `${bmi ? Math.min((bmi / 40) * 100, 100) : 0}%` }}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={bmi === null}
                style={{ backgroundColor: brandColor }}
                className="w-full text-white font-black uppercase tracking-[0.2em] py-6 rounded-2xl text-sm shadow-2xl shadow-slate-300 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-20 flex items-center justify-center gap-3"
              >
               Submit
              
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}