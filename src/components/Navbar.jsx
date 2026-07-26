const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary fs-3" href="#">
          FastX
        </a>

        <div className="ms-auto">
          <button className="btn btn-outline-primary me-2">
            Sign In
          </button>

          <button className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;