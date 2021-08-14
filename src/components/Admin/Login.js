import { Link, useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import AdminPWModal from "./AdminPWModal";
import ErrorPage from "../NotFoundPage/ErrorPage";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-bootstrap";

const Login = () => {
  const [passcode, setPasscode] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
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
              <h3 className=" text-center">Log In</h3>
              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert className="my-4" variant="danger">
                    {error}
                  </Alert>
                )}
                <div className="my-4 form-group">
                  <input
                    ref={emailRef}
                    required
                    type="email"
                    className="form-control"
                    placeholder="Enter your email..."
                  />
                </div>
                <div className="my-4 form-group">
                  <input
                    ref={passwordRef}
                    required
                    type="password"
                    className="form-control"
                    placeholder="Enter your password..."
                  />
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-100 Btn-primary"
                >
                  Log In
                </button>
              </form>
            </div>
            <div className="w-100 text-center text-grey my-4">
              New Admin? &nbsp;
              <Link to={`/${process.env.REACT_APP_TFN_PASSCODE}/sign-up`}>
                Sign Up
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

export default Login;
