export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; {currentYear} Projeto Hanami. Todos os direitos reservados.</p>
        </div>
        <div className="footer-links">
          <a href="#privacy">Privacidade</a>
          <a href="#terms">Termos</a>
          <a href="#contact">Contato</a>
        </div>
      </div>
    </footer>
  );
}
