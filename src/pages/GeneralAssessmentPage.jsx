import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardList, CheckCircle2 } from "lucide-react";
import Header from '../components/Header';

export default function GeneralAssessmentPage() {
  const navigate = useNavigate();
  const brandColor = "#2B4563";
  
  const [patientName, setPatientName] = useState("");
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split("T")[0],
    generalHealth: "",
    drugsUsage: "",
    comments: "",
  });

  useEffect(() => {
    const patient = sessionStorage.getItem("currentPatient");
    if (patient) {
      const patientData = JSON.parse(patient);
      setPatientName(`${patientData.firstName} ${patientData.lastName}`);
    } else {
      navigate('/RegisterPage');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const assessmentData = {
      type: "general",
      ...formData,
      patientName,
      recordedAt: new Date().toISOString(),
    };

    sessionStorage.setItem("currentAssessment", JSON.stringify(assessmentData));
    console.log("General assessment recorded:", assessmentData);
    
    alert("General assessment submitted successfully!");
    navigate("/PatientsPage");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure? Unsaved assessment data will be lost.")) {
      setFormData({
        visitDate: new Date().toISOString().split("T")[0],
        generalHealth: "",
        drugsUsage: "",
        comments: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/VitalsPage")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#2B4563] transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Vitals
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ClipboardList className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              General <span className="text-emerald-600">Assessment</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium">
            Standard clinical protocol for patients within the normal BMI range.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(43,69,99,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Header Identity Section */}
            <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Subject Name
                </label>
                <div className="px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 shadow-sm">
                  {patientName || 'Loading...'}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Assessment Date
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-[#2B4563]/10 outline-none"
                />
              </div>
            </div>

            {/* Assessment Questions with Radio Buttons */}
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: brandColor }}>
                  Clinical Parameters
                </h3>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Health Radio */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    1. How is the patient's general health? *
                  </label>
                  <div className="space-y-3">
                    {["Good", "Poor"].map((option) => (
                      <label 
                        key={option} 
                        className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                          formData.generalHealth === option 
                            ? 'bg-slate-50 border-[#2B4563] shadow-sm' 
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="generalHealth"
                          value={option}
                          checked={formData.generalHealth === option}
                          onChange={handleChange}
                          required
                          className="w-5 h-5 accent-[#2B4563] cursor-pointer"
                        />
                        <span className={`font-bold text-sm ${formData.generalHealth === option ? 'text-slate-900' : 'text-slate-400'}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Drugs Radio */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    2. Current usage of any medication/drugs? *
                  </label>
                  <div className="space-y-3">
                    {["Yes", "No"].map((option) => (
                      <label 
                        key={option} 
                        className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                          formData.drugsUsage === option 
                            ? 'bg-slate-50 border-[#2B4563] shadow-sm' 
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="drugsUsage"
                          value={option}
                          checked={formData.drugsUsage === option}
                          onChange={handleChange}
                          required
                          className="w-5 h-5 accent-[#2B4563] cursor-pointer"
                        />
                        <span className={`font-bold text-sm ${formData.drugsUsage === option ? 'text-slate-900' : 'text-slate-400'}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comments Field */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Clinical Observations & Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Record any specific symptoms or patient remarks here..."
                  className="w-full px-6 py-5 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-[#2B4563]/5 focus:border-[#2B4563] outline-none transition-all bg-slate-50 font-medium text-slate-700 resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-4 text-slate-400 font-black uppercase tracking-[0.2em] hover:text-slate-600 transition-colors text-[10px]"
              >
                Clear Entry
              </button>
              <button
                type="submit"
                disabled={!formData.generalHealth || !formData.drugsUsage}
                style={{ backgroundColor: brandColor }}
                className="flex-1 text-white font-black uppercase tracking-[0.15em] py-5 rounded-2xl text-sm shadow-xl shadow-slate-200 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
              >
                Finalize & Save Record
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}