import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  images: string[];
};

function ProductCarousel({ images }: Props) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const previousImage = () => {
    setCurrentImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };
  const nextImage = () =>
    setCurrentImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );

  return (
    <div className="flex gap-1">
      <div className="hidden flex-col gap-1 md:flex">
        {images.map((image, index) => (
          <button
            onClick={() => setCurrentImage(index)}
            key={image}
            type="button"
            className={`${
              currentImage === index
                ? "opacity-100"
                : "opacity-50 hover:opacity-75 focus:opacity-75"
            } w-20 rounded outline outline-1 outline-offset-0 outline-transparent transition-all focus:outline-neutral-500`}
          >
            <img src={image} alt="" className="rounded" />
          </button>
        ))}
      </div>
      <div className="relative flex w-80 overflow-hidden rounded md:w-[20rem] 2xl:w-[30rem]">
        <div
          className="flex grow transition-transform duration-300"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((image) => (
            <img key={image} src={image} alt="" />
          ))}
        </div>
        <div className="absolute flex h-full w-full items-center justify-between p-1">
          <button
            onClick={previousImage}
            type="button"
            className="flex items-center rounded bg-neutral-50 p-1 text-neutral-950 outline outline-2 outline-offset-0 outline-transparent transition-colors hover:bg-neutral-300 focus:bg-neutral-300"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            type="button"
            className="flex items-center rounded bg-neutral-50 p-1 text-neutral-950 outline outline-2 outline-offset-0 outline-transparent transition-colors hover:bg-neutral-300 focus:bg-neutral-300"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={_}
              className={`${
                currentImage === index ? "opacity-100" : "opacity-50"
              } h-2 w-2 rounded bg-neutral-50`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCarousel;
