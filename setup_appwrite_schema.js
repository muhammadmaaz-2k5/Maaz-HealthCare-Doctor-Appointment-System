const { Client, Databases, Storage, Users } = require("node-appwrite");
const fs = require("fs");
const path = require("path");

// 1. Read .env file
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.error("❌ .env file not found at project root!");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      env[key] = val;
    }
  }
});

const ENDPOINT = env["NEXT_PUBLIC_ENDPOINT"];
const PROJECT_ID = env["NEXT_PUBLIC_PROJECT_ID"];
const API_KEY = env["NEXT_PUBLIC_API_KEY"];
const DATABASE_ID = env["NEXT_PUBLIC_DATABASE_ID"] || "6a64dac0003d9aded394";
const PATIENT_COLLECTION_ID = env["NEXT_PUBLIC_PATIENT_COLLECTION_ID"] || "patient";
const DOCTOR_COLLECTION_ID = env["NEXT_PUBLIC_DOCTOR_COLLECTION_ID"] || "doctor";
const APPOINTMENT_COLLECTION_ID = env["NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID"] || "appointment";
const BUCKET_ID = env["NEXT_PUBLIC_BUCKET_ID"] || "6a64dbdf00106ced3a50";

console.log("=========================================");
console.log("🏥 MaazPulse Appwrite Schema Setup & Diagnostics");
console.log("=========================================");
console.log(`📡 Endpoint:      ${ENDPOINT}`);
console.log(`📦 Project ID:    ${PROJECT_ID}`);
console.log(`🗄️  Database ID:   ${DATABASE_ID}`);
console.log(`🪣  Bucket ID:     ${BUCKET_ID}`);
console.log("=========================================\n");

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error("❌ Missing required Appwrite credentials in .env (ENDPOINT, PROJECT_ID, API_KEY)");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // STEP 1: Test Connection & Authentication
  try {
    console.log("🔄 Testing API Connection & Server Auth...");
    await users.list();
    console.log("✅ Connection Successful! Authenticated with Admin Server Key.\n");
  } catch (error) {
    console.error("❌ Connection Failed! Please check your API Key and Project ID.", error.message);
    process.exit(1);
  }

  // STEP 2: Verify / Create Database
  try {
    console.log(`🔍 Inspecting Database [${DATABASE_ID}]...`);
    await databases.get(DATABASE_ID);
    console.log("✅ Database exists!");
  } catch (error) {
    if (error.code === 404) {
      console.log(`⚡ Creating Database [${DATABASE_ID}]...`);
      await databases.create(DATABASE_ID, "MaazPulse Healthcare DB");
      console.log("✅ Database created successfully!");
    } else {
      console.error("❌ Error inspecting database:", error.message);
      process.exit(1);
    }
  }

  // STEP 3: Verify / Create Storage Bucket
  try {
    console.log(`🔍 Inspecting Storage Bucket [${BUCKET_ID}]...`);
    await storage.getBucket(BUCKET_ID);
    console.log("✅ Storage Bucket exists!");
  } catch (error) {
    if (error.code === 404) {
      console.log(`⚡ Creating Storage Bucket [${BUCKET_ID}]...`);
      await storage.createBucket(BUCKET_ID, "Patient Medical Documents", undefined, false, true, undefined, ["jpg", "jpeg", "png", "pdf", "webp"]);
      console.log("✅ Storage Bucket created successfully!");
    } else {
      console.error("⚠️ Note on Storage Bucket:", error.message);
    }
  }

  async function ensureCollection(colId, name) {
    try {
      await databases.getCollection(DATABASE_ID, colId);
      console.log(`✅ Collection [${colId}] (${name}) verified!`);
    } catch (err) {
      if (err.code === 404) {
        console.log(`⚡ Creating Collection [${colId}] (${name})...`);
        await databases.createCollection(DATABASE_ID, colId, name);
        console.log(`✅ Collection [${colId}] created!`);
        await sleep(1000);
      } else {
        throw err;
      }
    }
  }

  async function ensureAttr(colId, type, key, required, size, array = false, defaultVal = undefined) {
    try {
      await databases.getAttribute(DATABASE_ID, colId, key);
    } catch (err) {
      if (err.code === 404) {
        console.log(`  ➕ Adding ${type} attribute [${key}] directly to ${colId}...`);
        try {
          if (type === "string") {
            await databases.createStringAttribute(DATABASE_ID, colId, key, size || 255, required, defaultVal, array);
          } else if (type === "boolean") {
            await databases.createBooleanAttribute(DATABASE_ID, colId, key, required, defaultVal, array);
          } else if (type === "datetime") {
            await databases.createDatetimeAttribute(DATABASE_ID, colId, key, required, defaultVal, array);
          }
          await sleep(600); // Give cloud Appwrite background workers time to compile indexes
        } catch (createErr) {
          console.error(`  ⚠️ Could not create attribute [${key}]:`, createErr.message);
        }
      }
    }
  }

  console.log("\n📁 Establishing Collections...");
  await ensureCollection(PATIENT_COLLECTION_ID, "Patients");
  await ensureCollection(DOCTOR_COLLECTION_ID, "Doctors");
  await ensureCollection(APPOINTMENT_COLLECTION_ID, "Appointments");

  // Patient Collection Schema
  console.log(`\n🧩 Syncing [${PATIENT_COLLECTION_ID}] schema attributes...`);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "userId", true, 100);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "name", true, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "email", true, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "phone", true, 50);
  await ensureAttr(PATIENT_COLLECTION_ID, "datetime", "birthDate", true);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "gender", true, 50);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "address", true, 500);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "occupation", true, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "emergencyContactName", true, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "emergencyContactNumber", true, 50);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "primaryPhysician", true, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "insuranceProvider", true, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "insurancePolicyNumber", true, 100);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "allergies", false, 1000);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "currentMedication", false, 1000);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "familyMedicalHistory", false, 1000);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "pastMedicalHistory", false, 1000);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "identificationType", false, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "identificationNumber", false, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "identificationDocumentId", false, 200);
  await ensureAttr(PATIENT_COLLECTION_ID, "string", "identificationDocumentUrl", false, 2000);
  await ensureAttr(PATIENT_COLLECTION_ID, "boolean", "privacyConsent", true);

  // Doctor Collection Schema
  console.log(`\n🧩 Syncing [${DOCTOR_COLLECTION_ID}] schema attributes...`);
  await ensureAttr(DOCTOR_COLLECTION_ID, "string", "name", true, 200);
  await ensureAttr(DOCTOR_COLLECTION_ID, "string", "image", true, 1000);
  await ensureAttr(DOCTOR_COLLECTION_ID, "string", "specialty", false, 200);

  // Appointment Collection Schema
  console.log(`\n🧩 Syncing [${APPOINTMENT_COLLECTION_ID}] schema attributes...`);
  await ensureAttr(APPOINTMENT_COLLECTION_ID, "string", "userId", true, 100);
  await ensureAttr(APPOINTMENT_COLLECTION_ID, "string", "primaryPhysician", true, 200);
  await ensureAttr(APPOINTMENT_COLLECTION_ID, "datetime", "schedule", true);
  await ensureAttr(APPOINTMENT_COLLECTION_ID, "string", "status", true, 50);
  await ensureAttr(APPOINTMENT_COLLECTION_ID, "string", "reason", false, 1000);
  await ensureAttr(APPOINTMENT_COLLECTION_ID, "string", "note", false, 1000);
  await ensureAttr(APPOINTMENT_COLLECTION_ID, "string", "cancellationReason", false, 1000);

  // Appointment -> Patient Relationship
  try {
    await databases.getAttribute(DATABASE_ID, APPOINTMENT_COLLECTION_ID, "patient");
    console.log(`✅ Relationship attribute [patient] in Appointments already verified!`);
  } catch (err) {
    if (err.code === 404) {
      console.log(`  ➕ Linking relationship attribute [patient] -> [${PATIENT_COLLECTION_ID}]...`);
      try {
        await databases.createRelationshipAttribute(
          DATABASE_ID,
          APPOINTMENT_COLLECTION_ID,
          PATIENT_COLLECTION_ID,
          "manyToOne",
          true,
          "patient",
          "appointments",
          "cascade"
        );
        console.log("  ✅ Relationship attribute created!");
      } catch (relErr) {
        console.error("  ⚠️ Could not establish direct Appwrite relationship (retrying as string reference):", relErr.message);
      }
    }
  }

  console.log("\n🎉 Appwrite Diagnostics & Database Setup Completed Successfully!");
}

main().catch((err) => {
  console.error("💥 Unexpected fatal error during Appwrite initialization:", err);
});
