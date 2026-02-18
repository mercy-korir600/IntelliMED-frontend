import { useState, useEffect } from 'react';
import Header from '../components/Header'; 
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Activity, Scale, Ruler, ArrowRight, User } from 'lucide-react';

export default function VitalsPage() {
  const navigate = useNavigate();
  const { patientId } = useParams(); 
  const brandColor = "#2B4563";
  
  const [patientName, setPatientName] = useState('Loading Patient...');
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    height: '',
    weight: '',
  });
  const [bmi, setBmi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to get Token
  const getAuthToken = () => localStorage.getItem("auth_token");

  useEffect(() => {
    if (!patientId) {
      console.warn("No patientId found. Redirecting...");
      navigate('/PatientsPage');
      return;
    }

    // Optional: Fetch Patient Name to make the UI personal
    const fetchPatientDetails = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`https://lp10zmh3-3000.uks1.devtunnels.ms/api/patients/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const result = await response.json();
          // Assuming API returns { firstName, lastName }
          setPatientName(`${result.firstName} ${result.lastName}`);
        } else {
          setPatientName(`Patient ID: ${patientId}`);
        }
      } catch (error) {
        setPatientName(`Patient ID: ${patientId}`);
      }
    };

    fetchPatientDetails();
  }, [patientId, navigate]);

  // BMI Logic: (Weight / Height^2) * 10,000 (if using cm)
  const calculateBMI = (h, w) => {
    const height = parseFloat(h);
    const weight = parseFloat(w);
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const score = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(score.toFixed(1)));
    } else {
      setBmi(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (name === 'height' || name === 'weight') {
      calculateBMI(updatedForm.height, updatedForm.weight);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bmi === null) return;

    setIsLoading(true);
    const vitalsData = {
      patientId: patientId,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      bmi: bmi,
      recordedAt: formData.visitDate
    };

    console.log("Sending vitals data:", vitalsData);

    try {
      const token = getAuthToken();
      const response = await fetch("https://lp10zmh3-3000.uks1.devtunnels.ms/api/vitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vitalsData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Submission failed");

      // LOGIC: Automated Routing based on BMI Status
      // If your API returns status in 'result.data.bmiStatus'
      const status = result.data?.bmiStatus || (bmi >= 25 ? "Overweight" : "Normal");

      if (status === "Overweight" || status === "Obese") {
        navigate(`/OverweightAssessmentPage/${patientId}`);
      } else {
        navigate(`/GeneralAssessmentPage/${patientId}`);
      }

    } catch (error) {
      alert(`Error recording vitals: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#2B4563] mb-6 transition-all"
        >
          <ChevronLeft className="w-3 h-3" />
          Back to Registration
        </button>

        <div className="mb-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            Vital <span className="opacity-40">Metrics</span>
          </h2>
          <p className="text-slate-500 font-medium">Record physical parameters to determine clinical pathway.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(43,69,99,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Patient Identity Header */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-[#2B4563]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block">Subject</label>
                  <h3 className="text-xl font-bold text-slate-800">{patientName}</h3>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block md:text-right">Exam Date</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="bg-white px-4 py-2 rounded-xl font-bold text-slate-700 border border-slate-200 outline-none"
                />
              </div>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                  <Ruler className="w-3 h-3" /> Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="170"
                  required
                  className="w-full px-6 py-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none text-xl font-bold bg-slate-50/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                  <Scale className="w-3 h-3" /> Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="70"
                  required
                  className="w-full px-6 py-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none text-xl font-bold bg-slate-50/50"
                />
              </div>
            </div>

            {/* BMI Visualization */}
            <div className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 p-8 ${
              bmi === null ? 'bg-slate-50 border-slate-100' : 
              bmi >= 25 ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100'
            }`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-2">Resulting BMI</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-black tracking-tighter" style={{ color: bmi ? brandColor : '#cbd5e1' }}>
                      {bmi || '--.-'}
                    </span>
                    <span className="text-slate-400 font-bold text-lg">kg/m²</span>
                  </div>
                </div>

                {bmi && (
                  <div className="flex flex-col items-center md:items-end gap-3">
                    <div className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-lg ${
                      bmi >= 25 ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}>
                      {bmi >= 25 ? 'Risk Path Identified' : 'Standard Path'}
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight text-center md:text-right">
                      {bmi >= 25 ? "Routing to Specialized Overweight Assessment" : "Routing to General Clinical Assessment"}
                    </p>
                  </div>
                )}
              </div>
              {/* Dynamic Bar */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-slate-200/30 w-full">
                <div 
                  className={`h-full transition-all duration-700 ease-out ${bmi >= 25 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                  style={{ width: `${bmi ? Math.min((bmi / 40) * 100, 100) : 0}%` }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!bmi || isLoading}
              style={{ backgroundColor: brandColor }}
              className="w-full text-white font-black uppercase tracking-[0.2em] py-6 rounded-2xl text-sm shadow-xl transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3"
            >
              {isLoading ? "Processing..." : (
                <>Proceed to Assessment <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}