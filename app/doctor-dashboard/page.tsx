"use client";

import { useState } from "react";
import { patients, Patient, MedicalRecord } from "@/data/patients";
import { Button } from "@/components/ui/button";

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fingerprint scan
  const handleFingerprintScan = async (fingerprintId: string) => {
    const patient = patients.find(p => p.fingerprintId === fingerprintId);
    setSelectedPatient(patient || null);
    if (patient) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{
              role: "user",
              content: "Please provide a summary of this patient's medical history and any important points to note."
            }],
            patientData: patient
          }),
        });

        if (!response.ok) throw new Error('Failed to get AI response');
        
        const aiMessage = await response.json();
        setChatMessages([aiMessage]);
      } catch (error) {
        console.error('Error getting AI summary:', error);
        setChatMessages([{
          role: "assistant",
          content: `Patient Summary for ${patient.name}:\n` +
            `- Age: ${patient.age}, Gender: ${patient.gender}\n` +
            `- Blood Type: ${patient.bloodType}\n` +
            `- Allergies: ${patient.allergies.join(", ")}\n` +
            `- Recent visits: ${patient.medicalHistory.generalReports[0]?.date || "None"}`
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage],
          patientData: selectedPatient
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      
      const aiMessage = await response.json();
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const RecordList = ({ title, records }: { title: string; records: MedicalRecord[] }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {records.length === 0 ? (
        <p className="text-gray-500">No records available</p>
      ) : (
        <div className="space-y-2">
          {records.map((record, index) => (
            <div key={index} className="border p-2 rounded">
              <div className="flex justify-between">
                <span className="font-medium">{record.type}</span>
                <span className="text-sm text-gray-500">{record.date}</span>
              </div>
              <p className="text-sm">{record.result}</p>
              {record.attachmentUrl && (
                <a href={record.attachmentUrl} className="text-blue-500 text-sm hover:underline">
                  View Attachment
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <div className="flex gap-2">
            {patients.map(patient => (
              <Button
                key={patient.fingerprintId}
                onClick={() => handleFingerprintScan(patient.fingerprintId)}
                variant="outline"
                disabled={isLoading}
              >
                Scan {patient.name}&apos;s Fingerprint
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 grid grid-cols-4 gap-6">
        {/* Left Column - AI Chat */}
        <div className="col-span-1 bg-white rounded-lg shadow p-4 h-[calc(100vh-12rem)]">
          <h2 className="text-lg font-semibold mb-4">AI Assistant</h2>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto mb-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    message.role === "assistant"
                      ? "bg-blue-100 ml-4"
                      : "bg-gray-100 mr-4"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-100 ml-4 p-2 rounded animate-pulse">
                  AI is thinking...
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="mt-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about patient data..."
                  className="flex-1 p-2 border rounded"
                  disabled={isLoading || !selectedPatient}
                />
                <Button type="submit" disabled={isLoading || !selectedPatient}>
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Columns - Medical Records */}
        <div className="col-span-3 space-y-6">
          {selectedPatient ? (
            <>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">
                  Patient: {selectedPatient.name}
                </h2>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>Age: {selectedPatient.age}</div>
                  <div>Gender: {selectedPatient.gender}</div>
                  <div>Blood Type: {selectedPatient.bloodType}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <RecordList
                  title="Blood Reports"
                  records={selectedPatient.medicalHistory.bloodReports}
                />
                <RecordList
                  title="X-Ray Reports"
                  records={selectedPatient.medicalHistory.xrays}
                />
                <RecordList
                  title="ECG Reports"
                  records={selectedPatient.medicalHistory.ecgReports}
                />
                <RecordList
                  title="General Reports"
                  records={selectedPatient.medicalHistory.generalReports}
                />
              </div>
            </>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold text-gray-600">
                Please scan a patient&apos;s fingerprint to view their medical records
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 