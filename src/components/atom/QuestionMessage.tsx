import { VFC } from "react";

type Props = {
  content: string;
};

export const QuestionMessage: VFC<Props> = (props) => {
  const { content } = props;
  return <p className="border-b my-auto">{content}</p>;
};
