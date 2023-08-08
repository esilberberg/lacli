document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const header1 = document.getElementById('header-1');
    const header2 = document.getElementById('header-2');
    const header3 = document.getElementById('header-3');
    const header4 = document.getElementById('header-4');
    const header5 = document.getElementById('header-5');
    const header6 = document.getElementById('header-6');
    const header7 = document.getElementById('header-7');
    const header8 = document.getElementById('header-8');
    const header9 = document.getElementById('header-9');
    const header10 = document.getElementById('header-10');

    const p1 = document.getElementById('p-1');
    const p2 = document.getElementById('p-2');
    const p3 = document.getElementById('p-3');
    const p4 = document.getElementById('p-4');
    const p5 = document.getElementById('p-5');
    const p6 = document.getElementById('p-6');
    const p71 = document.getElementById('p-7-1');
    const p72 = document.getElementById('p-7-2');
    const p73 = document.getElementById('p-7-3');
    const p81 = document.getElementById('p-8-1');
    const p82 = document.getElementById('p-8-2');
    const p83 = document.getElementById('p-8-3');
    

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
          header1: 'About',
          p1: 'Welcome to LACLI, an international collaboration to create a repository of free online resources for Latin American, Caribbean, Latinx, and Iberian studies! LACLI is an essential tool to find websites that provide access to a great variety of resources such as audiovisual materials, books, data, ephemera, government documents, oral histories, periodicals, reference works, visual materials, web archives and more!',
          p2: 'LACLI is managed by the Latin America Northeast Libraries Network (LANE), a network of library professionals representing academic and research libraries mainly in the Northeastern United States. LANE is a regional affinity group with ties to the Seminar on the Acquisition of Latin American Library Materials',
          header2: 'History',
          p3: 'LACLI was established during the COVID-19 pandemic lockdown to provide emergency support for online teaching, learning, and research. We aim to facilitate the discoverability and visibility of free online resources that cover the history, social sciences, natural sciences, and humanities. It serves as a useful tool for students, teaching faculty, librarians, and digital scholars of Latin American, Caribbean, Latinx, and Iberian studies.',
          header3: 'International Dimension',
          p4: 'LACLI is an international collaborative effort aimed at sharing digital resource collections on Latin American, Caribbean, Latinx, and Iberian research across borders. In October 2020, La Biblioteca Daniel Cosío Villegas at El Colegio de México became a collaborating institution, and in April 2022, the Centro de Pesquisa e Documentação de História Contemporânea do Brasil (CPDOC) at Fundação Getulio Vargas joined the initiative. Their contributions have expanded LACLI\'s multilingual access capabilities in English, Spanish, and Portuguese.',
          header4: 'Acknowledgements & Recognitions',
          p5: 'We extend our gratitude to Judith Alspach and James Simon from the Center for Research Libraries (CRL) for sharing the data that helped start this project and Orchid Mazurkiewicz for authorizing us to adapt the Hispanic American Periodicals Index (HAPI) subjects list.',
          p6: 'In 2022, LANE, La Biblioteca Daniel Cosío Villegas de El Colegio de México, and the Fundação Getulio Vargas Centro de Pesquisa e Documentação de História Contemporânea do Brasil (CPDOC) were recognized with the Seminar on the Acquisition of Latin American Library Materials (SALALM) Award for Institutional Collaborative Initiatives for their work to expand multilingual access to LACLI resources by adding metadata in English, Spanish, and Portuguese.',
          header5: 'How You Can Use Our Data',
          p71: 'LACLI is licensed under under a',
          p72: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.',
          p73: 'LACLI emerged from an identified need for a place to share and reuse data to create tailored research support content (e.g. subject guides, pedagogical guides).',
          p81: 'View our',
          p82: 'Open Data Sheet',
          p83: 'to start building your own projects.',
          header6: 'Developed by',
          header7: 'Collaborating Institutions',
          header8: 'Executive Team',
          header9: 'Quality Control & Review Team',
          header10: 'Collaborators', 
        },
        es: {
          header1: 'Acerca de',
          p1: 'Bienvenido a LACLI, una colaboración internacional para crear un repositorio de recursos gratuitos en línea para los estudios sobre América Latina, el Caribe, los Latinos de los Estados Unidos, y la Península Ibérica. LACLI es una herramienta esencial para encontrar sitios web que proporcionan acceso a una gran variedad de recursos tales como materiales audiovisuales, libros, datos, efímeros, documentos gubernamentales, historias orales, publicaciones periódicas, obras de referencia, materiales visuales, archivos web ¡y mucho más!',
          p2: 'LACLI es gestionado por la Latin America Northeast Libraries Network (LANE), una red de  bibliotecarios profesionales que representan a bibliotecas académicas y de investigación principalmente del noreste de Estados Unidos. LANE es un grupo regional con intereses comunes, vinculado al Seminar on the Acquisition of Latin American Library Materials ',
          header2: 'Historia',
          p3: 'LACLI se creó durante la cuarentena por la pandemia de COVID-19, para proporcionar apoyo de emergencia a la enseñanza, el aprendizaje y la investigación en línea. Nuestro objetivo es facilitar el descubrimiento y la visibilidad de los recursos gratuitos en línea que cubren la historia, las ciencias sociales, las ciencias naturales y las humanidades. Es una herramienta útil para estudiantes, profesores, bibliotecarios y académicos digitales especialistas en estudios sobre América Latina, el Caribe, los Latinos de los Estados Unidos, y la Península Ibérica.',
          header3: 'Dimensión internacional',
          p4: 'LACLI es un esfuerzo de colaboración internacional destinado a compartir, a través de las fronteras, colecciones de recursos digitales de investigación sobre América Latina, el Caribe, los Latinos de los Estados Unidos, y la Península Ibérica. En octubre de 2020, La Biblioteca Daniel Cosío Villegas de El Colegio de México se convirtió en institución colaboradora, y en abril de 2022, el Centro de Pesquisa e Documentação de História Contemporânea do Brasil (CPDOC) de la Fundação Getulio Vargas se unió a la iniciativa. Sus contribuciones han ampliado las capacidades de acceso multilingüe a LACLI en inglés, español y portugués.',
          header4: 'Agradecimientos y reconocimientos',
          p5: 'Extendemos nuestra gratitud a Judith Alspach y James Simon del Center for Research Libraries (CRL) por compartir los datos que ayudaron a iniciar este proyecto, y a Orchid Mazurkiewicz por autorizarnos para adaptar la lista de materias del Hispanic American Periodicals Index (HAPI).',
          p6: 'En 2022, LANE, La Biblioteca Daniel Cosío Villegas de El Colegio de México y la Fundação Getulio Vargas Centro de Pesquisa e Documentação de História Contemporânea do Brasil (CPDOC) fueron reconocidas con el premio Seminar on the Acquisition of Latin American Library Materials (SALALM) Award for Institutional Collaborative Initiatives por su trabajo para ampliar el acceso multilingüe a los recursos LACLI añadiendo metadatos en inglés, español y portugués.',
          header5: 'Cómo puede utilizar nuestros datos',
          p71: 'LACLI está bajo una licencia de',
          p72: 'Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional.',
          p73: 'LACLI surgió de la necesidad de tener un espacio donde compartir y reutilizar datos para crear contenidos específicos de apoyo a la investigación (por ejemplo, guías temáticas, guías pedagógicas).',
          p81: 'Consulte nuestra ',
          p82: 'lista de datos abiertos',
          p83: 'para empezar a crear sus propios proyectos.',
          header6: 'Desarrollado por',
          header7: 'Instituciones colaboradoras',
          header8: 'Equipo ejecutivo',
          header9: 'Equipo de control de calidad y revisión',
          header10: 'Colaboradores', 
        },
        pt: {
          header1: 'Sobre',
          p1: 'Bem-vindo ao LACLI, uma colaboração internacional para criar uma plataforma que referencia recursos online e abertos de fontes sobre América Latina, Caribe, Estudos Ibéricos e Latinos! LACLI é uma ferramenta essencial para descobrir sites que disponibilizam uma grande variedade de recursos para pesquisa como materiais audiovisuais, livros, dados, documentos governamentais, história oral, periódicos, trabalhos de referência, materiais visuais, arquivos da web e muito mais!',
          p2: 'LACLI é gerida pela Rede de Bibliotecas sobre América Latina localizadas no nordeste dos Estados Unidos (Latin America Northeast Libraries Network - LANE) uma rede de profissionais de bibliotecas que representam bibliotecas acadêmicas e de pesquisa, principalmente no nordeste dos Estados Unidos. A LANE é um grupo de afinidade regional com vínculos com Seminar on the Acquisition of Latin American Library Materials',
          header2: 'Histórico',
          p3: 'LACLI foi criado durante o isolamento social imposto pela pandemia da COVID-19 para fornecer suporte emergencial para ensino, aprendizado e pesquisa on-line. Visando facilitar a descoberta e a visibilidade de recursos on-line gratuitos que abrangem a História, as Ciências Sociais, as Ciências Naturais e as Ciências Humanas. Servindo como uma ferramenta útil para estudantes, professores, bibliotecários e acadêmicos digitais de estudos latino-americanos, caribenhos, latino-americanos e ibéricos.',
          header3: 'Dimensão Internacional',
          p4: 'LACLI é um esforço colaborativo internacional que visa compartilhar coleções de recursos digitais sobre pesquisa na América Latina, Caribe, Latinx e Ibérica além das fronteiras. Em outubro de 2020, a Biblioteca Daniel Cosío Villegas do El Colegio de México se tornou uma instituição colaboradora e, em abril de 2022, o Centro de Pesquisa e Documentação de História Contemporânea do Brasil (CPDOC) da Fundação Getúlio Vargas se juntou à iniciativa. Suas contribuições expandiram as capacidades de acesso multilíngue da LACLI em inglês, espanhol e português.',
          header4: 'Agradecimentos e reconhecimentos',
          p5: 'Agradecemos a Judith Alspach e James Simon do Center for Research Libraries (CRL) por compartilharem os dados que ajudaram a iniciar este projeto e a Orchid Mazurkiewicz por nos autorizar a adaptar a lista de assuntos do Hispanic American Periodicals Index (HAPI).',
          p6: 'Em 2022, a LANE, a Biblioteca Daniel Cosío Villegas de El Colegio de México e a Fundação Getulio Vargas Centro de Pesquisa e Documentação de História Contemporânea do Brasil (CPDOC) foram reconhecidas com o Prêmio SALALM (Seminar on the Acquisition of Latin American Library Materials) para Iniciativas Institucionais de Colaboração por seu trabalho para expandir o acesso multilíngue aos recursos da LACLI, adicionando metadados em inglês, espanhol e português.',
          header5: 'Como você pode utilizar nossos dados',
          p71: 'LACLI está licenciada sob uma',
          p72: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.',
          p73: 'O projeto LACLI surgiu de uma necessidade latente de um local para compartilhar e reutilizar dados para criar conteúdo personalizado de apoio à pesquisa (por exemplo, guias de assuntos, guias pedagógicos).',
          p81: 'Consulte nossa',
          p82: 'Folha de Dados Abertos',
          p83: 'para começar a criar seus próprios projetos.',
          header6: 'Desenvolvido por',
          header7: 'Instituições colaboradoras',
          header8: 'Equipe executivo',
          header9: 'Equipe de Controle e Revisão de Qualidade',
          header10: 'Contribuidores',

        },
      };
  
      header1.textContent = translations[language].header1;
      header2.textContent = translations[language].header2;
      header3.textContent = translations[language].header3;
      header4.textContent = translations[language].header4;
      header5.textContent = translations[language].header5;
      header6.textContent = translations[language].header6;
      header7.textContent = translations[language].header7;
      header8.textContent = translations[language].header8;
      header9.textContent = translations[language].header9;
      header10.textContent = translations[language].header10;

      p1.textContent = translations[language].p1;
      p2.textContent = translations[language].p2;
      p3.textContent = translations[language].p3;
      p4.textContent = translations[language].p4;
      p5.textContent = translations[language].p5;
      p6.textContent = translations[language].p6;
      p71.textContent = translations[language].p71;
      p72.textContent = translations[language].p72;
      p73.textContent = translations[language].p73;
      p81.textContent = translations[language].p81;
      p82.textContent = translations[language].p82;
      p83.textContent = translations[language].p83;
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
  