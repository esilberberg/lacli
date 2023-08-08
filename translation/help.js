document.addEventListener('DOMContentLoaded', function () {
    const languageNavbar = document.getElementById('language-navbar');
    const heading = document.getElementById('help');
    const btn1= document.getElementById('btn-1');
    const li11 = document.getElementById('li-1-1');
    const li12 = document.getElementById('li-1-2');
    const li13 = document.getElementById('li-1-3');
    const li14 = document.getElementById('li-1-4');
    const li15 = document.getElementById('li-1-5');

    const btn2= document.getElementById('btn-2');
    const li21 = document.getElementById('li-2-1');
    const li22 = document.getElementById('li-2-2');
    const li23 = document.getElementById('li-2-3');
    const li24 = document.getElementById('li-2-4');
    const li25 = document.getElementById('li-2-5');
    const li26 = document.getElementById('li-2-6');
    const li27 = document.getElementById('li-2-7');
    const li28 = document.getElementById('li-2-8');
    const li29 = document.getElementById('li-2-9');
    const li210 = document.getElementById('li-2-10');

    const btn3= document.getElementById('btn-3');
    const li31 = document.getElementById('li-3-1');
    const li32 = document.getElementById('li-3-2');
    const li33 = document.getElementById('li-3-3');
    const li34 = document.getElementById('li-3-4');
    const li35 = document.getElementById('li-3-5');

    const btn4= document.getElementById('btn-4');
    const li4 = document.getElementById('li-4');

    const btn5= document.getElementById('btn-5');
    const li5 = document.getElementById('li-5');
  

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
          heading: 'Help',
          btn1: 'How does the library search feature work?',
          li11: 'Searches are not case sensitive and ignore diacritics.',
          li12: 'Truncation, wildcards, quotation marks, and lemmatization are not supported. It is preferable to search with singular rather than plural nouns.',
          li13: 'Search terms separated by a space are treated as independent search terms and are linked with the AND operator.',
          li14: 'All search terms must appear somewhere in the resource description fields for a resource to be returned in the results.',
          li15: 'To save a search, copy the url from the results page or use the export button to download the results as a JSON file.',

          btn2: 'What are some questions I can answer with LACLI?',
          li21: 'How can I find photograhs about cuba in the 1950s?',
          li22: 'Try searching: Cuba Photographs 1950s',
          li23: 'How can I find the most comprehensive set of free resources on slavery?',
          li24: 'Try searching: slavery',
          li25: 'How can I find freely available online encyclopedias, dictionaries, etc. to support my reference work?',
          li26: 'Try searching: reference',
          li27: 'How can I find websites including oral histories related to  Latin America, the Caribbean, Latinx, and Iberia?',
          li28: 'Try searching: oral histories',
          li29: 'How can I find ephemera materials focusing on the Caribbean?',
          li210: 'Try searching: ephemera Caribbean',

          btn3: 'What types of resources are in the repository?',
          li31: 'Resources with full content.',
          li32: 'Resources with valuable but partial online digital content. Example:',
          li33: 'Resources that are part of a larger project but include a distinctive stable link to content within our scope. Example:',
          li34: 'Resources that include some content  of our interest such as international organizations, governmental agencies, think tanks etc. but they do not provide a distinctive stable link within our scope.',
          li35: 'Free does not always mean open access. This applies to resources that require free registration in order to access their content.',

          btn4: 'How are resources described?',
          li4: 'Resources are cataloged according to the <a href="https://docs.google.com/document/d/1tYwdb74lGH7BbXzmO27iWkIHyogtuBi5PoMMwfb__Fk/edit?usp=sharing" target="_blank"> LACLI Guidelines</a>. <br><br>Metadata fields include Format, Language, Geographic Area, Time Period, Subjects, among others. The content of most fields is in English. The fields presented in their original language are Resource Title, Country, Language, Institutional Host, and Creators. Subject access is available using the <a href="https://hapi.ucla.edu/about" target="_blank">Hispanic American Periodicals Index (HAPI)</a> Subject Headings, which is a trilingual controlled vocabulary based on Library of Congress Subject Headings and translated into Spanish and Portuguese.',
          
          btn5: 'Can I suggest resources to the repository?',
          li5: 'Yes! Please use <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJGksX1uBHoNNTHSPsRv9wQp4K0yYc4a-OmLMUrciXYqfwMg/viewform" target="_blank">this form to submit</a> your favorite online resources or a project you\'ve developed.',
        },
        es: {
          heading: 'Ayuda',
          btn1: '¿Cómo funciona la función de búsqueda en la biblioteca?',
          li11: 'Las búsquedas no distinguen entre mayúsculas y minúsculas e ignoran los signos diacríticos.',
          li12: 'No admite truncamiento, comodines, comillas ni lematización. Es preferible buscar con sustantivos en singular y no en plural.',
          li13: 'Los términos de búsqueda separados por un espacio se tratan como términos de búsqueda independientes y se enlazan con el operador AND.',
          li14: 'Todos los términos de búsqueda deben aparecer en algún lugar de los campos de descripción del recurso para que éste aparezca en los resultados.',
          li15: 'Para guardar una búsqueda, copie la url de la página de resultados o utilice el botón de exportación para descargar los resultados como archivo JSON.',

          btn2: '¿Cuáles son algunas de las preguntas que puedo responder con LACLI?',
          li21: '¿Cómo puedo buscar recursos sobre el estudio científico de las plantas?',
          li22: 'Intente buscar: Botánica',
          li23: '¿Cómo puedo encontrar el conjunto más completo de recursos gratuitos sobre la esclavitud?',
          li24: 'Intente buscar: esclavitud',
          li25: '¿Cómo puedo buscar recursos sobre el español?',
          li26: 'Intente buscar: lengua española. Esta búsqueda también recuperará diccionarios, corpus textuales y otros recursos relacionados con la lengua.',
          li27: '¿Cómo puedo buscar recursos sobre la revolución Mexicana?',
          li28: 'Intente buscar: Revolución mexicana, 1910-1920',
          li29: '¿Cómo puedo buscar recursos sobre el COVID en América Latina y el Caribe?',
          li210: 'Intente buscar: COVID-19 (Enfermedad)',

          btn3: '¿Qué tipos de recursos están listados en el repositorio?',
          li31: 'Recursos con contenido completo.',
          li32: 'Recursos con contenido digital en línea valioso pero parcial. Ejemplo:',
          li33: 'Recursos que forman parte de un proyecto más amplio pero que incluyen un enlace estable distintivo a contenidos de nuestro ámbito. Ejemplo: ',
          li34: 'Recursos que incluyen algún contenido de interés, como organizaciones internacionales, agencias gubernamentales, grupos de reflexión, etc., pero no proporcionan un enlace estable distintivo dentro de nuestro ámbito.',
          li35: 'Gratuito no siempre significa acceso abierto. Esto se aplica a los recursos que requieren un registro gratuito para acceder a su contenido.',

          btn4: '¿Cómo están descritos los recursos?',
          li4: 'Los recursos se catalogan de acuerdo con las  <a href="https://docs.google.com/document/d/1wyZVn-3nGJEJNerU54zkpD5VlAL5q3shVGW6RwGtcLU/edit?usp=sharing" target="_blank"> Directrices LACLI</a>. <br><br>Los campos de metadatos incluyen Formato, Idioma, Área geográfica, Periodo de tiempo, Temas, entre otros. El contenido de la mayoría de los campos está en inglés. Los campos que se presentan en su idioma original son Título del recurso, País, Idioma, Host institucional y Creadores. El acceso por materias está disponible utilizando los <a href="https://hapi.ucla.edu/about" target="_blank">Encabezamientos de Materia del Hispanic American Periodicals Index (HAPI)</a>, que es un vocabulario controlado trilingüe basado en los Encabezamientos de Materia de la Biblioteca del Congreso y traducido al español y al portugués.',
          
          btn5: '¿Puedo sugerir recursos para el repositorio?',
          li5: 'Sí. Utilice  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJGksX1uBHoNNTHSPsRv9wQp4K0yYc4a-OmLMUrciXYqfwMg/viewform" target="_blank">este formulario </a> para postular sus recursos en línea favoritos o un proyecto que haya desarrollado.',
        },
        pt: {
          heading: 'Ajuda',
          btn1: 'Como o sistema de busca do repositório funciona?',
          li11: 'As buscas não diferenciam letras maiúsculas de minúsculas e ignoram os acentos.',
          li12: 'Truncamento, caracteres especiais, aspas e lematização não são suportados. Busque, preferencialmente, por substantivos no singular, não no plural.',
          li13: 'Os termos buscados separados por um espaço são considerados como termos independentes de busca e são relacionados com o operador “AND”.',
          li14: 'Todos os termos de pesquisa devem aparecer em algum lugar nos campos de descrição do recurso para que um recurso seja retornado nos resultados.',
          li15: 'Para salvar uma busca, copie a URL da página de resultados ou selecione o botão de exportação para fazer o download dos resultados em um arquivo em formato JSON.',

          btn2: 'Quais seriam algumas perguntas que posso responder com o LACLI?',
          li21: 'Como posso buscar por recursos sobre o estudo científico das plantas?',
          li22: 'Busque por: Botânica',
          li23: 'Como  posso encontrar o conjunto mais abrangente de recursos gratuitos sobre escravidão?',
          li24: 'Busque por: Escravidão',
          li25: 'Como posso buscar recursos em português?',
          li26: 'Busque por: língua portuguesa. Essa pesquisa também recuperará dicionários, corpora textuais e outros recursos relacionados ao idioma.',
          li27: 'Como posso buscar por recursos sobre a ditadura brasileira no século XX?',
          li28: 'Busque por: Ditadura Brasileira, 1964-1985',
          li29: 'Como posso buscar por recursos sobre o COVID na América Latina e no Caribe?',
          li210: 'Busque por: COVID-19 (Doença)',

          btn3: 'Quais tipos de recursos estão no repositório?',
          li31: 'Recursos com conteúdo completo.',
          li32: 'Recursos com conteúdo digital online valioso, mas parcial. Exemplo:',
          li33: 'Recursos que fazem parte de um projeto maior mas que se relacionam com o conteúdo do nosso âmbito. Exemplo:',
          li34: 'Recursos que apresentam conteúdo do nosso interesse, como organizações internacionais, agências governamentais, grupos de reflexão, entre outros, mas não apresentam uma relação com o nosso escopo.',
          li35: 'Gratuidade não significa que um recurso está em acesso aberto. Isso se aplica a alguns recursos que necessitam de um registro gratuito para acessar o material.',

          btn4: 'Como os recursos são descritos?',
          li4: 'Os recursos são catalogados de acordo com as <a href="https://docs.google.com/document/d/10N81BZxhWWjbwqBt1NTodIyPrjOHNJbNzSJT0bkX-AU/edit?usp=sharing" target="_blank"> diretrizes do LACLI</a>. <br><br>Os campos de metadados incluem Formato, Idioma, Área Geografia, Tempo de cobertura, Assuntos, entre outros. Os conteúdos na maioria dos campos estão em inglês. Os campos apresentados no seu idioma original são: Título do recurso, País, Idioma, Host Institucional e Criador. O acesso por assunto está disponível utilizando os <a href="https://hapi.ucla.edu/about" target="_blank">cabeçalhos por assunto do Hispanic American Periodicals Index (HAPI).</a>',
          
          btn5: 'Posso sugerir recursos para o repositório?',
          li5: 'Claro! Utilize <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJGksX1uBHoNNTHSPsRv9wQp4K0yYc4a-OmLMUrciXYqfwMg/viewform" target="_blank">esse formulário</a> para enviar seu recurso online favorito que encontrou ou um projeto que você desenvolveu.',

        },
      };
  
      heading.textContent = translations[language].heading;
      btn1.textContent = translations[language].btn1;
      li11.textContent = translations[language].li11;
      li12.textContent = translations[language].li12;
      li13.textContent = translations[language].li13;
      li14.textContent = translations[language].li14;
      li15.textContent = translations[language].li15;

      btn2.textContent = translations[language].btn2;
      li21.textContent = translations[language].li21;
      li22.textContent = translations[language].li22;
      li23.textContent = translations[language].li23;
      li24.textContent = translations[language].li24;
      li25.textContent = translations[language].li25;
      li26.textContent = translations[language].li26;
      li27.textContent = translations[language].li27;
      li28.textContent = translations[language].li28;
      li29.textContent = translations[language].li29;
      li210.textContent = translations[language].li210;

      btn3.textContent = translations[language].btn3;
      li31.textContent = translations[language].li31;
      li32.textContent = translations[language].li32;
      li33.textContent = translations[language].li33;
      li34.textContent = translations[language].li34;
      li35.textContent = translations[language].li35;

      btn4.textContent = translations[language].btn4;
      li4.innerHTML = translations[language].li4;

      btn5.textContent = translations[language].btn5;
      li5.innerHTML = translations[language].li5;
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
  