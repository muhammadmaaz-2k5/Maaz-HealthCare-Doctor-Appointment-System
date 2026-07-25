# Skill: Sentry Telemetry & Performance Observability

## 📌 Protocol Overview
CarePulse integrates multi-layered Sentry instrumentation across client React trees, edge runtime routes, and backend Node Server Actions. This guide specifies how to configure telemetry exceptions, sanitize medical data from logs, and analyze diagnostic traces.

---

## ⚙️ Sentry Configuration Layers

Our application utilizes three specialized configuration boundaries located in the workspace root:
1. **`sentry.client.config.ts`**: Configures browser session replays and traps React component render crashes.
2. **`sentry.server.config.ts`**: Tracks Node Server Actions, database read/write latencies, and file storage streaming performance.
3. **`sentry.edge.config.ts`**: Monitors Next.js middleware routing and high-speed edge API webhooks.

---

## 🧪 Catching Exceptions in Application Logic

When building robust form handlers or server mutations, ensure manual error boundary instrumentation using `@sentry/nextjs`:

```typescript
import * as Sentry from "@sentry/nextjs";

export const updateAppointmentStatus = async (appointmentId: string, status: string, userId: string) => {
  try {
    // Database operation executed here
    const updated = await databases.updateDocument(...);
    return parseStringify(updated);
  } catch (error) {
    // Capture exception complete with customized diagnostic tagging
    Sentry.captureException(error, {
      tags: {
        operation: "updateAppointmentStatus",
        targetStatus: status,
      },
      extra: {
        appointmentId,
        timestamp: new Date().toISOString()
      }
    });
    
    throw new Error("Unable to update consultation record at this time.");
  }
};
```

---

## 🛑 PHI Sanitization & HIPAA Compliance Rules

To prevent violating medical privacy laws, Sentry data reporting MUST strip out sensitive patient profile attributes:
* **Session Replays**: In `sentry.client.config.ts`, ensure `maskAllText: true` and `blockAllMedia: true` remain enabled within `Sentry.replayIntegration()` so keystrokes typed into registration input fields are never transmitted to monitoring servers.
* **Error Payload Filtering**: Never bind raw patient social security digits, full Identification document file blobs, or insurance subscriber numbers into Sentry `extra` or `user` telemetry payloads. Keep user tracking limited exclusively to anonymized cryptographic Appwrite user IDs (`userId: user.$id`).
