document.addEventListener('DOMContentLoaded', () => {

    const apiEndpoint = 'https://script.google.com/macros/s/AKfycbwd6T2yIHT0e0ifSgVrf5yAIB1A24ata21InKodZeLISG8IWf6jNLd59kNCk9AbPYGz/exec';
    
    const display = document.querySelector('#display');
    const search = document.querySelector('#search');
    const searchButton = document.querySelector('#search-button');
    const count = document.querySelector('#count');

    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    async function displayData(url) {
        let query = search.value;
        console.log('Query::', query);

        const payload = await fetchData(url);

        let filteredData = payload.filter((eventData)=>{
            if (query === "") {return eventData}  
            else if (eventData.Resource_Title.toLowerCase().includes(query.toLowerCase())){ return eventData}
        });

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
                        <p class="value">${object.Subjects_Portuguese}</p>
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

        display.innerHTML = dataDisplay;

        count.textContent = `Showing ${filteredData.length} result${filteredData.length !== 1 ? 's' : ''}`;
        
        // ----- ACCORDION -----
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
