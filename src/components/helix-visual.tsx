export function HelixVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} overflow-hidden rounded-2xl w-full h-full relative flex items-center justify-center min-h-[350px]`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={`${import.meta.env.BASE_URL}dnabg.mov`}
      />
    </div>
  );
}
