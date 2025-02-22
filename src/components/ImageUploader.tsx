
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="text-center">
        <h3 className="font-semibold mb-2">Upload Your Content</h3>
        <p className="text-sm text-neutral-500">
          Select an image to transform into engaging video content
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          selectedImage ? "border-brandPrimary" : "border-neutral-200"
        }`}
      >
        {selectedImage ? (
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt="Preview"
              className="mx-auto max-h-48 rounded"
            />
            <Button
              variant="outline"
              onClick={() => setSelectedImage(null)}
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
                onChange={handleImageSelect}
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

      {selectedImage && (
        <Button
          className="w-full"
          disabled={loading}
          onClick={() => {
            // Handle image transformation
          }}
        >
          {loading ? "Processing..." : "Transform to Video"}
        </Button>
      )}
    </Card>
  );
};
