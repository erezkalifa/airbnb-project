import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { StayIndex } from "./pages/StayIndex.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { store } from "./store/store.js";
import { GiftCards } from "./pages/GiftCards.jsx";
import { HelpCenter } from "./pages/HelpCenter.jsx";
import { HostWelcomePage } from "./pages/HostWelcomePage.jsx";
import { HostExperience } from "./pages/HostExperience.jsx";

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-container">
          {/* <AppHeader /> This component is commented out because the app header is a filter and should be located in the StayIndex */}
          <main>
            <Routes>
              <Route path="" element={<StayIndex />} />
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
    </Provider>
  );
}
