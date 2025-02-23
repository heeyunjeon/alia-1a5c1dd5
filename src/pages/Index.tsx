
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { BrandCard } from "@/components/BrandCard";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const mockBrands = [
  {
    name: "Tech Giant Co",
    logo: "/placeholder.svg",
    category: "Tech",
    budget: "$5,000 - $10,000",
    deadline: "March 30, 2024"
  },
  {
    name: "Fashion Forward",
    logo: "/placeholder.svg",
    category: "Fashion",
    budget: "$2,000 - $5,000",
    deadline: "April 15, 2024"
  },
  {
    name: "Beauty Basics",
    logo: "/placeholder.svg",
    category: "Beauty",
    budget: "$3,000 - $7,000",
    deadline: "March 25, 2024"
  },
  {
    name: "Lifestyle Plus",
    logo: "/placeholder.svg",
    category: "Lifestyle",
    budget: "$4,000 - $8,000",
    deadline: "April 5, 2024"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // Check if user has already completed onboarding
        checkOnboardingStatus(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkOnboardingStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkOnboardingStatus = async (userId: string) => {
    const { data: profile } = await supabase
      .from('influencer_profiles')
      .select('category')
      .eq('id', userId)
      .single();

    if (profile?.category) {
      setHasCompletedOnboarding(true);
      setCategoryFilter(profile.category.toLowerCase());
    }
  };

  const handleOnboardingComplete = (selectedCategory: string) => {
    setHasCompletedOnboarding(true);
    setCategoryFilter(selectedCategory);
  };

  const filteredBrands = mockBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || brand.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {!hasCompletedOnboarding ? (
        <div className="p-4">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate("/auth")}
          >
            Sign In / Sign Up
          </Button>
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Brand Collaborations</h1>
              <div className="flex gap-2">
                {session ? (
                  <Button 
                    variant="outline"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setHasCompletedOnboarding(false);
                      navigate("/auth");
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In / Sign Up
                  </Button>
                )}
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-2/3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search brands..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand, index) => (
                <BrandCard
                  key={index}
                  name={brand.name}
                  logo={brand.logo}
                  category={brand.category}
                  budget={brand.budget}
                  deadline={brand.deadline}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
