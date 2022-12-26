import React from "react";


const GetcodeButton = (props) => {
    return (
        <button {...props} type="button" className="btn btn-primary">
            {props.children}
        </button>
    )
}

export default GetcodeButton;