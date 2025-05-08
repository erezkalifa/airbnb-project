import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { StayIndex } from "./pages/StayIndex.jsx";
import { StayDetails } from "./pages/StayDetails.jsx";
import { store } from "./store/store.js";

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-container">
          {/* <AppHeader /> This component is commented out because the app header is a filter and should be located in the StayIndex */}
          <main>
            <Routes>
              <Route path="/" element={<StayIndex />} />
              <Route path="/stay/:stayId" element={<StayDetails />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  );
}
