// NEED HTML
// <div class="intro">
//   <input type="text" id="search" placeholder="Search...">
// </div>

// <div class="display"></div>



const base = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1-8GRi632fN2kijwKEWnppWKNqbyn7L-eTEWLzksCUwg';
const q1 = '/gviz/tq?';
const endpoint = `${base}${ssid}${q1}`
const display = document.querySelector(".display")
const intro = document.querySelector(".intro")


function fetchData(url) {
  console.log('ready')
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


// Function to filter data based on search query
function filterData(data, query) {
  return data.filter(item => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.country.toLowerCase().includes(query.toLowerCase()) ||
      item.institution.toLowerCase().includes(query.toLowerCase()) ||
      item.resource_type.toLowerCase().includes(query.toLowerCase())
    );
  });
}


// Function to render filtered data to the DOM
function renderData(data) {
  let htmlString = "";
  for (let i = 0; i < data.length; i++) { 
    const name = data[i].name;
    const url = data[i].url;
    const country = data[i].country;
    const institution = data[i].institution;
    const type = data[i].resource_type;
    const summary = data[i].summary;
    
    htmlString += `
    <h2><a target="_blank" rel="noopener noreferrer" href="${url}">${name}</a></h2>
    <p>${institution}</p>
    <p>${summary}</p>
    <p>Country: ${country}</p>
    <p>Resource Type: ${type}</p>
    `
  }
  display.innerHTML = htmlString;
}


// Fetch data on page load
fetchData(endpoint)
  .then(payload => {
    renderData(payload);
  })
  .catch(error => {
    console.log(error);
  });


// Add event listener to search input field
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value;
  fetchData(endpoint)
    .then(payload => {
      const filteredData = filterData(payload, searchQuery);
      renderData
