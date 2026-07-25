# CarePulse — Operational AI & Developer Skills

The **`skills/`** repository contains codebase-specific engineering manuals, standardized pattern architectures, and step-by-step technical execution guidelines. Whether you are a newly onboarded engineer or an AI Coding Assistant, these skill guidelines must be adhered to when implementing new features or extending existing subsystems.

---

## 🛠️ Competency Directory & Operational Guides

| Skill Document | Domain Area | Key Dependencies | Primary Usage Trigger |
| :--- | :--- | :--- | :--- |
| **[Appwrite DB & Storage](./appwrite-database-and-storage.md)** | Backend & Storage | `appwrite`, `node-appwrite` | Modifying database schemas, uploading medical identification files, querying collections. |
| **[Server Actions & Zod](./nextjs-server-actions-and-validation.md)** | Server API & Types | Next.js 14 Actions, `zod`, `r-h-f` | Adding database CRUD actions, implementing input validation, extending type schemas. |
| **[Shadcn & Custom Forms](./shadcn-ui-and-custom-forms.md)** | UI & UX Engineering | Radix UI, Tailwind, `lucide-react` | Modifying `CustomFormField.tsx`, styling modals, building reactive medical forms. |
| **[Twilio SMS Messaging](./twilio-notifications.md)** | Communications | `twilio` Node SDK | Formatting automated patient SMS reminders, tuning messaging retry rules. |
| **[Sentry Telemetry](./sentry-telemetry.md)** | Observability | `@sentry/nextjs` | Profiling performance bottlenecks, debugging Server Action crashes, checking sourcemaps. |

---

## 🎯 Skill Usage Rules for AI Assistants
When asked to perform a coding task in CarePulse:
1. **Match Topic**: Check the table above for relevant technical competencies.
2. **Review Patterns**: Open and review the corresponding skill document to understand naming conventions, import paths, and error containment strategies.
3. **Strict Execution**: Do not improvise third-party libraries or alternate styling architectures when an approved solution exists in these skill manuals.
