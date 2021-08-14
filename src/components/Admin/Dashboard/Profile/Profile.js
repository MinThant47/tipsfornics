import "./Profile.css";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import QuestionCard from "./QuestionCard";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import useFirestore from "../../../../hooks/useFirestore";
import SkeletonQuestions from "../../../../Skeleton/SkeletonQuestions";

const Profile = () => {
  const [error, setError] = useState();
  const { docs } = useFirestore("questions");
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const { username } = useAuth();
  const history = useHistory();

  function handleLogOut() {
    setError("");

    try {
      logout();
      history.push("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <hr />
        <div className="account-info">
          <h5>Account Information</h5>
        </div>
        <hr />
        <div className="account">
          <small>
            <AiOutlineUser />
          </small>
          <p className="text-grey">{username}</p>

          <small>
            <AiOutlineMail />
          </small>
          <p className="text-grey">{currentUser.email}</p>
          <button onClick={handleLogOut}>
            Log Out &nbsp; <FiLogOut />
          </button>
          {error && (
            <Alert className="my-4" variant="danger">
              {error}
            </Alert>
          )}
        </div>
      </div>

      <hr />

      <div className="reader-questions row justify-content-between align-items-start">
        <div className="reader-questions">
          <h5>Readers' Questions/ Feedbacks</h5>
        </div>
        <hr />

        <div className="d-flex align-items-start justify-content-center justify-content-md-start flex-wrap">
          {docs.length === 0 &&
            [1, 2, 3].map((n) => {
              return <SkeletonQuestions key={n} />;
            })}
          {docs &&
            docs.map((q) => {
              return (
                <QuestionCard
                  key={q.id}
                  id={q.id}
                  name={q.name}
                  email={q.email}
                  question={q.question}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
