document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const librarySearch = document.getElementById('library-search');
    const refreshBtn = document.getElementById('refresh-btn-text');
    const randomBtn = document.getElementById('random-btn-text');
    const exportBtn = document.getElementById('export-btn-text');
    const filtersBtn = document.getElementById('filters-btn-text');
    const modal = document.getElementById('modal-content-text');

    const storedLanguage = localStorage.getItem('lacliLanguagePreference');
  
    if (storedLanguage) {
      updateLanguageSelection(storedLanguage);
      updateContentLanguage(storedLanguage);
    }
  
    function updateLanguageSelection(language) {
      const languageLinks = languageNavbar.getElementsByTagName('a');
  
      // Remove active class from navbar language links
      for (let i = 0; i < languageLinks.length; i++) {
        if (languageLinks[i].getAttribute('data-lang') === language) {
          languageLinks[i].classList.add('lang-link-active');
        } else {
          languageLinks[i].classList.remove('lang-link-active');
        }
      }
    }
    
    function updateContentLanguage(language) {
      const translations = {
        en: {
          placeholder: 'Search terms',
          refresh: 'New Search',
          random: 'Random',
          export: 'Download Results',
          filters: 'Filters',
          modal: `<div class="modal-heading">About LACLI Search</div>
              <h3><i class="fa-solid fa-magnifying-glass"></i> Keywords</h3>
              <ul>
                  <li>Searches are not case sensitive and ignore diacritics.</li>
                  <li>Truncation, wildcards, quotation marks, and lemmatization are not supported.</li>
                  <li>It is preferable to search with singular rather than plural nouns.</li>
                  <li>Search terms separated by a space are treated as independent search terms and are linked with the AND operator. Therefore, all search terms must appear in at least one description field for a resource to be returned in the results.</li>
              </ul>
              <h3><i class="fa-solid fa-sliders"></i> Filters</h3>
              <ul>
                <li>When a user selects multiple values from the same filter, such as two languages, LACLI uses OR logic. This means it shows results that match at least one of the selected values (e.g., Spanish OR English).</li>
                <li>When a user selects values from different filters, like a format and a language, LACLI uses AND logic. This narrows the results to only those that match all of the selected criteria (e.g., Books AND Spanish).</li>
              </ul>
              <h3><i class="fa-solid fa-floppy-disk"></i> Saving</h3>
              <ul>
                <li>There are two ways to save a search. First, copy the url. Only keywords, and not filters, are captured in the url. Second, download the records currently displayed as a CSV file to your computer via the Download button.</li>
              </ul>
            </div>`
        },
        es: {
          placeholder: 'Términos de búsqueda',
          refresh: 'Actualizar',
          random: 'Aleatorio',
          export: 'Descargar resultados',
          filters: 'Filtros',
          modal: `<div class="modal-heading">Acerca de la búsqueda</div>
              <h3><i class="fa-solid fa-magnifying-glass"></i> Palabras clave</h3>
              <ul>
                  <li>Las búsquedas ignoran los diacríticos y no distinguen entre mayúsculas y minúsculas.</li>
                  <li>No están implementadas funciones como la búsqueda con truncamiento, los comodines, el uso de comillas, o la lematización.</li>
                  <li>Es preferible buscar con sustantivos en singular que en plural.</li>
                  <li>Los términos de búsqueda separados por un espacio se consideran términos de búsqueda independientes y se vinculan con el operador AND. Por lo tanto, todos los términos de búsqueda deben aparecer en al menos un campo de descripción para que un recurso aparezca en los resultados.</li>
              </ul>
              <h3><i class="fa-solid fa-sliders"></i> Filtros</h3>
              <ul>
                <li>Cuando un usuario selecciona varios valores del mismo filtro, como dos idiomas, LACLI utiliza el operador OR. Esto significa que muestra resultados que coinciden con al menos uno de los valores seleccionados (p. ej., español OR inglés).</li>
                <li>Cuando un usuario selecciona valores de diferentes filtros, como un formato y un idioma, LACLI utiliza el operador AND. Esto limita los resultados a solo aquellos que coinciden con todos los criterios seleccionados (p. ej., libros AND español).</li>
              </ul>
              <h3><i class="fa-solid fa-floppy-disk"></i> Guardar</h3>
              <ul>
                <li>Hay dos maneras de guardar una búsqueda: 1) Copie la URL. Tenga en cuenta que en la URL solo se conservan las palabras clave, no los filtros. 2) Descargue los registros que se muestran actualmente como archivo CSV a su computadora mediante el botón Descargar.</li>
              </ul>
            </div>`
        },
        pt: {
          placeholder: 'Termos pesquisados',
          refresh: 'Atualizar',
          random: 'Aleatório',
          export: 'Exportar resultados',
          filters: 'Filtros',
          modal: `<div class="modal-heading">Sobre a Busca</div>
              <h3><i class="fa-solid fa-magnifying-glass"></i> Palavras-chave</h3>
              <ul>
                  <li>As buscas não diferenciam maiúsculas de minúsculas e ignoram os diacríticos (como acentos agudo, circunflexo e grave; o til, a cedilha e o trema).</li>
                  <li>Truncamento, curingas, aspas e lematização não são suportados pela pesquisa.</li>
                  <li>Prefira pesquisar com palavras no singular em vez de no plural.</li>
                  <li>Os termos de pesquisa separados por um espaço são tratados como termos de pesquisa independentes e são ligados pelo operador AND. Portanto, todos os termos de pesquisa devem aparecer em pelo menos um campo de descrição para que um recurso seja retornado nos resultados.</li>
              </ul>
              <h3><i class="fa-solid fa-sliders"></i> Filtros</h3>
              <ul>
                <li>Quando um usuário seleciona várias opções de um mesmo filtro, como dois idiomas, por exemplo, o LACLI usa o operador booleano OR. Isso significa que ele mostra resultados que correspondem a pelo menos uma das opções selecionadas (por exemplo, Espanhol OU Inglês).</li>
                <li>Quando um usuário seleciona opções de filtros diferentes, como um formato e um idioma, o LACLI usa o operador AND. Isso restringe os resultados apenas àqueles que correspondem a todos os critérios selecionados (por exemplo, Livros AND Espanhol).</li>
              </ul>
              <h3><i class="fa-solid fa-floppy-disk"></i> Salvando os resultados</h3>
              <ul>
                <li>Existem duas maneiras de salvar uma pesquisa. Primeiro, copie a URL. Apenas as palavras-chave, e não os filtros, são capturadas na URL. Segundo, baixe os registros atualmente exibidos para o seu computador através do botão Download (arquivo em formato CSV).</li>
              </ul>
            </div>`
        },
      };
  
      librarySearch.placeholder = translations[language].placeholder;
      refreshBtn.textContent = translations[language].refresh;
      randomBtn.textContent = translations[language].random;
      exportBtn.textContent = translations[language].export;
      filtersBtn.textContent = translations[language].filters;
      modal.innerHTML = translations[language].modal;

    }
  
    languageNavbar.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      localStorage.setItem('lacliLanguagePreference', selectedLanguage);
      updateLanguageSelection(selectedLanguage);
      updateContentLanguage(selectedLanguage);
    });
  });
  