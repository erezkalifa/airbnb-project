import React from "react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <strong className="footer-heading">Support</strong>
          <ul className="footer-list">
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighborhood concern</li>
          </ul>
        </div>

        <div>
          <strong className="footer-heading">Hosting</strong>
          <ul className="footer-list">
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Airbnb-friendly apartments</li>
            <li>Join a free Hosting class</li>
            <li>Find a co-host</li>
          </ul>
        </div>

        <div>
          <strong className="footer-heading">Airbnb</strong>
          <ul className="footer-list">
            <li>2025 Summer Release</li>
            <li>Newsroom</li>
            <li>New features</li>
            <li>Careers</li>
            <li>Investors</li>
            <li className="footer-muted">Gift cards</li>
            <li>Airbnb.org emergency stays</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © 2025 Airbnb, Inc. · Terms · Sitemap · Privacy · Your Privacy Choices
        </div>

        <div className="footer-icons">{/* כאן תכניס את ה־SVGים שתרצה */}</div>
      </div>
    </footer>
  );
}
