import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { StayIndex } from "./pages/StayIndex.jsx";
import { StayDetails } from "./pages/StayDetails.jsx";
import { store } from "./store/store.js";
import { BookingConfirmationPage } from "./pages/BookingConfirmationPage.jsx";
import { Footer } from "./cmps/Footer.jsx";
import { MyStays } from "./pages/back-office/MyStays.jsx";
import { StayWizard } from "./pages/back-office/StayWizard/StayWizard.jsx";
import { Reservations } from "./pages/Reservations.jsx";

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <RootLayout />
      </Router>
    </Provider>
  );
}

function RootLayout() {
  const location = useLocation();
  const hideFooterRoutes = ["/listings","/add-listings"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <section className="main-container">
      <main>
        <Routes>
          <Route path="/" element={<StayIndex />} />
          <Route path="/details" element={<StayDetails />} />
          <Route path="/listings" element={<MyStays />} />
          <Route path="/add-listings" element={<StayWizard />} />
          <Route path="/stay/:stayId" element={<StayDetails />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmationPage />}
          />
        </Routes>

        {shouldShowFooter && <Footer />}
      </main>
    </section>
  );
}

// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { BackOffice } from "./pages/back-office/BackOffice.jsx";
// import { StayIndex } from "./pages/StayIndex.jsx";
// import { StayDetails } from "./pages/StayDetails.jsx";
// import { store } from "./store/store.js";
// import { BookingConfirmationPage } from "./pages/BookingConfirmationPage.jsx";
// import { Footer } from "./cmps/Footer.jsx";
// import { MyStays } from "./pages/back-office/MyStays.jsx";
// import { StayWizard } from "./pages/back-office/StayWizard/StayWizard.jsx";

// export function RootCmp() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <section className="main-container">
//           <main>
//             <Routes>
//               <Route path="/" element={<StayIndex />} />
//               <Route path="/details" element={<StayDetails />} />
//               <Route path="/backoffice" element={<BackOffice />}>
//                 <Route path="my-stays" element={<MyStays />} />
//               </Route>
//               <Route path="/stay/:stayId" element={<StayDetails />} />
//               <Route path="/stay-wizard" element={<StayWizard />} />
//               <Route
//                 path="/booking-confirmation"
//                 element={<BookingConfirmationPage />}
//               />
//             </Routes>
//             <Footer />
//           </main>
//         </section>
//       </Router>
//     </Provider>
//   );
// }
