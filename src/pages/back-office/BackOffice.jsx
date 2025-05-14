import { SideMenu } from "./SideMenu.jsx";
import { MainMenu } from "./MainMenu.jsx";
import { BookingConfirmationModal } from "../../cmps/BookingConfirmationModal.jsx";

export function BackOffice() {
  return (
    <section className="back-office">
      <SideMenu />
      <MainMenu />
      <BookingConfirmationModal />
    </section>
  );
}
