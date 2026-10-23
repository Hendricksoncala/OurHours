export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        Our<span className="orange">Hours</span> <small>UNAB</small>
      </div>
      <p>Avenida 42 No. 48-11, Bucaramanga, Colombia</p>
      <p>
        PBX (607) 643 6111 · <a href="https://unab.edu.co">unab.edu.co</a>
      </p>
      <span className="copyright">
        © {new Date().getFullYear()} OurHours · Universidad Autónoma de Bucaramanga
      </span>
    </footer>
  );
}
