import React from "react";

export default function Modal({ title, children, onClose, position }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
