"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function SyncUserWithDB() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/user", { method: "POST" });
    }
  }, [isSignedIn]);

  return null;
}
