import LandingButton from "@/components/landing/LandingButton";
import { AppStoreLogo } from "@phosphor-icons/react/ssr";

type HeroCtaButtonsProps = {
  className?: string;
};

export default function HeroCtaButtons({ className = "" }: HeroCtaButtonsProps) {
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
        className="px-6 py-3 text-lg font-semibold md:text-xl"
        style={{ paddingLeft: 20, paddingRight: 28 }}
      />
    </div>
  );
}
