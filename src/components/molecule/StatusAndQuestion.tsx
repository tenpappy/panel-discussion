import { VFC } from "react";
import { QuestionMessage } from "./../atom/QuestionMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { StatusButton } from "./../atom/StatusButton";

type Props = {
  key: string;
  onClick: (id: number) => void;
  id: number;
  question: string;
  bgColor: string;
  isDeletable: boolean;
  onClickDel?: (id: number) => void;
  name: string;
};

export const StatusAndQuestion: VFC<Props> = (props) => {
  const {
    key,
    onClick,
    id,
    question,
    bgColor,
    isDeletable,
    onClickDel,
    name,
  } = props;
  const iconStyle: React.CSSProperties = { padding: 9 };
  return (
    <div key={key} className={`bg-${bgColor}-50 pb-1 rounded-3xl mx-1`}>
      <div className="my-2 mx-2 flex">
        <StatusButton onClick={onClick} id={id} bgColor={bgColor} name={name} />
        <QuestionMessage content={question} />
        {isDeletable && (
          <div
            className="p-3 cursor-pointer ml-auto"
            onClick={() => onClickDel(id)}
          >
            <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
          </div>
        )}
      </div>
    </div>
  );
};
