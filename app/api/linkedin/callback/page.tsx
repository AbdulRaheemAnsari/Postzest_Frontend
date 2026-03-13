"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function LinkedInCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            // Redirect back to the social accounts page with the code
            router.replace(`/dashboard/social-accounts?code=${code}`);
        } else {
            // If there's an error or no code, also go back
            router.replace("/dashboard/social-accounts");
        }
    }, [searchParams, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium text-foreground">
                Connecting your LinkedIn account...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
                You will be redirected automatically.
            </p>
        </div>
    );
}

export default function LinkedInCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center min-h-screen bg-background">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            }
        >
            <LinkedInCallbackContent />
        </Suspense>
    );
}
