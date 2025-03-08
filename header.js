const headerMain = document.getElementById('header-main');
const headerContent = `
<div class="header-content"> 
            <div class="languages">
                <ul class="lang-nav" id="language-navbar">
                    <li class="lang">
                        <a href="" data-lang="es" class="lang-link" aria-label="Español" lang="es">ES</a>
                    </li>
                    <li class="lang">
                        <a href="" data-lang="pt" class="lang-link" aria-label="Português" lang="pt">PT</a>
                    </li>
                    <li class="lang">
                        <a href="" data-lang="en" class="lang-link lang-link-active" aria-label="English" lang="en">EN</a>
                    </li>
                </ul>
            </div>
           <nav>
              <a href="index.html" class="nav-logo"><img src="media/whitesun.svg" alt="lacli-rays" class="lacli-rays-nav">LACLI</a>
              <ul class="nav-menu">
                <li class="nav-item">
                    <a href="library.html" class="nav-link" id="nav-library">Library</a>
                </li>
                <li class="nav-item">
                    <a href="about.html" class="nav-link" id="nav-about">About</a>
                </li>
                 <li class="nav-item">
                    <a href="impact.html" class="nav-link" id="nav-home">Impact</a>
                </li>
                <li class="nav-item">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJGksX1uBHoNNTHSPsRv9wQp4K0yYc4a-OmLMUrciXYqfwMg/viewform" target="_blank" class="nav-link" id="nav-contribute">Contribute</a>
                </li>
                <li class="nav-item">
                    <a href="help.html" class="nav-link" id="nav-help">Help</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link" id="nav-contact">Contact</a>
                </li>
              </ul>
              <div class="hamburger">
                 <span class="bar"></span>
                 <span class="bar"></span>
                 <span class="bar"></span>
              </div>
           </nav>
        </div>`;

        headerMain.innerHTML = headerContent;

