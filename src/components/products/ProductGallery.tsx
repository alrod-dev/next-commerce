'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const validImages = images.filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <img
          src={validImages[selectedImage] || 'https://via.placeholder.com/500'}
          alt="Product"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-lg border-2 transition-colors ${
                selectedImage === index
                  ? 'border-blue-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <img src={image} alt={`Thumbnail ${index}`} className="aspect-square object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
