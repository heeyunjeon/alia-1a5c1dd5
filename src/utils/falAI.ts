
import * as fal from "@fal-ai/serverless-client";
import { supabase } from "@/integrations/supabase/client";

export interface FalVideoResponse {
  video: string;
  task_id?: string;
  status?: string;
}

export async function configureFalAI() {
  // For demo purposes, we'll just return without configuring FAL AI
  return;
}

export async function transformImageToVideo(base64Image: string, brandName: string): Promise<FalVideoResponse> {
  console.log('Using demo video...');
  
  // Return a publicly accessible demo video URL
  return {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    status: "completed"
  };
}
