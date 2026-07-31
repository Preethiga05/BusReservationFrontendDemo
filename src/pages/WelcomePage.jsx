import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import SearchForm from "../components/SearchForm"


function WelcomePage() {

    return (

        <div className="container-fluid p-0">
            <Navbar />
            <HeroSection />
            <SearchForm />
        </div>

    )

}

export default WelcomePage