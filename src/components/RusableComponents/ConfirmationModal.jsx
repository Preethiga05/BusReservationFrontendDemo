import "./ReusableComponentsCss/ConfirmationModal.css";

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

        <div className="confirmation-overlay">

            <div className="confirmation-modal">

                <div className="confirmation-header">

                    <h3>

                        {title}

                    </h3>

                </div>

                <div className="confirmation-body">

                    <p style={{ whiteSpace: "pre-line" }}>

                        {message}

                    </p>

                </div>

                <div className="confirmation-footer">

                    <button

                        className="btn btn-outline-secondary"

                        onClick={onCancel}

                    >

                        Cancel

                    </button>

                    <button

                        className={`btn ${confirmButtonClass}`}

                        onClick={onConfirm}

                    >

                        {confirmButtonText}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmationModal;