import Image from "next/image";

/**
 * iPhone frame (460×960) with screen image (420×912 at left 20, top 24).
 */
type IphoneProps = {
  screenSrc: string;
  scale?: number;
  responsive?: boolean;
  className?: string;
};

export default function Iphone({
  screenSrc,
  scale = 0.75,
  responsive = false,
  className = "",
}: IphoneProps) {
  if (responsive) {
    return (
      <div className={`relative aspect-[460/960] w-full max-w-[460px] shrink-0 ${className}`.trim()}>
        {/* Экран — сзади, под рамкой */}
        <div
          className="absolute z-0 overflow-hidden"
          style={{
            left: "4.3478%",
            top: "2.5%",
            width: "91.3043%",
            height: "95%",
            borderRadius: 20,
          }}
        >
          <Image
            key={screenSrc}
            src={screenSrc}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        {/* Рамка iPhone PNG — поверх экрана */}
        <Image
          src="/iphone.png"
          alt=""
          width={460}
          height={960}
          className="relative z-10 h-full w-full object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`relative h-[960px] w-[460px] shrink-0 origin-top ${className}`.trim()}
      style={{ transform: `scale(${scale})` }}
    >
      {/* Экран — сзади, под рамкой */}
      <div
        className="absolute left-5 top-6 z-0 h-[912px] w-[420px] overflow-hidden"
        style={{ borderRadius: 20 }}
      >
        <Image
          key={screenSrc}
          src={screenSrc}
          alt=""
          fill
          className="object-cover"
        />
      </div>
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
