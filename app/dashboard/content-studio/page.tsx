"use client";

import { Flame, Eye, Sparkles, Grid2x2, Image, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const aiTemplates = [
  {
    id: 1,
    icon: <Video className="w-6 h-6 text-primary" />,
    label: "AI powered",
    title: "AI UGC Video Creator",
    description:
      "Instantly generate realistic UGC-style videos with AI-powered templates for product demos, testimonials, and viral campaigns.",
    stats: { hot: "🔥 Very Hot", views: "∞ Infinite Views" },
    buttonText: "Create AI UGC Video",
  },
  {
    id: 2,
    icon: <Grid2x2 className="w-6 h-6 text-primary" />,
    label: "AI powered",
    title: "2x2 Grid Video Creator",
    description:
      "Create engaging videos using a dynamic 4-image grid format that’s proven to go viral across platforms.",
    stats: { hot: "📈 Trending", views: "20M+ Views" },
    buttonText: "Create Template",
  },
  {
    id: 3,
    icon: <Image className="w-6 h-6 text-primary" />,
    label: "AI powered",
    title: "Single Fade-in Video Creator",
    description:
      "Simple yet powerful format with billions of views — ideal for storytellers who want maximum impact with minimal effort.",
    stats: { hot: "🔥 Trending", views: "500M+ Views" },
    buttonText: "Create Template",
  },
];

export default function ContentStudio() {
  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">AI Studio</h2>
          <Sparkles className="w-5 h-5 text-primary" />
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

                {/* Stats */}
                <div className="flex gap-4 pt-2 text-sm font-medium text-primary">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4" /> {template.stats.hot}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {template.stats.views}
                  </span>
                </div>
              </div>

              {/* Button */}
              <div className="p-5 pt-0">
                <button className="w-full py-2.5 text-sm font-semibold bg-primary text-background rounded-md cursor-pointer hover:bg-primary transition-all duration-200">
                  {template.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
