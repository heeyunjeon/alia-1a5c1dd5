
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface OnboardingFlowProps {
  onComplete: (category: string) => void;
}

type InfluencerCategory = "Lifestyle" | "Fashion" | "Tech" | "Beauty";

const steps = [
  {
    title: "Welcome",
    description: "Let's get started with your creator journey",
  },
  {
    title: "Social Media",
    description: "Connect your social media accounts",
  },
  {
    title: "Creator Type",
    description: "Tell us about your content",
  },
  {
    title: "Complete",
    description: "You're all set!",
  },
];

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<InfluencerCategory | null>(null);
  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    tiktok: "",
    youtube: "",
  });
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setSession(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!selectedCategory || !session?.user) return;

    try {
      const { error } = await supabase.from("influencer_profiles").upsert({
        id: session.user.id,
        category: selectedCategory,
        instagram_username: socialMedia.instagram || null,
        tiktok_username: socialMedia.tiktok || null,
        youtube_channel: socialMedia.youtube || null,
      });

      if (error) throw error;

      toast.success("Profile updated successfully!");
      onComplete(selectedCategory.toLowerCase());
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <Card className="w-full max-w-2xl p-8 backdrop-blur-lg bg-white/80">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {steps[currentStep].title}
            </h2>
            <p className="text-neutral-500">{steps[currentStep].description}</p>
          </div>

          <div className="flex gap-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= currentStep ? "bg-brandPrimary" : "bg-neutral-200"
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">
            {currentStep === 0 && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-sm text-neutral-600">
                  Welcome! Your account is ready to be set up.
                </p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <Input
                  placeholder="Instagram Username"
                  value={socialMedia.instagram}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, instagram: e.target.value })
                  }
                />
                <Input
                  placeholder="TikTok Username"
                  value={socialMedia.tiktok}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, tiktok: e.target.value })
                  }
                />
                <Input
                  placeholder="YouTube Channel"
                  value={socialMedia.youtube}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, youtube: e.target.value })
                  }
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={selectedCategory === "Lifestyle" ? "default" : "outline"}
                    className="h-24 transition-colors"
                    onClick={() => setSelectedCategory("Lifestyle")}
                  >
                    Lifestyle
                  </Button>
                  <Button
                    variant={selectedCategory === "Fashion" ? "default" : "outline"}
                    className="h-24 transition-colors"
                    onClick={() => setSelectedCategory("Fashion")}
                  >
                    Fashion
                  </Button>
                  <Button
                    variant={selectedCategory === "Tech" ? "default" : "outline"}
                    className="h-24 transition-colors"
                    onClick={() => setSelectedCategory("Tech")}
                  >
                    Tech
                  </Button>
                  <Button
                    variant={selectedCategory === "Beauty" ? "default" : "outline"}
                    className="h-24 transition-colors"
                    onClick={() => setSelectedCategory("Beauty")}
                  >
                    Beauty
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-4 animate-fadeIn">
                <div className="h-24 w-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="h-12 w-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">All Done!</h3>
                <p className="text-neutral-500">
                  Your profile is ready. Let's explore brand opportunities.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-6">
            {currentStep > 0 && (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            <div className="flex-1" />
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={currentStep === 2 && !selectedCategory}
              >
                Continue
              </Button>
            ) : (
              <Button onClick={handleComplete}>Get Started</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
