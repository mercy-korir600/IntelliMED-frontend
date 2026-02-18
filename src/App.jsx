import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VitalsPage from "./pages/VitalsPage";
import GeneralAssessmentPage from "./pages/GeneralAssessmentPage";
import PatientsPage from "./pages/PatientsPage";
import OverweightAssessmentPage from "./pages/OverweightAssessmentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/VitalsPage/:patientId" element={<VitalsPage />} />
        <Route
          path="/GeneralAssessmentPage/:patientId"
          element={<GeneralAssessmentPage />}
        />
       
   
        <Route
          path="/OverweightAssessmentPage/:patientId"
          element={<OverweightAssessmentPage />}
        />
        <Route path="/PatientsPage" element={<PatientsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
