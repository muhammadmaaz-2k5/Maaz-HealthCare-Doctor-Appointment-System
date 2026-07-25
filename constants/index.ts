export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Faisal Sultan",
    specialty: "Consultant Physician & Infectious Diseases",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Sana Mir",
    specialty: "Senior Cardiologist",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Adeel Haider",
    specialty: "Neurologist & Stroke Specialist",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Kamran Ahmed",
    specialty: "General & Laparoscopic Surgeon",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Ayesha Khan",
    specialty: "Pediatric Consultant",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Bilal Siddiqui",
    specialty: "Orthopedic Surgeon",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Huma Cheema",
    specialty: "Consultant Dermatologist",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Samina Farooq",
    specialty: "Gynecologist & Obstetrician",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Imran Jameel",
    specialty: "Medical Oncologist",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

export * from "./theme";

