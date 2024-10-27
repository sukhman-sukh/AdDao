import leftGradient from "@/assets/effects/gradient-left.svg";
import rightGradient from "@/assets/effects/gradient-right.svg";

export const BackgroundMakeup = () => {
  return (
    <>
      <img src={leftGradient} className="fixed h-full top-2 -left-4" alt="" />
      <img src={rightGradient} className="fixed h-full top-2 -right-4" alt="" />
    </>
  );
};
