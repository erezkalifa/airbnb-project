export function AddStayFooter({ onNext, onBack }) {
  return (
    <section className="add-stay-footer">
      <div className="step-indicator">
        <div className="step"></div>
        <div className="step"></div>
        <div className="step"></div>
      </div>

      <footer className="footer-nav">
        <button className="back-btn" onClick={onBack}>
          Back
        </button>
        <button className="next-btn" onClick={onNext}>
          Next
        </button>
      </footer>
    </section>
  );
}
