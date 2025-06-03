import { useState } from "react";

export function StepPlaceListing({ listing = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...listing, [field]: value });
  };

  return (
    <section className="step-place-listing">
      <div className="field-group">
        <h2>Now, let's give your house a title</h2>
        <p>
          Short titles work best. Have fun with it—you can always change it
          later.
        </p>
        <textarea
          maxLength={32}
          placeholder=""
          value={listing.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <div className="char-count">{(listing.title || "").length}/32</div>
      </div>

      <div className="field-group">
        <h2>Create your description</h2>
        <p>Share what makes your place special.</p>
        <textarea
          maxLength={500}
          value={listing.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <div className="char-count">
          {(listing.description || "").length}/500
        </div>
      </div>

      <div className="field-group">
        <h2>Set your price</h2>
        <p>You can change it anytime.</p>
        <div className="price-input">
          <span className="currency">₪</span>
          <input
            type="number"
            min="0"
            value={listing.price ?? 225}
            onChange={(e) => handleChange("price", +e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
