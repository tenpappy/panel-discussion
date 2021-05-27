import { VFC } from "react";

type Props = {
  onSubmit: any;
  buttonText: string;
  inputList: {
    ref: any;
    type: string;
    placeholder?: string;
    name?: string;
  }[];
};

export const BaseForm: VFC<Props> = ({ onSubmit, buttonText, inputList }) => {
  return <p>ssss</p>;
};
