import { useState } from "react";

export function StepPlaceListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(225);

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="char-count">{title.length}/32</div>
      </div>

      <div className="field-group">
        <h2>Create your description</h2>
        <p>Share what makes your place special.</p>
        <textarea
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="char-count">{description.length}/500</div>
      </div>

      <div className="field-group">
        <h2>set your price</h2>
        <p>You can change it anytime.</p>
        <div className="price-input">
          <span className="currency">₪</span>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
