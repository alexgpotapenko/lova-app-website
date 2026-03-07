import LandingButton from "@/components/landing/LandingButton";
import { AppleLogo } from "@phosphor-icons/react/ssr";

type HeroCtaButtonsProps = {
  className?: string;
};

export default function HeroCtaButtons({ className = "" }: HeroCtaButtonsProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`.trim()}>
      <LandingButton
        href="#"
        label={
          <>
            <span className="md:hidden">
              Get on the
              <br />
              AppStore
            </span>
            <span className="hidden md:inline">Get on the App Store</span>
          </>
        }
        variant="primary"
        leadingIcon={<AppleLogo size={18} weight="fill" />}
      />
      <LandingButton
        href="#features-start"
        label="Discover More"
        variant="secondary"
      />
    </div>
  );
}
