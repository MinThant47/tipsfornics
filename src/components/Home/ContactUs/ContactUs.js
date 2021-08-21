import email from "../../../img/Email.svg";
import { BiPencil } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineQuestion } from "react-icons/ai";
import { db, timestamp } from "../../../Firebase/Firebase";
import { useRef, useState } from "react";
import AlertBox from "../../AlertBox";

const ContactUS = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const questionRef = useRef();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const time = timestamp();
    db.collection("questions")
      .add({
        name: nameRef.current.value,
        email: emailRef.current.value,
        question: questionRef.current.value,
        createdAt: time,
      })
      .then(() => {
        nameRef.current.value = "";
        questionRef.current.value = "";
        emailRef.current.value = "";
        setLoading(false);
        setOpen(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <>
      <AlertBox
        text={"Question sent! Thanks for contacting us!"}
        open={open}
        setOpen={setOpen}
      />
      <section id="contact-us">
        <div className="p-4 container">
          <h3 className="fw-bold text-grey text-center title-text">
            Have Idea for Tips?
          </h3>
          <p className="text-muted text-center">
            Feel free to contact us. We'll reach back to you soon!
          </p>
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6">
              <img className="img-fluid" src={email} alt="" />
            </div>

            <div className="col-12 col-sm-12 col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="my-3 form-group">
                  <label className="text-grey text-small" htmlFor="first-name">
                    Your Name <BiPencil />
                  </label>
                  <input
                    disabled={loading}
                    ref={nameRef}
                    required
                    type="text"
                    className="form-control"
                    id="first-name"
                    placeholder="Enter your name..."
                  />
                </div>

                <div className="my-3 form-group">
                  <label
                    className="text-grey text-small"
                    htmlFor="exampleInputEmail1"
                  >
                    Email address <AiOutlineMail />
                  </label>
                  <input
                    disabled={loading}
                    required
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email address..."
                  />
                </div>

                <div className="my-3 form-group">
                  <label className="text-grey text-small" htmlFor="question">
                    Your Question <AiOutlineQuestion />
                  </label>
                  <textarea
                    disabled={loading}
                    required
                    ref={questionRef}
                    row="2"
                    type="text"
                    className="form-control"
                    id="question"
                    placeholder="Your question here..."
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="Btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUS;
