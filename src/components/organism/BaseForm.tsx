import { VFC } from "react";

type Props = {
  onSubmit: any;
  buttonText: string;
  inputList: {
    name: string;
    ref: any;
    type: string;
  }[];
};

export const BaseForm: VFC<Props> = ({ onSubmit, buttonText, inputList }) => {
  return (
    <form onSubmit={onSubmit}>
      {inputList.map((props) => (
        <label key={props.name}>
          <span>{props.name}</span>
          <input {...props} />
        </label>
      ))}
      <button type="submit">{buttonText}</button>
    </form>
  );
};
