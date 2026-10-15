import { supabase } from "@/lib/supabase";

export type HelpRequest = {
  id: string;
  title: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "Submitted" | "In Progress" | "Completed";
  createdAt: string;
};

export async function getHelpRequests(): Promise<HelpRequest[]> {
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data || []).map((request) => ({
    id: request.id,
    title: request.title,
    name: request.name,
    phone: request.phone,
    email: request.email,
    message: request.message,
    status: request.status,
    createdAt: request.created_at,
  }));
}
