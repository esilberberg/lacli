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
                    <h2><a target="blank" href="${object.URL}">${object.Resource_Title}</a></h2>
                    <p>${object.Resource_Type}</p>
                </div>
            `
        }).join('');

        display.innerHTML = dataDisplay;

        count.textContent = `Showing ${filteredData.length} result${filteredData.length !== 1 ? 's' : ''}`;
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
