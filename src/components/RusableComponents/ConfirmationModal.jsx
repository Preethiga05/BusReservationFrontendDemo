function ConfirmationModal({

    show,
    title,
    message,
    confirmButtonText,
    confirmButtonClass,
    onConfirm,
    onCancel

}) {

    if (!show) return null;

    return (

        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{ zIndex: 99999 }}
        >

            <div
                className="modal-dialog modal-dialog-centered"
                style={{ maxWidth: "500px", width: "100%" }}
            >

                <div className="modal-content rounded-4 shadow-lg">

                    {/* Header */}

                    <div className="modal-header">

                        <h5 className="modal-title fw-bold">

                            {title}

                        </h5>

                    </div>


                    {/* Body */}

                    <div className="modal-body">

                        <p
                            className="mb-0 text-secondary"
                            style={{
                                whiteSpace: "pre-line",
                                lineHeight: "1.8"
                            }}
                        >

                            {message}

                        </p>

                    </div>


                    {/* Footer */}

                    <div className="modal-footer">

                        <button

                            type="button"

                            className="btn btn-outline-secondary"

                            onClick={onCancel}

                        >

                            Cancel

                        </button>


                        <button

                            type="button"

                            className={`btn ${confirmButtonClass}`}

                            onClick={onConfirm}

                        >

                            {confirmButtonText}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ConfirmationModal;