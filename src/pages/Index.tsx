
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { useState } from "react";

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {!hasCompletedOnboarding ? (
        <OnboardingFlow onComplete={() => setHasCompletedOnboarding(true)} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
          {/* Dashboard content will go here */}
        </div>
      )}
    </div>
  );
};

export default Index;
