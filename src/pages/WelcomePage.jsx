import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";

const WelcomePage = () => {
  return (
    <div>
    <Navbar />
    <div className="container d-flex justify-content-center align-items-center"
           style={{ height: "80vh" }}>
        <SearchForm />
      </div>
    </div>
  )
};

export default WelcomePage;