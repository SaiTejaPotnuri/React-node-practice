import "./formStyle.css";
import { useContext, useState,useEffect } from "react";
import Authenticate from "../context/AuthContext";
import Input from "../reuseble-components/Input";
import { useNavigate } from "react-router-dom";
function Forms(props) {
  //   let [userName,setUserName] = useState('');
  //   let [password,setPassword] = useState('');

  // like above for all Inputs we make use of useState instead of it we will create single useState for all inputs
  const navigate = useNavigate();

  let [userInput, updateUserInput] = useState({
    userName: "",
    password: "",
  });

  let auth = useContext(Authenticate);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token') === 'true';
    if (isAuthenticated || auth.isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth.isLoggedIn, navigate]);
  let handleUserName = (eve) => {
    // console.log("event from inpt" , eve.target.value);
    // setUserName(eve.target.value);
    updateUserInput((prevState) => {
      return {
        // here in the below we use spread operator to hold and not to loose other input values and previous values
        ...prevState,
        userName: eve.target.value,
      };
    });
  };

  let handlePassword = (eve) => {
    // console.log("event from inpt" , eve.target.value);
    // setPassword(eve.target.value);
    updateUserInput((prevState) => {
      return {
        ...prevState,
        password: eve.target.value,
      };
    });
  };

  let submitForm = async (eve) => {
    // console.log("submit form event",eve);

    
    // the below we are calling preventDefault() to prevent the for make a default behaviour of the submit form to reload the page
    eve.preventDefault();
    let user = {
      userName: userInput.userName,
      password: userInput.password,
    };
    // console.log("user details :",user)
    // props.submitForm(userInput.userName)

    const isValidUser = await auth.loginHandler(user);

    if (isValidUser) {
          //clear all values of the form
      updateUserInput({
        userName: "",
        password: "",
      });
      navigate("/dashboard", { replace: true });
    }


  };

  // for 2 way binding we will assign state value to the form value like as userName and password
  // for checkbox instead of value attribute we use checked attribute

  return auth.isLoggedIn ? (
    <></>
  ) : (
    <>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="glass-card">
          <div className="cardTitle">Form</div>
          <div className="card-body">
            <form
              className="sampleForm"
              onSubmit={submitForm}
              style={{ width: "100%" }}
            >
              {/* Reuseble components */}
              <Input
                divClass="form-group mb-3"
                labelClass="mb-1"
                type="email"
                label="Email address"
                value={userInput.userName}
                onChangeHandler={handleUserName}
                placeholder="Enter email"
                id="exampleInputEmail1"
              />

              <Input
                divClass="form-group mb-3"
                labelClass="mb-1"
                type="password"
                label="Password"
                value={userInput.password}
                onChangeHandler={handlePassword}
                placeholder="Password"
                id="exampleInputPassword1"
              />
              <div className="d-flex justify-content-end mt-5">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
