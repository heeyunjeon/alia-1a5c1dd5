
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/ImageUploader";
import { VideoPreview } from "@/components/VideoPreview";
import { configureFalAI, transformImageToVideo } from "@/utils/falAI";

export default function CollabPage() {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("File selected:", file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("FileReader loaded, result exists:", !!e.target?.result);
        const result = e.target?.result as string;
        console.log("Setting selected image, length:", result.length);
        setSelectedImage(result);
      };
      reader.onerror = (e) => {
        console.error("FileReader error:", e);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    console.log("Removing image");
    setSelectedImage(null);
  };

  const handleTransform = async () => {
    if (!selectedImage || !brandName) return;
    
    setIsProcessing(true);
    toast.loading("Transforming your image into video...");
    
    try {
      await configureFalAI();
      const result = await transformImageToVideo(selectedImage, brandName);

      if (result.video) {
        setVideoUrl(result.video);
        toast.success("Video created successfully!");
      } else {
        throw new Error("No video generated");
      }
    } catch (error) {
      console.error("Error transforming image:", error);
      toast.error("Failed to transform image to video. Please try again.");
    } finally {
      setIsProcessing(false);
      toast.dismiss();
    }
  };

  console.log("Current selectedImage state:", selectedImage ? "Image exists" : "No image");

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Brand Details
        </Button>

        <h1 className="text-2xl font-bold mb-6">Collaborate with {brandName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
            onImageRemove={handleImageRemove}
          />
          <VideoPreview
            videoUrl={videoUrl}
            isProcessing={isProcessing}
            onTransform={handleTransform}
            canTransform={!!selectedImage}
          />
        </div>
      </div>
    </div>
  );
}
