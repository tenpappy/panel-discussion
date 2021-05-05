import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { supabase } from "../util/supabase";

export default function Home() {
  const iconStyle: React.CSSProperties = { padding: 9 };
  // 質問入力欄
  const [inputQuestion, setInputQuestion] = useState("");
  // NOW
  const [nowQuestion, setNowQuestion] = useState("");
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
  // DBから取得したデータ
  const [questions, setQuestions] = useState([]);

  // 質問入力欄
  const onChangeQuestion = (e: any) => {
    setInputQuestion(e.target.value);
  };
  // 投稿ボタン
  const onClickEntry = () => {
    const newWaitQuestions = [inputQuestion, ...waitQuestions];
    setWaitQuestions(newWaitQuestions);
    setInputQuestion("");
  };
  // NOWボタン
  const onClickNow = () => {
    if (nowQuestion) {
      // DONE一覧に追加
      const newDoneQuestions = [...doneQuestions, nowQuestion];
      setDoneQuestions(newDoneQuestions);
      setNowQuestion("");
    }
  };
  // WAITボタン
  const onClickWait = (index) => {
    const newWaitQuestions = [...waitQuestions];
    // 押された要素をWAIT一覧から削除
    newWaitQuestions.splice(index, 1);
    if (nowQuestion) {
      // 現在のNOW要素をDONE一覧に追加
      const newDoneQuestions = [...doneQuestions, nowQuestion];
      setDoneQuestions(newDoneQuestions);
    }
    setWaitQuestions(newWaitQuestions);
    setNowQuestion(waitQuestions[index]);
  };
  // DONEボタン（WAITへの戻し用）
  const onClickDone = (index) => {
    const newDoneQuestions = [...doneQuestions];
    // 押された要素をDONE一覧から削除
    newDoneQuestions.splice(index, 1);
    // 押された要素をWAIT一覧に追加
    const newWaitQuestions = [...waitQuestions, doneQuestions[index]];
    setDoneQuestions(newDoneQuestions);
    setWaitQuestions(newWaitQuestions);
  };
  // WAITのDELボタン
  const onClickWaitDel = (index) => {
    const newWaitQuestions = [...waitQuestions];
    // 押された要素をWAIT一覧から削除
    newWaitQuestions.splice(index, 1);
    setWaitQuestions(newWaitQuestions);
  };
  // DONEのDELボタン
  const onClickDoneDel = (index) => {
    const newDoneQuestions = [...doneQuestions];
    // 押された要素をDONE一覧から削除
    newDoneQuestions.splice(index, 1);
    setDoneQuestions(newDoneQuestions);
  };

  // ★テストDB接続用
  const onClickTest = async () => {
    let { data: questions, error } = await supabase
      .from("questions")
      .select(`"id","question","status-kbn","good-count","theme-kbn"`);
    // .eq("status-kbn", "wait");
    console.log(questions);
    setQuestions(questions);
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
      {/* ★★★★★★★★ */}
      <button className="bg-yellow-500" onClick={onClickTest}>
        データ取得
      </button>
      <ul>
        {Object.keys(questions).map((key) => (
          <li key={key}>
            {questions[key].question},{questions[key]["status-kbn"]}
          </li>
        ))}
      </ul>
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
            <button
              className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 focus:outline-none"
              onClick={onClickNow}
            >
              NOW
            </button>
            {Object.keys(questions).map(
              (index) =>
                questions[index]["status-kbn"] === "now" && (
                  <p key={index} className="border-b my-auto">
                    {questions[index].question}
                  </p>
                )
            )}
          </div>
        </div>

        {/* 点線 */}
        <div className="border-dashed border-t-4 my-2 mx-3"></div>

        {/* WAIT */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "wait" && (
              <div className="bg-indigo-50 py-1 rounded-3xl m-1">
                <div key={index} className="my-2 mx-2 flex">
                  <button
                    className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none"
                    onClick={() => onClickWait(index)}
                  >
                    WAIT
                  </button>
                  <p className="border-b my-auto ">
                    {questions[index].question}
                  </p>
                  <div
                    className="p-3 cursor-pointer ml-auto"
                    onClick={() => onClickWaitDel(index)}
                  >
                    <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
                  </div>
                </div>
              </div>
            )
        )}

        {/* DONE */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "done" && (
              <div className="bg-gray-50 py-1 rounded-3xl m-1">
                <div key={index} className="my-2 mx-2 flex">
                  <button
                    className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none"
                    onClick={() => onClickDone(index)}
                  >
                    DONE
                  </button>
                  <p className="border-b my-auto">
                    {questions[index].question}
                  </p>
                  <div
                    className="p-3 cursor-pointer ml-auto"
                    onClick={() => onClickDoneDel(index)}
                  >
                    <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
                  </div>
                </div>
              </div>
            )
        )}

        {/* ★★バックアップとして一応残しておく★★ */}
        {/* NOW */}
        {/* <div className="bg-yellow-50 pb-1 rounded-3xl mx-1">
          <div className="my-2 mx-2 flex">
            <button
              className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 focus:outline-none"
              onClick={onClickNow}
            >
              NOW
            </button>
            <p className="border-b my-auto">{nowQuestion}</p>
          </div>
        </div> */}

        {/* 点線 */}
        {/* <div className="border-dashed border-t-4 my-2 mx-3"></div> */}

        {/* WAIT */}
        {/* <div className="bg-indigo-50 py-1 rounded-3xl m-1">
          {waitQuestions.map((waitQuestion, index) => {
            return (
              <div key={index} className="my-2 mx-2 flex">
                <button
                  className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none"
                  onClick={() => onClickWait(index)}
                >
                  WAIT
                </button>
                <p className="border-b my-auto ">{waitQuestion}</p>
                <div
                  className="p-3 cursor-pointer ml-auto"
                  onClick={() => onClickWaitDel(index)}
                >
                  <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
                </div>
              </div>
            );
          })}
        </div> */}

        {/* DONE */}
        {/* <div className="bg-gray-50 py-1 rounded-3xl m-1">
          {doneQuestions.map((doneQuestion, index) => {
            return (
              <div key={index} className="my-2 mx-2 flex">
                <button
                  className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none"
                  onClick={() => onClickDone(index)}
                >
                  DONE
                </button>
                <p className="border-b my-auto">{doneQuestion}</p>
                <div
                  className="p-3 cursor-pointer ml-auto"
                  onClick={() => onClickDoneDel(index)}
                >
                  <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
                </div>
              </div>
            );
          })}
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
