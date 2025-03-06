import React, { useEffect, useState, useContext } from "react";
import { useReducer } from "react";
import ProductsContext from "../context/ProductsContext";
import Input from "../reuseble-components/Input";

function ContactDetails() {
  const [formIsValid, setFormIsValid] = useState(false);
  const page = useContext(ProductsContext);
  const [errors, setErrors] = useState({});

  const VALIDATORS = {
    fullName: {
      pattern: /^[a-zA-Z\s]{2,50}$/,
      message: 'Full name should contain only letters and spaces (2-50 characters)'
    },
    email: {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Please enter a valid email address'
    },
    phone: {
      pattern: /^[0-9]{10}$/,
      message: 'Phone number should be 10 digits'
    },
    drno: {
      pattern: /^[a-zA-Z0-9\s\-\/]{1,10}$/,
      message: 'Please enter a valid door number'
    },
    street: {
      pattern: /^[a-zA-Z0-9\s\-\.]{2,100}$/,
      message: 'Please enter a valid street name'
    },
    city: {
      pattern: /^[a-zA-Z\s\-]{2,50}$/,
      message: 'Please enter a valid city name'
    },
    state: {
      pattern: /^[a-zA-Z\s]{2,50}$/,
      message: 'Please select a state'
    },
    pincode: {
      pattern: /^[0-9]{6}$/,
      message: 'Pincode should be 6 digits'
    }
  };

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    address: {
      drno: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    }
  };

  const contactDetReducer = (state, action) => {
    switch (action.type) {
      case "fullName":
        return { ...state, fullName: action.value };
      case "email":
        return { ...state, email: action.value };
      case "phone":
        return { ...state, phone: action.value };
      case "drno":
        return { ...state, address: { ...state.address, drno: action.value } };
      case "street":
        return { ...state, address: { ...state.address, street: action.value } };
      case "city":
        return { ...state, address: { ...state.address, city: action.value } };
      case "state":
        return { ...state, address: { ...state.address, state: action.value } };
      case "pincode":
        return { ...state, address: { ...state.address, pincode: action.value } };
      default:
        return state;
    }
  };

  const [contactDetails, contactDetDispatcher] = useReducer(contactDetReducer, initialState);

  const validateField = (name, value) => {
    if (!value || !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    
    const validatorKey = name.toLowerCase().replace(/\s+/g, '');
    const validator = VALIDATORS[validatorKey];
    
    if (validator && !validator.pattern.test(value)) {
      return validator.message;
    }
    
    return '';
  };

  const handleBlur = (fieldName, value) => {
    let fieldValue = value;
    let errorKey = fieldName;
    
    // Handle nested address fields
    if (fieldName.includes('address.')) {
      const addressField = fieldName.split('.')[1];
      fieldValue = contactDetails.address[addressField];
      errorKey = addressField;
    } else {
      fieldValue = contactDetails[fieldName];
    }

    const error = validateField(errorKey, fieldValue);
    setErrors(prev => ({
      ...prev,
      [errorKey]: error || undefined
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate personal information
    newErrors.fullName = validateField('Full Name', contactDetails.fullName);
    newErrors.email = validateField('Email', contactDetails.email);
    newErrors.phone = validateField('Phone', contactDetails.phone);
    
    // Validate address
    newErrors.drno = validateField('Door Number', contactDetails.address.drno);
    newErrors.street = validateField('Street', contactDetails.address.street);
    newErrors.city = validateField('City', contactDetails.address.city);
    newErrors.state = validateField('State', contactDetails.address.state);
    newErrors.pincode = validateField('Pincode', contactDetails.address.pincode);

    // Remove empty error messages
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isValid = 
        contactDetails.fullName.trim() !== "" &&
        contactDetails.email.trim() !== "" &&
        contactDetails.phone.trim() !== "" &&
        contactDetails.address.drno.trim() !== "" &&
        contactDetails.address.street.trim() !== "" &&
        contactDetails.address.city.trim() !== "" &&
        contactDetails.address.state.trim() !== "" &&
        contactDetails.address.pincode.trim() !== "";
      setFormIsValid(isValid);
    }, 700);

    return () => clearTimeout(timeout);
  }, [contactDetails]);

  const handleInputChange = (event, type) => {
    const { value } = event.target;
    contactDetDispatcher({ value, type });
    
    // Clear error when user starts typing
    if (errors[type]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted successfully", contactDetails);
      page.onPageChange("Products");
    } else {
      console.log("Form validation failed");
    }
  };

  if (page.existingPage !== "ContactDetails") {
    return null;
  }

  return (
    <div className="d-flex align-items-center justify-content-center mt-3">
      <div className="container py-1">
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-8">
            <div className="card">
              <div className="card-body">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <h5 className="border-bottom pb-2">Personal Information</h5>
                    
                    <Input
                      divClass="mb-3"
                      labelClass="form-label"
                      label="Full Name*"
                      type="text"
                      value={contactDetails.fullName}
                      id="fullName"
                      onInputHandler={(e) => handleInputChange(e, "fullName")}
                      handleBlurEvent={() => handleBlur("fullName", contactDetails.fullName)}
                      placeholder="Enter full name"
                      error={errors.fullName}
                    />

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="email" className="form-label">Email*</label>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          id="email"
                          value={contactDetails.email}
                          onChange={(e) => handleInputChange(e, "email")}
                          onBlur={() => handleBlur("email", contactDetails.email)}
                          placeholder="Enter email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number*</label>
                        <input
                          type="tel"
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          id="phone"
                          value={contactDetails.phone}
                          onChange={(e) => handleInputChange(e, "phone")}
                          onBlur={() => handleBlur("phone", contactDetails.phone)}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="border-bottom pb-2">Address Details</h5>

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="drNo" className="form-label">Door Number*</label>
                        <input
                          type="text"
                          className={`form-control ${errors.drno ? 'is-invalid' : ''}`}
                          id="drNo"
                          value={contactDetails.address.drno}
                          onChange={(e) => handleInputChange(e, "drno")}
                          onBlur={() => handleBlur("address.drno", contactDetails.address.drno)}
                          placeholder="Enter door number"
                        />
                        {errors.drno && <div className="invalid-feedback">{errors.drno}</div>}
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="street" className="form-label">Village/Street*</label>
                        <input
                          type="text"
                          className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                          id="street"
                          value={contactDetails.address.street}
                          onChange={(e) => handleInputChange(e, "street")}
                          onBlur={() => handleBlur("address.street", contactDetails.address.street)}
                          placeholder="Enter village/street"
                        />
                        {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 mb-3">
                        <label htmlFor="city" className="form-label">City*</label>
                        <input
                          type="text"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          id="city"
                          value={contactDetails.address.city}
                          onChange={(e) => handleInputChange(e, "city")}
                          onBlur={() => handleBlur("address.city", contactDetails.address.city)}
                          placeholder="Enter city"
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>

                      <div className="col-5 mb-3">
                        <label htmlFor="state" className="form-label">State*</label>
                        <select
                          className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                          id="state"
                          value={contactDetails.address.state}
                          onChange={(e) => handleInputChange(e, "state")}
                          onBlur={() => handleBlur("address.state", contactDetails.address.state)}
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                        </select>
                        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                      </div>

                      <div className="col-3 mb-3">
                        <label htmlFor="pincode" className="form-label">Pincode*</label>
                        <input
                          type="text"
                          className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                          id="pincode"
                          maxLength="6"
                          value={contactDetails.address.pincode}
                          onChange={(e) => handleInputChange(e, "pincode")}
                          onBlur={() => handleBlur("address.pincode", contactDetails.address.pincode)}
                          placeholder="Enter pincode"
                        />
                        {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;