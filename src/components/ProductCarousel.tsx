import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import IconButton from "@components/common/IconButton";

type Props = {
  images: string[];
};

function ProductCarousel({ images }: Props) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const previousImage = () => {
    setCurrentImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };
  const nextImage = () =>
    setCurrentImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse">
      <div className="relative flex overflow-hidden">
        <div
          className="flex grow transition-transform duration-300"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((image) => (
            <img key={image} src={image} alt="" className="object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-1">
          <IconButton
            onClick={previousImage}
            type="button"
            className="bg-neutral-50"
          >
            <IconChevronLeft size={20} strokeWidth={1.5} />
          </IconButton>
          <IconButton
            onClick={nextImage}
            type="button"
            className="bg-neutral-50"
          >
            <IconChevronRight size={20} strokeWidth={1.5} />
          </IconButton>
        </div>
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <div
              key={_}
              className={`${
                currentImage === index ? "opacity-100" : "opacity-50"
              } h-2 w-2  rounded-full bg-neutral-50`}
            />
          ))}
        </div>
      </div>
      <div className="hidden h-[calc(100vh_-_3.5rem)] min-w-[7.5rem] max-w-[7.5rem] flex-col gap-3 overflow-y-auto overflow-x-hidden lg:flex">
        {images.map((image, index) => (
          <button
            onClick={() => setCurrentImage(index)}
            key={image}
            type="button"
            className={`${
              currentImage === index
                ? "opacity-100"
                : "opacity-50 hover:opacity-75 focus:opacity-75"
            }  outline outline-1 outline-offset-0 outline-transparent transition-all focus:outline-neutral-500`}
          >
            <img src={image} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;
