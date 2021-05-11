import { VFC } from "react";

type Props = {
  onClick: (id: number) => void;
  id: number;
};

export const WaitButton: VFC<Props> = (props) => {
  const { onClick, id } = props;
  return (
    <div>
      <button
        className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none"
        onClick={() => onClick(id)}
      >
        WAIT
      </button>
    </div>
  );
};
