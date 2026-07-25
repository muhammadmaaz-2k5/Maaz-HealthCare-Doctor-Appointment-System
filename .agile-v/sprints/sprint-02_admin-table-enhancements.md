# Sprint-02: Admin Table Enhancements & Reporting (Queued)

## 🎯 Sprint Objectives
Sprint 2 aims to supercharge the administrative clinic management command center (`app/admin`). This sprint delivers dynamic multi-doctor filter controls on the Tanstack data table, pagination optimization for high-volume clinic deployments, and automated CSV daily schedule report exports.

---

## 📋 Sprint Backlog & Ticket Status

### Epic: Admin Security & Command Center ([Phase-03](../phases/phase-03_admin-dashboard.md))
- [ ] **CP-201**: Extend Tanstack Data Table column definitions in `components/table/columns.tsx` to support rapid filtering by designated Specialist Doctor name. [5 Points]
- [ ] **CP-202**: Implement high-speed page-size pagination controls (10, 25, 50 rows per viewport) within the administrative grid view. [5 Points]
- [ ] **CP-203**: Add an executive action button on the admin dashboard enabling daily schedule exports to HIPAA-compliant CSV summary files. [8 Points]
- [ ] **CP-204**: Add automated passkey session idle timeout inside `PasskeyModal.tsx` requiring administrative re-verification after 30 minutes of keyboard inactivity. [5 Points]

### Epic: Observability & Telemetry ([Phase-04](../phases/phase-04_observability-and-telemetry.md))
- [ ] **CP-205**: Configure Sentry transaction duration alerting thresholds to notify engineering if admin dashboard data aggregation exceeds 2000 milliseconds. [5 Points]

---

## 📊 Sprint Planning Metrics
* **Total Planned Points**: 28 Points
* **Prerequisites Required**: Completion of Sprint-01 validation hardening tickets.
