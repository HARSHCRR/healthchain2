export interface MedicalRecord {
  date: string;
  type: string;
  description: string;
  result: string;
  doctor: string;
  attachmentUrl?: string;
}

export interface Patient {
  id: string;
  fingerprintId: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: {
    bloodReports: MedicalRecord[];
    xrays: MedicalRecord[];
    ecgReports: MedicalRecord[];
    generalReports: MedicalRecord[];
  };
}

export const patients: Patient[] = [
  {
    id: "P001",
    fingerprintId: "FP001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    medicalHistory: {
      bloodReports: [
        {
          date: "2024-01-15",
          type: "Complete Blood Count",
          description: "Regular checkup",
          result: "Normal levels",
          doctor: "Dr. Johnson",
        },
      ],
      xrays: [
        {
          date: "2023-12-20",
          type: "Chest X-ray",
          description: "Annual screening",
          result: "Clear lungs, no abnormalities",
          doctor: "Dr. Williams",
          attachmentUrl: "/sample-xray-1.jpg",
        },
      ],
      ecgReports: [
        {
          date: "2024-02-01",
          type: "12-lead ECG",
          description: "Routine heart checkup",
          result: "Normal sinus rhythm",
          doctor: "Dr. Brown",
          attachmentUrl: "/sample-ecg-1.pdf",
        },
      ],
      generalReports: [
        {
          date: "2024-01-30",
          type: "General Checkup",
          description: "Annual physical examination",
          result: "Good overall health",
          doctor: "Dr. Johnson",
        },
      ],
    },
  },
  {
    id: "P002",
    fingerprintId: "FP002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodType: "A+",
    allergies: ["Sulfa drugs"],
    medicalHistory: {
      bloodReports: [
        {
          date: "2024-02-10",
          type: "Complete Blood Count",
          description: "Routine checkup",
          result: "Slightly low iron levels",
          doctor: "Dr. Martinez",
        },
      ],
      xrays: [],
      ecgReports: [
        {
          date: "2024-01-25",
          type: "ECG",
          description: "Pre-surgery screening",
          result: "Normal heart rhythm",
          doctor: "Dr. Brown",
          attachmentUrl: "/sample-ecg-2.pdf",
        },
      ],
      generalReports: [
        {
          date: "2024-02-05",
          type: "General Checkup",
          description: "Regular checkup",
          result: "Good health, iron supplements recommended",
          doctor: "Dr. Martinez",
        },
      ],
    },
  },
  {
    id: "P003",
    fingerprintId: "FP003",
    name: "Michael Chen",
    age: 28,
    gender: "Male",
    bloodType: "B-",
    allergies: ["Latex"],
    medicalHistory: {
      bloodReports: [
        {
          date: "2024-02-15",
          type: "Complete Blood Count",
          description: "Pre-employment screening",
          result: "All parameters within normal range",
          doctor: "Dr. Wilson",
        },
      ],
      xrays: [
        {
          date: "2024-01-20",
          type: "Dental X-ray",
          description: "Dental checkup",
          result: "No cavities, wisdom teeth need monitoring",
          doctor: "Dr. Lee",
          attachmentUrl: "/sample-dental-xray.jpg",
        },
      ],
      ecgReports: [],
      generalReports: [
        {
          date: "2024-02-12",
          type: "General Checkup",
          description: "Annual physical",
          result: "Excellent health condition",
          doctor: "Dr. Wilson",
        },
      ],
    },
  },
]; 