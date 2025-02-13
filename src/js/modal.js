document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modal");
  var closeBtn = document.getElementsByClassName("close")[0];

  function openModal(countryCode) {
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        let country = data[0];

        // API dan olinadigan barcha ma’lumotlar
        let name = country.name.common;
        let officialName = country.name.official || "Noma’lum";
        let capital = country.capital ? country.capital[0] : "Mavjud emas";
        let population = country.population.toLocaleString();
        let area = country.area.toLocaleString();
        let languages = country.languages
          ? Object.values(country.languages).join(", ")
          : "Noma’lum";
        let currency = country.currencies
          ? Object.values(country.currencies)[0].name +
            " (" +
            Object.values(country.currencies)[0].symbol +
            ")"
          : "Noma’lum";
        let region = country.region || "Noma’lum";
        let subregion = country.subregion || "Noma’lum";
        let timezone = country.timezones
          ? country.timezones.join(", ")
          : "Noma’lum";
        let flag = country.flags.png || "";
        let mapLink = country.maps.googleMaps || "#";
        let coatOfArms =
          country.coatOfArms && country.coatOfArms.png
            ? country.coatOfArms.png
            : "";

        // Modalga ma’lumotlarni joylash
        document.getElementById("country-info").innerHTML = `
        <div><img class="flag" src="${flag}" alt="${name} Bayroq" width="150"></div>
        <div id="country-name"><h2>${name}</h2>
        <p><strong>Rasmiy nomi:</strong> ${officialName}</p>
        <p><strong>Poytaxt:</strong> ${capital}</p>
        <p><strong>Hudud:</strong> ${region} - ${subregion}</p>
        <p><strong>Aholisi:</strong> ${population} kishi</p>
        <p><strong>Maydoni:</strong> ${area} km²</p>
        <p><strong>Tili:</strong> ${languages}</p>
        <p><strong>Pul birligi:</strong> ${currency}</p>
        <p><strong>Vaqt zonasi:</strong> ${timezone}</p>
        <p><a href="${mapLink}" target="_blank">🔗 Google Map</a></p></div>
    `;

        modal.style.display = "block";
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        document.getElementById(
          "country-info"
        ).innerHTML = `<p>Ma’lumot yuklashda xatolik yuz berdi!</p>`;
        modal.style.display = "block";
      });
  }

  // Modalni yopish
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Davlat ustiga bosganda modalni ochish
  window.countryClick = function (countryCode) {
    openModal(countryCode);
  };
});
