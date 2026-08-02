import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import SearchForm from "../components/SearchForm"
import { useState } from "react";
import Login from "../components/Auth/Login";

function WelcomePage() {

    const [showLogin, setShowLogin] = useState(false);

    return (

        <div className="container-fluid p-0">

            <Navbar openLogin={() => setShowLogin(true)} />

            <HeroSection />

            <SearchForm />

            {

                showLogin &&

                <Login

                    close={() => setShowLogin(false)}

                />

            }

        </div>

    );

}

export default WelcomePage;