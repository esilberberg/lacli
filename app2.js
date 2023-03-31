const form = document.querySelector('#searchForm');
const searchInput = document.querySelector("#search");

const ssid = '1-8GRi632fN2kijwKEWnppWKNqbyn7L-eTEWLzksCUwg';
const sheetName = 'Sheet1'
const endpoint = `https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?`;
console.log(`api endpoint:: ${endpoint}`)

function fetchData(url) {
    console.log('fetch data')
    const data = [];
    return fetch(url)
        .then(res => res.text())
        .then(rep => {
            // Remove Google API metadata
            const json = JSON.parse(rep.substr(47).slice(0, -2));

            // Use first row of table to find column headings
            const headings = json.table.rows[0].c;
            const keys = [];
            headings.forEach((head) => {
                keys.push(head.v);
            });
            // Get table values
            json.table.rows.slice(1).forEach((main) => {
                const row = {};
                keys.forEach((key, ind) => {
                    // Check and handle null values
                    row[key] = (main.c[ind] != null) ? main.c[ind].v : 'none';
                });
                data.push(row);
            });
            // Sort the array of objects alphabetically by the name element
            data.sort((a, b) => a.name.localeCompare(b.name));
            console.log(data);



            searchInput.addEventListener("input", (e) =>{
                const query = e.target.value.toLowerCase()
                data.forEach(d => {
                    const isVisible = user
                })
            });
            const query = ''
            const filterData = data.filter(d => {
                return (
                    d.name.includes(query) ||
                    d.country.includes(query) ||
                    d.summary.includes(query));
            })
            console.log(filterData);
            return filterData;
        })
        .catch(error => {
            console.log(error);
        });
}

function displayData(url) {

    const display = document.querySelector("#display");
    const count = document.querySelector("#resource-count");
    console.log('display data')

    fetchData(url)
        .then(payload => {
        let htmlString = "";
        for (let i = 0; i < payload.length; i++) { 
            const name = payload[i].name;
            const url = payload[i].url;
            const country = payload[i].country;
            const institution = payload[i].institution;
            const type = payload[i].resource_type;
            const summary = payload[i].summary;
    
            htmlString += `
            <h2><a target="_blank" rel="noopener noreferrer" href="${url}">${name}</a></h2>
            <p>${institution}</p>
            <p>${summary}</p>
            <p>Country: ${country}</p>
            <p>Resource Type: ${type}</p>
            `
        }
        resourceCount = `<p>${payload.length} resources found`;
        count.innerHTML = resourceCount;
        display.innerHTML = htmlString;
        })
        .catch(error => {
        console.log(error);
        });
    }


displayData(endpoint);
