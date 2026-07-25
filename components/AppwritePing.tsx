"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite.client";

export const AppwritePing = () => {
  useEffect(() => {
    // Pings the Appwrite backend server automatically when the application is opened
    client
      .ping()
      .then((res) => {
        console.log("🟢 Appwrite SDK Setup Verified! Server ping successful:", res);
      })
      .catch((err) => {
        console.warn("⚠️ Appwrite SDK Server Ping encountered an issue:", err.message || err);
      });
  }, []);

  return null;
};
