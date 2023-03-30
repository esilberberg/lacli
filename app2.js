const base = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1-8GRi632fN2kijwKEWnppWKNqbyn7L-eTEWLzksCUwg';
const q1 = '/gviz/tq?';
const endpoint = `${base}${ssid}${q1}`
const display = document.querySelector(".display")

function fetchData(url) {
    console.log('fetch data')
    const data = [];
    return fetch(url)
        .then(res => res.text())
        .then(rep => {
            // Remove Google metadata
            const json = JSON.parse(rep.substr(47).slice(0, -2));

            // Get keys from 1st row of table
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
            return data;
        })
        .catch(error => {
            console.log(error);
        });
}

function displayData(url, output) {
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
    output.innerHTML = htmlString;
    })
    .catch(error => {
    console.log(error);
    });
}

displayData(endpoint, display);
