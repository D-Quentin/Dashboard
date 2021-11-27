import '../css/TopBar.css';

function TopBar() {
  return (
    <header className="TopBar">
      <div className="TopLogo">
        <a href="/" className="IconLogo">
          <img src="/iconDashboard.png" className="MainLogo"/>
        </a>
        <a href="/" className="TextLogo">
          <img src="/textDashboard.png" className="MainLogo"/>
        </a>
      </div>
    </header>
  );
}

export default TopBar;