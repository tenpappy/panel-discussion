import { VFC } from "react";

type Props = {
  title: string;
};

export const Header: VFC<Props> = (props) => {
  const { title } = props;
  return (
    <header>
      <p className="h-11 mb-2  p-2 bg-gray-700  text-white">{title}</p>
    </header>
  );
};
