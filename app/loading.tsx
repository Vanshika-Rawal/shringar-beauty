export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-copper/25 border-t-copper" />
        <span className="font-playfair text-lg tracking-[0.3em] text-brown">SHRINGAR</span>
      </div>
    </div>
  );
}
