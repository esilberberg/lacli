// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {

    // Define API endpoint and elements to interact with
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

    // Fetch data from API
    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Display data on the page
    async function displayData(url) {

        // Show loading animation
        loader.style.display = "block";
        display.style.display = "none";

        // Get search value
        let query = search.value.trim();

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

        // Generate HTML for filtered data and display on the page
        let dataDisplay = filteredData.map((object)=>{
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
                        <p class="label">Summary</p>
                        <p class="value">${object.Summary}</p>
                    </div>
                    <div class="field">
                        <p class="label">Languages</p>
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

        // Print LACLI data to HTML
        display.innerHTML = dataDisplay;

        // Hide loader
        loader.style.display = "none";
        
        // Show display
        display.style.display = "block";

        count.textContent = `Showing ${filteredData.length} result${filteredData.length !== 1 ? 's' : ''}`;
        
        // Accordion for resource records display
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
    }

    displayData(apiEndpoint);

    searchButton.addEventListener("click", ()=>{
        displayData(apiEndpoint);
    });

    search.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            displayData(apiEndpoint);
        }
    });

});
