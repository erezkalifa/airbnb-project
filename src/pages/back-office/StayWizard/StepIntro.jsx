export function StepIntro() {
  return (
    <section className="step-intro">
      <div className="text-container">
        <p className="step-count">Step 1</p>
        <h1>Tell us about your place</h1>
        <p className="step-description">
          In this step, we'll ask you which type of property you have and if
          guests will book the entire place or just a room. Then let us know the
          location and how many guests can stay.
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
    </section>
  );
}
