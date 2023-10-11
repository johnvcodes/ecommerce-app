import { IconStar, IconStarFilled } from "@tabler/icons-react";

type Props = { rating: number };

function ProductRating({ rating }: Props) {
  const ratingArray = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {ratingArray.map((_, index) => (
        <span
          key={`rating-${Math.floor(Math.random() * 1000)}${Math.floor(
            Math.random() * 1000,
          )}`}
          className="text-yellow-500"
        >
          {Math.floor(rating) > index ? (
            <IconStarFilled strokeWidth={1.5} />
          ) : (
            <IconStar strokeWidth={1.5} />
          )}
        </span>
      ))}
    </div>
  );
}

export default ProductRating;
