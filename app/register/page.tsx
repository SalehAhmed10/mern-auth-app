import RegisterForm from "@/components/RegisterForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions as any);

  if (session) redirect("/dashboard");

  return <RegisterForm />;
}
