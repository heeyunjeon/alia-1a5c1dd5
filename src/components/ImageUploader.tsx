
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploaderProps {
  selectedImage: string | null;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

export function ImageUploader({ selectedImage, onImageSelect, onImageRemove }: ImageUploaderProps) {
  return (
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
                onClick={onImageRemove}
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
                  onChange={onImageSelect}
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
  );
}
