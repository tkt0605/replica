import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    // Next.js16 でも同期APIのまま → await 不要
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        // Next.js16でも同期API → await 不要
                        cookieStore.set(name, value, options);
                    } catch {
                        // ServerComponent では set は失敗するが問題なし
                    }
                },
            },
        }
    );
}