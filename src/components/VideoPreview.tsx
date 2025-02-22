
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface VideoPreviewProps {
  videoUrl: string | null;
  isProcessing: boolean;
  onTransform: () => void;
  canTransform: boolean;
}

export function VideoPreview({ videoUrl, isProcessing, onTransform, canTransform }: VideoPreviewProps) {
  const navigate = useNavigate();

  const handleOpenVideo = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Generated Video</h2>
        <div className="border rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
          {videoUrl ? (
            <>
              <video
                controls
                className="max-w-full max-h-[300px] rounded mb-4"
                src={videoUrl}
              >
                Your browser does not support the video tag.
              </video>
              <div className="flex flex-col gap-2 w-full">
                <Button onClick={handleOpenVideo}>
                  <ExternalLink className="mr-2" />
                  Open in New Tab
                </Button>
                <Button 
                  onClick={() => navigate('share')} 
                  variant="outline"
                >
                  Post to Social Media
                </Button>
              </div>
            </>
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
          disabled={!canTransform || isProcessing}
          onClick={onTransform}
        >
          {isProcessing ? "Processing..." : "Transform to Video"}
        </Button>
      </div>
    </Card>
  );
}
