import '../css/TopBar.css';

const GestCookie = require('./Cookie.js');

function Disconnect() {
  GestCookie.eraseCookie("uuid");
  GestCookie.eraseCookie("username");
  document.location.href = "/";
}

function TopBar() {
  var buttonData;
  if (GestCookie.readCookie("uuid") != null) {
    buttonData = 
    <div className="LoginRegisterComponent">
      <div className="UsernameTopBar">
        {GestCookie.readCookie("username")}
      </div>
      <button type="button" className="DisconnectButton" onClick={Disconnect}>Disconnect</button>
    </div>
  } else {
    buttonData = 
    <div className="LoginRegisterComponent">
      <a href="/login" >
        <button type="button" className="LoginButton">Login</button>
      </a>
      <a href="/register" >
        <button type="button" className="RegisterButton">Register</button>
      </a>
    </div>
  }
  return (
    <header className="TopBar">
      <div className="TopLogo">
        <a href="/" className="IconLogo">
          <img src="/iconDashboard.png" className="MainLogo"/>
        </a>
        <a href="/" className="TextLogo">
          <img src="/textDashboard.png" className="MainLogo"/>
        </a>
        {buttonData}
      </div>
    </header>
  );
}

export default TopBar;