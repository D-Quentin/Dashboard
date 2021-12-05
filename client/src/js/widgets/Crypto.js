import '../../css/widgets/Crypto.css';

const SERVER = "http://127.0.0.1:8080";


function CryptoMedium(data, param) {
  return (
    <div className="CryptoMedium">
      <div className="PriceCurrencyMedium">
      <div className="PriceNowMedium">{data.price + " $"}</div>
      <div className="CurrencySmall">{param}</div>
      </div>
      <div className="LogoGraphMedium">
      <img src={data.logo} className="LogoCryptoMedium"/>
      <img src={data.image} className="GraphCryptoMedium"/>
      </div>
    </div>
  );
}

function CryptoSmall(data, param) {
  return (
    <div className="CryptoSmall">
        <div className="PriceNowSmall">{data.price + " $"}</div>
        <img src={data.logo} className="LogoCryptoSmall"/>
        <div className="CurrencySmall">{param}</div>
    </div>
  );
}

async function Crypto(widgetSize, param) {
  const data = await (await fetch(SERVER + "/crypto?crypto=" + param)).json();

    if (widgetSize == "SmallWidget")
      return (CryptoSmall(data, param));
    else
      return (CryptoMedium(data, param));
  }
  
  export default Crypto;