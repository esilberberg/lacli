document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const navHome = document.getElementById('nav-home');
    const navLibrary = document.getElementById('nav-library');
    const navAbout = document.getElementById('nav-about');
    const navContact = document.getElementById('nav-contact');
    const navHelp = document.getElementById('nav-help');
    const navContribute = document.getElementById('nav-contribute');
  
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
          home: 'Home',
          library: 'Library',
          about: 'About',
          contact: 'Contact',
          help: 'Help',
          contribute: 'Contribute'
        },
        es: {
          home: 'Inicio',
          library: 'Biblioteca',
          about: 'Acerca de',
          contact: 'Contacto',
          help: 'Ayuda',
          contribute: 'Contribuya'
        },
        pt: {
          home: 'Principal',
          library: 'Biblioteca',
          about: 'Sobre',
          contact: 'Contacto',
          help: 'Ajuda',
          contribute: 'Contribua'
        },
      };
  
      navHome.textContent = translations[language].home;
      navLibrary.textContent = translations[language].library;
      navAbout.textContent = translations[language].about;
      navContact.textContent = translations[language].contact;
      navHelp.textContent = translations[language].help;
      navContribute.textContent = translations[language].contribute;
    }
  
    languageNavbar.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      localStorage.setItem('lacliLanguagePreference', selectedLanguage);
      updateLanguageSelection(selectedLanguage);
      updateContentLanguage(selectedLanguage);
    });
  });
  