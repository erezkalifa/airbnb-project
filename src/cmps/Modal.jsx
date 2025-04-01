import React from "react";

export default function Modal({
  title,
  children,
  onClose,
  position,
  width = "300px", // default width
  height = "auto",  // default height
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: width,
          height: height,
        }}
      >
        {children}
      </div>
    </div>
  );
}
