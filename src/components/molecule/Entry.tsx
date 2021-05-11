import { VFC } from "react";

type Props = {
  value: string;
  onChange: (e: any) => void;
  onClick: () => void;
};

export const Entry: VFC<Props> = (props) => {
  const { value, onChange, onClick } = props;
  return (
    <div className="md:flex items-end">
      <textarea
        className="w-11/12 max-w-3xl border border-gray-900 p-1 mx-2 mt-2 rounded-lg  focus:outline-none "
        rows={3}
        maxLength={100}
        placeholder="入力してください"
        value={value}
        onChange={onChange}
      />
      <button
        className="w-20 px-6 py-2 mx-2 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none"
        onClick={onClick}
      >
        投稿
      </button>
    </div>
  );
};
