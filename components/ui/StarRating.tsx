interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ rating, size = 13, showValue = false }: StarRatingProps) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1" style={{ fontSize: size }}>
      <span style={{ color: "#D8B08C", letterSpacing: "0.05em" }}>
        {"★".repeat(full)}
        <span style={{ color: "rgba(216,176,140,0.35)" }}>{"★".repeat(5 - full)}</span>
      </span>
      {showValue ? (
        <span className="font-semibold text-brown" style={{ fontSize: size }}>
          {rating.toFixed(1)}
        </span>
      ) : null}
    </span>
  );
}
