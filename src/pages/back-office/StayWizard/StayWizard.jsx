import { useState } from "react";
import { StepPlaceType } from "./StepPlaceType.jsx";
import { StepIntro } from "./StepIntro.jsx";
import { AddStayFooter } from "./AddStayFooter.jsx";
import { StepGuestType } from "./StepGuestType.jsx";
import { StepPlaceLocation } from "./StepLocation.jsx";
import { StepPlaceBasics } from "./StepBasics.jsx";
import { StepPlaceOffer } from "./StepOffer.jsx";
import { StepPlaceListing } from "./StepListing.jsx";

export function StayWizard() {
  const [step, setStep] = useState(0);
  const [placeType, setPlaceType] = useState("");

  const onNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    <StepIntro />,
    <StepPlaceType
      selectedType={placeType}
      onSelect={setPlaceType}
      isMultu={false}
    />,
    <StepGuestType selectedType={placeType} onSelect={setPlaceType} />,
    <StepPlaceLocation />,
    <StepPlaceBasics />,
    <StepPlaceOffer
      isMulti={true}
      selectedTypes={placeType}
      onSelect={setPlaceType}
    />,
    <StepPlaceListing />,
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
