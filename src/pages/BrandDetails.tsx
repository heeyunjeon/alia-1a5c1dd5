
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowLeft, BarChart3, Calendar, DollarSign, Users } from "lucide-react";

const mockBrandDetails = {
  name: "Tech Giant Co",
  logo: "/placeholder.svg",
  category: "Tech",
  budget: "$5,000 - $10,000",
  deadline: "March 30, 2024",
  description: "Leading technology company seeking creative content creators for product launches and tech reviews.",
  requirements: [
    "Minimum 10k followers",
    "Tech-savvy audience",
    "Experience with tech reviews",
    "High engagement rate"
  ],
  pastCollaborators: [
    { name: "Sarah Tech", followers: "50k", engagement: "5.2%" },
    { name: "Digital Dave", followers: "75k", engagement: "4.8%" },
    { name: "Tech Review Pro", followers: "100k", engagement: "6.1%" }
  ],
  analytics: {
    averageEngagement: "5.4%",
    reachPotential: "500k+",
    successRate: "92%",
    campaignROI: "3.2x"
  }
};

export default function BrandDetails() {
  const navigate = useNavigate();
  const { brandName } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Brands
        </Button>

        <div className="space-y-6">
          {/* Brand Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center">
                  <img src={mockBrandDetails.logo} alt={mockBrandDetails.name} className="h-10 w-10 object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{mockBrandDetails.name}</h1>
                  <p className="text-neutral-500">{mockBrandDetails.category}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700">{mockBrandDetails.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-neutral-500" />
                  <span>{mockBrandDetails.budget}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-neutral-500" />
                  <span>{mockBrandDetails.deadline}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Requirements */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Campaign Requirements</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockBrandDetails.requirements.map((req, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Past Collaborators */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Past Collaborator Showcase
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockBrandDetails.pastCollaborators.map((collab, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
                    <span className="font-medium">{collab.name}</span>
                    <div className="space-x-4 text-sm text-neutral-500">
                      <span>{collab.followers} followers</span>
                      <span>{collab.engagement} engagement</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics and Insights */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Analytics and Insights
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-50 rounded-lg text-center">
                  <div className="text-sm text-neutral-500">Avg. Engagement</div>
                  <div className="font-semibold mt-1">{mockBrandDetails.analytics.averageEngagement}</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg text-center">
                  <div className="text-sm text-neutral-500">Reach Potential</div>
                  <div className="font-semibold mt-1">{mockBrandDetails.analytics.reachPotential}</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg text-center">
                  <div className="text-sm text-neutral-500">Success Rate</div>
                  <div className="font-semibold mt-1">{mockBrandDetails.analytics.successRate}</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg text-center">
                  <div className="text-sm text-neutral-500">Campaign ROI</div>
                  <div className="font-semibold mt-1">{mockBrandDetails.analytics.campaignROI}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
