import React from "react";

const Field = ({name, label, value, onChange, placeholder, type = "text", error = ""}) => {
    

    return (
        
        <div className="mb-3 row">
            <label htmlFor={name} className="col-2 col-form-label">{label}</label>
            <div className="col-10">
                <input 
                    onChange={onChange}
                    type={type} 
                    className={"form-control" + (error ? " is-invalid" : "")}
                    id={name} 
                    name={name} 
                    placeholder={placeholder || label}
                    value={value}
                />
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
        </div>
    )
}

export default Field;