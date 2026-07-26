const SearchForm = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <div className="row g-3">

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Leaving From"
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Going To"
            />
          </div>

          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <button className="btn btn-danger w-100">
              Search Buses
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SearchForm;