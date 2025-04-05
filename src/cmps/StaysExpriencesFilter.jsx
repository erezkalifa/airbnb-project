import { useState } from "react";

export function StaysExperiencesFilter() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelect = (category) => {
        setSelectedCategory(category);
      };

    return (<div className="categories">
                <span className="btn-wrapper">
                <button
                    className={selectedCategory === "Stays" ? "selected" : ""}
                    onClick={() => handleSelect("Stays")}
                >
                    Stays
                </button>
                </span>
                <span className="btn-wrapper">
                <button
                    className={selectedCategory === "Experiences" ? "selected" : ""}
                    onClick={() => handleSelect("Experiences")}
                >
                    Experiences
                </button>
                </span>
            </div>)
}