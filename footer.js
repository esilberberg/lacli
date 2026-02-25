const footer = document.getElementById('footer-main');
const htmlContent = `
<div class="footer-main-wrapper">
<div class="footer-identity">
    <img src="media/whitesun.svg" alt="lacli-rays" class="lacli-rays-footer">
    <h2 class="footer-identity-h2">LACLI</h2>
</div>
<div class="footer-main-row">
    <div class="footer-main-box">
        
        <div class="footer-identity-text">
            <p>Latin American, Caribbean, Latinx, and Iberian Free Online Resources.</p>
            <ul class="footer-socials">
                <li><a href="https://github.com/esilberberg/lacli" target="_blank"><i class="fa-brands fa-square-github"></i></a></li>
                <li><a href="https://linkedin.com/company/lacliproject/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                <li><a href="https://twitter.com/LACLIproject" target="_blank"><i class="fa-brands fa-square-x-twitter"></i></a></li>
            </ul>
        </div> 
        <div class="footer-creative-commons">
            <span id="cc-license-1">This work is licensed under a</span><br><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" id="cc-license-2">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License </a>
            <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank"><img class="cc-license-img" alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a> <span class="year">2023&#8211;2026</span>
        </div>    
    </div>
    <div class="footer-main-box">
        <ul class="footer-nav-links">
            <li><a href="library.html" id="footer-library">Library</a></li>
            <li><a href="about.html" id="footer-about">About</a></li>
            <li><a href="impact.html" id="footer-home">Impact</a></li>
            <li><a href="https://docs.google.com/spreadsheets/d/17ngPVWCOFe4YpuDWhP37JJQIFIrrDL0qYbX28iLneWo/edit?usp=sharing" target="_blank" id="footer-open-data">Open Data</a></li>
            <li><a href="help.html" id="footer-help">Help</a></li>
        </ul>
    </div>
    <div class="footer-main-box">
        <ul class="footer-nav-links" id="footer-language">
            <li><a href="" data-lang="es" aria-label="Español" lang="es">Español</a></li>
            <li><a href="" data-lang="pt" aria-label="Português" lang="pt">Português</a></li>
            <li><a href="" data-lang="en" aria-label="English" lang="en">English</a></li>
        </ul>
    </div>
    <div class="footer-main-box">
        <div class="footer-btns">
            <a href="contact.html"><div class="footer-btn" id="footer-contact">Contact</div></a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJGksX1uBHoNNTHSPsRv9wQp4K0yYc4a-OmLMUrciXYqfwMg/viewform" target="_blank" id="footer-contribute-url"><div class="footer-btn" id="footer-contribute">Contribute</div></a>  
        </div>
    </div>
</div>

</div>
`;


footer.innerHTML = htmlContent;