"use client";

import React, { useEffect, useState } from "react";

const API_URL = "https://resumexpert-dev.onrender.com/";

export function ApiStatusGate({ children }: { children: React.ReactNode }) {
  const [online, setOnline] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout;

    const checkApi = async () => {
      setChecking(true);
      setError("");
      try {
        const res = await fetch(API_URL, { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.status === "OK") {
            if (isMounted) setOnline(true);
            return;
          }
        }
        throw new Error("API not online");
      } catch (err) {
        if (isMounted) {
          setError("Waiting for backend API to be online...");
          retryTimeout = setTimeout(checkApi, 2000); // retry every 2s
        }
      } finally {
        if (isMounted) setChecking(false);
      }
    };

    checkApi();
    return () => {
      isMounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  if (!online) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6"></div>
        <div className="text-lg font-semibold text-gray-700 mb-2">Connecting to ResumeXpert backend...</div>
        <div className="text-sm text-gray-500">{error || "Checking API status..."}</div>
      </div>
    );
  }

  return <>{children}</>;
} 