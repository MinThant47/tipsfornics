import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const QuestionCard = ({ id, name, email, question }) => {
  return (
    <div key={id} className="question-card">
      <small>
        <AiOutlineUser />
      </small>
      <p className="text-grey">{name}</p>
      <small>
        <AiOutlineMail />
      </small>
      <p className="text-grey">{email}</p>
      <small>
        Question <AiOutlineQuestionCircle />
      </small>
      <p className="text-grey">{question}</p>
    </div>
  );
};

export default QuestionCard;
