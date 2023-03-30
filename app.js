const base = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1-8GRi632fN2kijwKEWnppWKNqbyn7L-eTEWLzksCUwg';
const q1 = '/gviz/tq?';
const endpoint = `${base}${ssid}${q1}`
const display = document.querySelector(".output")


function fetchData(url) {
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
                    row[key] = (main.c[ind] != null) ? main.c[ind].v : '';
                });
                data.push(row);
            });
            return data;
        })
        .catch(error => {
            console.log(error);
        });
}

fetchData(endpoint).then(data => {
    console.log(data);
});
