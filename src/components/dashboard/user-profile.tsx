"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import UserProfileMenu from "./user-profile-menu";

export default async function UserProfile() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <UserProfileMenu
      name={user.user_metadata?.full_name ?? "User"}
      email={user.email ?? ""}
      avatar={user.user_metadata?.avatar_url ?? "/avatarr.png"}
    />
  );
}
