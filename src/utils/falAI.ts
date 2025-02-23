
import * as fal from "@fal-ai/serverless-client";

export interface FalVideoResponse {
  video: string;
  task_id?: string;
  status?: string;
}

export async function configureFalAI() {
  fal.config({
    // FAL AI uses a proxy so we don't need to expose the credentials in the frontend
    proxyUrl: "https://gateway.fal.ai",
    credentials: "include", // This ensures cookies are included with the request
  });
}

export async function transformImageToVideo(base64Image: string, brandName: string): Promise<FalVideoResponse> {
  try {
    console.log('Initializing FAL AI transformation...');
    
    // Remove the data:image/... prefix from base64 string if present
    const base64Data = base64Image.includes('base64,') 
      ? base64Image.split('base64,')[1] 
      : base64Image;

    const result = await fal.run('image-to-video', {
      input: {
        image: base64Data,
        motion_bucket_id: 180, // Higher values = more motion
        cond_aug: 0.02, // Lower values = closer to original image
      },
    });

    console.log('FAL AI transformation completed:', result);

    if (!result.video) {
      throw new Error('No video URL in response');
    }

    return {
      video: result.video,
      status: "completed"
    };
  } catch (error) {
    console.error('Error in FAL AI transformation:', error);
    throw error;
  }
}
