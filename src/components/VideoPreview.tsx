
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VideoPreviewProps {
  videoUrl: string | null;
  isProcessing: boolean;
  onTransform: () => void;
  canTransform: boolean;
}

export function VideoPreview({ videoUrl, isProcessing, onTransform, canTransform }: VideoPreviewProps) {
  return (
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
          disabled={!canTransform || isProcessing}
          onClick={onTransform}
        >
          {isProcessing ? "Processing..." : "Transform to Video"}
        </Button>
      </div>
    </Card>
  );
}
