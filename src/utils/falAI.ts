
import * as fal from "@fal-ai/serverless-client";
import { supabase } from "@/integrations/supabase/client";

export interface FalVideoResponse {
  video: string;
  task_id?: string;
  status?: string;
}

export async function configureFalAI() {
  const { data, error: secretError } = await supabase
    .rpc('get_service_secret', { secret_name: 'FAL_AI_KEY' }) as {
      data: { secret: string } | null;
      error: Error | null;
    };

  if (secretError || !data?.secret) {
    throw new Error('Failed to get FAL AI API key');
  }

  // Fix: Pass credentials as an object with key property
  fal.config({
    credentials: {
      key: data.secret
    },
  });
}

export async function transformImageToVideo(base64Image: string, brandName: string): Promise<FalVideoResponse> {
  console.log('Calling FAL AI with image data...');
  
  // Generate the prompt with the dynamic brand name
  const prompt = `a beautiful skinny influencer with a flawless glowing skin is talking about her '${brandName}' to post on tiktok at her luxury high-rise apartment that overlooks Central Park Manhattan that is modern and tech-savvy`;
  
  const result = await fal.subscribe("fal-ai/kling-video/v1.6/pro/image-to-video", {
    input: {
      prompt: prompt,
      image_url: base64Image,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs?.map((log) => log.message).forEach(console.log);
      }
    },
  }) as unknown as FalVideoResponse;

  console.log('FAL AI response:', result);
  return result;
}
