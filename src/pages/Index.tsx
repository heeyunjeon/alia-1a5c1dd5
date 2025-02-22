
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { useState } from "react";

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <OnboardingFlow />
    </div>
  );
};

export default Index;
