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
  return (
    <div className="min-h-screen bg-gray-700 shadow-2xl mx-auto text-center py-12">
      <h1 className="text-gray-200 text-center font-extrabold -mt-3 text-3xl">
        国王のみに許された管理者権限
      </h1>
      <div className="container pt-10 max-w-md mx-auto">
        <form onSubmit={onSubmit}>
          {inputList.map((props) => (
            <div key={props.type} className="mb-4">
              <input
                {...props}
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-6 py-2 m-2 text-base font-semibold rounded-full border-b bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none"
          >
            {buttonText}
          </button>
          <div className="mt-4 text-white text-left text-sm">
            <p>※ログインすると・・・</p>
            <ol className="mt-1 text-xs">
              <li>①ステータス変更ができます！　WAIT⇒NOW、NOW⇒DONEにするなど</li>
              <li>②投稿の削除できます！　ゴミ箱アイコンを押してください</li>
            </ol>
          </div>
        </form>
      </div>
    </div>
  );
};
