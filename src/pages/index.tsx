import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function Home() {
  const iconStyle: React.CSSProperties = { padding: 10 };
  // 質問入力欄
  const [inputQuestion, setInputQuestion] = useState("");
  // WAIT一覧
  const [waitQuestions, setWaitQuestions] = useState([
    "あああああああああああああああああああああ",
    "いいいいいいいいいいいいいいいいいいいいいいいいいいいいいい",
  ]);
  // DONE一覧
  const [doneQuestions, setDoneQuestions] = useState([
    "とおおおおおおおおおおおおおおおおおおおおおおおおおお",
    "あああああああええええええええいいいいいいいいいいいいいいいいｄｄｄ",
    "eeeee",
  ]);

  const onChangeQuestion = (e) => {
    setInputQuestion(e.target.value);
  };
  const onClickEntry = () => {
    const newWaitQuestions = [inputQuestion, ...waitQuestions];
    setWaitQuestions(newWaitQuestions);
    setInputQuestion("");
  };

  return (
    <div>
      <Head>
        <title>パネルディスカッション</title>
        <meta
          name="description"
          content="パネルディスカッション用のツールです"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="min-h-screen">
        {/* 投稿 */}
        <div className="items-end flex">
          <textarea
            className="border border-gray-900 p-2 mx-2 mt-2 rounded-lg  focus:outline-none "
            cols={90}
            rows={3}
            maxLength={100}
            placeholder="入力してください"
            value={inputQuestion}
            onChange={onChangeQuestion}
          />
          <button
            className="px-6 py-2 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none"
            onClick={onClickEntry}
          >
            投稿
          </button>
        </div>

        {/* NOW */}
        <div className="bg-yellow-50 pb-1 rounded-3xl mx-1">
          <div className="my-2 mx-2 flex">
            <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 focus:outline-none">
              NOW
            </button>
            <p className="border-b my-auto">
              cccccccccええええええええええええええあああああああああああああいいいいいいいいいいい。あとは〇〇とか××とか教えてください。あああああ。
            </p>
            {/* <div style={{ textAlign: "center", padding: 50 }}>
              <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
            </div> */}
            <div className="p-3 cursor-pointer ">
              <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
            </div>
          </div>
        </div>

        {/* 点線 */}
        <div className="border-dashed border-t-4 my-2 mx-3"></div>

        {/* WAIT */}
        <div className="bg-indigo-50 py-1 rounded-3xl m-1">
          {waitQuestions.map((waitQuestion, index) => {
            return (
              <div key={index} className="my-2 mx-2 flex">
                <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none">
                  WAIT
                </button>
                <p className="border-b my-auto  ">{waitQuestion}</p>
              </div>
            );
          })}
          {/* WAIT１ */}
          {/* <div className="my-2 mx-2 flex">
            <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none">
              WAIT
            </button>
            <p className="border-b my-auto  ">
              ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
            </p>
          </div> */}
          {/* WAIT２ */}
          {/* <div className="my-2 mx-2 flex">
            <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none">
              WAIT
            </button>
            <p className="border-b my-auto">ああああああああああああ</p>
          </div> */}
          {/* WAIT３ */}
          {/* <div className="my-2 mx-2 flex">
            <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none">
              WAIT
            </button>
            <p className="border-b my-auto">
              iiiiiいいいいいいいいいいいいいいいいいいいいいいいいいううううううううううううううううううううううううううううううううううううううえええええええええええええええあ
            </p>
          </div> */}
        </div>

        {/* DONE */}
        {/* WAIT */}
        <div className="bg-gray-50 py-1 rounded-3xl m-1">
          {doneQuestions.map((doneQuestion, index) => {
            return (
              <div key={index} className="my-2 mx-2 flex">
                <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none">
                  DONE
                </button>
                <p className="border-b my-auto">{doneQuestion}</p>
              </div>
            );
          })}
        </div>
        {/* DONE */}
        {/* <div className="bg-gray-50 py-1 rounded-3xl m-1">
          <div className="my-2 mx-2 flex">
            <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none">
              DONE
            </button>
            <p className="border-b my-auto">
              ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
            </p>
          </div>
          <div className="my-2 mx-2 flex">
            <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none">
              DONE
            </button>
            <p className="border-b my-auto">ああああああああああああ</p>
          </div>
          <div className="my-2 mx-2 flex">
            <button className="px-6 py-2 my-3 mr-3 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none">
              DONE
            </button>
            <p className="border-b my-auto">
              iiiiiいいいいいいいいいいいいいいいいいいいいいいいいいううううううううううううううううううううううううううううううううううううううえええええええええええええええあ
            </p>
          </div>
        </div> */}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="h-4 ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
