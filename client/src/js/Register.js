import '../css/LoginRegister.css';
import GoogleLogin from 'react-google-login'

const GestCookie = require('./Cookie.js');
const md5 = require('md5');
const GOOGLE_OAUTH_API_KEY = "656903528628-sn7o1btc0ac4jo87jt5nvm7vrhs73rp4.apps.googleusercontent.com";
const SERVER = "http://127.0.0.1:8080";

async function TryRegister() {
  const pseudo = document.getElementById("loginId").value;
  const password = md5(document.getElementById("passwordId").value);
  const data = await (await fetch(SERVER + "/register?username=" + pseudo + "&password=" + password)).json();
  if (data.success) {
    GestCookie.createCookie("uuid", data.uuid, 365);
    GestCookie.createCookie("username", pseudo, 365);
    document.location.href = "/";
    return;
  }
  document.getElementById("ConnectionError").style.display = "block";
  document.getElementById("CadreLoginRegister").style.height = "440px";
}

async function RegisterSuccessGoogle(googleData) {
  const option = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: googleData.tokenId})
  };
  const res = await fetch(SERVER + "/oauth/register", option);
  const data = await res.json();
  if (data.success) {
    GestCookie.createCookie("uuid", data.uuid, 365);
    GestCookie.createCookie("username", data.username, 365);
    document.location.href = "/";
    return;
  }
  document.getElementById("ConnectionError").style.display = "block";
  document.getElementById("CadreLoginRegister").style.height = "440px";
}

async function RegisterFailureGoogle() {
  document.getElementById("ConnectionError").style.display = "block";
  document.getElementById("CadreLoginRegister").style.height = "440px";
}

async function Register() {
  return (
    <div className="CadreLoginRegister" id="CadreLoginRegister">
      <input id="loginId" type="text" className="PseudoPasswordInput" placeholder="Username"/>
      <input id="passwordId" type="password" className="PseudoPasswordInput" placeholder="Password"/>
      <button type="button" className="LoginRegisterButton" onClick={TryRegister}>Register</button>
      <div className="LoginRegisterSeparator"/>
      <GoogleLogin
        clientId={GOOGLE_OAUTH_API_KEY}
        buttonText="Register with Google"
        onSuccess={RegisterSuccessGoogle}
        onFailure={RegisterFailureGoogle}
      />
      <div className="ConnectionError" id="ConnectionError">
        This username already exists.
      </div>
    </div>
  );
}

export default Register;