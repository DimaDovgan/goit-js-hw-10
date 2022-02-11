import '../css/styles.css';
import { fetchCountries } from "./fetchCountries";
import cauntriesList from "../templates/cauntries-list.hbs";
import cauntriCart from "../templates/country-cart.hbs";
import lodash from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("input#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info"),
    
    
}
const makeNewArr = (obj) => {
    if (obj) {
        return obj.map((country) => {
                    return {
                        img: country.flags.svg,
                        name: country.name.official,
                        capital: country.capital,
                        population: country.population,
                        languages: Object.values(country.languages)
                    }
                });
    }
    
}



const renderContent = () => {
    {
    if (refs.input.value !== "") {
        
        fetchCountries(refs.input.value.trim()).then(arrCountry => {
            let importantPropertiesArr = makeNewArr(arrCountry);
            if (arrCountry !== undefined) {

                if (arrCountry.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                return;
                }
                if (arrCountry.length === 1) {
                
                    refs.list.innerHTML = "";
                refs.info.innerHTML = cauntriCart(importantPropertiesArr);
                return;
                }
                
                refs.info.innerHTML = "";
                refs.list.innerHTML = cauntriesList(importantPropertiesArr);
            }
            return;
        });
    }
        refs.info.innerHTML = "";
        refs.list.innerHTML = "";
    return;
    
}
}


const choosesCountries = (event) => {
    console.log(event.currentTarget);
    console.log("content",event.target.textContent);
    console.log(fetchCountries(event.target.textContent).then(obj => {
        let importantPropertiesArr = makeNewArr(obj);
        
        refs.list.innerHTML = "";
        refs.info.innerHTML = cauntriCart(importantPropertiesArr);

    }));
}

refs.input.addEventListener("input", lodash.debounce(renderContent, DEBOUNCE_DELAY));
refs.list.addEventListener("click", choosesCountries);
