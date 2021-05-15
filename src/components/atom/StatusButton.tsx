import { VFC } from "react";

type Props = {
  onClick: (id: number) => void;
  id: number;
  bgColor: string;
  name: string;
};

export const StatusButton: VFC<Props> = (props) => {
  const { onClick, id, bgColor, name } = props;
  const bgColor200 = `bg-${bgColor}-200`;
  const bgColorHover = `hover:bg-${bgColor}-300`;
  const bgColorText = `text-${bgColor}-900`;
  return (
    <div>
      {/* <button
        className={`px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-yellow-200 hover:bg-yellow-300 text-yellow-900  focus:outline-none`}
        onClick={() => onClick(id)}
      > */}
      {/* <button
        className={`px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-${bgColor}-200 ${bgColorHover} ${bgColorText} focus:outline-none`}
        onClick={() => onClick(id)}
      > */}
      <button
        className={`px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 ${bgColor200} ${bgColorHover} ${bgColorText} focus:outline-none`}
        onClick={() => onClick(id)}
      >
        {name}
      </button>
    </div>
  );
};
