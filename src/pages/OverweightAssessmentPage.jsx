import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { useNavigate, useParams } from "react-router-dom"; // Use the hook instead of the component
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function OverweightAssessmentPage() {
  const navigate = useNavigate(); // Initialize navigation
  const { patientId } = useParams(); // Get patientId from URL parameters
  const brandColor = "#2B4563";
  
  const [patientName, setPatientName] = useState("Loading Patient..."); // Updated initial state
  const [formData, setFormData] = useState({
    visitDate: new Date().toISOString().split("T")[0],
    generalHealth: "", // Maps to healthStatus
    dietHistory: "", // Maps to onDiet
    comments: "",      // Not directly mapped to API, keep for local context/future expansion
  });
  const [assessments, setAssessments] = useState([]); // To store fetched assessments

  const getAuthToken = () => {
    return localStorage.getItem("auth_token");
  };

  useEffect(() => {
    // For now, patientId must come from URL params. 
    // In a real app, you might fetch patient details here to get the name.
    if (patientId) {
      setPatientName(`Patient ${patientId}`); // Placeholder for patient name
      const fetchAssessments = async () => {
        try {
          const token = getAuthToken();
          const response = await fetch(`https://lp10zmh3-3000.uks1.devtunnels.ms/api/assessments/patient/${patientId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch assessments");
          }
          const result = await response.json();
          setAssessments(result.data);
          console.log("Fetched assessments for patient:", result.data);
        } catch (error) {
          console.error("Error fetching assessments:", error);
        }
      };
      fetchAssessments();
    } else {
      // If no patientId, redirect to patients page
      console.warn("No patientId found in URL for Overweight Assessment Page.");
      navigate('/PatientsPage'); 
    }
  }, [patientId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      alert("Patient ID is missing. Cannot submit assessment.");
      return;
    }

    const assessmentData = {
      patientId: patientId,
      healthStatus: formData.generalHealth === "Good" ? "Good" : "Bad", // Mapping "Poor" to "Bad" as per API
      onDiet: formData.dietHistory === "Yes" ? "Yes" : "No", // Mapping to Yes/No
      onDrugs: "N/A", // Not collected in this form, defaulting to N/A
      visitDate: formData.visitDate,
    };

    try {
      const token = getAuthToken();
      const response = await fetch("https://lp10zmh3-3000.uks1.devtunnels.ms/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(assessmentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create assessment");
      }

      console.log("Overweight assessment recorded:", result.data);
      alert("Overweight assessment submitted successfully!");
      navigate("/PatientsPage"); // Navigate after successful submission
    } catch (error) {
      console.error("Error submitting overweight assessment:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Placeholder for updating an assessment (same as GeneralAssessmentPage)
  const updateAssessment = async (id, updatedData) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`https://lp10zmh3-3000.uks1.devtunnels.ms/api/assessments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to update assessment");
      }
      const result = await response.json();
      console.log("Assessment updated successfully:", result);
    } catch (error) {
      console.error("Error updating assessment:", error);
    }
  };

  // Placeholder for deleting an assessment (same as GeneralAssessmentPage)
  const deleteAssessment = async (id) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`https://lp10zmh3-3000.uks1.devtunnels.ms/api/assessments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });      if (!response.ok) {
        throw new Error("Failed to delete assessment");
      }
      const result = await response.json();
      console.log("Assessment deleted successfully:", result.message);
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure? Unsaved changes will be lost.")) {
      setFormData({
        visitDate: new Date().toISOString().split("T")[0],
        generalHealth: "",
        dietHistory: "",
        comments: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Vitals
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              Overweight <span className="text-orange-600">Assessment</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium">Elevated BMI Protocol (&gt; 25)</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(43,69,99,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Patient Info Display */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Patient Name</label>
                <div className="text-xl font-bold text-slate-800">{patientName || 'Anonymous Case'}</div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Visit Date</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="bg-white px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* Assessment Questions */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">General Health Status *</label>
                  <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                    {["Good", "Poor"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData(p => ({...p, generalHealth: option}))}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                          formData.generalHealth === option ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-500'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">Previous Diet History? *</label>
                  <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData(p => ({...p, dietHistory: option}))}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                          formData.dietHistory === option ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-500'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Clinical Comments</label>
                <textarea
                  name="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Record dietary observations or lifestyle remarks..."
                  className="w-full px-6 py-5 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all bg-slate-50 font-medium text-slate-700 resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-4 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={!formData.generalHealth || !formData.dietHistory}
                style={{ backgroundColor: brandColor }}
                className="flex-1 text-white font-black uppercase tracking-widest py-5 rounded-2xl text-sm shadow-xl shadow-slate-200 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
              >
                Finalize Assessment
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}