import LandingButton from "@/components/landing/LandingButton";
import { AppleLogo } from "@phosphor-icons/react/ssr";

type HeroCtaButtonsProps = {
  className?: string;
};

export default function HeroCtaButtons({ className = "" }: HeroCtaButtonsProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`.trim()}>
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
        label={
          <>
            <span className="md:hidden">
              Discover
              <br />
              More
            </span>
            <span className="hidden md:inline">Discover More</span>
          </>
        }
        variant="secondary"
      />
    </div>
  );
}
