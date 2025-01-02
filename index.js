// Mapeamento de cidades para bandeiras
const cityFlags = {
  "Los Angeles": "🇺🇸",
  Paris: "🇫🇷",
  London: "🇬🇧",
  "New York": "🇺🇸",
  Auckland: "🇳🇿",
};

// Função para atualizar o horário de cidades fixas
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

    // Adicionar bandeira a Los Angeles
    let losAngelesFlag = cityFlags["Los Angeles"];
    losAngelesElement.querySelector("h2").innerHTML = `
      <span class="flag">${losAngelesFlag}</span> Los Angeles
    `;
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

    // Adicionar bandeira a Paris
    let parisFlag = cityFlags["Paris"];
    parisElement.querySelector("h2").innerHTML = `
      <span class="flag">${parisFlag}</span> Paris
    `;
  }
}

// Função para atualizar o horário baseado na seleção
function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  // Adiciona a bandeira dinâmica baseada no nome da cidade
  let cityFlag = cityFlags[cityName] || "🏳️"; // Default flag if not found

  citiesElement.innerHTML = `
    <div class="city">
      <div>
        <h2><span class="flag">${cityFlag}</span> ${cityName}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
    </div>
  `;
}

// Atualizar o tempo inicial e configurar o intervalo
updateTime();
setInterval(updateTime, 1000);

// Adicionar o evento de seleção de cidade
let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
