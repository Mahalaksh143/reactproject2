import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="nav">
      <h1>Recipe App 🍽️</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/Favourites">Favourites</Link>
        <Link to="/Categories">Categories</Link>
      </div>
        </nav>
  );
}
