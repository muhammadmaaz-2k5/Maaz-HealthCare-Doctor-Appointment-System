# CarePulse — AGENTS & AI Engineering Playbook (AGENTS.md)

This document serves as the mandatory operational guideline, architectural boundary specification, and engineering playbook for all developers, AI assistants, and automated agents contributing to the **CarePulse** healthcare repository.

---

## 1. 🛑 Primary Directives & Compliance (HIPAA / PHI)

Healthcare software requires strict security and privacy standards. When modifying or creating code in this repository, you must enforce:
1. **Zero Client-Side PHI Leakage**: Never log Protected Health Information (patient names, phone numbers, birth dates, insurance policy numbers, identification files) to browser consoles, client-side diagnostics, or non-secure monitoring endpoints.
2. **Server Action Boundary Enforcement**: All database transactions, file ingestion into Appwrite Buckets, and Twilio SMS communications MUST occur exclusively within server-side environments (`lib/actions/` scripts with `"use strict"` and Node runtime separation).
3. **Environment Security**: Always treat Appwrite API keys and Twilio Auth Tokens as ultra-secret credentials. Verify that client-facing environment variables only use `NEXT_PUBLIC_` prefixes for safe identifiers (like Project IDs or public Endpoints), never for Secret Keys.

---

## 2. 🏛️ Architectural Standards & Patterns

### 2.1 Next.js App Router & Components
* **App Directory Structure**: File routes are organized cleanly under `app/`. Keep pages concise (`page.tsx`), delegating heavy rendering and stateful logic to specialized feature components in `components/`.
* **Server vs. Client Components**: By default, components are React Server Components (RSC). Only append `"use client"` at the top of a file when interactive browser APIs, state hooks (`useState`, `useEffect`), or dynamic browser animations are strictly required.
* **Global Loading & Error Containment**: Ensure all major layout structures utilize `loading.tsx` or the `GlobalLoadingProvider.tsx` wrapper to guarantee seamless user UX during data hydration or server mutations.

### 2.2 Form Architecture & Type Safety (Zod + React Hook Form)
* **Never create raw unvalidated inputs**. All patient demographic inputs and clinic scheduling fields must be wrapped using the centralized `CustomFormField.tsx` abstraction.
* **Schema Evolution**: Before building a new form or extending an existing profile field, update the corresponding Zod schema inside `lib/validation.ts`. 
* **Supported Form Component Types**: Ensure `CustomFormField.tsx` aligns with explicit input types: `INPUT`, `TEXTAREA`, `PHONE_INPUT`, `CHECKBOX`, `DATE_PICKER`, `SELECT`, `SKELETON`, and `FILE_UPLOAD`.

---

## 3. 🎨 Design Aesthetics & UI Rules

1. **Vibrant & Clean Medical Aesthetics**: CarePulse utilizes a curated, dark-mode accessible healthcare aesthetic. Avoid raw browser defaults or plain RGB color names. Rely exclusively on design system tokens defined in `tailwind.config.ts` and `globals.css` (e.g., `bg-dark-300`, `text-green-500`, `border-dark-400`).
2. **Component Reuse**: Do not re-create UI primitives (buttons, modals, dialogs, badges). Use existing implementations in `components/ui/`, `StatusBadge.tsx`, `SubmitButton.tsx`, and table action components (`AppointmentModal.tsx`, `PatientModal.tsx`).
3. **Responsive Design**: All screens must flawlessly scale from mobile phone viewports up to expansive widescreen medical workstation monitors.

---

## 4. 🗄️ Backend Interactions & Cloud SDKs

### 4.1 Appwrite Integration Rules
* **Database & Collection IDs**: Always instantiate Appwrite collection references using variables from `lib/appwrite.config.ts`. Do not hardcode raw UUIDs or DB IDs inside application code.
* **Document Handling**: When uploading medical IDs or insurance cards via `FileUploader.tsx`, convert files safely via Node `InputFile.fromBuffer` or Blob payloads before pushing to Appwrite Buckets in `patient.actions.ts`.

### 4.2 Twilio & Sentry Monitoring
* **Sms Dispatching**: Call SMS service functions only after verified successful database write completions in `appointment.actions.ts`. Always provide clear fallback error catching if Twilio rate-limiting or invalid carrier formatting occurs.
* **Telemetry Diagnostics**: Ensure all catch blocks within server actions log detailed stack traces to Sentry via `@sentry/nextjs` while returning sanitized, friendly error messages to the client front-end.

---

## 5. 🔄 Agile Lifecycle & Workspace Collaboration (.agile-v)

When assigned tasks or bug reports, always consult and maintain the `.agile-v/` organizational matrix located at the workspace root:
* **`cycles/`**: Review multi-month milestone objectives and product evolution phases.
* **`phases/`**: Check domain architecture Epics before modifying large subsystem features (Onboarding, Scheduling, Admin Command Center, Observability).
* **`skills/`**: Reference codebase-specific competency manuals for standardized patterns on Appwrite, Twilio, Shadcn forms, and server action implementations.
* **`sprints/`**: Track, pull, and update current short-term sprint tickets, keeping task status flags up-to-date during feature implementation.

---

## 6. 🧪 Code Verification & Quality Checklist

Before closing a development session or submitting code changes, perform the following validation steps:
1. **TypeScript Checking**: Verify all data props and state payloads against interfaces in `types/index.d.ts` and `types/appwrite.types.ts`. Avoid using `any` types.
2. **Build Verification**: Run terminal checks when needed to ensure Next.js routing trees and Server Actions compile clean of circular dependency warnings or missing exports.
3. **Documentation Integrity**: Keep existing JSDoc comments and inline explanations intact unless explicitly refactoring the associated logic.
