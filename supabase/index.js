import supabase from "./supabase";

export async function login(email, password) {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error);
      return null;
    }

    console.log("User logged in successfully:");
  } catch (error) {
    console.error("Error logging in:", error.message);
    return null;
  }
}