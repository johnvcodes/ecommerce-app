import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";

type Props = { rating: number };

function ProductRating({ rating }: Props) {
  const ratingArray = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {ratingArray.map((_, index) => (
        <span
          key={`rating-${Math.floor(Math.random() * 1000)}${Math.floor(
            Math.random() * 1000
          )}`}
          className="text-yellow-500"
        >
          {Math.floor(rating) > index ? (
            <SolidStarIcon className="h-4 w-4" />
          ) : (
            <StarIcon className="h-4 w-4" />
          )}
        </span>
      ))}
    </div>
  );
}

export default ProductRating;
