import { ReactNode, useCallback, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  childrenLength: number;
  autoSlide: boolean;
  autoSlideInterval: number;
};

function Carousel({
  children,
  childrenLength,
  autoSlide = false,
  autoSlideInterval = 3000,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const previouslide = () => {
    setCurrentSlide((current) =>
      current === 0 ? childrenLength - 1 : current - 1
    );
  };
  const nextSlide = useCallback(() => {
    setCurrentSlide((current) =>
      current === childrenLength - 1 ? 0 : current + 1
    );
  }, [childrenLength]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, nextSlide]);

  return (
    <div className="relative flex h-fit w-80 items-center overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={previouslide}
          type="button"
          className="rounded bg-white p-1 text-black"
        >
          Left
        </button>
        <button
          onClick={nextSlide}
          type="button"
          className="rounded bg-white p-1 text-black"
        >
          Right
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {children.map((_, index) => (
            <div
              key={Math.floor(Math.random() * 10000)}
              className={`${
                currentSlide === index ? "p-2" : "bg-opacity-50"
              } h-3 w-3 rounded-full bg-white transition-all`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
