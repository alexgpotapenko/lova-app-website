import { Button } from "@heroui/react";

export default function SectionTitleBar({
  title,
  showButton = false,
  buttonLabel = "Button",
  buttonIcon = null,
  onButtonPress = () => {},
  buttonVariant = "solid",
  buttonRadius = "full",
  buttonColor = "primary",
  buttonClassName = "",
  searchBar = null,
}) {
  return (
    <div className="flex items-center justify-between pb-8 pt-8">
      <h2 className="text-lg font-medium text-slate-900 lowercase first-letter:uppercase">
        {title}
      </h2>
      {showButton || searchBar ? (
        <div className="flex items-center gap-5">
          {searchBar}
          {showButton ? (
            <Button
              color={buttonColor}
              variant={buttonVariant}
              radius={buttonRadius}
              onPress={onButtonPress}
              className={buttonClassName}
              startContent={buttonIcon}
            >
              {buttonLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
