# MaazPulse — System Epics & Functional Phases

The **`phases/`** directory structures MaazPulse's macro architectural domains into discrete, manageable engineering Epics. Each phase encapsulates a cohesive functional layer of the healthcare software system, documenting system invariants, data structures, and subsystem boundaries.

---

## 🏛️ Phase & Epic Index

| Phase Identifier | Epic Domain | Target User Persona | Associated Core Components |
| :--- | :--- | :--- | :--- |
| **[Phase-01](./phase-01_patient-onboarding.md)** | **Patient Identity & Onboarding** | New Clinic Patients | `app/patients/`, `lib/actions/patient.actions.ts`, `FileUploader.tsx` |
| **[Phase-02](./phase-02_scheduling-engine.md)** | **Scheduling Engine & SMS Webhooks** | Patients & Doctors | `app/patients/[userId]/new-appointment/`, `appointment.actions.ts`, Twilio SDK |
| **[Phase-03](./phase-03_admin-dashboard.md)** | **Admin Security & Clinic Command Center** | Clinic Managers | `app/admin/`, `PasskeyModal.tsx`, `components/table/`, `StatCard.tsx` |
| **[Phase-04](./phase-04_observability-and-telemetry.md)** | **Telemetry & Compliance Audit Tracing** | Systems & DevOps | `@sentry/nextjs`, `sentry.*.config.ts`, `global-error.tsx`, `GlobalLoading.tsx` |

---

## 📏 Engineering Principles Across Phases

* **Domain Isolation**: Code logic written for patient public onboarding (Phase 1) should remain tightly decoupled from administrative supervisory permissions (Phase 3).
* **Schema Contract Integrity**: All phase transitions share data structures governed by runtime definitions in [lib/validation.ts](../../lib/validation.ts) and compile-time TypeScript declarations in [types/index.d.ts](../../types/index.d.ts).
