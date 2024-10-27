import { useState } from "react";
import { ChooseService, CreateAccount } from "./steps";
import HeaderImage from "@/assets/onboarding/header.svg";
import { FadingBorder } from "@/components/ui/fading-border";
import { AnimatePresence, motion } from "framer-motion";

interface step {
  step: number;
  component: React.ReactNode;
}

const Stepper = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps: step[] = [
    {
      step: 1,
      component: (
        <CreateAccount
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      ),
    },
    {
      step: 2,
      component: <ChooseService />,
    },
  ];

  return (
    <motion.div className="w-full relative flex flex-col items-center justify-center">
      <img
        src={HeaderImage}
        className="h-[14rem] w-full object-cover object-top z-10"
        alt="header"
      />
      <FadingBorder />
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: -50, height: 100 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 50, height: "auto" }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="w-full"
        >
          {steps[currentStepIndex].component}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Stepper;
