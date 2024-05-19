"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}

