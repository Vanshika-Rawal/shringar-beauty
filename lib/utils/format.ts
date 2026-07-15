/** Format a number as Indian Rupees, e.g. 1499 → "₹1,499". */
export function formatPrice(value: number): string {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

/** Discount percentage from mrp → price, e.g. (1999, 1499) → "25% OFF". */
export function discountLabel(mrp: number, price: number): string {
  if (!mrp || mrp <= price) return "";
  const pct = Math.round(((mrp - price) / mrp) * 100);
  return `${pct}% OFF`;
}

export function ratingString(rating: number): string {
  return rating.toFixed(1);
}

export function reviewsString(count: number): string {
  if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(count);
}

/** Human label for an order's payment method. */
export function paymentLabel(method: "cod" | "card" | "upi"): string {
  switch (method) {
    case "card": return "Credit / Debit Card";
    case "upi": return "UPI";
    case "cod": return "Cash on Delivery";
    default: return method;
  }
}

/** Format a Firestore Timestamp (or anything with toDate/seconds) as a date. */
export function formatDate(ts?: { toDate?: () => Date; seconds?: number }): string {
  if (!ts) return "";
  const date = ts.toDate
    ? ts.toDate()
    : ts.seconds != null
    ? new Date(ts.seconds * 1000)
    : null;
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
