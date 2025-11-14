"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { StepIndicator } from "@/components/BulkVideoCreation/StepIndicator";
import { TemplateSelector } from "@/components/BulkVideoCreation/TemplateSelector";
import { VideoCaptions } from "@/components/BulkVideoCreation/VideoCaptions";
import { ContentItems } from "@/components/BulkVideoCreation/ContentItems";
import { VideoCountSlider } from "@/components/BulkVideoCreation/VideoCountSlider";
import { BulkGenerateView } from "@/components/BulkVideoCreation/BulkGenerateView";
import { VideoCustomizer } from "@/components/BulkVideoCreation/VideoCustomizer";

const steps = [
  { id: 1, name: "Product Info", icon: "📦" },
  { id: 2, name: "Customize Videos", icon: "🎬" },
  { id: 3, name: "Bulk Generate", icon: "⚡" },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("none");
  const [captions, setCaptions] = useState([
    "people who use these gadgets are living in 2030",
    "pov: you have the ultimate tech setup",
    "the holy grail of productivity tech",
    "people with these tech products >>>>>>>>>",
  ]);
  const [contentItems, setContentItems] = useState([
    "wireless charging pad",
    "smart home hub",
    "mechanical keyboard",
    "cable organizer",
    "portable battery",
    "wireless mouse",
    "desk lamp",
    "phone mount",
    "usb-c hub",
    "external monitor",
    "bluetooth headphones",
    "laptop stand",
  ]);
  const [videoCount, setVideoCount] = useState(5);
  const [videos, setVideos] = useState<any[]>([]);

  const generateVideoConcepts = () => {
    const newVideos = Array.from({ length: videoCount }, (_, i) => ({
      id: i + 1,
      caption: captions[i % captions.length],
      images: Array.from({ length: 4 }, (_, j) => ({
        id: `${i}-${j}`,
        name: contentItems[(i * 4 + j) % contentItems.length],
      })),
      music: i % 2 === 0 ? "MUTT (baby take ur time)" : "Walking Dreams",
      progress: 100,
    }));
    setVideos(newVideos);
    setCurrentStep(2);
  };

  return (
    <div className=" bg-background">
      <div className=" py-4">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold mb-2 text-foreground">
            Bulk Video Creation
          </h1>
          <p className="text-muted-foreground text-lg">
            Create multiple viral-style videos at once using AI-generated
            content
          </p>
        </div>

        <Card className="p-8">
          <StepIndicator steps={steps} currentStep={currentStep} />

          {currentStep === 1 && (
            <div className="space-y-8">
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
              />

              <VideoCaptions
                captions={captions}
                onCaptionsChange={setCaptions}
              />

              <ContentItems
                items={contentItems}
                onItemsChange={setContentItems}
              />

              <VideoCountSlider
                count={videoCount}
                onCountChange={setVideoCount}
              />

              <Button
                size="lg"
                className="w-full text-lg"
                onClick={generateVideoConcepts}
                disabled={captions.length === 0 || contentItems.length < 4}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate {videoCount} video concepts
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Product Info
              </Button>

              <VideoCustomizer videos={videos} onVideosChange={setVideos} />

              <Button
                size="lg"
                className="w-full text-lg"
                onClick={() => setCurrentStep(3)}
              >
                Proceed to video generation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <BulkGenerateView
              videoCount={videoCount}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
