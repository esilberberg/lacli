document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const msgSent = document.getElementById('message-sent');

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
          msgSent: '<h1>Message Sent</h1><p class="sent">Thank you!</p>',
        },
        es: {
          msgSent: '<h1>Mensaje enviado</h1><p class="sent">¡Gracias!</p>',
        },
        pt: {
          msgSent: '<h1>Mensagem enviada</h1><p class="sent">Obrigado!</p>',
        },
      };
  
      msgSent.innerHTML = translations[language].msgSent;
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
  