document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const footerLanguage = document.getElementById('footer-language');
  
    const contentElementIds = [
      'pageheading',
      'headerexperiential',
      'pexperiential1',
      'pexperiential2',
      'linksuny',
      'headerfeatured'
    ];
  
    const contentElements = contentElementIds.reduce((elements, id) => {
        elements[id] = document.getElementById(id);
        return elements;
    }, {});
  
    const translations = {
        en: {
            pageheading: "Impact",
            headerexperiential: "Experiential Learning",
            pexperiential1: "Students from the United States, Mexico, and Brazil have contributed to indexing LACLI resources as part of experiential learning opportunities.",
            pexperiential2: "The LACLI team has also hosted trainings and edit-a-thons across Argentina, Ecuador, Mexico, Peru, Spain, and the United States.",
            linksuny: "Read more about the work of students at the University at Albany, SUNY",
            headerfeatured: "LACLI has been featured by:"
        },
        es: {
            pageheading: 'Impacto',
            headerexperiential: "Prácticas profesionales",
            pexperiential1: "Estudiantes de Estados Unidos, México y Brasil han contribuido a la indexación de recursos de LACLI como parte de oportunidades de aprendizaje experiencial.",
            pexperiential2: "El equipo de LACLI también ha organizado capacitaciones y editatones en Argentina, Ecuador, México, Perú, España y Estados Unidos.",
            linksuny: "Lea más sobre el trabajo de los estudiantes en la Universidad de Albany, SUNY.",
            headerfeatured: "LACLI ha sido destacado en"
        },
        pt: {
            pageheading: 'Relevância',
            headerexperiential: "Práticas de aprendizagem",
            pexperiential1: "Estudantes dos Estados Unidos, México e Brasil contribuíram para indexar recursos do LACLI como parte de oportunidades de aprendizagem acadêmica.",
            pexperiential2: "A equipe do LACLI também organizou treinamentos e edit-a-thons na Argentina, Equador, México, Peru, Espanha e Estados Unidos.",
            linksuny: "Leia mais sobre o trabalho de estudantes na University at Albany, SUNY.",
            headerfeatured: "O LACLI foi destaque em:"
        },
    };
  
    function updateLanguageSelection(language, navbar) {
      if(!navbar) return;
        const languageLinks = navbar.getElementsByTagName('a');
        for (let i = 0; i < languageLinks.length; i++) {
            if (languageLinks[i].getAttribute('data-lang') === language) {
                languageLinks[i].classList.add('lang-link-active');
            } else {
                languageLinks[i].classList.remove('lang-link-active');
            }
        }
    }
  
    function updateContentLanguage(language) {
        for (const elementId in contentElements) {
            if (contentElements[elementId]) {
                contentElements[elementId].textContent = translations[language][elementId];
            }
        }
    }
  
    function handleLanguageChange(event, navbar) {
        event.preventDefault();
        const selectedLanguage = event.target.getAttribute('data-lang');
        localStorage.setItem('lacliLanguagePreference', selectedLanguage);
        updateLanguageSelection(selectedLanguage, navbar);
        updateContentLanguage(selectedLanguage);
    }
  
    const storedLanguage = localStorage.getItem('lacliLanguagePreference');
  
    if (storedLanguage) {
        updateLanguageSelection(storedLanguage, languageNavbar);
        updateLanguageSelection(storedLanguage, footerLanguage);
        updateContentLanguage(storedLanguage);
    }
  
    languageNavbar.addEventListener('click', (event) => handleLanguageChange(event, languageNavbar));
    footerLanguage.addEventListener('click', (event) => handleLanguageChange(event, footerLanguage));
  });