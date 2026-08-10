function FilterAccordion({

    title,
    icon,
    filterKey,
    activeFilter,
    setActiveFilter

}) {

    const isOpen = activeFilter === filterKey;

    return (

        <div className="border rounded-3 overflow-hidden mb-3">

            <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{ cursor: "pointer" }}
                onClick={() =>
                    setActiveFilter(
                        isOpen
                            ? null
                            : filterKey
                    )
                }
            >

                <div className="d-flex align-items-center gap-2">

                    <i
                        className={`bi ${icon} text-primary fs-5`}
                    ></i>

                    <span className="fw-semibold fs-5">

                        {title}

                    </span>

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

                <div className="p-3 border-top bg-light">

                    Content will come here

                </div>

            }

        </div>

    );

}

export default FilterAccordion;