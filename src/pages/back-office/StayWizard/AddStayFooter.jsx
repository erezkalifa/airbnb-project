// AddStayFooter.jsx
export function AddStayFooter({ onBack, onNext, stepIndex, totalSteps }) {
  return (
    <section className="add-stay-footer">
      <div className="step-indicator">
        {[...Array(totalSteps)].map((_, idx) => (
          <div
            key={idx}
            className={`step ${idx <= stepIndex ? "active" : ""}`}
          ></div>
        ))}
      </div>

      <footer className="footer-nav">
        <button
          className="back-btn"
          onClick={onBack}
          disabled={stepIndex === 0}
        >
          Back
        </button>
        <button className="next-btn" onClick={onNext}>
          Next
        </button>
      </footer>
    </section>
  );
}
