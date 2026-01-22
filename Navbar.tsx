import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🌸 Hanami
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Dashboard</Link>
          <Link to="/products" className="navbar-link">Produtos</Link>
          <Link to="/upload" className="navbar-link">Upload</Link>
          <button onClick={handleLogout} className="navbar-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
