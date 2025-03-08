document.addEventListener('DOMContentLoaded', function () {
  const languageNavbar = document.getElementById('language-navbar');
  const navHome = document.getElementById('nav-home');
  const navLibrary = document.getElementById('nav-library');
  const navAbout = document.getElementById('nav-about');
  const navContact = document.getElementById('nav-contact');
  const navHelp = document.getElementById('nav-help');
  const navContribute = document.getElementById('nav-contribute');

  const footerHome = document.getElementById('footer-home');
  const footerLibrary = document.getElementById('footer-library');
  const footerAbout = document.getElementById('footer-about');
  const footerContact = document.getElementById('footer-contact');
  const footerHelp = document.getElementById('footer-help');
  const footerContribute = document.getElementById('footer-contribute');
  const footerOpenData = document.getElementById('footer-open-data');
  const footerCCLicense1 = document.getElementById('cc-license-1');
  const footerCCLicense2 = document.getElementById('cc-license-2');

  const storedLanguage = localStorage.getItem('lacliLanguagePreference');

  if (storedLanguage) {
    updateLanguageSelection(storedLanguage);
    updateContentLanguage(storedLanguage);
  }

  function updateLanguageSelection(language) {
    const languageLinks = languageNavbar.getElementsByTagName('a');
    const footerLanguage = document.getElementById('footer-language');
    const footerLanguageLinks = footerLanguage.getElementsByTagName('a');

    // Remove active class from navbar language links
    for (let i = 0; i < languageLinks.length; i++) {
      if (languageLinks[i].getAttribute('data-lang') === language) {
        languageLinks[i].classList.add('lang-link-active');
      } else {
        languageLinks[i].classList.remove('lang-link-active');
      }
    }

    // Add active class to footer language links
    for (let i = 0; i < footerLanguageLinks.length; i++) {
      if (footerLanguageLinks[i].getAttribute('data-lang') === language) {
        footerLanguageLinks[i].classList.add('lang-link-active');
      } else {
        footerLanguageLinks[i].classList.remove('lang-link-active');
      }
    }
  }
  
    function updateContentLanguage(language) {
      const translations = {
        en: {
          home: 'Impact',
          library: 'Library',
          about: 'About',
          contact: 'Contact',
          help: 'Help',
          contribute: 'Contribute',
          openData: 'Open Data',
          ccLicense1: 'This work is licensed under a',
          ccLicense2: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License',
          ccLicenseURL: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en',
        },
        es: {
          home: 'Impacto',
          library: 'Biblioteca',
          about: 'Acerca de',
          contact: 'Contacto',
          help: 'Ayuda',
          contribute: 'Contribuya',
          openData: 'Datos abiertos',
          ccLicense1: 'Esta obra está bajo una',
          ccLicense2: 'Licencia Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional',
          ccLicenseURL: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es',
        },
        pt: {
          home: 'Impacto',
          library: 'Biblioteca',
          about: 'Sobre',
          contact: 'Contacto',
          help: 'Ajuda',
          contribute: 'Contribua',
          openData: 'Dados abertos',
          ccLicense1: 'Este trabalho está sob um',
          ccLicense2: 'Licencia Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional',
          ccLicenseURL: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR',
        },
      };

      navHome.textContent = translations[language].home;
      navLibrary.textContent = translations[language].library;
      navAbout.textContent = translations[language].about;
      navContact.textContent = translations[language].contact;
      navHelp.textContent = translations[language].help;
      navContribute.textContent = translations[language].contribute;

      footerHome.textContent = translations[language].home;
      footerLibrary.textContent = translations[language].library;
      footerAbout.textContent = translations[language].about;
      footerContact.textContent = translations[language].contact;
      footerHelp.textContent = translations[language].help;
      footerContribute.textContent = translations[language].contribute;
      footerOpenData.textContent = translations[language].openData;
      footerCCLicense1.textContent = translations[language].ccLicense1;
      footerCCLicense2.textContent = translations[language].ccLicense2;
      footerCCLicense2.setAttribute('href', translations[language].ccLicenseURL);
    }
  
    languageNavbar.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      localStorage.setItem('lacliLanguagePreference', selectedLanguage);
      updateLanguageSelection(selectedLanguage);
      updateContentLanguage(selectedLanguage);
    });
  
    // Add event listener to footer language list
    const footerLanguage = document.getElementById('footer-language');
    footerLanguage.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      if (selectedLanguage) { // Check if a language is selected
        localStorage.setItem('lacliLanguagePreference', selectedLanguage);
        updateLanguageSelection(selectedLanguage);
        updateContentLanguage(selectedLanguage);
      }
    });
    
});