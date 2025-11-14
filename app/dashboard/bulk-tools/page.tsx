"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Wand2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BulkTools() {
  const router = useRouter();
  return (
    <section className="w-full">
      <div className="">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Bulk Tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Streamline your workflow with powerful automation tools
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Bulk Video Upload Card */}
          <Card className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm  shadow-[var(--shadow-hover)] transition-all duration-500">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-green-600/20 opacity-100 transition-opacity duration-500" />

            <CardContent className="relative p-8 md:p-10">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50 transition-all duration-500 group-hover:scale-110">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <Badge className="absolute -top-1 -right-1 bg-green-100 text-green-700 border-green-200 font-semibold px-3 py-1">
                  NEW
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                  Bulk Video Upload
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Upload, manage, and schedule multiple videos across all your
                  platforms — all at once. Save hours of manual work.
                </p>

                {/* Button */}
                <Button
                  onClick={() =>
                    router.push("/dashboard/bulk-tools/create/video-upload")
                  }
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 group/btn"
                >
                  <span>Upload in Bulk</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl bg-green-500/10 transition-all duration-500" />
            </CardContent>
          </Card>

          {/* Bulk Video Creation Card */}
          <Card className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-[var(--shadow-modern)] hover:shadow-[var(--shadow-hover)] transition-all duration-500">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-purple-600/20 opacity-100 transition-opacity duration-500" />

            <CardContent className="relative p-8 md:p-10">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
                <Badge className="absolute -top-1 -right-1 bg-purple-100 text-purple-700 border-purple-200 font-semibold px-3 py-1">
                  NEW
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
                  Bulk Video Creation
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Generate and customize AI-powered 2×2 grid videos for
                  campaigns or social posts in seconds. Create at scale
                  effortlessly.
                </p>

                {/* Button */}
                <Button
                  onClick={() =>
                    router.push("/dashboard/bulk-tools/create/video-creation")
                  }
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group/btn"
                >
                  <span>Create with AI</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all duration-500" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
