import React from "react";


const OtpButton = (props) => {
    return (
        <button {...props} type="button" className="btn btn-primary btn-block mt-3 w-100 btn-sm">
            {props.children}
        </button>
    )
}

export default OtpButton;