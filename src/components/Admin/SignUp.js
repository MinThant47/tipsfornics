import { Link, useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { Alert } from "react-bootstrap";
import AdminPWModal from "./AdminPWModal";
import ErrorPage from "../NotFoundPage/ErrorPage";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      history.push(`/${process.env.REACT_APP_TFN_PASSCODE}/dashboard`);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <>
      <AdminPWModal submit={setPasscode} />
      {passcode === process.env.REACT_APP_MODAL_PASSCODE ? (
        <div
          className="container my-5 d-flex align-items-center justify-content-center"
          style={{ minHeight: "50%" }}
        >
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <div className="login row justify-content-center align-items-center">
              <h3 className="text-center">Sign Up</h3>

              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert className="my-4" variant="danger">
                    {error}
                  </Alert>
                )}
                <div className="my-4 form-group">
                  <input
                    required
                    ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder="Enter your name..."
                  />
                </div>
                <div className="my-4 form-group">
                  <input
                    required
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    placeholder="Enter your email..."
                  />
                </div>
                <div className="my-4 form-group">
                  <input
                    required
                    ref={passwordRef}
                    type="password"
                    className="form-control"
                    placeholder="Enter your password..."
                  />
                </div>
                <div className="my-4 form-group">
                  <input
                    required
                    ref={confirmPasswordRef}
                    type="password"
                    className="form-control"
                    placeholder="Enter your Confirm Password..."
                  />
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-100 Btn-primary"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="w-100 text-center text-grey my-4">
              Already an admin?{" "}
              <Link to={`/${process.env.REACT_APP_TFN_PASSCODE}/login`}>
                Log In
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage
          type={"Error 403"}
          secondary={"You don't have permission to access this page."}
        />
      )}
    </>
  );
};

export default SignUp;
