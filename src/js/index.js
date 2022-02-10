import '../css/styles.css';
import { fetchCountries } from "./fetchCountries";
import cauntriesList from "../templates/cauntries-list.hbs"
import cauntriCart from "../templates/country-cart.hbs"
const _ = require('lodash');
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
        
        fetchCountries(refs.input.value.trim()).then(r => {
            
            let newArr = makeNewArr(r);
            if (r !== undefined) {

                if (r.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                return;
                }
                if (r.length === 1) {
                console.log(r);
                    refs.list.innerHTML = "";
                refs.info.innerHTML = cauntriCart(newArr);
                return;
                }
                console.log(r);
                refs.info.innerHTML = "";
                refs.list.innerHTML = cauntriesList(newArr);
            }
            return;
        });
    }
        refs.info.innerHTML = "";
        refs.list.innerHTML = "";
    return;
    
}
}


const choosesCountries = (Event) => {
    console.log(Event.currentTarget);
    console.log("content",Event.target.textContent);
    console.log(fetchCountries(Event.target.textContent).then(obj => {
        let newArr = makeNewArr(obj);
        
        refs.list.innerHTML = "";
        refs.info.innerHTML = cauntriCart(newArr);

    }));
}

refs.input.addEventListener("input", _.debounce(renderContent, DEBOUNCE_DELAY));
refs.list.addEventListener("click", choosesCountries);
