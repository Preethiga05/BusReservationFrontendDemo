import "./ResultPageCss/FilterAccordion.css";

function FilterAccordion({

    title,

    icon,

    filterKey,

    activeFilter,

    setActiveFilter

}) {

    const isOpen = activeFilter === filterKey;

    return (

        <div className="filter-card">

            <div
                className="filter-header"
                onClick={() =>
                    setActiveFilter(
                        isOpen
                            ? null
                            : filterKey
                    )
                }
            >

                <div className="filter-left">

                    <i className={`bi ${icon}`}></i>

                    <span>{title}</span>

                </div>

                <i
                    className={`bi ${
                        isOpen
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                    }`}
                ></i>

            </div>

            {
                isOpen &&

                <div className="filter-body">

                    Content will come here

                </div>
            }

        </div>

    );

}

export default FilterAccordion;