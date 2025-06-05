import { stayService } from "../../../services/stay.service.js";
import {
  normalizeStay,
  mapCustomFieldsToStay,
} from "../../../services/util.service.js";

export function StepPublish({ stay }) {
  async function handlePublishBtn() {
    const parsedStay = mapCustomFieldsToStay(stay);
    const fullStay = normalizeStay(parsedStay);

    try {
      await stayService.save(fullStay);
      navigate("/"); 
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="step-publish">
      <div className="first">
        <div className="text-container">
          <p className="step-count">Publish</p>
          <h1>Finish up and publish</h1>
          <p className="step-description">
            You're finally ready to publish your place, when you're ready click
            the Publish button and we'll do the rest
          </p>
        </div>

        <div className="image-container">
          <video
            data-testid="video-player"
            className="v186kq3t atm_9s_1ulexfb atm_e2_1osqo2v atm_vy_1osqo2v atm_tk_h3zj6i_1jtuioo dir dir-ltr"
            autoPlay
            crossOrigin="anonymous"
            playsInline
            preload="auto"
            style={{ objectFit: "cover", width: "60%", height: "60%" }}
            muted
          >
            <source
              src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <button className="primary-btn narrow" onClick={handlePublishBtn}>
        Publish
      </button>
    </section>
  );
}
