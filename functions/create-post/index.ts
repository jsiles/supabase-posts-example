// Edge Function: create-post
// Uso: POST / -> body JSON { title, content }
// Requiere las env vars SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (secret).

import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
}

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" }});
    }

    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing Bearer token" }), { status: 401, headers: { "Content-Type": "application/json" }});
    }
    const token = authHeader.replace("Bearer ", "").trim();

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error("auth.getUser error:", userError);
      return new Response(JSON.stringify({ error: "Invalid token or user not found" }), { status: 401, headers: { "Content-Type": "application/json" }});
    }
    const user = userData.user;

    const body = await req.json().catch(() => null);
    const title = body?.title?.toString()?.trim();
    const content = body?.content?.toString()?.trim() ?? null;

    if (!title) {
      return new Response(JSON.stringify({ error: "title is required" }), { status: 400, headers: { "Content-Type": "application/json" }});
    }

    const { data, error: insertError } = await supabase
      .from("posts")
      .insert([{ title, content, user_id: user.id }])
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Insert failed", details: insertError }), { status: 500, headers: { "Content-Type": "application/json" }});
    }

    return new Response(JSON.stringify({ post: data }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500, headers: { "Content-Type": "application/json" }});
  }
});