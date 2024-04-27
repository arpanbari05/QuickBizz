import React, { useState } from "react";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  ...props
}) => {
  const [error, setError] = useState<boolean>(false);

  return (
    <img
      src={error ? fallbackSrc : src}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;
