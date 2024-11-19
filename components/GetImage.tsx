import React from "react";
import Image from "next/image";

type ImageProps = {
  folder: string;
  id: number;
  token: string;
  className?: string;
};

const storage = "travel-web-7b510.appspot.com";
const defaultImage =
  "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg";

const ImageComponent: React.FC<ImageProps> = ({
  folder,
  id,
  token,
  className = "",
}) => {
  const getImageUrl = (folder: string, id: number, token: string) => {
    const imgId = id.toString().padStart(6, "0");
    return "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg";
    // return `https://firebasestorage.googleapis.com/v0/b/${storage}/o/${folder}%2F${imgId}.jpg?alt=media&token=${token}`;
  };

  const imageUrl = getImageUrl(folder, id, token);

  return (
    <Image
      src={imageUrl}
      alt={`${folder}-${id.toString().padStart(6, "0")}`}
      className={`${className}`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = defaultImage;
      }}
      width={0}
      height={0}
      layout="responsive"
    />
  );
};

export default ImageComponent;
