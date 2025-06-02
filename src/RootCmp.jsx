import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { BackOffice } from "./pages/back-office/BackOffice.jsx";
import { StayIndex } from "./pages/StayIndex.jsx";
import { StayDetails } from "./pages/StayDetails.jsx";
import { store } from "./store/store.js";
import { BookingConfirmationPage } from "./pages/BookingConfirmationPage.jsx";
import { Footer } from "./cmps/Footer.jsx";
import { MyStays } from "./pages/back-office/MyStays.jsx";
import { StayWizard } from "./pages/back-office/StayWizard/StayWizard.jsx";

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-container">
          <main>
            <Routes>
              <Route path="/" element={<StayIndex />} />
              <Route path="/details" element={<StayDetails />} />
              <Route path="/backoffice" element={<BackOffice />} />
              <Route path="/backoffice/my-stays" element={<MyStays />} />
              <Route path="/stay/:stayId" element={<StayDetails />} />
              <Route path="/backoffice/stay-wizard" element={<StayWizard />} />
              <Route
                path="/booking-confirmation"
                element={<BookingConfirmationPage />}
              />
            </Routes>
            <Footer />
          </main>
        </section>
      </Router>
    </Provider>
  );
}
