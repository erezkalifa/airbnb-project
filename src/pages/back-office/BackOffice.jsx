import { SideMenu } from "./SideMenu.jsx";
import { MainMenu } from "./MainMenu.jsx";
import { Outlet } from "react-router-dom";

export function BackOffice() {
  return (
    <section className="back-office">
      <SideMenu />
      <MainMenu />
    </section>
  );
}
