import React from "react";

const Select = ({name, label, value, onChange, error = "", children}) => {
    
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select 
                name={name} 
                id={name} 
                onChange={onChange} 
                value={value} 
                className={"form-control" + (error && " is-invalid")}
            >
                {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </div>
    )
};

export default Select;