import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import SearchSummary from "../components/ResultPage/SearchSummary";
import FilterSidebar from "../components/ResultPage/FilterSidebar";
import BusList from "../components/ResultPage/BusList";

import "../css/SearchResultsPage.css";

function SearchResultsPage() {

    const location = useLocation();

    const source = location.state?.source;
    const destination = location.state?.destination;
    const journeyDate = location.state?.journeyDate;

    const [buses, setBuses] = useState([]);

    const [page, setPage] = useState(0);

    const [size] = useState(100);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 5000]);
    const [busTypes, setBusTypes] = useState([]);

    const operatorOptions = [

        ...new Set(

            buses.map(bus => bus.busOperator)

        )

    ];

    const [selectedBusTypes, setSelectedBusTypes] = useState([]);
    const [departureTimes, setDepartureTimes] = useState([]);

    const [selectedDepartureTimes, setSelectedDepartureTimes] = useState([]);

    const [arrivalTimes, setArrivalTimes] = useState([]);

    const [selectedArrivalTimes, setSelectedArrivalTimes] = useState([]);
    const [operators, setOperators] = useState([]);

    const [selectedOperators, setSelectedOperators] = useState([]);
    const [amenities, setAmenities] = useState([]);              // all amenities from backend
    const [selectedAmenities, setSelectedAmenities] = useState([]); // current UI selection
    const [amenityIds, setAmenityIds] = useState([]);
    // applied filter

    const busTypeParams = busTypes.join("&busTypes=");

    const operatorParams = operators.join("&operators=");

    const departureTimeParams = departureTimes.join("&departureTimes=");

    const arrivalTimeParams = arrivalTimes.join("&arrivalTimes=");

    const amenityParams = amenityIds.join("&amenityIds=");



    useEffect(() => {

        const searchBus = async () => {

            try {

                const busTypeParams = busTypes.join(",");

                const operatorParams = operators.join(",");

                const departureTimeParams = departureTimes.join(",");

                const arrivalTimeParams = arrivalTimes.join(",");

                const amenityParams = amenityIds.join(",");

                const response = await axios.get(

                    `http://localhost:8080/api/bus-schedule/search?source=${source}&destination=${destination}&journeyDate=${journeyDate}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&busTypes=${busTypeParams}&operators=${operatorParams}&departureTimes=${departureTimeParams}&arrivalTimes=${arrivalTimeParams}&amenityIds=${amenityParams}&page=${page}&size=${size}`

                );

                setBuses(response.data);


            }
            catch (err) {

                console.log(err);

            }

        }

        searchBus();

    }, [source, destination, journeyDate, priceRange, page, size]);

    useEffect(() => {

        const getAmenities = async () => {

            try {

                const response = await axios.get(

                    "http://localhost:8080/api/amenity/getAll"

                );

                setAmenities(response.data);

            }

            catch (err) {

                console.log(err);

            }

        }

        getAmenities();

    }, []);



    return (

        <div className="search-result-page">

            <SearchSummary

                source={source}

                destination={destination}

                journeyDate={journeyDate}

                busCount={buses.length}

            />

            <div className="result-container">

                <FilterSidebar

                    selectedPriceRange={selectedPriceRange}

                    setSelectedPriceRange={setSelectedPriceRange}

                    selectedBusTypes={selectedBusTypes}

                    setSelectedBusTypes={setSelectedBusTypes}
                    selectedDepartureTimes={selectedDepartureTimes}

                    setSelectedDepartureTimes={setSelectedDepartureTimes}
                    selectedArrivalTimes={selectedArrivalTimes}

                    setSelectedArrivalTimes={setSelectedArrivalTimes}
                    selectedOperators={selectedOperators}

                    setSelectedOperators={setSelectedOperators}
                    amenities={amenities}

                    selectedAmenities={selectedAmenities}

                    setSelectedAmenities={setSelectedAmenities}

                    operatorOptions={operatorOptions}


                    applyFilters={() => {

                        setPriceRange(selectedPriceRange);

                        setBusTypes(selectedBusTypes);

                        setDepartureTimes(selectedDepartureTimes);

                        setArrivalTimes(selectedArrivalTimes);

                        setOperators(selectedOperators);

                        setAmenityIds(selectedAmenities);

                    }}

                />

                <BusList buses={buses} />

            </div>

        </div>

    )

}

export default SearchResultsPage;


