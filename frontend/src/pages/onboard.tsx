import Stepper from "@/components/onboarding/stepper";
import { BackgroundMakeup } from "@/components/ui/background-makeup";

const Onboard = () => {
  return (
    <div className="max-w-3xl h-screen mx-auto flex items-center justify-center">
      <BackgroundMakeup />
      <Stepper />
    </div>
  );
};

export default Onboard;
