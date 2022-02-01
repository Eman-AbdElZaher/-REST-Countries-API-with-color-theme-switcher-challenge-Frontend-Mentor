// [01]-global Variables
let filterInput = document.getElementById("txt-box"),
CountriesContainer = document.getElementById('countries'),
searchInput = document.getElementById('search'),
filterOption = document.querySelector('.options'),
mode= document.getElementById('mode'),
data = [];

// [02]-open filter options list
filterInput.onclick = () =>{
    filterOption.classList.toggle('open');
}
// [03]-remove All children
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
// [04]-get data from Api
async function getData (url) {
     await fetch(url).then(
      response =>  response.json()
    ).then (
       res => {
         data = res;
       }
    ).catch( err => console.log(err))
}
// [04]-create country-items
function CreateCountryItem(country){
        let countryItem = document.createElement('div');
        countryItem.classList.add('country-item');
        let imgBox = document.createElement('div');
        let link= document.createElement('a');
        link.setAttribute('href',`details.html?country=${country.alpha3Code}`);
        imgBox.classList.add('img-box');
        let img = document.createElement('img');
        img.setAttribute('src',country.flags.svg);
        img.setAttribute('alt','flag');
        link.appendChild(img);
        imgBox.appendChild(link);
       let CountryInfo = document.createElement('div');
        CountryInfo.classList.add('country-info');
       let title = document.createElement('h3');
        title.classList.add('country-title');
        title.textContent= country.name;
        CountryInfo.appendChild(title);
       let countryDetail = document.createElement('div');
        countryDetail.classList.add('country-Detail');
        let datailArr = ['population','Region','Capital'],
        {capital,region,population}= country,
        infoArr = [population,region,capital];
        for(let i=0; i< 3; i++){
          countryDetail.innerHTML +=`<div><h4>${datailArr[i]}</h4>: <span class=info>${infoArr[i]}</span></div>`;
        }
        CountryInfo.appendChild(countryDetail);
        countryItem.append(imgBox,CountryInfo);
        return countryItem;
      }
// -05
async function getAllCountry(){
  CountriesContainer.innerHTML='';
 await getData('https://restcountries.com/v2/all');
 if(data != []){
   data.forEach(element => {
     CountriesContainer.appendChild(CreateCountryItem(element));
   });
 }
 else {
   console.log('err');
 }
}
async function getCountry(val){
 await getData(`https://restcountries.com/v2/name/${val}`);
 removeAllChildNodes(CountriesContainer);
 if(data != []) {
   data.forEach(elem =>{
    CountriesContainer.appendChild(CreateCountryItem(elem));
   });
 }
}
async function getCountryByRegion(region){
 await getData(`https://restcountries.com/v2/region/${region}`);
 removeAllChildNodes(CountriesContainer);
 if(data != [])
 {
   data.forEach(elem => {
     CountriesContainer.appendChild(CreateCountryItem(elem));
   })
 }
}
window.onload = ()=>{
 getAllCountry();
}

searchInput.oninput= () =>
{
  if(searchInput.value.length > 0)
  {
    getCountry(searchInput.value);
  }
  else {
    if(filterInput.value != 'Filter By Region'){
      getCountryByRegion(filterInput.value);
    }
    else {
      data=[];
      getAllCountry();
    }
  }
}
// filter country based on region
document.querySelectorAll('.options li').forEach(elem => elem.addEventListener('click',(e) => {
  filterOption.classList.toggle('open');
  filterInput.value = e.target.textContent;
  getCountryByRegion(filterInput.value);
}));

// change mode
mode.onclick = () => {
 document.body.classList.toggle('dark-mode');
}