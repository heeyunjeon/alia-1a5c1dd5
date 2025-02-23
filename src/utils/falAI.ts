
import * as fal from "@fal-ai/serverless-client";

export interface FalVideoResponse {
  video: string;
  task_id?: string;
  status?: string;
}

// Define the expected response type from FAL AI
interface FalAIResponse {
  video: string;
  [key: string]: any; // Allow for additional properties
}

export async function configureFalAI() {
  fal.config({
    proxyUrl: "https://gateway.fal.ai",
    credentials: "include",
  });
}

export async function transformImageToVideo(base64Image: string, brandName: string): Promise<FalVideoResponse> {
  try {
    console.log('Initializing FAL AI transformation...');
    
    const base64Data = base64Image.includes('base64,') 
      ? base64Image.split('base64,')[1] 
      : base64Image;

    // Use the correct model ID format as required by FAL AI
    const result = await fal.run('fal-ai/svd', {
      input: {
        image_url: `data:image/jpeg;base64,${base64Data}`,
        num_frames: 14,
        num_inference_steps: 25,
        guidance_scale: 7.5,
        motion_bucket_id: 180,
        cond_aug: 0.02,
      },
      subscribe: true, // Enable real-time updates
      pollInterval: 5000, // Poll every 5 seconds
      maxRetries: 80, // Maximum 80 retries (about 6.5 minutes with 5s interval)
    }) as FalAIResponse;

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
