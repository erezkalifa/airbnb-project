import { useState, useEffect } from "react";
import { StepPlaceType } from "./StepPlaceType.jsx";
import { StepIntro } from "./StepIntro.jsx";
import { AddStayFooter } from "./AddStayFooter.jsx";
import { StepGuestType } from "./StepGuestType.jsx";
import { StepPlaceLocation } from "./StepLocation.jsx";
import { StepPlaceBasics } from "./StepBasics.jsx";
import { StepPlaceOffer } from "./StepOffer.jsx";
import { StepPlaceListing } from "./StepListing.jsx";
import { StepPublish } from "./StepPublish.jsx";
import { UpperHeader } from "../../../cmps/UpperHeader.jsx";

export function StayWizard() {
  // const [stay, setstay] = useState({});
  const [stay, setStay] = useState({
    placeType: "",
    basics: {
      guests: 1,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },
  });
  const [step, setStep] = useState(0);
  const [placeType, setPlaceType] = useState("");

  useEffect(() => {
    console.log("stay updated:", stay);
  }, [stay]);
  const onNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    <StepIntro />,

    <StepPlaceType
      selectedType={stay.placeType}
      onSelect={(type) => setStay((prev) => ({ ...prev, placeType: type }))}
    />,

    <StepGuestType
      selectedType={stay.guestType}
      onSelect={(type) => setStay((prev) => ({ ...prev, guestType: type }))}
    />,
    <StepPlaceLocation
      address={stay.address || {}}
      onChange={(updatedAddress) =>
        setStay((prev) => ({ ...prev, address: updatedAddress }))
      }
    />,
    <StepPlaceBasics
      basics={stay.basics || {}}
      onChange={(updatedBasics) =>
        setStay((prev) => ({ ...prev, basics: updatedBasics }))
      }
    />,
    <StepPlaceOffer
      isMulti={true}
      selectedTypes={stay.amenities || []}
      onSelect={(types) => setStay((prev) => ({ ...prev, amenities: types }))}
    />,
    <StepPlaceListing
      listing={stay.listing || {}}
      onChange={(updatedListing) =>
        setStay((prev) => ({ ...prev, listing: updatedListing }))
      }
    />,
    <StepPublish stay={stay} />,
  ];

  return (
    <section className="stay-wizard">
      <UpperHeader />
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
