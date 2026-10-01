"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CalendarDays,
  ChevronRight,
  Code2,
  Info,
  MessageSquareText,
  Pencil,
  Plus,
  Sparkles,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { openCreatePostModal } from "@/store/slices/createPostModalSlice";
import { useGetProfile } from "@/queries/user/updateUser";

// ─── Helpers ──────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ═══════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════
export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: profileData } = useGetProfile();
  const displayName = profileData?.name || "User";

  const [showNotice, setShowNotice] = useState(true);
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="space-y-8 mx-auto">
      {/* ─────────────────────────────────────────────────────────
          SECTION 1 : Greeting Header
      ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👋</span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold! text-foreground tracking-tight">
              {getGreeting()}, {displayName}!
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5 tracking-tight">
              <CalendarDays className="h-3.5 w-3.5" />
              {getFormattedDate()} • Your publishing cockpit
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/social-accounts"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <Plus className="h-4 w-4" />
            Connect Channel
          </Link>
          <button
            onClick={() => dispatch(openCreatePostModal())}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
          >
            <Pencil className="h-3.5 w-3.5" />
            Create Draft
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          SECTION 2 : Metrics Strip
      ───────────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-background">
        <div className="flex flex-col sm:flex-row sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-border">
          {/* Week Streak */}
          <div className="flex items-center gap-3.5 flex-1 px-5 py-4">
            <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold shrink-0">
              0
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-foreground uppercase tracking-wider">
                  Week Streak
                </span>
                <Info className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Post weekly to ignite your streak
              </p>
            </div>
          </div>
          {/* Posting Goals */}
          <div className="flex items-center gap-3.5 flex-1 px-5 py-4">
            <div className="h-11 w-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg font-bold shrink-0">
              0
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-foreground uppercase tracking-wider">
                  Posting Goals
                </span>
                <Info className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Target: 3 posts this week
              </p>
            </div>
          </div>
          {/* Comment Score */}
          <div className="flex items-center gap-3.5 flex-1 px-5 py-4">
            <div className="h-11 w-11 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-lg font-bold shrink-0">
              0
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-foreground uppercase tracking-wider">
                  Comment Score
                </span>
                <Info className="h-3.5 w-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Unreplied comments in queue
              </p>
            </div>
          </div>
        </div>

        {/* Channel notice */}
        {showNotice && (
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <p className="truncate">
                <Link
                  href="/social-accounts"
                  className="font-semibold text-foreground hover:underline"
                >
                  Connect a channel
                </Link>{" "}
                to start tracking your posting streak, set goals, and view
                real-time metrics.
              </p>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="text-xs text-muted-foreground hover:text-foreground font-medium whitespace-nowrap cursor-pointer"
            >
              Dismiss notice
            </button>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────
          SECTION 3 : First Steps to Success
      ───────────────────────────────────────────────────────── */}
      {showGuide && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-foreground">
                First Steps to Success
              </h2>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                0 of 3 completed
              </span>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="text-sm text-muted-foreground hover:text-foreground font-medium cursor-pointer"
            >
              Hide guide
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="rounded-xl border border-border bg-background p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-md bg-primary/10 text-primary text-xs font-bold">
                    1
                  </span>
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/25" />
                </div>
                <h3 className="font-semibold text-foreground text-[15px] mb-1.5">
                  Connect your first channel
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Personalize your profile and authorize your accounts to make
                  the most out of PostZest scheduling.
                </p>
              </div>
              <Link
                href="/social-accounts"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors w-full"
              >
                <Plus className="h-4 w-4" />
                Connect Channel
              </Link>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-border bg-background p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-md bg-primary/10 text-primary text-xs font-bold">
                    2
                  </span>
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/25" />
                </div>
                <h3 className="font-semibold text-foreground text-[15px] mb-1.5">
                  Create and schedule a post
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Draft your announcement, upload imagery, and test
                  multi-channel queueing with tailored captions.
                </p>
              </div>
              <button
                onClick={() => dispatch(openCreatePostModal())}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer w-full"
              >
                <Pencil className="h-4 w-4" />
                Draft Post
              </button>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-border bg-background p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-md bg-primary/10 text-primary text-xs font-bold">
                    3
                  </span>
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/25" />
                </div>
                <h3 className="font-semibold text-foreground text-[15px] mb-1.5">
                  Explore PostZest AI Assistant & API
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Generate high-impact content ideas effortlessly and hook into
                  automation webhooks or API keys.
                </p>
              </div>
              <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer w-full">
                <Code2 className="h-4 w-4" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          SECTION 4 : Up Next in Queue + Recent Comments
      ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ── Up Next in Queue ── */}
        <div className="rounded-xl border border-border bg-background flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-[15px]">
                Up Next in Queue
              </h3>
              <span className="text-xs text-muted-foreground">0 posts</span>
            </div>
            <Link
              href="/calendar"
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View Calendar
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Body — Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 border-t border-border">
            <div className="h-14 w-14 rounded-2xl bg-muted/70 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <h4 className="font-semibold text-foreground text-sm mb-1">
              No posts scheduled yet
            </h4>
            <p className="text-xs text-muted-foreground max-w-[280px] leading-relaxed mb-5">
              When you queue or schedule posts, they will show up here
              chronologically before publishing.
            </p>
            <button
              onClick={() => dispatch(openCreatePostModal())}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Schedule a Post
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Next recommended slot: Tomorrow, 9:15 AM
            </span>
            <Link
              href="/analytics"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Optimal Time
            </Link>
          </div>
        </div>

        {/* ── Recent Comments & Replies ── */}
        <div className="rounded-xl border border-border bg-background flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-[15px]">
                Recent Comments & Replies
              </h3>
              <span className="text-xs text-muted-foreground">Inbox clean</span>
            </div>
            <Link
              href="/posts"
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Go to Community
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Body — Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 border-t border-border">
            <div className="h-14 w-14 rounded-2xl bg-muted/70 flex items-center justify-center mb-4">
              <MessageSquareText className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <h4 className="font-semibold text-foreground text-sm mb-1">
              No comments yet
            </h4>
            <p className="text-xs text-muted-foreground max-w-[280px] leading-relaxed mb-5">
              Once your audience interacts with your published posts, you can
              read and reply to comments right from this dashboard.
            </p>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer">
              View Engagement Tips
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
            <span className="text-xs text-muted-foreground">
              PostZest Community sync active
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          SECTION 5 : Bottom CTA Banner
      ───────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 md:py-8 md:px-10"
        style={{
          background:
            "linear-gradient(135deg, #1a0a3e 0%, #2d1566 35%, #432589 65%, #6E56CF 100%)",
        }}
      >
        {/* Decorative radial glow on right */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 h-[300px] w-[300px] rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(110,86,207,0.7) 0%, transparent 70%)",
          }}
        />
        {/* Subtle top-left glow */}
        <div
          className="absolute -top-12 -left-12 h-40 w-40 rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center! md:justify-between! gap-6">
          {/* Text Content */}
          <div className="space-y-3 ">
            <span className="inline-flex px-2 items-center gap-1.5 rounded-full bg-background backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Smart Publishing Algorithm
            </span>
            <h3 className="text-xl md:text-[22px] tracking-tighter font-bold leading-snug text-background">
              Post when your target audience is most active
            </h3>
            <p className="text-sm leading-relaxed text-background max-w-xl tracking-tight">
              PostZest automatically calculates your highest impression
              time-windows across Instagram, LinkedIn, and X once your channels
              are active.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/social-accounts"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg"
            >
              Connect Channel Now
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium text-background hover:text-white transition-colors whitespace-nowrap"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
