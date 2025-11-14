// Custom message box function (replaces alert())
function showMessageBox(message) {
    const msgBox = document.getElementById('message-box');
    const msgContent = document.getElementById('message-content');
    const msgOkBtn = document.getElementById('message-ok-btn');

    msgContent.textContent = message;
    msgBox.style.display = 'block';

    msgOkBtn.onclick = () => {
        msgBox.style.display = 'none';
    };
}

// DOM elements
const apiEndpoint = 'https://script.google.com/macros/s/AKfycbwA7DLdT6UmiOU7B89gdMglsDdXedG3fyh5nmCr0EeIx1iSkXVTr0-mYn615Q7WCPpB/exec';

const display = document.getElementById('display');
const search = document.getElementById('library-search');

const resourceTypesFacet = document.getElementById('resource-types-facet');
const specificFormatsFacet = document.getElementById('specific-formats-facet');
const countriesFacet = document.getElementById('countries-facet');
const broadSubjectAreasFacet = document.getElementById('broad-subject-areas-facet');
const subjectsEngFacet = document.getElementById('subjects-in-english-facet');
const materiasEnEspanolFacet = document.getElementById('materias-en-espanol-facet');
const assuntosEmPortuguesFacet = document.getElementById('assuntos-em-portugues-facet');
const languagesFacet = document.getElementById('languages-facet');
const geographicalAreaFacet = document.getElementById('geographical-area-facet');
const timeCoverageFacet = document.getElementById('time-coverage-facet');
const institutionalHostsFacet = document.getElementById('institutional-hosts-facet');

const activeFacetsSummary = document.getElementById('activeFacetsSummary');

const librarySearchBtn = document.getElementById('library-search-btn');
const loader = document.getElementById('loader');
const displaySearchSummary = document.getElementById('displaySearchSummary');
const randomBtn = document.getElementById('random-btn');
const exportBtn = document.getElementById('export-btn');
// const refreshBtn = document.getElementById('refresh-btn');
const refreshBtns = document.getElementsByClassName('refresh-btn');
const loadMoreBtn = document.getElementById('loadMore');



let displayedCount = 0; // Track how many data objects are currently displayed for pagination
const itemsPerPage = 15; // Number of items to display per page

// Full data from Google Sheets API
let initialData = [];
// Stores the currently filtered/displayed dataset (for pagination and export)
let activeDataToDisplay = [];
// Stores arrays of values for each facet fieldName: { 'fieldName': ['value1', 'value2'] }
let currentActiveFacets = {};

// Store facet data for sorting (value and count) for each facet field
let facetDataCache = {}; // e.g., { 'Resource_Types': [['Journal', 10], ['Book', 5]], 'Countries': [...] }
let currentFacetSortOrder = {
    'Resource_Types': 'count',
    'Specific_Formats': 'count',
    'Countries': 'count',
    'Broad_Subject_Areas': 'count',
    'Subjects_in_English': 'count',
    'Materias_en_Espanol': 'count',
    'Assuntos_em_Portugues': 'count',
    'Languages': 'count',
    'Geographical_Area': 'count',
    'Time_Coverage': 'count',
    'Institutional_Hosts': 'count'
};


// Function to remove diacritics from a string
function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// --- URL Search Parameter on Page Load ---
// Get search terms from URL and display in search bar on page load
const searchURL = window.location.href;
const urlParams = new URL(searchURL).searchParams;
const initialSearchQuery = urlParams.get('q') || ''; // Get 'q' parameter, default to empty string
search.value = initialSearchQuery; // Populate search bar with URL query

// Fetches data from the API endpoint
async function fetchData(url) {
    loader.style.display = 'block'; // Show loader before fetching
    try {
    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const data = await response.json();
    initialData = data; // Store the original data
    filterData(initialSearchQuery); // Filter data based on initial URL search query
    } catch (error) {
    console.error('Error fetching data:', error);
    showMessageBox('Error fetching data. Please try again later.');
    loader.style.display = 'none'; // Hide loader on error
    }
}

// Fetch data on load
fetchData(apiEndpoint);

// Filters data based on search query and active facets
function filterData(searchQuery) {
    loader.style.display = 'block'; // Show loader during filtering
    let filtered = [...initialData]; // Start with full data for filtering

    // Apply search query filter if present
    if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));
        filtered = filtered.filter(item => {
            return searchTerms.every(term => {
                return Object.values(item).some(value => {
                    return value && removeDiacritics(String(value).toLowerCase()).includes(term);
                });
            });
        });
    }

    // Apply facet filters
    for (const fieldName in currentActiveFacets) {
        const selectedFacetValues = currentActiveFacets[fieldName]; // This is now an array
        if (selectedFacetValues.length > 0) { // Only filter if there are active facets for this field
            filtered = filtered.filter(item => {
                let itemValues = [];
                if (item[fieldName] && typeof item[fieldName] === 'string') {
                    itemValues = item[fieldName].split(';').map(s => s.trim());
                } else if (item[fieldName] && Array.isArray(item[fieldName])) {
                    itemValues = item[fieldName].map(s => String(s).trim());
                }

                // An item passes the filter if any of its values match any of the selected facet values
                return selectedFacetValues.some(selectedVal => itemValues.includes(selectedVal));
            });
        }
    }

    activeDataToDisplay = filtered; // Store the currently filtered data
    displayedCount = 0; // Reset displayed count for new filter/search
    displayData(activeDataToDisplay, searchQuery, displayedCount, true); // Display data, refreshing the display
    updateActiveFacetsSummary();
    loader.style.display = 'none'; // Hide loader after filtering
};

// Runs the search based on the input field value and updates URL
function runSearch() {
    const searchQuery = search.value.trim();
    // Reset active facets when a new search is performed (clear all filters)
    currentActiveFacets = {}; // Clears all facet selections
    filterData(searchQuery);

    // Update URL with search query
    const newURL = new URL(window.location.href);
    if (searchQuery) {
        newURL.searchParams.set('q', searchQuery);
    } else {
        newURL.searchParams.delete('q'); // Remove 'q' parameter if search query is empty
    }
    window.history.pushState(null, '', newURL);
}

// Displays the provided data and regenerates facets
function displayData(data, searchQuery, count, refresh) {

    const paginatedData = data.slice(count, count + itemsPerPage);
    let currentItemIndex = count + 1; // Used for numbering in display

    if (data.length === 0) {
        display.innerHTML = '<p>No results found.</p>';
        loadMoreBtn.style.display = 'none'; // Hide load more if no results
    } else {
        let dataDisplayHtml = paginatedData.map((object) => {
            const creatorsField = object.Creators ? `
                <div>
                    <p class="heading-label">Creators:</p>
                    <p>${object.Creators}</p>
                </div>
            ` : '';

            // Safely split and map array-like fields
            // Added fieldKey parameter to correctly pass the field name for data-field attribute
            const getTagsHtml = (fieldValue, fieldKey, className = 'subject-tag') => {
                if (!fieldValue) return 'N/A';
                const values = typeof fieldValue === 'string' ? fieldValue.split(';') : Array.isArray(fieldValue) ? fieldValue : [];
                // Use fieldKey for the data-field attribute
                return values.map(val => `<button class="${className}" data-field-name="${fieldKey}" data-value="${val.trim()}">${val.trim()}</button>`).join('&ensp; ');
            };
            return `
            <div>
                <div>
                    <h2><a target="_blank" href="${object.URL || '#'}"><span>${currentItemIndex++}. </span>${object.Resource_Title || 'No Title'}</a></h2>
                    <div class="resource-top-line-info">
                        <p><span class="heading-label">Institutional Hosts: </span>${getTagsHtml(object.Institutional_Hosts, 'Institutional_Hosts')}</p>
                        <p><span class="heading-label">Broad Subjects: </span> ${getTagsHtml(object.Broad_Subject_Areas, 'Broad_Subject_Areas')}</p>
                        <p><span class="heading-label">Countries: </span> ${getTagsHtml(object.Countries, 'Countries')}</p>
                        <p><span class="heading-label">Resource Types: </span> ${getTagsHtml(object.Resource_Types, 'Resource_Types')}</p>
                    </div>
                </div>

                <div class="accordion-container">
                    <button aria-label="Expand Details" class="resource-accordion">Details +</button>
                    <div class="resource-panel"> <div>
                            <p class="heading-label">Summary:</p>
                            <p>${object.Summary || 'N/A'}</p>
                        </div>
                        <div>
                            <p class="heading-label">Languages:</p>
                            <p>${getTagsHtml(object.Languages, 'Languages')}</p>
                        </div>
                        <div>
                            <p class="heading-label">Subjects in English:</p>
                            <p>${getTagsHtml(object.Subjects_in_English, 'Subjects_in_English')}</p>
                        </div>
                        <div>
                            <p class="heading-label">Materias en Español:</p>
                            <p>${getTagsHtml(object.Materias_en_Espanol, 'Materias_en_Espanol')}</p>
                        </div>
                        <div>
                            <p class="heading-label">Assuntos em Português:</p>
                            <p>${getTagsHtml(object.Assuntos_em_Portugues, 'Assuntos_em_Portugues')}</p>
                        </div>
                        <div>
                            <p class="heading-label">Formats:</p>
                            <p>${getTagsHtml(object.Specific_Formats, 'Specific_Formats')}</p>
                        </div>
                        <div>
                            <p class="heading-label">Geographical Areas:</p>
                            <p>${getTagsHtml(object.Geographical_Area, 'Geographical_Area')}</p>
                        </div>
                        <div>
                            <p class="heading-label">Time Coverage:</p>
                            <p>${getTagsHtml(object.Time_Coverage, 'Time_Coverage')}</p>
                        </div>
                        ${creatorsField}
                    </div>
                </div>
            </div>
            `
        }).join('');

        if (refresh) {
            display.innerHTML = dataDisplayHtml;
        } else {
            display.innerHTML += dataDisplayHtml;
        }
    }

    // Update displayedCount for pagination
    displayedCount += paginatedData.length;

    // Manage Load More button visibility
    if (displayedCount < activeDataToDisplay.length) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }

    // Update Search Summary
    if (searchQuery === '') {
        displaySearchSummary.textContent = `${data.length} record${data.length !== 1 ? 's' : ''}`;
    } else {
        displaySearchSummary.textContent = `${data.length} record${data.length !== 1 ? 's' : ''}`;
    }

    // Attach event listeners for subject tags
    document.querySelectorAll('.subject-tag').forEach(subjectLink => {
        subjectLink.removeEventListener('click', handleSubjectTagClick); // Prevent duplicate listeners
        subjectLink.addEventListener('click', handleSubjectTagClick);
    });

    // Accordion for extended resource records display
    var acc = document.getElementsByClassName("resource-accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].removeEventListener("click", handleAccordionClick); // Prevent duplicate listeners
        acc[i].addEventListener("click", handleAccordionClick);
    }

    // Recreate facets based on the currentData
    createFacets(activeDataToDisplay, 'Resource_Types', resourceTypesFacet, 'No resource types found.');
    createFacets(activeDataToDisplay, 'Specific_Formats', specificFormatsFacet, 'No specific formats found.');
    createFacets(activeDataToDisplay, 'Countries', countriesFacet, 'No countries found.');
    createFacets(activeDataToDisplay, 'Broad_Subject_Areas', broadSubjectAreasFacet, 'No subjects found.');
    createFacets(activeDataToDisplay, 'Subjects_in_English', subjectsEngFacet, 'No subjects found.');
    createFacets(activeDataToDisplay, 'Materias_en_Espanol', materiasEnEspanolFacet, 'No se encontraron.');
    createFacets(activeDataToDisplay, 'Assuntos_em_Portugues', assuntosEmPortuguesFacet, 'Nenhum assunto encontrado.');
    createFacets(activeDataToDisplay, 'Languages', languagesFacet, 'No languages found.');
    createFacets(activeDataToDisplay, 'Geographical_Area', geographicalAreaFacet, 'No geographic areas found.');
    createFacets(activeDataToDisplay, 'Time_Coverage', timeCoverageFacet, 'No times found.');
    createFacets(activeDataToDisplay, 'Institutional_Hosts', institutionalHostsFacet, 'No institutions found.');
   
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.removeEventListener('click', handleFacetSortClick); // Prevent duplicate
        button.addEventListener('click', handleFacetSortClick);
    });
    updateSortButtonStyles();
}

// --- Event Handlers ---

// Main search button and Enter key listener
librarySearchBtn.addEventListener('click', runSearch);
search.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        runSearch();
    }
});

// Refresh buttons
Array.from(refreshBtns).forEach(button => {
    button.addEventListener('click', () => {
        search.value = ''; // Clear search input
        currentActiveFacets = {}; // Clear active facets
        displayedCount = 0; // Reset pagination
        filterData(''); // Show all data
        // Clear URL search parameter
        const newURL = new URL(window.location.href);
        newURL.searchParams.delete('q');
        window.history.pushState(null, '', newURL);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});

// Load More button
loadMoreBtn.addEventListener('click', () => {
    // Check if there is more data to display
    if (displayedCount < activeDataToDisplay.length) {
        // `displayData` increments `displayedCount`
        displayData(activeDataToDisplay, search.value, displayedCount, false); // `false` to append data
    }
});

// Get random resource
randomBtn.addEventListener('click', getRandomResource);

// JSON export
exportBtn.addEventListener('click', exportJSON);

// --- Facet Functions ---
function createFacets(data, fieldName, targetElement, noDataMessage, sortType = 'count') {
    const counts = new Map();

    data.forEach(item => {
        let valuesToProcess = [];

        if (item[fieldName] && typeof item[fieldName] === 'string') {
            valuesToProcess = item[fieldName].split(';').map(s => s.trim());
        } else if (item[fieldName] && Array.isArray(item[fieldName])) {
            valuesToProcess = item[fieldName].map(s => String(s).trim());
        }

        valuesToProcess.forEach(value => {
            if (value) {
                counts.set(value, (counts.get(value) || 0) + 1);
            }
        });
    });

    let sortedValues = Array.from(counts.entries()); // [ [value, count], ... ]

    // Store this raw sorted data in the cache
    facetDataCache[fieldName] = sortedValues;

    // Apply sorting based on sortType
    if (sortType === 'alphabetical') {
        sortedValues.sort((a, b) => a[0].localeCompare(b[0])); // Sort by value (alphabetical)
    } else { // default to 'count'
        sortedValues.sort((a, b) => b[1] - a[1]); // Sort by count (descending)
    }

    if (sortedValues.length === 0) {
        // If no data, still ensure sort buttons are present if they were already there
        const existingSortButtons = targetElement.querySelector('.sort-buttons')?.outerHTML || '';
        targetElement.innerHTML = existingSortButtons + `<p>${noDataMessage}</p>`;
        return;
    }

    // Capture existing sort buttons HTML to re-insert them
    let sortButtonsHtml = targetElement.querySelector('.sort-buttons')?.outerHTML;

    // If sortButtonsHtml is null 
    if (!sortButtonsHtml) {
        const fieldNameLowercase = fieldName.toLowerCase().replace(/_/g, '-');
        sortButtonsHtml = `
            <div class="sort-buttons" data-facet-field="${fieldName}">
                <button class="sort-btn" data-sort-type="alphabetical">A-Z</button>
                <button class="sort-btn" data-sort-type="count">1-9</button>
            </div>
        `;

    }

    const facetsHtml = sortedValues.map(([value, count]) => {
        const isActive = currentActiveFacets[fieldName] && currentActiveFacets[fieldName].includes(value);
        return `
            <p>
                <span>
                    <button
                        class="facet ${isActive ? 'active' : ''}"
                        data-field-name="${fieldName}"
                        data-facet-value="${value}"
                    >
                        ${value}
                    </button>
                </span>
                <span>(${count})</span>
            </p>
        `;
    }).join('');

    const scrollableContentHtml = `<div class="facet-list-scroll-container">${facetsHtml}</div>`;
    targetElement.innerHTML = sortButtonsHtml + scrollableContentHtml;

    // Add event listeners to newly created facet buttons (excluding sort buttons)
    targetElement.querySelectorAll('.facet').forEach(facetButton => {
        facetButton.removeEventListener('click', runFacetFiltering); // Prevent duplicate listeners
        facetButton.addEventListener('click', runFacetFiltering);
    });

    // Re-attach listeners to the sort button after re-rendering the facet content
    targetElement.querySelectorAll('.sort-btn').forEach(button => {
        button.removeEventListener('click', handleFacetSortClick);
        button.addEventListener('click', handleFacetSortClick);
    });
}

function updateActiveFacetsSummary() {
    let summaryHtml = '';
    const activeFacetsCount = Object.keys(currentActiveFacets).length;

    if (activeFacetsCount > 0) {
        summaryHtml += '<span class="active-facets-label">Active filters: </span>';
        const facetElements = [];
        for (const fieldName in currentActiveFacets) {
            currentActiveFacets[fieldName].forEach(value => {
                // Encode URI component to handle special characters in data attributes safely
                const encodedFieldName = encodeURIComponent(fieldName);
                const encodedValue = encodeURIComponent(value);

                facetElements.push(
                    `<button class="active-facet-tag" data-field-name="${encodedFieldName}" data-facet-value="${encodedValue}">` +
                    `${value} <span class="remove-facet-btn" data-field-name="${encodedFieldName}" data-facet-value="${encodedValue}">x</span></button>`
                );
            });
        }
        summaryHtml += facetElements.join('&ensp;') + '</p>';
    } else {
        summaryHtml = ''; // Clear the summary if no active facets
    }

    activeFacetsSummary.innerHTML = summaryHtml;

    // Attach event listeners to the new "x" buttons
    activeFacetsSummary.querySelectorAll('.remove-facet-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const fieldName = decodeURIComponent(event.target.dataset.fieldName);
            const facetValue = decodeURIComponent(event.target.dataset.facetValue);

            // Simulate a facet click to toggle it off
            if (currentActiveFacets[fieldName]) {
                const index = currentActiveFacets[fieldName].indexOf(facetValue);
                if (index > -1) {
                    currentActiveFacets[fieldName].splice(index, 1);
                }
                if (currentActiveFacets[fieldName].length === 0) {
                    delete currentActiveFacets[fieldName];
                }
            }
            filterData(search.value.trim()); // Re-filter to update results and summary
        });
    });
}

// Facet filtering logic
function runFacetFiltering(event) {
    const facetButton = event.currentTarget; // Get the button that was clicked
    const fieldName = facetButton.dataset.fieldName;
    const facetValue = facetButton.dataset.facetValue;

    // Ensure the array exists for this fieldName
    if (!currentActiveFacets[fieldName]) {
        currentActiveFacets[fieldName] = [];
    }

    const index = currentActiveFacets[fieldName].indexOf(facetValue);

    if (index > -1) {
        // Facet is currently active: remove it
        currentActiveFacets[fieldName].splice(index, 1);
    } else {
        // Facet is not active: add it
        currentActiveFacets[fieldName].push(facetValue);
    }
    if (currentActiveFacets[fieldName].length === 0) {
        delete currentActiveFacets[fieldName];
    }
    const searchQuery = search.value.trim();
    filterData(searchQuery); // filterData will reset displayedCount and refresh
}

function handleFacetSortClick(event) {
    const sortButton = event.currentTarget;
    const sortType = sortButton.dataset.sortType; 
    const fieldName = sortButton.closest('.sort-buttons').dataset.facetField;

    if (fieldName) {
        currentFacetSortOrder[fieldName] = sortType; // Update the sort order for this facet
        const targetElement = document.getElementById(fieldName.toLowerCase().replace(/_/g, '-') + '-facet'); 
        createFacets(activeDataToDisplay, fieldName, targetElement, 'No data found.', sortType);
    }
    updateSortButtonStyles(); // Update button styles after a sort
}

// Update the active sort button styles
function updateSortButtonStyles() {
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.classList.remove('active-sort');
        const fieldName = button.closest('.sort-buttons').dataset.facetField;
        const sortType = button.dataset.sortType;
        if (currentFacetSortOrder[fieldName] === sortType) {
            button.classList.add('active-sort');
        }
    });
}

// --- Other Utility Functions ---

// Subject links within resource descriptions
function handleSubjectTagClick(event) {
    const clickedTag = event.currentTarget;
    const tagValue = clickedTag.textContent.trim();
    const fieldName = clickedTag.dataset.fieldName; // Get field name from the data attribute of the subject tag

    // Subject tag as if selecting a single facet for that field
    currentActiveFacets = {}; // Clear all facets first
    if (fieldName) { 
        currentActiveFacets[fieldName] = [tagValue]; 
    }
    search.value = tagValue; 
    runSearch(); 

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Gets a random resource from the initial full dataset
function getRandomResource() {
    if (initialData.length === 0) {
        showMessageBox('No data available to select a random resource.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * initialData.length);
    const randomResource = initialData[randomIndex];

    search.value = ''; 
    currentActiveFacets = {}; 
    activeDataToDisplay = [randomResource]; 
    displayedCount = 0; 
    displayData(activeDataToDisplay, '', displayedCount, true); 
    // Do not update URL for random resource
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Exports data as JSON
function exportJSON() {
    if (activeDataToDisplay.length === 0) {
        showMessageBox('No results to export. Please perform a search or refresh to get data.');
        return;
    }

    const jsonString = JSON.stringify(activeDataToDisplay, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lacli_library_results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Accordion function for Resource details
function handleAccordionClick() {
    this.classList.toggle("resource-accordion-active");
    const panel = this.nextElementSibling; 
    if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
        panel.style.maxHeight = '0px'; 
        panel.classList.remove('active');
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px"; 
        panel.classList.add('active'); 
    }
}

