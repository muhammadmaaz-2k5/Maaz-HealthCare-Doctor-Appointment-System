# Skill: Next.js Server Actions & Zod Validation

## 📌 Protocol Overview
In MaazPulse, all backend operations—from patient registrations to clinic scheduling mutations—occur safely inside Next.js Server Actions (`lib/actions/`). This manual defines our standard operating procedure for ensuring runtime type safety with Zod and clean asynchronous execution.

---

## 🛡️ Server Action Anatomy

Every file inside `lib/actions/` MUST declare `"use strict"` at the very top and execute cleanly within a Node runtime environment. Never leak database API secret keys to client-side bundles.

### Standard Server Action Pattern:
```typescript
"use strict";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { DATABASE_ID, APPOINTMENT_COLLECTION_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { CreateAppointmentParams } from "@/types";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    // Revalidate dynamic Next.js routes to instantly update client dashboards
    revalidatePath("/admin");
    
    // Always parseStringify Appwrite document returns to prevent Server Component serialization errors
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating appointment:", error);
    throw error;
  }
};
```

---

## ⚖️ Runtime Verification with Zod Schemas

Before transmitting form data to server actions, inputs must pass rigorous runtime checks defined in [lib/validation.ts](../../lib/validation.ts).

### Extending Schema Definitions
When adding a new medical field (e.g., Blood Type or Telehealth Preference):
1. Update the schema definition in `lib/validation.ts`:
```typescript
import { z } from "zod";

export const PatientFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
});
```
2. Update the corresponding TypeScript interface representation inside [types/index.d.ts](../../types/index.d.ts) to guarantee IDE compile-time alignment.

---

## 🔄 Revalidation & Cache Refreshing
* Always call `revalidatePath('/admin')` or `revalidatePath('/patients/[id]')` immediately after mutating appointment status records (`scheduled`, `cancelled`) to ensure Tanstack table viewports immediately reflect actual database state.
* Always wrap returned database payloads in `parseStringify(result)` from `lib/utils.ts` to transform Appwrite internal symbol prototypes into plain JSON objects for Next.js boundary passing.
