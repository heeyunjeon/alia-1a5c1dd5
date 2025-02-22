
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import * as fal from "@fal-ai/serverless-client";

// Define the type for the API response
interface FalVideoResponse {
  video: string;
  task_id?: string;
  status?: string;
}

export default function CollabPage() {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleTransform = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    toast.loading("Transforming your image into video...");
    
    try {
      // Configure Fal AI client
      fal.config({
        credentials: process.env.FAL_AI_KEY,
      });

      // Convert the blob URL back to base64 for the API
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          // Call the image-to-video endpoint with type assertion
          const result = await fal.run('image-to-video', {
            input: {
              image_url: reader.result as string,
              num_frames: 30,
            },
          }) as FalVideoResponse;

          if (result.video) {
            setVideoUrl(result.video);
            toast.success("Video created successfully!");
          } else {
            throw new Error("No video generated");
          }
        } catch (error) {
          console.error("Error transforming image:", error);
          toast.error("Failed to transform image to video. Please try again.");
        }
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error transforming image:", error);
      toast.error("Failed to transform image to video. Please try again.");
    } finally {
      setIsProcessing(false);
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
          {/* Image Upload Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Upload Your Image</h2>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  selectedImage ? 'border-brandPrimary' : 'border-neutral-200'
                }`}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="mx-auto max-h-48 rounded object-contain"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        URL.revokeObjectURL(selectedImage);
                        setSelectedImage(null);
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-neutral-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageSelect}
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-brandPrimary hover:text-brandPrimary/80"
                      >
                        Click to upload
                      </label>
                      <p className="text-sm text-neutral-500 mt-2">
                        or drag and drop your image here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Video Transformation Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Generated Video</h2>
              <div className="border rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                {videoUrl ? (
                  <video
                    controls
                    className="max-w-full max-h-[300px] rounded"
                    src={videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-neutral-500">
                    {isProcessing ? (
                      "Processing your video..."
                    ) : (
                      "Upload an image to generate video"
                    )}
                  </div>
                )}
              </div>
              <Button
                className="w-full"
                disabled={!selectedImage || isProcessing}
                onClick={handleTransform}
              >
                {isProcessing ? "Processing..." : "Transform to Video"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
