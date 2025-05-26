export function UserMenu({ onCloseMenu, onLoginClick }) {
  return (
    <section className="user-menu">
      <div className="menu-dropdown">
        <div className="menu-item">Help Center</div>
        <div className="menu-item">Become a host</div>
        <div className="menu-item">Refer a Host</div>
        <div className="menu-item">Find a co-host</div>
        <div className="menu-item">Gift cards</div>
        <button onClick={onLoginClick} className="button-unstyled">
          <div className="menu-item">Log in or sign up</div>
        </button>
      </div>
    </section>
  );
}
