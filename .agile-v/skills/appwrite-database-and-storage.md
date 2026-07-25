# Skill: Appwrite Database & Bucket Integration

## 📌 Protocol Overview
MaazPulse uses Appwrite as its unified backend system for authentication, NoSQL document databases, and encrypted file storage buckets. This guide establishes the standardized patterns for interacting with Appwrite collections and uploading sensitive patient identification documents.

---

## 🧱 Configuration & Client Instantiation

All database IDs and collection references are centralized in [lib/appwrite.config.ts](../../lib/appwrite.config.ts). Never instantiate raw SDK connections without utilizing these global environment variables:

```typescript
// Standard pattern for importing Appwrite service SDKs in Server Actions
import { 
  DATABASE_ID, 
  PATIENT_COLLECTION_ID, 
  DOCTOR_COLLECTION_ID, 
  APPOINTMENT_COLLECTION_ID, 
  BUCKET_ID, 
  databases, 
  storage, 
  users 
} from "../appwrite.config";
import { ID, Query } from "node-appwrite";
```

---

## 📑 Querying & Modifying Documents

### 1. Fetching Records with Queries
When searching for existing user profiles or filtering appointment tables, always utilize `node-appwrite` Query helpers:
```typescript
const existingUser = await users.list([
  Query.equal("email", [user.email]),
  Query.equal("phone", [user.phone]),
]);
```

### 2. Creating Documents with Unique IDs
Always generate deterministic or crypto-unique IDs using `ID.unique()` when pushing payloads:
```typescript
const newPatient = await databases.createDocument(
  DATABASE_ID!,
  PATIENT_COLLECTION_ID!,
  ID.unique(),
  {
    identificationDocumentId: file?.$id || null,
    identificationDocumentUrl: fileUrl || null,
    ...patientData
  }
);
```

---

## 📂 File Storage Bucket Ingestion (Medical IDs)

When handling binary payloads from `FileUploader.tsx`, convert files safely using Node's native `InputFile` buffer abstraction before uploading to Appwrite Storage:

```typescript
import { InputFile } from "node-appwrite/file";

// Convert raw Blob/FormData file into Node Appwrite buffer representation
let file;
if (identificationDocument) {
  const inputFile = InputFile.fromBuffer(
    identificationDocument?.get("blobFile") as Blob,
    identificationDocument?.get("fileName") as string,
  );

  file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
}
```

---

## 🚨 Error Handling & Fallback Recovery
* In multi-step creation workflows (such as creating an Auth User before creating a Patient Database Document), catch `existing user` error codes (`code 409`) and gracefully reuse the discovered user instance rather than failing the registration screen.
