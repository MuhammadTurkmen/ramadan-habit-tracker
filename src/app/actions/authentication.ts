"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("password")) {
      return { field: "password", message: error.message };
    }
    if (error.message.includes("email")) {
      return { field: "email", message: error.message };
    }
    console.log(error);
    return { field: "general", message: error.message };
  }

  if (data.session) {
    return { success: true };
  }

  return { field: "general", message: "Unknown error" };
}

export async function signupAction(
  email: string,
  password: string,
  full_name: string,
) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } },
  });

  if (error) {
    if (error.message.includes("password")) {
      return { field: "password", message: error.message };
    }
    if (error.message.includes("email")) {
      return { field: "email", message: error.message };
    }
    return { field: "general", message: error.message };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
