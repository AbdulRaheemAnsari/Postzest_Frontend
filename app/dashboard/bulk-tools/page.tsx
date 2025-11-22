"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Wand2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const aiTemplates = [
  {
    id: 1,
    icon: <Upload className="w-6 h-6 text-primary" />,
    label: "New",
    title: "Bulk Video Upload",
    description:
      "Upload, manage, and schedule multiple videos across all your platforms all at once. Save hours of manual work.",
    buttonText: "Create in Bulk",
    url: "/dashboard/bulk-tools/create/video-upload",
  },
  {
    id: 2,
    icon: <Wand2 className="w-6 h-6 text-primary" />,
    label: "New",
    title: "Bulk Video Creation",
    description:
      "Generate and customize AI-powered 2×2 grid videos for campaigns or social posts in seconds. Create at scale effortlessly.",
    buttonText: "Create with AI",
    url: "/dashboard/bulk-tools/create/video-creation",
  },
];

export default function BulkTools() {
  const router = useRouter();
  return (
    <>
      <section className="py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Bulk Tools
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {aiTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative group rounded-lg border border-primary/5 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/5 rounded-lg">
                      {template.icon}
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-primary/5 text-primary rounded-full">
                      {template.label}
                    </span>
                  </div>
                </div>

                <Separator className="bg-primary/10" />
                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Button */}
                <div className="p-5 pt-0">
                  <Button
                    onClick={() => router.push(template?.url)}
                    className="w-full flex items-center gap-1 py-6 text-sm font-semibold bg-primary text-background rounded-md cursor-pointer hover:bg-primary mt-4 transition-all duration-300 group/btn"
                  >
                    <span> {template.buttonText}</span>
                    <ArrowRight className=" w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
