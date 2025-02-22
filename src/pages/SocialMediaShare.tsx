
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Instagram, Youtube } from "lucide-react";
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
            <Instagram className="h-12 w-12 text-pink-600" />
            <h2 className="text-xl font-semibold">Instagram</h2>
            <p className="text-2xl font-bold text-green-600">$199</p>
            <Button className="w-full" onClick={() => alert("Coming soon!")}>
              Share on Instagram
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center space-y-4">
            <svg 
              viewBox="0 0 24 24" 
              className="h-12 w-12"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <h2 className="text-xl font-semibold">TikTok</h2>
            <p className="text-2xl font-bold text-green-600">$249</p>
            <Button className="w-full" onClick={() => alert("Coming soon!")}>
              Share on TikTok
            </Button>
          </Card>

          <Card className="p-6 flex flex-col items-center space-y-4">
            <Youtube className="h-12 w-12 text-red-600" />
            <h2 className="text-xl font-semibold">YouTube</h2>
            <p className="text-2xl font-bold text-green-600">$299</p>
            <Button className="w-full" onClick={() => alert("Coming soon!")}>
              Share on YouTube
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
