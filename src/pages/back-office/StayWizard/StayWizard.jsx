import { useState } from "react";
import { StepPlaceType } from "./StepPlaceType.jsx";
import { StepIntro } from "./StepIntro.jsx";
import { AddStayFooter } from "./AddStayFooter.jsx";
import { StepGuestType } from "./StepGuestType.jsx";
import { StepPlaceLocation } from "./StepPlaceLocation.jsx";

export function StayWizard() {
  const [step, setStep] = useState(0);
  const [placeType, setPlaceType] = useState("");

  const onNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    <StepIntro />,
    <StepPlaceType selectedType={placeType} onSelect={setPlaceType} />,
    <StepGuestType selectedType={placeType} onSelect={setPlaceType} />,
    <StepPlaceLocation />,
  ];

  return (
    <section className="stay-wizard">
      <div className="step-content">{steps[step]}</div>

      {
        <AddStayFooter
          onBack={onBack}
          onNext={onNext}
          stepIndex={step}
          totalSteps={steps.length}
        />
      }
    </section>
  );
}

function Step2() {
  return <h2>Step 2 – Property Type</h2>;
}
function Step3() {
  return <h2>Step 3 – Amenities</h2>;
}
