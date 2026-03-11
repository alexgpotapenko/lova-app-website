import LandingButton from "@/components/landing/LandingButton";
import { AppStoreLogo } from "@phosphor-icons/react/ssr";

type HeroCtaButtonsProps = {
  className?: string;
  fullWidth?: boolean;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
};

export default function HeroCtaButtons({ className = "", fullWidth, buttonClassName = "", buttonStyle }: HeroCtaButtonsProps) {
  const defaultStyle = { paddingLeft: 20, paddingRight: 28 };
  return (
    <div className={`flex items-center justify-center ${className}`.trim()}>
      <LandingButton
        href="#"
        label={
          <>
            <span className="font-normal">Get on the </span>
            <span>App Store</span>
          </>
        }
        variant="primary"
        leadingIcon={<AppStoreLogo size={24} weight="regular" />}
        className={`px-6 py-3 text-xl font-semibold ${fullWidth ? "w-full" : ""} ${buttonClassName}`.trim()}
        style={buttonStyle ?? defaultStyle}
      />
    </div>
  );
}
