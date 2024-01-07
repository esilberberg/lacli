document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const librarySearch = document.getElementById('library-search');
    const refreshBtn = document.getElementById('refresh');
    const randomBtn = document.getElementById('random');
    const exportBtn = document.getElementById('export');

  
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
          refresh: 'Refresh',
          random: 'Random',
          export: 'Export',
        },
        es: {
          placeholder: 'Términos de búsqueda',
          refresh: 'Actualizar',
          random: 'Aleatorio',
          export: 'Exportar',
        },
        pt: {
          placeholder: 'Termos pesquisados',
          refresh: 'Atualizar',
          random: 'Aleatório',
          export: 'Exportar',
        },
      };
  
      librarySearch.placeholder = translations[language].placeholder;
      refreshBtn.textContent = translations[language].refresh;
      randomBtn.textContent = translations[language].random;
      exportBtn.textContent = translations[language].export;

    }
  
    languageNavbar.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      localStorage.setItem('lacliLanguagePreference', selectedLanguage);
      updateLanguageSelection(selectedLanguage);
      updateContentLanguage(selectedLanguage);
    });
  });
  