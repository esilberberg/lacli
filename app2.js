const ssid = '1-8GRi632fN2kijwKEWnppWKNqbyn7L-eTEWLzksCUwg';
const endpoint = `https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?`;
console.log(`api endpoint:: ${endpoint}`);

async function fetchData(url) {
  console.log('fetch data');
  const data = [];
  try {
    const response = await fetch(url);
    const text = await response.text();
    // Remove Google API metadata
    const json = JSON.parse(text.substr(47).slice(0, -2));

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

    const searchInput = document.querySelector("#search");
    searchInput.addEventListener('keyup', (e) => {
      const query = e.target.value.toLowerCase();
      const filterData = data.filter((d) => {
        return (
          d.name.toLowerCase().includes(query) ||
          d.country.toLowerCase().includes(query) ||
          d.summary.toLowerCase().includes(query))
      });
      displayData(filterData);
    });
  } catch (error) {
    console.log(error);
  }
}

function displayData(payload) {
  const display = document.querySelector("#display");
  const count = document.querySelector("#resource-count");
  console.log('display data');

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
    `;
  }
  if (payload.length == 1) {
    resourceCount = `<p>${payload.length} resource found</p>`;
  } else {
    resourceCount = `<p>${payload.length} resources found</p>`;
  }
  
  count.innerHTML = resourceCount;
  display.innerHTML = htmlString;
}

fetchData(endpoint);
