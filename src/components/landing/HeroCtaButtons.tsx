import LandingButton from "@/components/landing/LandingButton";
import { AppleLogo } from "@phosphor-icons/react/ssr";

type HeroCtaButtonsProps = {
  className?: string;
};

export default function HeroCtaButtons({ className = "" }: HeroCtaButtonsProps) {
  return (
    <div className={`flex items-center justify-center ${className}`.trim()}>
      <LandingButton
        href="#"
        label="Get on the App Store"
        variant="primary"
        leadingIcon={<AppleLogo size={18} weight="fill" />}
        className="px-6 py-3 text-lg font-semibold md:text-xl"
      />
    </div>
  );
}
