import React, { useState, useEffect } from "react"
import Header from '../components/Header';
import { Link } from "react-router-dom";

export default function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [filteredPatients, setFilteredPatients] = useState([])
  const [filterDate, setFilterDate] = useState("")

  useEffect(() => {
    // Mock patient data
    const mockPatients = [
      {
        id: 1,
        firstName: "John",
        lastName: "Mdoe",
        age: 33,
        gender: "Male",
        bmiStatus: "Normal",
        lastAssessmentDate: "2025-12-01",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Mdoe",
        age: 28,
        gender: "Female",
        bmiStatus: "Overweight",
        lastAssessmentDate: "2025-11-29",
      },
    ]

    const currentPatient = sessionStorage.getItem("currentPatient")
    if (currentPatient) {
      try {
        const patientData = JSON.parse(currentPatient)
        const newPatient = {
          id: patientData.id,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          age: calculateAge(patientData.dateOfBirth),
          gender: patientData.gender,
          bmiStatus: calculateBMIStatus(sessionStorage.getItem("currentVitals")),
          lastAssessmentDate: new Date().toISOString().split("T")[0],
        }
        const exists = mockPatients.some((p) => p.id === newPatient.id)
        if (!exists) mockPatients.unshift(newPatient)

        // Clear session storage
        sessionStorage.removeItem("currentPatient")
        sessionStorage.removeItem("currentVitals")
        sessionStorage.removeItem("currentAssessment")
      } catch {}
    }

    setPatients(mockPatients)
    setFilteredPatients(mockPatients)
  }, [])

  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const calculateBMIStatus = (vitalsJson) => {
    if (!vitalsJson) return "Not recorded"
    try {
      const vitals = JSON.parse(vitalsJson)
      const bmi = vitals.bmi
      if (bmi < 18.5) return "Underweight"
      if (bmi <= 25) return "Normal"
      return "Overweight"
    } catch {
      return "Not recorded"
    }
  }

  const handleFilterByDate = (date) => {
    setFilterDate(date)
    if (!date) {
      setFilteredPatients(patients)
    } else {
      setFilteredPatients(patients.filter((p) => p.lastAssessmentDate === date))
    }
  }

  const getBMIStatusColor = (status) => {
    switch (status) {
      case "Underweight":
        return "bg-blue-100 text-blue-800"
      case "Normal":
        return "bg-green-100 text-green-800"
      case "Overweight":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Register Button */}
        <div className="mb-8">
          <Link to="/"> 
          <button
            className="flex items-center gap-2 text-blue-600 hover:text-blue-500 mb-4"
          >
            {/* Arrow Left */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Home
          </button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Patient Listing</h2>
              <p className="text-gray-500">View all registered patients and their health status</p>
            </div>
            <Link to="/RegisterPage">
              
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              // onClick={() => alert("Navigate to register patient")}
            >
              Register New Patient
            </button>
            </Link>
          </div>
        </div>

        {/* Filter */}
        <div className="p-4 mb-6 border border-gray-200 rounded-md flex items-center gap-2">
          {/* Search icon */}
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => handleFilterByDate(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            placeholder="Filter by visit date"
          />
          {filterDate && (
            <button
              className="px-3 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
              onClick={() => handleFilterByDate("")}
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Table */}
        <div className="border border-gray-200 overflow-hidden rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gender</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">BMI Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Assessment</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{patient.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{patient.gender}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBMIStatusColor(
                          patient.bmiStatus
                        )}`}
                      >
                        {patient.bmiStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {patient.lastAssessmentDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPatients.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No patients found for the selected date.
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {[
            { label: "Total Patients", value: patients.length, color: "text-gray-800" },
            { label: "Normal BMI", value: patients.filter((p) => p.bmiStatus === "Normal").length, color: "text-green-600" },
            { label: "Overweight", value: patients.filter((p) => p.bmiStatus === "Overweight").length, color: "text-orange-600" },
            { label: "Underweight", value: patients.filter((p) => p.bmiStatus === "Underweight").length, color: "text-blue-600" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
