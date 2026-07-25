/* eslint-disable @next/next/no-img-element */
// Replaced next/image with native img for Vercel quota

export default function GlobalLoading({
  text = "Processing...",
}: {
  text?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/85 backdrop-blur-md">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={48}
        height={48}
        className="mb-4 animate-spin filter brightness-90 sepia md:hue-rotate-90"
        style={{
          width: 48,
          height: 48,
          objectFit: "contain",
          aspectRatio: "auto",
        }}
        loading="eager"
        decoding="async"
      />
      <span className="animate-pulse text-lg font-bold text-green-800">
        {text}
      </span>
    </div>
  );
}
