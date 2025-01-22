import Image from "next/image"

export function HeroImage() {
    return (
      <div className="relative w-full flex justify-center">
        <div className="relative w-full max-w-[1600px] h-[600px] mt-8">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white pointer-events-none z-10" />
            <Image
              src="/screenshot.png"
              alt="VQSN Dashboard Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    )
  }