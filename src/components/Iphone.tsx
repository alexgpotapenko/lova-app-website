import Image from "next/image";

/**
 * iPhone frame (460×960) with screen image (420×912 at left 20, top 24).
 */
export default function Iphone() {
  return (
    <div className="relative w-[460px] h-[960px] shrink-0 origin-top scale-[0.75]">
      {/* Экран — сзади, под рамкой */}
      <Image
        src="/screen-home.png"
        alt=""
        width={420}
        height={912}
        className="absolute left-5 top-6 w-[420px] h-[912px] rounded-[48px] object-cover z-0"
      />
      {/* Рамка iPhone PNG — поверх экрана */}
      <Image
        src="/iphone.png"
        alt=""
        width={460}
        height={960}
        className="relative z-10 w-full h-full object-contain"
        priority
      />
    </div>
  );
}
