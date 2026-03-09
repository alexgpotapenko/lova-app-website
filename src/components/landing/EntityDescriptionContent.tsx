"use client";

import EntityFeatureCard from "@/components/landing/EntityFeatureCard";
import {
  renderIllustration,
  type IllustrationKey,
} from "@/components/landing/illustrations";
import Image from "next/image";

type EntityKey = "logins" | "cards" | "subscriptions";

type Feature = {
  title: string;
  description: string;
  illustrationKey?: IllustrationKey;
};

const ENTITIES: Array<{
  key: EntityKey;
  label: string;
  features: Feature[];
}> = [
  {
    key: "logins",
    label: "Logins",
    features: [
    {
      title: "Password generator",
      description:
        "Generate strong, unique passwords with a single tap to use them when creating new accounts.",
      illustrationKey: "logins-1",
    },
    {
      title: "SSO reuse",
      description:
        "Link sign-in methods like Google or Apple once and reuse them across all services that use the same login.",
      illustrationKey: "logins-2",
    },
    ],
  },
  {
    key: "cards",
    label: "Cards",
    features: [
    {
      title: "Full card details",
      description:
        "Store the complete card details — bank and cardholder name, number, expiry date, CVV, and PIN",
      illustrationKey: "cards-3",
    },
    {
      title: "Automatic brand detection",
      description:
        "The card brand is detected automatically from the card number.",
      illustrationKey: "cards-1",
    },
    {
      title: "Virtual cards",
      description:
        "Mark cards as virtual to distinguish them from physical ones.",
      illustrationKey: "cards-2",
    },
    ],
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    features: [
    {
      title: "Upcoming payment",
      description:
        "Quickly see which subscription will charge next and how much.",
      illustrationKey: "subscriptions-1",
    },
    {
      title: "Never get charged by surprise",
      description:
        "Set a reminder before any renewal date and get notified on your device",
      illustrationKey: "subscriptions-2",
    },
    {
      title: "See where your money goes",
      description:
        "A visual breakdwon of all active subscriptions by monthly cost",
      illustrationKey: "subscriptions-3",
    },
    ],
  },
];

function getScreenSrc(entity: EntityKey) {
  if (entity === "cards") return "/screen-card-details.png";
  if (entity === "subscriptions") return "/screen-subscription-details.png";
  return "/screen-login-details.png";
}

export default function EntityDescriptionContent() {
  return (
    <div className="flex w-full flex-col gap-32">
      {ENTITIES.map((entity) => {
        const screenSrc = getScreenSrc(entity.key);

        return (
          <section key={entity.key} className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
            <div className="min-w-0">
              <div className="relative w-full overflow-visible">
                <div className="h-[512px] overflow-hidden rounded-[32px]">
                  <div className="relative h-full overflow-hidden pb-12 pt-10">
                    <div className="relative z-20 mb-10 text-center">
                      <h2 className="text-black">{entity.label}</h2>
                    </div>
                    <div className="relative z-20 flex justify-center">
                      <div className="relative w-[280px] max-w-none overflow-hidden rounded-[32px] shadow-[0_0_48px_rgba(255,255,255,0.65)]">
                        <div className="relative aspect-[420/912] w-full">
                          <Image
                            src={screenSrc}
                            alt={`${entity.label} screenshot`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              {entity.features.map((feature) => (
                <EntityFeatureCard
                  key={`${entity.key}-${feature.title}`}
                  title={feature.title}
                  description={feature.description}
                  illustration={
                    feature.illustrationKey
                      ? renderIllustration(feature.illustrationKey)
                      : undefined
                  }
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
