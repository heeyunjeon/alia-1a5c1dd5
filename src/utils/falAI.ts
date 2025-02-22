
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

  fal.config({
    credentials: data.secret,
  });
}

export async function transformImageToVideo(base64Image: string): Promise<FalVideoResponse> {
  console.log('Calling FAL AI with image data...');
  const result = await fal.run('fal-ai/image-to-video', {
    input: {
      image: base64Image,
      motion_bucket_id: 127,
      cond_aug: 0.02,
    },
  }) as FalVideoResponse;

  console.log('FAL AI response:', result);
  return result;
}
