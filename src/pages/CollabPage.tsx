
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
    if (!file) return;

    // Check for supported image types
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!supportedTypes.includes(file.type)) {
      toast.error("Please select a JPEG, PNG, or WebP image");
      return;
    }

    console.log("File type:", file.type);
    console.log("File size:", file.size, "bytes");

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        console.log("Data URL length:", result.length);
        console.log("Data URL type:", result.split(';')[0]);
        
        // Set the image data directly since we're reading a local file
        setSelectedImage(result);
      } else {
        console.error("Invalid result type:", typeof result);
        toast.error("Invalid image format");
      }
    };
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      toast.error("Failed to read the image file");
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
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
