"use client";

import type { ImageProps } from "@/types/components";

export default function ImageBlock({
  src,
  alt,
  width,
  height,
  borderRadius,
}: ImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="comp-image"
      src={src}
      alt={alt}
      style={{
        width: width || "100%",
        height: height || "auto",
        borderRadius: borderRadius || "8px",
        objectFit: "cover",
      }}
    />
  );
}
