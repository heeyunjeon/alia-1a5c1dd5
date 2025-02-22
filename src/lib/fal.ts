
import * as fal from '@fal-ai/serverless-client';

interface VideoResponse {
  video: string;
}

export const generateVideo = async (imageUrl: string, apiKey: string): Promise<string> => {
  fal.config({
    credentials: apiKey,
  });

  try {
    const result = await fal.run('image-to-video', {
      input: {
        image: imageUrl,
        frame_count: 30,
      },
    }) as VideoResponse;

    return result.video;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
};
