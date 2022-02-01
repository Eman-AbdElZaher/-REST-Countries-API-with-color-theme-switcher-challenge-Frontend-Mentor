// get data of Countries from link https://restcountries.com/#api-endpoints-v2
let mode= document.getElementById('mode');
// get query string from Url of page
function getQueryString(){
  let CountryCode;
    const params = new URLSearchParams(window.location.search);
   if(params.has('country'))
   {
     CountryCode = params.get('country');
   }
   return CountryCode;
}

// Get Country Data Detail from Api and Append to page
async function getDatafromApi (url) {
    await fetch(url).then(
     response =>  response.json()
   ).then (
      res => {
          document.querySelector('.flag-img img').setAttribute('src',res.flags.svg);
           document.querySelector('.country-title').textContent= res.name;
           document.querySelector('.native span').textContent=res.nativeName;
           document.querySelector('.pop span').textContent=res.population;
           document.querySelector('.reg span').textContent=res.region;
           document.querySelector('.sub span').textContent=res.subregion;
           document.querySelector('.cap span').textContent=res.capital;
           document.querySelector('.top span').textContent=res.topLevelDomain[0];
           let {currencies,languages,borders}= res;
           currencies.forEach(currency => {
             document.querySelector('.currency span').innerHTML +=currency.code +',';
           });
           languages.forEach(lang => {
            document.querySelector('.lang span').innerHTML += lang.name +',';
           });
           borders.forEach(border => {
            CreateBorderElem(border);
           });
      }
   ).catch( err => console.log(err))
}
// get full Name of country from border info
async function CreateBorderElem(border){
  let borderElem = document.createElement('a');
  await fetch(`https://restcountries.com/v2/alpha/${border}`).then( response => response.json())
  .then(res => {
    borderElem.setAttribute('href',`details.html?country=${res.name}`);
    borderElem.textContent=res.name;
  });
  document.querySelector('.borders-info .borders').append(borderElem);
}
window.onload= () =>{
    let val = getQueryString();
    getDatafromApi(`https://restcountries.com/v2/alpha/${val}`);
}
mode.onclick = () => {
  document.body.classList.toggle('dark-mode');
 }
 document.querySelector('.back').onclick= () =>{
   document.location.href='index.html';
 }