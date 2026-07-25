# Phase-03: Admin Security & Clinic Command Center

## 📖 Domain Summary
This epic encompasses the centralized medical management workspace used by clinic administrators, triage nurses, and lead specialists to review facility operations, confirm incoming appointments, and audit daily patient traffic.

---

## 🧱 Architectural Breakdown & Components

### 1. Zero-Trust Access Control (Passkey Security)
* **Access Boundary**: Any attempt to access `app/admin` triggers the security check governed by `PasskeyModal.tsx` and encrypted browser storage tokens (`accessKey`).
* **Verification Workflow**: Administrators must input the verified OTP/Passkey configured via `NEXT_PUBLIC_ADMIN_PASSKEY`. Incorrect challenges deny dashboard routing, defending against unauthorized exposure of patient lists.

### 2. Clinic Executive Metrics (Command Center)
* **Data Aggregator**: The server action `getRecentAppointmentList` in [lib/actions/appointment.actions.ts](../../lib/actions/appointment.actions.ts) performs efficient database aggregation over all patient consultation records.
* **Stat Cards & KPIs**: Renders immediate situational awareness via `StatCard.tsx`:
  * 🟡 **Pending Consultations**: Total volume of newly requested visits awaiting clinical sign-off.
  * 🟢 **Scheduled Consultations**: Total confirmed appointments on active doctor rosters.
  * 🔴 **Cancelled Consultations**: Total volume of rejected or patient-aborted visits.

### 3. High-Performance Interactive Data Grid
* **Grid Engine**: Built with `@tanstack/react-table` inside `components/table/`.
* **Inline Actions**: Each table row dynamically renders quick-action modals:
  * **`AppointmentModal.tsx`**: Allows managers to seamlessly approve pending requests or re-schedule timestamps directly without reloading the viewport.
  * **`PatientModal.tsx`**: Displays condensed patient clinical profiles, identification cards, and emergency notes for immediate administrative verification.

---

## 🔒 Administrative Security Invariants
* Never transmit sensitive patient identification documents or full insurance ID numbers across non-secure API responses unless the request originates from an authenticated admin passkey session.
* Ensure real-time UI invalidation and cache refreshing whenever an administrator mutates an appointment's status from `'pending'` to `'scheduled'` or `'cancelled'`.
