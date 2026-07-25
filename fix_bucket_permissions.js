const { Client, Storage } = require("node-appwrite");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");
const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  }
});

const BUCKET_ID = env["NEXT_PUBLIC_BUCKET_ID"] || "6a64dbdf00106ced3a50";

const endpoints = [
  env["NEXT_PUBLIC_ENDPOINT"],
  "https://cloud.appwrite.io/v1",
  "https://fra.cloud.appwrite.io/v1"
].filter((v, i, a) => v && a.indexOf(v) === i);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log(`🔓 Unlocking file extensions for Storage Bucket [${BUCKET_ID}]...`);
  
  for (const endpoint of endpoints) {
    console.log(`\n🌐 Connecting to endpoint: [${endpoint}]...`);
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(env["NEXT_PUBLIC_PROJECT_ID"])
      .setKey(env["NEXT_PUBLIC_API_KEY"]);
    
    const storage = new Storage(client);
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await storage.updateBucket(
          BUCKET_ID,
          "Patient Medical Documents",
          undefined,
          false,
          true,
          30000000,
          [] // Passing an empty array accepts all file extensions (PNG, JPG, PDF, SVG, WEBP, etc.)
        );
        console.log(`✅ Success! All file extension restrictions have been removed using [${endpoint}].`);
        return;
      } catch (err) {
        console.log(`  ⚠️ Attempt ${attempt} failed on [${endpoint}]: ${err.message}`);
        await sleep(1500);
      }
    }
  }
  
  console.error("\n❌ All connection attempts failed. Please double check your Wi-Fi/internet connectivity to Appwrite Cloud.");
}

run();
