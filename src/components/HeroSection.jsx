import "../css/HeroSection.css"

function HeroSection() {

    return (

        <section className="hero-section">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8 text-center">

                        <h1 className="hero-title">
                            Book. Board. Relax.
                        </h1>

                        <p className="hero-description">
                            Book your bus tickets quickly and travel safely
                            with <strong>Fast X</strong>.
                        </p>

                        {/* SearchForm Component will come here */}

                    </div>

                </div>

            </div>

        </section>

    )

}

export default HeroSection