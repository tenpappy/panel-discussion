import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/dist/client/link";
import React, { VFC } from "react";

type Props = {
  onSubmit: any;
  buttonText: string;
  inputList: {
    ref: any;
    type: string;
    placeholder?: string;
    name?: string;
  }[];
  errorMessage?: string;
};

export const BaseForm: VFC<Props> = ({
  onSubmit,
  buttonText,
  inputList,
  errorMessage,
}) => {
  return (
    <div className="min-h-screen bg-gray-700 shadow-2xl py-5">
      <Link href="/">
        <a>
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            color="white"
            className="cursor-pointer ml-3 mr-1 "
            size="1x"
          />
        </a>
      </Link>
      <Link href="/">
        <a className="text-white text-left mt-1">戻る</a>
      </Link>
      <div className="mx-auto text-center mt-9">
        <h1 className="text-gray-200 text-center font-extrabold -mt-3 text-2xl">
          国王のみに許された管理者権限
        </h1>
        <div className="container pt-10 max-w-md mx-auto">
          <form onSubmit={onSubmit}>
            {inputList.map((props) => (
              <div key={props.type} className="mb-4 mx-3">
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
            {errorMessage && (
              <div className="mt-3 text-white border-red-400 border-2 p-2">
                {errorMessage}
              </div>
            )}
            <div className="mt-4 mx-3 text-white text-left text-sm">
              <p>※ログインすると・・・</p>
              <ol className="mt-1 text-xs">
                <li>
                  ①ステータス変更ができます！　WAIT⇒NOW、NOW⇒DONEにするなど
                </li>
                <li>②投稿の削除できます！　ゴミ箱アイコンを押してください</li>
              </ol>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
