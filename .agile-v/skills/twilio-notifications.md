# Skill: Twilio SMS Messaging & Automated Notifications

## 📌 Protocol Overview
CarePulse implements proactive patient diagnostic communication through automated event-driven SMS webhooks powered by the Twilio Cloud SDK. This manual standardizes our messaging template syntax, carrier routing rules, and fault-tolerant server action integrations.

---

## 💬 SMS Notification Orchestration

SMS dispatching is managed exclusively within backend server actions located in [lib/actions/appointment.actions.ts](../../lib/actions/appointment.actions.ts). Never attempt to invoke Twilio cloud endpoints from client-side browser wrappers.

### Standard Dispatch Implementation:
```typescript
import twilio from "twilio";

// Initialize authenticated SDK instance using protected environment metrics
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = twilio(accountSid, authToken);

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // 1. Resolve target phone number from verified user records
    const message = await client.messages.create({
      body: content,
      messagingServiceSid: messagingServiceSid,
      to: userId, // Ensure phone formatting matches international E.164 syntax (+15551234567)
    });
    
    return message;
  } catch (error) {
    // Graceful containment: Log failure for observability without aborting database transaction
    console.error("Twilio SMS transmission failure encountered:", error);
  }
};
```

---

## 📝 Medical SMS Copywriting & Template Standards

All communications dispatched through CarePulse must remain concise, professional, and free of sensitive clinical diagnoses (PHI protection). Stick to standardized verification templates:

### 1. Appointment Confirmation Template (Scheduled State)
> `"Hi, [Patient First Name]. Your clinic appointment with Dr. [Doctor Name] at CarePulse is successfully confirmed for [Formatted Date] at [Formatted Time]. Reply STOP to unsubscribe."`

### 2. Appointment Rescheduling Template (Modified State)
> `"Hi, [Patient First Name]. Notice: Your appointment with Dr. [Doctor Name] at CarePulse has been rescheduled to [New Date/Time]. Please log into your portal if you have questions."`

### 3. Appointment Cancellation Template (Cancelled State)
> `"Hi, [Patient First Name]. We regret to inform you that your appointment with Dr. [Doctor Name] scheduled for [Date/Time] has been cancelled. Reason: [Admin Reason]. Contact our facility to reschedule."`

---

## 🛡️ Reliability & Edge Case Rules
* **Carrier E.164 Verification**: Ensure phone numbers passed to Twilio strip out local spacing or hyphens, enforcing leading `+` country codes (e.g., `+14155552671`).
* **Non-Blocking Execution**: Always invoke `sendSMSNotification` as an asynchronous side effect following successful database writes. Never allow a carrier rejection or Twilio network timeout to roll back a successfully saved doctor reservation.
