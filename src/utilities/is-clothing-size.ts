import { ClothingSize, FootwearSize } from "../@types/sizes";

const isClothingSize = (
  size: ClothingSize | FootwearSize
): size is ClothingSize => {
  return "label" in size;
};

export default isClothingSize;
