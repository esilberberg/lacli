// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {

    // Define API endpoint and DOM elements
    const apiEndpoint = 'https://script.google.com/macros/s/AKfycbwd6T2yIHT0e0ifSgVrf5yAIB1A24ata21InKodZeLISG8IWf6jNLd59kNCk9AbPYGz/exec';
    const display = document.querySelector('#display');
    const loader = document.getElementById("loader");
    const search = document.querySelector('#search');
    const searchButton = document.querySelector('#search-button');
    const count = document.querySelector('#count');


    // Removes diacritics from strings
    function removeDiacritics(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }


    // Fetch data from Google Sheets API
    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }


    // Display data on the page
    function displayData(data) {
        console.log('display')
        // Generate HTML for filtered data and display on the page
        let dataDisplay = data.map((object)=>{
            return `
            <div class="resource">
                <div class="heading">
                    <h2><a target="blank" href="${object.URL}">${object.Resource_Title}</a></h2>
                    <p class="institution">${object.Institutional_Host}</p>
                    <p><span class="inline-label">Subjects: </span>${object.Broad_Subject_Categories}</p>
                    <p><span class="inline-label">Country: </span>${object.Country_Coverage}</p>
                    <p><span class="inline-label">Type: </span>${object.Resource_Type}</p>
                </div>
                <button class="accordion">Details <i class="fa-solid fa-caret-down"></i></button>
                <div class="panel">
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
                        <p class="label">Format:</p>
                        <p class="value">${object.Specific_Formats}</p>
                    </div>
                    <div class="field">
                        <p class="label">Region:</p>
                        <p class="value">${object.Geographical_Area_Coverage}</p>
                    </div>
                    <div class="field">
                        <p class="label">Countries:</p>
                        <p class="value">${object.Country_Coverage}</p>
                    </div>
                    <div class="field">
                        <p class="label">Time Coverage:</p>
                        <p class="value">${object.Time_Coverage}</p>
                    </div>
                </div>
            </div>
            `
        }).join('');
    
        // Print data to HTML
        display.innerHTML = dataDisplay;
    
        count.textContent = `Showing ${data.length} result${data.length !== 1 ? 's' : ''}`;
    
        // Accordion for extended resource records display
        var acc = document.getElementsByClassName("accordion");
        var i;
    
        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            console.log('accordion')
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
            }
        });
        }
    
        // Show display
        display.style.display = "block";
    }
    
    // ----- TESTING FUNCTION -----
    // async function getFacets(data, key) {
    //     const facetObject = {};
        
    //     for (const object of data) {
    //       const value = object[key];
    //       if (value && value.trim() !== '') {
    //         // Split the value by ';' or ',' if it's a string with multiple values
    //         const valueArr = typeof value === 'string' ? value.split(/[;,]/) : [value];
      
    //         // Normalize each value, replace ʼ with ', and add to the facetObject
    //         valueArr.forEach(v => {
    //           const normalizedValue = removeDiacritics(v.trim().replace(/ʼ/g, "'")).toLowerCase();
    //           if (normalizedValue !== '') {
    //             facetObject[normalizedValue] = (facetObject[normalizedValue] || 0) + 1;
    //           }
    //         });
    //       }
    //     }
        
    //     // Convert the facetObject to an array of facet objects
    //     const facetArray = Object.entries(facetObject).map(([name, tally]) => ({ name, tally }));
      
    //     // Sort the facet array by name in alphabetical order
    //     facetArray.sort((a, b) => a.name.localeCompare(b.name));
        
    //     console.log(facetArray);
    //   }
      

    // Filter data based on search query
    async function filterData(url) {
        console.log('filtering')
        // Show loading animation
        loader.style.display = "block";
        display.style.display = "none";
    
        // Get search value
        let query = search.value.trim();
        console.log('Query:: ' + query)
    
        // Fetch data from API and filter based on search query
        const payload = await fetchData(url);
        let searchTerms = query.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));
        let filteredData = payload.filter((eventData)=>{
        if (query === "") {
            return true;
        } else {
            return searchTerms.every(term => {
            return Object.values(eventData).some(value => {
                return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
            });
            });
        }
        });
    
        // Hide loader
        loader.style.display = "none";
    
        // Display filtered data
        displayData(filteredData);

        // -----TESTING FUNCTION-----
        getFacets(filteredData, 'Language');
        getFacets(filteredData, 'Geographical_Area_Coverage');
        getFacets(filteredData, 'Broad_Subject_Categories');
        getFacets(filteredData, 'Subjects_English');
    }
    
    
    // Display data on page on first load
    async function displayInitialData(url) {
        console.log('initial data load')
        // Show loading animation
        loader.style.display = "block";
        display.style.display = "none";
    
        // Fetch data from API
        const payload = await fetchData(url);
    
        // Display data
        displayData(payload);
    
        // Hide loader
        loader.style.display = "none";
    
        // Show display
        display.style.display = "block";
    }
    
    displayInitialData(apiEndpoint);
    
    searchButton.addEventListener("click", ()=>{
        filterData(apiEndpoint);
    });
    
    search.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
        filterData(apiEndpoint);
        }
    });


});  