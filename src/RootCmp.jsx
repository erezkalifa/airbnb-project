import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "../src/assets/main.css";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { HomePage } from "./pages/HomePage.jsx";

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
          </Routes>
        </main>
      </section>
    </Router>
  );
}
