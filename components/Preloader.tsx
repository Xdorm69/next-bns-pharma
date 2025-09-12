"use client";

export default function Preloader() {
  return (
    <div className="preloader fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <h1 className="preloader-logo text-4xl font-bold text-primary font-mono tracking-wide">
        PharmaCo.
      </h1>
      <div className="mt-6 w-48 h-1 bg-gray-200 overflow-hidden rounded-full">
        <div className="preloader-bar h-full bg-primary origin-left scale-x-0" />
      </div>
    </div>
  );
}
