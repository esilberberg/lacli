document.addEventListener('DOMContentLoaded', function () {
  const languageNavbar = document.getElementById('language-navbar');
  const footerLanguage = document.getElementById('footer-language');

  const contentElementIds = [
    'pageheading',
    'header1',
    'card1',
    'linkadd',
    'header2',
    'card2a',
    'card2b',
    'card2c',
    'card2d',
    'linkvolunteer',
    'header3',
    'card3',
    'headerexecteam',
    'headerqcteam',
    'headercollaborators'
  ];

  const contentElements = contentElementIds.reduce((elements, id) => {
      elements[id] = document.getElementById(id);
      return elements;
  }, {});

  const translations = {
      en: {
        pageheading: "About",
        header1: "Subject area specialization",
        card1: "We facilitate the discovery of free online resources for students and scholars of Latin American, Caribbean, Latinx, and Iberian studies across the social sciences, natural sciences, and humanities. To date, we've indexed 1,300+ audiovisual collections, books, data, ephemera, government documents, oral histories, periodicals, reference works, visual materials, web archives, and more!",
        linkadd: "Add a resource",
        header2: "History of collaboration",
        card2a: "Launched by Latin America Northeast Libraries Network",
        card2b: "during the COVID-19 lockdown, LACLI has grown to become an international collaboration aimed at sharing digital resources across borders. We were joined by our collaborating partners",
        card2c: "at El Colegio de México in 2020 and the Centro de Pesquisa e Documentação de História Contemporânea do Brasil",
        card2d: "at Fundação Getulio Vargas in 2022",
        linkvolunteer: "Volunteer",
        header3: "Committed to open",
        card3:"LACLI is licensed under CC BY-NC-SA 4.0.  Recognizing the need for shared, reusable data to create tailored research support content (e.g., subject guides, pedagogical guides), LACLI invites you to use our open data to start building your own projects.",
        headerexecteam: "Executive Team",
        headerqcteam: "Quality Control & Review Team",
        headercollaborators: "Collaborators"

      },
      es: {
        pageheading: 'Acerca de',
        header1: "Especialización en áreas temáticas",
        card1: "Facilitamos el descubrimiento de recursos en línea gratuitos para estudiantes e investigadores interesados en América Latina, the Caribbean, Latinos en Estados Unidos y la Península Ibérica en cualquier campo de las ciencias sociales, ciencias naturales y humanidades. Hasta la fecha, hemos indexado más de 1.300 páginas web que incluyen audiovisuales, libros, datos, material efímero, documentos gubernamentales, historias orales, publicaciones periódicas, obras de referencia, materiales visuales, archivos web ¡y mucho más!",
        linkadd: "Añadir un recurso",
        header2: "Historia de colaboración",
        card2a: "Lanzado por la Red de Bibliotecas del Noreste de América Latina",
        card2b: "durante el confinamiento por COVID-19, LACLI ha crecido hasta convertirse en una colaboración internacional destinada a compartir recursos digitales a través de las fronteras. En 2020 se unió nuestro socio colaborador",
        card2c: "de El Colegio de México, y en 2022 el Centro de Pesquisa e Documentação de História Contemporânea do Brasil",
        card2d: "de la Fundação Getulio Vargas.",
        linkvolunteer: "Sé voluntario",
        header3: "Comprometidos con el acceso abierto",
        card3: "LACLI está bajo una licencia CC BY-NC-SA 4.0. Reconociendo la necesidad de datos compartidos y reutilizables para crear contenido de apoyo a la investigación personalizado (por ejemplo, guías temáticas, guías pedagógicas), LACLI te invita a utilizar nuestros datos abiertos para comenzar a construir tus propios proyectos",
        headerexecteam: "Equipo ejecutivo",
        headerqcteam: "Equipo de control de calidad y revisión",
        headercollaborators: "Colaboradores"
      },
      pt: {
        pageheading: 'Sobre',
        header1: "Especialización en áreas temáticas",
        card1: "Facilitamos el descubrimiento de recursos en línea gratuitos para estudiantes e investigadores interesados en América Latina, the Caribbean, Latinos en Estados Unidos y la Península Ibérica en cualquier campo de las ciencias sociales, ciencias naturales y humanidades. Hasta la fecha, hemos indexado más de 1.300 páginas web que incluyen audiovisuales, libros, datos, material efímero, documentos gubernamentales, historias orales, publicaciones periódicas, obras de referencia, materiales visuales, archivos web ¡y mucho más!",
        linkadd: "Añadir un recurso",
        header2: "Historia de colaboración",
        card2a: "Lanzado por la Red de Bibliotecas del Noreste de América Latina",
        card2b: "durante el confinamiento por COVID-19, LACLI ha crecido hasta convertirse en una colaboración internacional destinada a compartir recursos digitales a través de las fronteras. En 2020 se unió nuestro socio colaborador",
        card2c: "de El Colegio de México, y en 2022 el Centro de Pesquisa e Documentação de História Contemporânea do Brasil",
        card2d: "de la Fundação Getulio Vargas.",
        linkvolunteer: "Sé voluntario",
        header3: "Comprometidos con el acceso abierto",
        card3: "LACLI está bajo una licencia CC BY-NC-SA 4.0. Reconociendo la necesidad de datos compartidos y reutilizables para crear contenido de apoyo a la investigación personalizado (por ejemplo, guías temáticas, guías pedagógicas), LACLI te invita a utilizar nuestros datos abiertos para comenzar a construir tus propios proyectos",
        headerexecteam: "Equipo Ejecutivo",
        headerqcteam: "Equipo de control de calidad y revisión",
        headercollaborators: "Colaboradores"
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