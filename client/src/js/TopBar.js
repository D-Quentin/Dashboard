import '../css/TopBar.css';

const GestCookie = require('./Cookie.js');

function Disconnect() {
  GestCookie.eraseCookie("uuid");
  GestCookie.eraseCookie("username");
  document.location.href = "/";
}

function TopBar() {
  var buttonData;
  var settings;
  if (GestCookie.readCookie("uuid") != null) {
    buttonData = 
    <div className="LoginRegisterComponent">
      <div className="UsernameTopBar">
        {GestCookie.readCookie("username")}
      </div>
      <button type="button" className="DisconnectButton" onClick={Disconnect}>Disconnect</button>
    </div>;
    settings =
    <a href="/edit" className="WarpEditButton">
      <button type="button" className="EditButton">
        <img src="/iconSettings.png" className="SettingsIcon"/>
        Edit widgets
      </button>
    </a>;
  } else {
    buttonData = 
    <div className="LoginRegisterComponent">
      <a href="/login" >
        <button type="button" className="LoginButton">Login</button>
      </a>
      <a href="/register" >
        <button type="button" className="RegisterButton">Register</button>
      </a>
    </div>;
    settings = <div className="WarpEditButton"><div className="EmptyEditButton"></div></div>;
  }
  return (
    <header className="TopBar">
      <div className="TopLogo">
        <a href="/" className="IconLogo">
          <img src="/iconDashboard.png" className="MainLogo"/>
        </a>
        {settings}
        <a href="/" className="TextLogo">
          <img src="/textDashboard.png" className="MainLogo"/>
        </a>
        {buttonData}
      </div>
    </header>
  );
}

export default TopBar;