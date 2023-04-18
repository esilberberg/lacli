async function getFacets(data, key) {
    const facetObject = {};
    
    for (const object of data) {
      const value = object[key];
      if (value && value.trim() !== '') {
        // Split the value by ';' or ',' if it's a string with multiple values
        const valueArr = typeof value === 'string' ? value.split(/[;,]/) : [value];
    
        // Normalize each value, replace ʼ with ', and add to the facetObject
        valueArr.forEach(v => {
          const normalizedValue = removeDiacritics(v.trim().replace(/ʼ/g, "'")).toLowerCase();
          if (normalizedValue !== '') {
            facetObject[normalizedValue] = (facetObject[normalizedValue] || 0) + 1;
          }
        });
      }
    }
    
    // Convert the facetObject to an array of facet objects
    const facetArray = Object.entries(facetObject).map(([name, tally]) => ({ name, tally }));
    
    // Sort the facet array by name in alphabetical order
    facetArray.sort((a, b) => a.name.localeCompare(b.name));
    
    console.log(facetArray);
  }