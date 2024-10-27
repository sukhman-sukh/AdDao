import HorizontalFadingBorder from "@/assets/effects/horizontal-fading-border.svg";
import VerticalFadingBorder from "@/assets/effects/vertical-fading-border.svg";

export function FadingBorder() {
  const horizontalBorderWidth = "1400px";
  return (
    <>
      <img
        src={HorizontalFadingBorder}
        className={`absolute top-0 max-w-[${horizontalBorderWidth}]`}
        alt=""
      />
      <img
        src={HorizontalFadingBorder}
        className={`absolute bottom-0 max-w-[${horizontalBorderWidth}]`}
        alt=""
      />
      <img
        src={VerticalFadingBorder}
        className={`absolute left-0 max-h-[calc(100vh-60px)]`}
        alt=""
      />
      <img
        src={VerticalFadingBorder}
        className={`absolute right-0 max-h-[calc(100vh-60px)]`}
        alt=""
      />
    </>
  );
}
