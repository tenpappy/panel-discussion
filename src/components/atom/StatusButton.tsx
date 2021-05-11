import { VFC } from "react";

type Props = {
  onClick: (id: number) => void;
  id: number;
  bgColor: string;
  name: string;
};

export const StatusButton: VFC<Props> = (props) => {
  const { onClick, id, bgColor, name } = props;
  return (
    <div>
      <button
        className={`px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-${bgColor}-300 hover:bg-${bgColor}-400 text-${bgColor}-900 focus:outline-none`}
        onClick={() => onClick(id)}
      >
        {name}
      </button>
    </div>
  );
};
