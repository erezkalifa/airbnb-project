import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "../src/assets/main.css";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { GiftCards } from "./pages/GiftCards.jsx";
import { HostWelcomePage } from "./pages/HostWelcomePage.jsx";
import { HostExperience } from "./pages/HostExperience.jsx";

export function RootCmp() {
  return (
    <Router>
      <section className="main-container">
        <AppHeader />
        <main>
          <Routes>
            <Route path="" element={<HomePage />} />
            {/* <Route path="login" elemenet={<LoginSignup />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route> */}
            <Route path="/giftcards" element={<GiftCards />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/host/experiences" element={<HostExperience />} />
            <Route path="/host/homes" element={<HostWelcomePage />} />
          </Routes>
        </main>
      </section>
    </Router>
  );
}
