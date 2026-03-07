import LandingButton from "@/components/landing/LandingButton";
import { AppleLogo, ArrowDown } from "@phosphor-icons/react/ssr";

type HeroCtaButtonsProps = {
  className?: string;
};

export default function HeroCtaButtons({ className = "" }: HeroCtaButtonsProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`.trim()}>
      <LandingButton
        href="#"
        label="Get on the App Store"
        variant="primary"
        leadingIcon={<AppleLogo size={18} weight="fill" />}
      />
      <LandingButton
        href="#features-start"
        label="Discover More"
        variant="secondary"
        trailingIcon={<ArrowDown size={16} weight="bold" />}
      />
    </div>
  );
}
