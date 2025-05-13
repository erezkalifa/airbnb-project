import { SideMenu } from "./SideMenu.jsx";
import { MainMenu } from "./MainMenu.jsx";

export function BackOffice() {
  return (
    <section className="back-office">
      <SideMenu />
      <MainMenu />
    </section>
  );
}
