# CarePulse — Agile Sprints & Actionable Tasks

The **`sprints/`** directory represents our active execution engine and tactical task backlog. While **Cycles** track quarterly release goals and **Phases** structure domain architecture, sprints segment active engineering work into focused, two-week iterative deliverables.

---

## 🏁 Active & Planned Sprint Roster

| Sprint Identifier | Sprint Goal & Focus Area | Target Velocity | State | Primary Epics Addressed |
| :--- | :--- | :--- | :--- | :--- |
| **[Sprint-01](./sprint-01_system-stabilization.md)** | **MVP Hardening, Form Validation & SMS Fault Tolerance** | 24 Story Points | 🟢 **In Progress** | [Phase-01](../phases/phase-01_patient-onboarding.md), [Phase-02](../phases/phase-02_scheduling-engine.md) |
| **[Sprint-02](./sprint-02_admin-table-enhancements.md)** | **Admin Grid Filtering, Pagination & Report Exports** | 28 Story Points | 🟡 **Queued** | [Phase-03](../phases/phase-03_admin-dashboard.md), [Phase-04](../phases/phase-04_observability-and-telemetry.md) |

---

## 📐 Sprint Ticket Formatting Syntax

When creating or checking off task tickets within active sprint files, utilize standardized GitHub markdown checkboxes:
```markdown
- [ ] **CP-101**: Task Title - Brief summary of technical implementation required (`file/target.ts`). [3 Points]
- [/] **CP-102**: In Progress Task Title - Currently under development by assigned engineer/agent. [5 Points]
- [x] **CP-103**: Completed Ticket Title - Verified against automated build checks and merged. [2 Points]
```
