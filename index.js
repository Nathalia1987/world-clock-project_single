let selectedCityTimeZone = null; // Variável global para rastrear a cidade selecionada

// Função para atualizar o horário de cidades fixas e selecionadas
function updateTime() {
  // Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");

    parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // Atualizar cidade selecionada pelo usuário
  if (selectedCityTimeZone) {
    let cityTime = moment().tz(selectedCityTimeZone);
    let cityElement = document.querySelector("#selected-city");
    if (cityElement) {
      cityElement.querySelector(".date").innerHTML =
        cityTime.format("MMMM Do YYYY");
      cityElement.querySelector(".time").innerHTML = cityTime.format(
        "h:mm:ss [<small>]A[</small>]"
      );
    }
  }
}

// Função para atualizar a cidade selecionada
function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  selectedCityTimeZone = cityTimeZone; // Atualizar a cidade selecionada globalmente

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityFlag = cityFlags[cityName] || "🏳️"; // Bandeira padrão, se não encontrada

  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
    <div class="city" id="selected-city">
      <div>
        <h2><span class="flag">${cityFlag}</span> ${cityName}</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
  `;

  // Atualizar o horário imediatamente para a nova cidade
  updateTime();
}

// Dicionário de bandeiras para cidades/países
const cityFlags = {
  "Los Angeles": "🇺🇸",
  Paris: "🇫🇷",
  London: "🇬🇧",
  Auckland: "🇳🇿",
  "New York": "🇺🇸",
};

// Atualizar o tempo inicial e configurar o intervalo
updateTime();
setInterval(updateTime, 1000);

// Adicionar o evento de seleção de cidade
let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
