"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Receipt } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CancelTrailModal from "@/components/modals/CancelTrailModal";
import { useState } from "react";

const Billing = () => {
  const router = useRouter();
  const [IsTrailCancel, setIsTrailCancel] = useState(false);
  return (
    <div className="min-h-screen bg-background py-4">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl font-semibold mb-6">Billing</h1>

        {/* Info Banner */}
        <div className="bg-primary/10 w-fit border border-primary/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-info-text">
            You're on a free trail! Your trial ends on September 11, 2025. After
            that, you'll be charged $24.00 per month.{" "}
            <Link
              href="/settings/subscription"
              className="text-primary font-semibold hover:underline"
            >
              Change Plan
            </Link>
          </p>
        </div>

        {/* Current Plan Card */}
        <Card className="py-4 md:py-6 mb-6">
          <div className="flex items-center justify-between mb-6 border-b border-border px-6 md:px-8 pb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Current Plan</h2>
            </div>
            <Badge
              variant="secondary"
              className="text-primary bg-primary/10 font-medium"
            >
              Free
            </Badge>
          </div>

          <div className="mb-6 px-6 md:px-8">
            <Badge
              variant="default"
              className="bg-primary/10 text-md border border-primary text-primary rounded-sm mb-2"
            >
              Ultimate Plan
            </Badge>
            <p className="text-2xl font-bold">
              $24{" "}
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 px-6 md:px-8">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Trail ends</p>
                <p className="font-semibold">September 11, 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-semibold">$24.00 after trail</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 px-6 md:px-8 border-t border-border pt-4">
            <Button
              onClick={() => router.push("/settings/subscription")}
              variant="default"
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              Change Plan
            </Button>
            <Button
              variant="outline"
              className="bg-foreground text-background hover:bg-foreground/90 hover:text-background cursor-pointer"
            >
              Pause Subscription
            </Button>
            <Button
            onClick={() => setIsTrailCancel(true)}
              variant="outline"
              className="bg-foreground text-background hover:bg-foreground/90 hover:text-background cursor-pointer"
            >
              Cancel Subscription
            </Button>
          </div>
        </Card>

        {/* Stripe Portal Link */}
        <div className="">
          <p className="text-sm text-muted-foreground mb-4">
            View your billing history, manage payment methods, and download
            invoices.
          </p>
          <Button variant="outline" className="gap-2 cursor-pointer">
            <Receipt className="w-4 h-4" />
            Stripe Billing Portal
          </Button>
        </div>
      </div>

      <CancelTrailModal open={IsTrailCancel} onOpenChange={setIsTrailCancel} />
    </div>
  );
};

export default Billing;
