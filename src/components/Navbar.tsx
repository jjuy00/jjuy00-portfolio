import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "./Navbar.css";
import logoUrl from "/public/logo.svg";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* 로고 */}
        <a className="navbar-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollTo("top"); }}>
          <img src={logoUrl} alt="logo" className="navbar-logo-img" />
        </a>

        {/* Radix NavigationMenu */}
        <NavigationMenu.Root className="nav-root">
          <NavigationMenu.List className="nav-list">
            {[
              { label: "About", id: "about" },
              { label: "Projects", id: "projects" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }) => (
              <NavigationMenu.Item key={id}>
                <NavigationMenu.Link
                  className="nav-link"
                  onClick={() => scrollTo(id)}
                  href={`#${id}`}
                >
                  {label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </header>
  );
}