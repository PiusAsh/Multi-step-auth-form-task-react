import React, { useState } from "react";
import "../App.css";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountInfo: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    personalDetails: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
    securityQuestions: {
      question1: "",
      answer1: "",
      question2: "",
      answer2: "",
    },
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e, section, field) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const validateStep = (step) => {
    let validationErrors = {};
    if (step === 1) {
      const { username, email, password, confirmPassword } =
        formData.accountInfo;
      if (!username || username.length < 4)
        validationErrors.username = "Username must be at least 4 characters.";
      if (!email || !/\S+@\S+\.\S+/.test(email))
        validationErrors.email = "Enter a valid email.";
      if (
        !password ||
        password.length < 8 ||
        !/[0-9]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
      )
        validationErrors.password =
          "Password must be at least 8 characters long, include a number and a special character.";
      if (password !== confirmPassword)
        validationErrors.confirmPassword = "Passwords must match.";
    } else if (step === 2) {
      const { firstName, lastName, dateOfBirth, phoneNumber } =
        formData.personalDetails;
      if (!firstName) validationErrors.firstName = "First Name is required.";
      if (!lastName) validationErrors.lastName = "Last Name is required.";
      if (dateOfBirth && !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth))
        validationErrors.dateOfBirth = "Invalid date format. Use YYYY-MM-DD.";
      if (phoneNumber && !/^[+]?[0-9]{10,14}$/.test(phoneNumber))
        validationErrors.phoneNumber = "Enter a valid phone number.";
    } else if (step === 3) {
      const { question1, answer1, question2, answer2 } =
        formData.securityQuestions;
      if (!question1)
        validationErrors.question1 = "Security Question 1 is required.";
      if (!answer1)
        validationErrors.answer1 = "Answer to Security Question 1 is required.";
      if (!question2)
        validationErrors.question2 = "Security Question 2 is required.";
      if (!answer2)
        validationErrors.answer2 = "Answer to Security Question 2 is required.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
      setCurrentStep(1);
      setFormData({
        accountInfo: {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        personalDetails: {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          phoneNumber: "",
        },
        securityQuestions: {
          question1: "",
          answer1: "",
          question2: "",
          answer2: "",
        },
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="py-5">
            <h3 className="mb-4">Step 1: Account Information</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={formData.accountInfo.username}
                  onChange={(e) => handleChange(e, "accountInfo", "username")}
                />
                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.accountInfo.email}
                  onChange={(e) => handleChange(e, "accountInfo", "email")}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.accountInfo.password}
                  onChange={(e) => handleChange(e, "accountInfo", "password")}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formData.accountInfo.confirmPassword}
                  onChange={(e) =>
                    handleChange(e, "accountInfo", "confirmPassword")
                  }
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="mb-4">Step 2: Personal Details</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.personalDetails.firstName}
                  onChange={(e) =>
                    handleChange(e, "personalDetails", "firstName")
                  }
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.personalDetails.lastName}
                  onChange={(e) =>
                    handleChange(e, "personalDetails", "lastName")
                  }
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName}</small>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.personalDetails.dateOfBirth}
                  onChange={(e) =>
                    handleChange(e, "personalDetails", "dateOfBirth")
                  }
                />
                {errors.dateOfBirth && (
                  <small className="text-danger">{errors.dateOfBirth}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  value={formData.personalDetails.phoneNumber}
                  onChange={(e) =>
                    handleChange(e, "personalDetails", "phoneNumber")
                  }
                />
                {errors.phoneNumber && (
                  <small className="text-danger">{errors.phoneNumber}</small>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="mb-4">Step 3: Security Questions</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Security Question 1</label>
                <select
                  className="form-control"
                  value={formData.securityQuestions.question1}
                  onChange={(e) =>
                    handleChange(e, "securityQuestions", "question1")
                  }
                >
                  <option value="">Select a question</option>
                  <option value="What is your pet's name?">
                    What is your pet's name?
                  </option>
                  <option value="What is your mother's maiden name?">
                    What is your mother's maiden name?
                  </option>
                  <option value="What was the name of your first school?">
                    What was the name of your first school?
                  </option>
                </select>
                {errors.question1 && (
                  <small className="text-danger">{errors.question1}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Answer 1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Answer 1"
                  value={formData.securityQuestions.answer1}
                  onChange={(e) =>
                    handleChange(e, "securityQuestions", "answer1")
                  }
                />
                {errors.answer1 && (
                  <small className="text-danger">{errors.answer1}</small>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Security Question 2</label>
                <select
                  className="form-control"
                  value={formData.securityQuestions.question2}
                  onChange={(e) =>
                    handleChange(e, "securityQuestions", "question2")
                  }
                >
                  <option value="">Select a question</option>
                  <option value="What is your favorite book?">
                    What is your favorite book?
                  </option>
                  <option value="What is your favorite food?">
                    What is your favorite food?
                  </option>
                  <option value="What city were you born in?">
                    What city were you born in?
                  </option>
                </select>
                {errors.question2 && (
                  <small className="text-danger">{errors.question2}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Answer 2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Answer 2"
                  value={formData.securityQuestions.answer2}
                  onChange={(e) =>
                    handleChange(e, "securityQuestions", "answer2")
                  }
                />
                {errors.answer2 && (
                  <small className="text-danger">{errors.answer2}</small>
                )}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <section className="py-5">
            <div>
              <div>
                <h3 className="text-center mb-2">Review & Submit</h3>
                <p className="text-center text-muted mb-2">
                  Please review the information below. You can go back to make
                  corrections if needed.
                </p>

                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>Section</th>
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                      <tr>
                        <td rowSpan="4">Account Info</td>
                        <td>Username</td>
                        <td>{formData?.accountInfo?.username}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{formData?.accountInfo?.email}</td>
                      </tr>
                      <tr>
                        <td>Password</td>
                        <td>********</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>

                    
                      <tr>
                        <td rowSpan="4">Personal Details</td>
                        <td>First Name</td>
                        <td>{formData?.personalDetails?.firstName}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{formData?.personalDetails?.lastName}</td>
                      </tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>
                          {formData?.personalDetails?.dateOfBirth || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>
                          {formData?.personalDetails?.phoneNumber || "N/A"}
                        </td>
                      </tr>

                      <tr>
                        <td rowSpan="4">Security Questions</td>
                        <td>Question 1</td>
                        <td>{formData?.securityQuestions?.question1}</td>
                      </tr>
                      <tr>
                        <td>Answer 1</td>
                        <td>{formData?.securityQuestions?.answer1}</td>
                      </tr>
                      <tr>
                        <td>Question 2</td>
                        <td>{formData?.securityQuestions?.question2}</td>
                      </tr>
                      <tr>
                        <td>Answer 2</td>
                        <td>{formData?.securityQuestions?.answer2}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {renderStepContent()}
      <div className="mt-4">
        {currentStep > 1 && (
          <button className="btn btn-secondary me-3" onClick={previousStep}>
            Previous
          </button>
        )}
        {currentStep < 4 && (
          <button className="btn btn-primary me-3" onClick={nextStep}>
            Next
          </button>
        )}
        {currentStep === 4 && (
          <button className="btn btn-success me-3" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

