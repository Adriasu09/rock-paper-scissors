export function renderFooter() {
  return `
    <div class="footer__inner">
      <div class="footer__brand">
        <a class="footer__logo" href="#">
          <img src="./assets/icon/logo-icon.svg" alt="AZAR logo" class="footer__logo-icon" />
          <span class="footer__logo-text">AZARGame</span>
        </a>
        <p class="footer__rights">
          <span class="footer__rights--full">© 2026 AZARGame Carnival DOM. All rights reserved.</span>
          <span class="footer__rights--short">© 2026 AZARGame Carnival DOM</span>
        </p>
      </div>

      <nav class="footer__links" aria-label="Enlaces legales">
        <a class="footer__link" href="#">Privacidad</a>
        <a class="footer__link" href="#">Términos y condiciones</a>
        <a class="footer__link footer__link--accent" href="#">Discord</a>
      </nav>
    </div>
  `;
}
