document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const heading = document.getElementById('contact-heading');
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');



    const storedLanguage = localStorage.getItem('lacliLanguagePreference');

    if (storedLanguage) {
      updateLanguageSelection(storedLanguage);
      updateContentLanguage(storedLanguage);
    }
  
    function updateLanguageSelection(language) {
      const languageLinks = languageNavbar.getElementsByTagName('a');
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
          heading: 'Contact',
          p1: 'LACLI is an ongoing project and we value your feedback.',
          p2: 'Share your thoughts or discoveries with us using the form provided or reach out via email:',     
        },
        es: {
          heading: 'Contacto',
          p1: 'LACLI es un proyecto en curso y valoramos sus comentarios.',
          p2: 'Comparta con nosotros sus ideas o descubrimientos a través del formulario proporcionado o por correo electrónico:',
        },
        pt: {
          heading: 'Contato',
          p1: 'LACLI é um projeto contínuo e valorizamos seu feedback.',
          p2: 'Compartilhe suas ideias e descobertas conosco usando o formulário fornecido ou pelo email:',

        },
      };
  
      heading.textContent = translations[language].heading;
      p1.textContent = translations[language].p1;
      p2.textContent = translations[language].p2;


    }
  
    languageNavbar.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      localStorage.setItem('lacliLanguagePreference', selectedLanguage);
      updateLanguageSelection(selectedLanguage);
      updateContentLanguage(selectedLanguage);
    });
  
    const footerLanguage = document.getElementById('footer-language');
    footerLanguage.addEventListener('click', function (event) {
      event.preventDefault();
      const selectedLanguage = event.target.getAttribute('data-lang');
      localStorage.setItem('lacliLanguagePreference', selectedLanguage);
      updateLanguageSelection(selectedLanguage);
      updateContentLanguage(selectedLanguage);
    });
});
  