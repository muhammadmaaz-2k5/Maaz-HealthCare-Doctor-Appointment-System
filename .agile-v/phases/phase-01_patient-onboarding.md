# Phase-01: Patient Identity & Onboarding

## 📖 Domain Summary
This epic manages the complete lifecycle of a new patient interacting with CarePulse for the first time. It ensures seamless identity verification, secure creation of cloud user profiles, intake of sensitive medical history, and compliant document uploading.

---

## 🧱 Architectural Breakdown & Components

### 1. Identity & Registration Workflow
* **Landing Entry point**: Users begin at `app/page.tsx`, entering basic verification metrics (full name, phone number, email address).
* **Database Verification**: The server action `createUser` in [lib/actions/patient.actions.ts](../../lib/actions/patient.actions.ts) interacts with Appwrite's Users SDK (`users.create`) to establish an authenticated profile. If an account already exists matching the email/phone, the system gracefully recovers and resumes onboarding via `getUser`.
* **Comprehensive Registration UI**: Located at `app/patients/[userId]/register/page.tsx`, rendering `RegisterForm.tsx`.

### 2. Medical Data Collection (PHI)
The intake form collects and validates:
* **Demographics**: Primary care physician selection, birth date, gender, physical address, and occupation.
* **Medical Background**: Known allergies, active chronic illnesses, current medications, past family medical history, and emergency contact details.
* **Insurance Metrics**: Provider identity, insurance policy number, and policy coverage scope.

### 3. Encrypted Identification Document Ingestion
* **Component Architecture**: Built around `FileUploader.tsx` leveraging `react-dropzone`.
* **Storage Processing**: When a patient drops a scanned passport or driver's license, `registerPatient` transforms the raw payload using Node's `InputFile.fromBuffer` before storing it safely within the Appwrite storage bucket (`NEXT_PUBLIC_BUCKET_ID`).

---

## 🔒 Security & HIPAA Verification Rules
* Verify that file sizes never exceed standard limits (e.g., 5MB) before transmission to prevent storage exhaustion attacks.
* Ensure all identification files uploaded to Appwrite buckets have restrictive read permissions strictly locked to authenticated clinic administrative roles and the originating user identity.
