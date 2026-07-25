# Phase-02: Scheduling Engine & SMS Webhooks

## 📖 Domain Summary
Phase 2 powers the dynamic appointment scheduling engine and automated notification architecture of MaazPulse. It facilitates seamless communication between patients and clinical practitioners while minimizing schedule conflicts and missed consultations.

---

## 🧱 Architectural Breakdown & Components

### 1. Interactive Reservation Flow
* **Route Structure**: Hosted at `app/patients/[userId]/new-appointment/page.tsx`, powered by `AppointmentForm.tsx`.
* **Selection Parameters**: Patients pick their designated clinic doctor (populated from `constants/`), specify an desired consultation timestamp using `react-datepicker`, and document symptoms or reasons for visit.

### 2. Server Action Orchestration
Located in [lib/actions/appointment.actions.ts](../../lib/actions/appointment.actions.ts):
* **`createAppointment`**: Validates the payload against `CreateAppointmentSchema` and pushes the document into Appwrite's Appointments database collection with an initial status of `'pending'`.
* **`getAppointment`**: Hydrates appointment details for verification screens and success landing pages (`app/patients/[userId]/new-appointment/success/page.tsx`).

### 3. Twilio SMS Automated Notifications
* **Trigger Mechanism**: Whenever an appointment is scheduled, administratively confirmed, or cancelled, `sendSMSNotification` is invoked.
* **Message Formatting**: Synthesizes clean, professional medical SMS templates:
  > *"Hi, [Patient Name]. Your [Appointment Type] consultation with Dr. [Doctor Name] at MaazPulse is confirmed for [Date/Time]."*
* **Error Containment**: Encapsulated within asynchronous try/catch blocks ensuring that if an SMS carrier delivery fails or hits rate throttles, database state integrity remains unaffected while alerting telemetry instrumentation.

---

## ⚙️ Performance & Consistency Rules
* Always format date and time objects consistently using `utils.ts` formatters before persisting to the database or rendering inside SMS copy.
* Maintain strict locking on appointment time intervals to prevent race conditions during high-concurrency booking windows.
