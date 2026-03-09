import Image from "next/image";

/**
 * iPhone frame (460×960) with screen image (420×912 at left 20, top 24).
 */
export default function Iphone({ screenSrc = "/screen-home.png" }: { screenSrc?: string }) {
  return (
    <div className="relative w-[460px] h-[960px] shrink-0 origin-top scale-[0.75]">
      <Image
        src={screenSrc}
        alt="App screen"
        width={420}
        height={912}
        className="absolute left-5 top-6 object-cover"
      />
      <Image
        src="/iphone.png"
        alt=""
        width={460}
        height={960}
        className="absolute inset-0 h-full w-full object-contain pointer-events-none"
        aria-hidden
      />
    </div>
  );
}
