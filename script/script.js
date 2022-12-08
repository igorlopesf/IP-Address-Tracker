const apiKey =
  "https://geo.ipify.org/api/v2/country?apiKey=at_e0dZH5hz4xImdwGxy3MMFzQodjxUg&ipAddress=";
const btnTeste = document.querySelector("#teste");
const ip = document.querySelector("#ip");
const pais = document.querySelector("#pais");
const estado = document.querySelector("#estado");
const cidade = document.querySelector("#cidade");

const getGeoIpData = async () => {
  const apiLink =
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_e0dZH5hz4xImdwGxy3MMFzQodjxUg&ipAddress=191.7.188.169";

  const res = await fetch(apiLink);
  const data = await res.json();
  return data;
};

const showGeoIp = async () => {
  const data = await getGeoIpData();
  console.log(data);

  ip.innerText = data.ip;
  pais.innerText = data.location.country;
  estado.innerText = data.location.region;
  cidade.innerText = data.location.city;
};

btnTeste.addEventListener("click", function () {
  showGeoIp();
  setMap();
});

const setMap = async () => {
    
  const data = await getGeoIpData();

  // config map
  let config = {
    minZoom: 7,
    maxZoom: 18,
  };
  
  const zoom = 13;
  const lat = data.location.lat;
  const lng = data.location.lng;

  // calling map
  const map = L.map("map", config).setView([lat, lng], zoom);

  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var marker = L.marker([lat, lng]).addTo(map);
};
