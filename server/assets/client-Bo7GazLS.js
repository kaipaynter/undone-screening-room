import { createClient } from "@supabase/supabase-js";
//#region src/integrations/supabase/client.ts
function createSupabaseClient() {
	return createClient("https://rxuvscsowuganjrirkil.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dXZzY3Nvd3VnYW5qcmlya2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjMyNTYsImV4cCI6MjA5NjkzOTI1Nn0.cq8s-thOU986sJOc1lEaFtgjWALp9IHBb_ky5Y6dJhQ", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
