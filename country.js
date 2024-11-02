const countryName = new URLSearchParams(location.search).get("name");

const flagImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountriesLinks = document.querySelector(".border-countries-links");
const borderParagraph = document.querySelector(".border-paragraph");
const themeSwitcher = document.querySelector(".theme-switcher")

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg;

    countryNameH1.innerText = country.name.common;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    population.innerText = country.population.toLocaleString("en-IN");

    region.innerText = country.region;

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    } else {
      subRegion.innerText = "N/A";
    }

    if (country.capital) {
      capital.innerText = country.capital.join(", ");
    } else {
      capital.innerText = "N/A";
    }

    topLevelDomain.innerText = country.tld.join(", ");

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    } else {
      currencies.innerText = "N/A";
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    } else {
      languages.innerText = "English";
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderData]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderData.name.common;
            borderCountryTag.href = `/country.html?name=${borderData.name.common}`;
            borderCountriesLinks.append(borderCountryTag);
          });
      });
    } else {
      borderParagraph.append("N/A");
    }
  });

themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeSwitcher.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`;
  } else {
    themeSwitcher.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode`;
  }
});