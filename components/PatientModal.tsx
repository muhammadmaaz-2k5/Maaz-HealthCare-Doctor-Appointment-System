import { Client, Databases } from "appwrite";
import React, { useEffect, useState } from "react";

interface PatientModalProps {
  patientId: string | null;
  closeModal: () => void;
}

interface PatientDetails {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument?: FormData;
  privacyConsent: boolean;
}

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);

const databases = new Databases(client);

export const PatientModal: React.FC<PatientModalProps> = ({
  patientId,
  closeModal,
}) => {
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (patientId) {
        try {
          const response = await databases.getDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
            patientId
          );
          setPatientDetails(response as unknown as PatientDetails);
        } catch (error) {
          console.error("Failed to fetch patient details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patientDetails) {
    return <div>No patient details found.</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm text-slate-800">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-green-200">
        <div className="mb-4 flex items-center justify-between border-b border-green-100 pb-3">
          <h2 className="font-sans text-xl font-bold text-green-900">
            Patient Medical Profile
          </h2>
          <button
            className="text-slate-400 hover:text-green-600 text-2xl font-bold"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <div className="space-y-4 font-mono">
          <p>
            <strong>Name:</strong> {patientDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {patientDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {patientDetails.phone}
          </p>
          <p>
            <strong>Birth Date:</strong> {patientDetails.birthDate.toString()}
          </p>
          <p>
            <strong>Gender:</strong> {patientDetails.gender}
          </p>
          <p>
            <strong>Address:</strong> {patientDetails.address}
          </p>
          <p>
            <strong>Occupation:</strong> {patientDetails.occupation}
          </p>
          <p>
            <strong>Emergency Contact Name:</strong>{" "}
            {patientDetails.emergencyContactName}
          </p>
          <p>
            <strong>Emergency Contact Number:</strong>{" "}
            {patientDetails.emergencyContactNumber}
          </p>
          <p>
            <strong>Primary Physician:</strong>{" "}
            {patientDetails.primaryPhysician}
          </p>
          <p>
            <strong>Insurance Provider:</strong>{" "}
            {patientDetails.insuranceProvider}
          </p>
          <p>
            <strong>Insurance Policy Number:</strong>{" "}
            {patientDetails.insurancePolicyNumber}
          </p>
          <p>
            <strong>Allergies:</strong> {patientDetails.allergies || "None"}
          </p>
          <p>
            <strong>Current Medication:</strong>{" "}
            {patientDetails.currentMedication || "None"}
          </p>
          <p>
            <strong>Family Medical History:</strong>{" "}
            {patientDetails.familyMedicalHistory || "None"}
          </p>
          <p>
            <strong>Past Medical History:</strong>{" "}
            {patientDetails.pastMedicalHistory || "None"}
          </p>
          <p>
            <strong>Identification Type:</strong>{" "}
            {patientDetails.identificationType || "None"}
          </p>
          <p>
            <strong>Identification Number:</strong>{" "}
            {patientDetails.identificationNumber || "None"}
          </p>
          <p>
            <strong>Privacy Consent:</strong>{" "}
            {patientDetails.privacyConsent ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};
