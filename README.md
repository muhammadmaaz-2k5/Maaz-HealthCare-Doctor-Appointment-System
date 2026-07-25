# CarePulse — Next.js FullStack Healthcare & Doctor Appointment System

<div align="center">
  <h3>Modern Healthcare Operations, Electronic Patient Records & Medical Consultation Scheduling</h3>
</div>

---

## 🏥 Executive Overview

**CarePulse** is a state-of-the-art, high-performance healthcare platform engineered to streamline patient onboarding, digital identification verification, medical clinic appointment scheduling, and automated SMS diagnostic communications. Built with **Next.js 14**, **Appwrite**, **Twilio**, and **Sentry**, CarePulse ensures HIPAA-compliant workflows while delivering an elite user interface designed with **Tailwind CSS** and **Shadcn UI**.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Responsibilities & Architecture |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) & React 18 | Hybrid Server/Client App Router, Edge runtime optimizations, Server Actions (`lib/actions`) |
| **UI Design System** | [Shadcn UI](https://ui.shadcn.com/) & Radix UI | Accessible component primitives, dark mode theming via `next-themes`, responsive medical dashboards |
| **Styling & Effects** | Tailwind CSS & CLSX | Custom design utility tokens, dynamic class mergers (`tailwind-merge`), micro-interactions |
| **Forms & Validation** | React Hook Form & Zod | Strict runtime schema verification (`lib/validation.ts`), automated phone, OTP & date pickers |
| **Backend & Storage** | [Appwrite Cloud / SDK](https://appwrite.io/) | Document collections (Patients, Doctors, Appointments), encrypted bucket storage for medical IDs |
| **Communications** | [Twilio SDK](https://www.twilio.com/) | Asynchronous event-driven SMS alerts for scheduling confirmation, modification, or cancellation |
| **Observability** | [Sentry Telemetry](https://sentry.io/) | Full edge/client/server tracing, profiling performance bottlenecks, automated session replay |

---

## 📂 Project Structure & Directory Navigation

```text
├── .agile-v/             # Agile management, cycles, epics, operational skills, and sprint tracking
├── app/                  # Next.js 14 Application Router roots
│   ├── admin/            # Protected clinic administrator dashboard & patient grid
│   ├── api/              # API webhooks & diagnostic integrations
│   ├── patients/         # Patient onboarding registration & appointment selection workflows
│   ├── globals.css       # Core design system tokens & Tailwind CSS layers
│   └── layout.tsx        # Root layout with Global Loading Providers & Theme settings
├── components/           # Reusable application UI & logic modules
│   ├── forms/            # Form assemblies (PatientForm, AppointmentForm, RegisterForm)
│   ├── table/            # Tanstack interactive Data Grid components & administrative action modals
│   └── ui/               # Atomic Radix/Shadcn UI building blocks (Buttons, Dialogs, Inputs)
├── lib/                  # Core engineering utilities & backend orchestration
│   ├── actions/          # Next.js Server Actions (appointment.actions.ts, patient.actions.ts)
│   ├── appwrite.config.ts# Appwrite Cloud SDK instantiation & environment variables
│   ├── utils.ts          # Helper syntax & style class combinators
│   └── validation.ts     # Zod runtime verification schemas for medical records
├── types/                # TypeScript interface declarations & Appwrite collection mappings
├── AGENTS.md             # Standard Operating Procedures & AI development guidelines
└── tailwind.config.ts    # Custom palette design tokens & animations
```

---

## 🚀 Getting Started

### 1. Prerequisites & Environment Configuration
Ensure Node.js v18+ is installed. Copy `.env.example` to `.env.local` and configure your credentials:

```ini
# NEXT_PUBLIC APPWRITE CONFIGURATION
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_PROJECT_ID=your-project-id
NEXT_PUBLIC_API_KEY=your-appwrite-api-key
NEXT_PUBLIC_DATABASE_ID=your-database-id
NEXT_PUBLIC_PATIENT_COLLECTION_ID=patient-collection-id
NEXT_PUBLIC_DOCTOR_COLLECTION_ID=doctor-collection-id
NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=appointment-collection-id
NEXT_PUBLIC_BUCKET_ID=storage-bucket-id

# TWILIO SMS NOTIFICATIONS
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-sender-number

# ADMIN DASHBOARD ACCESS
NEXT_PUBLIC_ADMIN_PASSKEY=111111

# SENTRY TELEMETRY
SENTRY_AUTH_TOKEN=your-sentry-token
```

### 2. Installation & Development Server
Install dependencies and launch the server:

```bash
npm install
npm run dev
```
Access the application locally at `http://localhost:3000`.

---

## 📈 Agile Execution & AI Governance

CarePulse follows disciplined engineering governance managed in the root directory:
* **Developer & AI Playbook**: Refer to [AGENTS.md](file:///c:/Users/asdfq/Desktop/HealthCare%20Management%20System/HealthCare-Doctor-Appointment-Management-System--NextJS-FullStack/AGENTS.md) for contribution rules, security guidelines, and architectural boundaries.
* **Project Lifecycle Management**: Check the `.agile-v/` framework for active sprint tasks, domain epics, release roadmaps, and modular operational skills.
# Maaz-HealthCare-Doctor-Appointment-System
