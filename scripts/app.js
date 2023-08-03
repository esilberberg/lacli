// Define API endpoint and DOM elements
const apiEndpoint = 'https://script.google.com/macros/s/AKfycbyCaGzy2WqRXGzi-gdsfT2byznr0NXCszzl-G_Hr-j_Kvb4fh0QD7KWvniZbqUwi22Bvg/exec';
const search = document.getElementById('library-search');
const librarySearchBtn = document.getElementById('library-search-btn');
const display = document.getElementById('display');
const loader = document.getElementById('loader');
const displaySearchSummary = document.getElementById('search-summary');
const randomBtn = document.getElementById('random-btn');
const exportBtn = document.getElementById('export-btn');

// Get search terms from URL and display in search bar
const searchURL = window.location.href;
const searchParams = new URL(searchURL).searchParams;
const indexURLSearchTerms = new URLSearchParams(searchParams).values();
const indexSearchTermsArray = Array.from(indexURLSearchTerms); 
const indexSearchTerms = indexSearchTermsArray.join(' ');
search.value = indexSearchTerms;

// Removes diacritics from strings
function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fetch data from Google Sheets API
let initialData = [];

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    initialData = data;
    filterData()  
  } catch (error) {
    alert('Error fetching data');
  }
}

fetchData(apiEndpoint);

function filterData(searchQuery) {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlSearchQuery= urlSearchParams.get('q');

    if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));

        const filteredData = initialData.filter(eventData => {
        return searchTerms.every(term => {
            return Object.values(eventData).some(value => {
            return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
            });
        });
        });

        displayData(filteredData, searchQuery);
    } else if (urlSearchQuery) {
        const searchTerms = urlSearchQuery.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));
        const filteredData = initialData.filter(eventData => {
        return searchTerms.every(term => {
            return Object.values(eventData).some(value => {
            return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
            });
        });
        });

        displayData(filteredData, urlSearchQuery);

    } else {
        displayData(initialData, '');
    }
}

function runSearch() {
    const searchQuery = search.value.trim();
    filterData(searchQuery);

    // Update URL with search query
    const newURL = new URL(window.location.href);
    newURL.searchParams.set('q', searchQuery);
    window.history.pushState(null, '', newURL);
};

// Event listeners for search bar
librarySearchBtn.addEventListener('click', runSearch);
search.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        runSearch();
    }
});

function displayData(data, searchQuery) {
    storeData(data);
    loader.style.display = 'none';
    let counter = 1;
    let dataDisplay = data.map((object)=>{
        let creatorsField = object.Creators ? `
            <div class="field">
            <p class="label">Creators:</p>
            <p class="value">${object.Creators}</p>
            </div>
        ` : '';
        
        return `
        <div class="resource">
            <div class="heading">
                <h2><a target="blank" href="${object.URL}"><span class="counter">${counter++}. </span>${object.Resource_Title}</a></h2>
                <p class="institution">${object.Institutional_Host}</p>
                <p><span class="inline-label">Broad Subject Areas: </span>${object.Broad_Subject_Areas}</p>
                <p><span class="inline-label">Country: </span>${object.Country_Coverage}</p>
                <p><span class="inline-label">Resource Types: </span>${object.Resource_Type}</p>
            </div>
            <button aria-label="Expand Details" class="resource-accordion">Details <i class="fa-solid fa-caret-down"></i></button>
            <div class="resource-panel">
                <div class="field">
                    <p class="label">Summary:</p>
                    <p class="value">${object.Summary}</p>
                </div>
                <div class="field">
                    <p class="label">Languages:</p>
                    <p class="value">${object.Language}</p>
                </div>
                <div class="field">
                    <p class="label">Subjects in English:</p>
                    <p class="value">${object.Subjects_English}</p>
                </div>
                <div class="field">
                    <p class="label">Materias en Español:</p>
                    <p class="value">${object.Subjects_Spanish}</p>
                </div>
                <div class="field">
                    <p class="label">Assuntos em Português:</p>
                    <p class="value">${object.Subjects_Portuguese}</p
                </div>
                <div class="field">
                    <p class="label">Specific Formats:</p>
                    <p class="value">${object.Specific_Formats}</p>
                </div>
                <div class="field">
                    <p class="label">Geographical Area Coverage:</p>
                    <p class="value">${object.Geographical_Area_Coverage}</p>
                </div>
                <div class="field">
                    <p class="label">Time Coverage:</p>
                    <p class="value">${object.Time_Coverage}</p>
                </div>
                ${creatorsField}
            </div>
        </div>
        `
    }).join('');


    // Print data to HTML
    display.innerHTML = dataDisplay;
    const storedLanguage = localStorage.getItem('lacliLanguagePreference');

    if (storedLanguage === 'en' || !storedLanguage){
        if (searchQuery === '') {
            displaySearchSummary.textContent = `Showing all ${data.length} records.`;
        } else {
            displaySearchSummary.textContent = `A search for \u{201C}${searchQuery}\u{201D} returned ${data.length} result${data.length !== 1 ? 's' : ''}.`;
        }
    }
    if (storedLanguage === 'es'){
        if (searchQuery === '') {
            displaySearchSummary.textContent = `Mostrando todos los  ${data.length}  resultados.`;
        } else {
            displaySearchSummary.textContent = `La búsqueda de \u{201C}${searchQuery}\u{201D} devolvió ${data.length} resultado${data.length !== 1 ? 's' : ''}.`;
        }
    }
    if (storedLanguage === 'pt'){
        if (searchQuery === '') {
            displaySearchSummary.textContent = `Exibindo todos ${data.length}  registros.`;
        } else {
            displaySearchSummary.textContent = `Sua pesquisa por \u{201C}${searchQuery}\u{201D} retornou ${data.length} resultado${data.length !== 1 ? 's' : ''}.`;
        }
    }

    // if (searchQuery === '') {
    //     displaySearchSummary.textContent = `Showing all ${data.length} records.`;
    // } else {
    //     displaySearchSummary.textContent = `A search for \u{201C}${searchQuery}\u{201D} returned ${data.length} result${data.length !== 1 ? 's' : ''}.`;
    // }

    // Accordion for extended resource records display
    var acc = document.getElementsByClassName("resource-accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("resource-accordion-active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
}


// Add an event listener to the random button
randomBtn.addEventListener('click', getRandomResource);

// Get random resource functionality
function getRandomResource() {
    const randomIndex = Math.floor(Math.random() * initialData.length);
    const randomResource = initialData[randomIndex]
    displayData([randomResource], randomResource.Resource_Title)

    const newURL = new URL(window.location.href);
    newURL.searchParams.set('q', randomResource.Resource_Title);
    window.history.pushState(null, '', newURL);
  }


// Add an event listener to the export btn
exportBtn.addEventListener('click', exportJSON);

// Store data for JSON export
function storeData(data) {
    const dataAsString = JSON.stringify(data);
    sessionStorage.setItem('data', dataAsString);
}

// Export current results to JSON file
function exportJSON() {
    const data = JSON.parse(sessionStorage.getItem('data'));
    const jsonData = JSON.stringify(data, null, 2);
  
    const file = new Blob([jsonData], {type: 'application/json'});
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'lacli-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }