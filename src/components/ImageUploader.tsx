
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCallback } from "react";

interface ImageUploaderProps {
  selectedImage: string | null;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

export function ImageUploader({ selectedImage, onImageSelect, onImageRemove }: ImageUploaderProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const event = {
          target: {
            files: [file]
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onImageSelect(event);
      }
    }
  }, [onImageSelect]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upload Your Image</h2>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            selectedImage ? 'border-neutral-300 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="space-y-4">
              <div className="relative w-full max-w-md mx-auto">
                <img
                  src={selectedImage}
                  alt="Selected preview"
                  className="mx-auto max-h-48 w-full rounded object-contain"
                  onError={() => {
                    console.error("Image load error. Image data length:", selectedImage.length);
                    console.error("Image data starts with:", selectedImage.substring(0, 50));
                  }}
                  loading="lazy"
                />
              </div>
              <Button
                variant="outline"
                onClick={onImageRemove}
                className="mt-4"
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
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  id="image-upload"
                  onChange={onImageSelect}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-neutral-600 hover:text-neutral-800"
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
  );
}
