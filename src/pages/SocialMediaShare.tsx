
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook, Twitter, Instagram } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SocialMediaShare() {
  const { brandName } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-2xl font-bold mb-6">Share on Social Media</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center space-y-4">
            <Facebook className="h-12 w-12 text-blue-600" />
            <h2 className="text-xl font-semibold">Facebook</h2>
            <p className="text-2xl font-bold text-green-600">$199</p>
            <Button className="w-full" onClick={() => alert("Coming soon!")}>
              Share on Facebook
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center space-y-4">
            <Twitter className="h-12 w-12 text-blue-400" />
            <h2 className="text-xl font-semibold">Twitter</h2>
            <p className="text-2xl font-bold text-green-600">$249</p>
            <Button className="w-full" onClick={() => alert("Coming soon!")}>
              Share on Twitter
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center space-y-4">
            <Instagram className="h-12 w-12 text-pink-600" />
            <h2 className="text-xl font-semibold">Instagram</h2>
            <p className="text-2xl font-bold text-green-600">$299</p>
            <Button className="w-full" onClick={() => alert("Coming soon!")}>
              Share on Instagram
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
