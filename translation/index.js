document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const hero = document.getElementById('hero-text');
    const search = document.getElementById('index-search');
    const students = document.getElementById('students');
    const studentsDescription = document.getElementById('students-description');
    const faculty = document.getElementById('faculty');
    const facultyDescription = document.getElementById('faculty-description');
    const librarians = document.getElementById('librarians');
    const librariansDescription = document.getElementById('librarians-description');
    const digitalScholars = document.getElementById('digital-scholars');
    const digitalScholarsDescription = document.getElementById('digital-scholars-description');
    const developedBy = document.getElementById('developed-by');
    const collaboratingInstitutions = document.getElementById('collaborating-institutions');

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
          hero: 'Explore an index of free online resources for Latin American, Caribbean, Latinx, and Iberian studies.',
          placeholder: 'Search...',
          students: 'Students',
          studentsDescription: 'Explore collections by subject, country, language, time period and more to support original research projects.',
          faculty: 'Faculty',
          facultyDescription: 'Enhance courses with primary sources, reference materials, scholarly articles, and more!',
          librarians: 'Librarians',
          librariansDescription: 'Discover resources for research consultations and develop subject or country-specific research guides.',
          digitalScholars: 'Digital Scholars',
          digitalScholarsDescription: 'Fuel your digital scholarship projects with open data and primary source collections.',
          developedBy: 'Developed by',
          collaboratingInstitutions: 'Collaborating Institution',
        },
        es: {
          hero: 'Explore un índice de recursos gratuitos en línea para estudios sobre América Latina, el Caribe, los Latinos de los Estados Unidos, y la Península Ibérica.',
          placeholder: 'Buscar...',
          students: 'Estudiantes',
          studentsDescription: 'Explore colecciones organizadas por tema, país, idioma, período de tiempo y más, para apoyar proyectos de investigación originales.',
          faculty: 'Profesorado',
          facultyDescription: 'Mejore sus cursos con fuentes primarias, materiales de referencia, artículos académicos ¡y mucho más!',
          librarians: 'Bibliotecarios',
          librariansDescription: 'Descubra recursos para consultas de investigación y elabore guías de investigación específicas por temas o países.',
          digitalScholars: 'Académicos digitales',
          digitalScholarsDescription: 'Impulse sus proyectos académicos digitales con datos abiertos y colecciones de fuentes primarias.',
          developedBy: 'Desarrollado por',
          collaboratingInstitutions: 'Institución colaboradora',
        },
        pt: {
          hero: 'Pesquise em um índice com recursos online e abertos sobre América Latina, Caribe, Estudos Ibéricos e Latinos.',
          placeholder: 'Pesquisar...',
          students: 'Estudantes',
          studentsDescription: 'Explore coleções por assuntos, país, idioma, recorte temporal e outras fontes para auxiliar nos projetos de pesquisa.',
          faculty: 'Professores',
          facultyDescription: 'Aprimore o ensino utilizando fontes primárias, materiais de referência, artigos acadêmicos e mais!',
          librarians: 'Bibliotecários',
          librariansDescription: 'Descubra recursos para seus usuários e desenvolva guias de pesquisa por assunto ou país.',
          digitalScholars: 'Pesquisadores',
          digitalScholarsDescription: 'Incremente seus projetos de pesquisa e em humanidades digitais com dados abertos e coleções de fontes primárias',
          developedBy: 'Desenvolvido por',
          collaboratingInstitutions: 'Instituição colaboradora',
        },
      };
  
      hero.textContent = translations[language].hero;
      search.placeholder = translations[language].placeholder;
      students.textContent = translations[language].students;
      studentsDescription.textContent = translations[language].studentsDescription;
      faculty.textContent = translations[language].faculty;
      facultyDescription.textContent = translations[language].facultyDescription;
      librarians.textContent = translations[language].librarians;
      librariansDescription.textContent = translations[language].librariansDescription;
      digitalScholars.textContent = translations[language].digitalScholars;
      digitalScholarsDescription.textContent = translations[language].digitalScholarsDescription;
      developedBy.textContent = translations[language].developedBy;
      collaboratingInstitutions.textContent = translations[language].collaboratingInstitutions;
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
  