import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { supabase } from "../util/supabase";

export default function Home() {
  const iconStyle: React.CSSProperties = { padding: 9 };
  // 質問入力欄
  const [inputQuestion, setInputQuestion] = useState("");
  // DBから取得したデータ
  const [questions, setQuestions] = useState([]);

  // 質問入力欄
  const onChangeQuestion = (e: any) => {
    setInputQuestion(e.target.value);
  };
  // 投稿ボタン
  const onClickEntry = async () => {
    if (inputQuestion) {
      // insert
      const { error: insertError } = await supabase
        .from("questions")
        .insert([{ question: inputQuestion, "status-kbn": "wait" }]);
      if (insertError) {
        alert("投稿処理に失敗しました");
      } else {
        setInputQuestion("");
      }

      // select（データ再取得）
      const { data: questions, error: selectError } = await supabase
        .from("questions")
        .select(`"id","question","status-kbn","good-count","theme-kbn"`);
      if (selectError) {
        alert("データ取得処理に失敗しました");
      } else {
        setQuestions(questions);
      }
    } else {
      alert("投稿内容を入力してください");
    }
  };
  // NOWボタン
  const onClickNow = async (id: number) => {
    // update（now->done）
    const { data, error: updateEerror } = await supabase
      .from("questions")
      .update({ "status-kbn": "done" })
      .eq("id", id);
    if (updateEerror) alert("ステータス更新処理に失敗しました");

    // select（データ再取得）
    const { data: questions, error: selectError } = await supabase
      .from("questions")
      .select(`"id","question","status-kbn","good-count","theme-kbn"`);
    if (selectError) {
      alert("データ取得処理に失敗しました");
    } else {
      setQuestions(questions);
    }
  };
  // WAITボタン
  const onClickWait = async (id: number) => {
    let beforeNowId = "";
    Object.keys(questions).map(
      (index) =>
        questions[index]["status-kbn"] === "now" &&
        (beforeNowId = questions[index].id)
    );

    if (beforeNowId) {
      // update（now->done）
      const { error: updateError } = await supabase
        .from("questions")
        .update({ "status-kbn": "done" })
        .eq("id", beforeNowId);
      if (updateError)
        alert("ステータス更新処理(now->done)に失敗しましたssssssssss");
    }

    // update（wait->now）
    const { error: updateError2 } = await supabase
      .from("questions")
      .update({ "status-kbn": "now" })
      .eq("id", id);
    if (updateError2) alert("ステータス更新処理(wait->now)に失敗しました");

    // select（データ再取得）
    const { data: questionsNew, error: selectError } = await supabase
      .from("questions")
      .select(`"id","question","status-kbn","good-count","theme-kbn"`);
    if (selectError) {
      alert("データ取得処理に失敗しました");
    } else {
      setQuestions(questionsNew);
    }
  };
  // DONEボタン（WAITへの戻し用）
  const onClickDone = async (id: number) => {
    // update（done->wait）
    const { data, error: updateError } = await supabase
      .from("questions")
      .update({ "status-kbn": "wait" })
      .eq("id", id);
    if (updateError) alert("ステータス更新処理に失敗しました");

    // select（データ再取得）
    const { data: questions, error: selectError } = await supabase
      .from("questions")
      .select(`"id","question","status-kbn","good-count","theme-kbn"`);
    if (selectError) {
      alert("データ取得処理に失敗しました");
    } else {
      setQuestions(questions);
    }
  };
  // WAITのDELボタン
  const onClickWaitDel = async (id: number) => {
    // delete
    const { data, error: deleteError } = await supabase
      .from("questions")
      .delete()
      .eq("id", id);
    if (deleteError) alert("データ削除処理に失敗しました");

    // select（データ再取得）
    const { data: questions, error: selectEerror } = await supabase
      .from("questions")
      .select(`"id","question","status-kbn","good-count","theme-kbn"`);
    if (selectEerror) {
      alert("データ取得処理に失敗しました");
    } else {
      setQuestions(questions);
    }
  };
  // DONEのDELボタン
  const onClickDoneDel = async (id: number) => {
    // delete
    const { data, error: deleteError } = await supabase
      .from("questions")
      .delete()
      .eq("id", id);
    if (deleteError) alert("データ削除処理に失敗しました");

    // select（データ再取得）
    const { data: questions, error: selectError } = await supabase
      .from("questions")
      .select(`"id","question","status-kbn","good-count","theme-kbn"`);
    if (selectError) {
      alert("データ取得処理に失敗しました");
    } else {
      setQuestions(questions);
    }
  };

  // 初回データ取得
  useEffect(() => {
    console.log("★１回だけ実行");
    (async () => {
      let { data: questions, error } = await supabase
        .from("questions")
        .select(`"id","question","status-kbn","good-count","theme-kbn"`);
      if (error) {
        alert("データ取得処理に失敗しました");
      } else {
        setQuestions(questions);
      }
    })();
  }, []);

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
      <header>
        <p className="h-11 mb-2  p-2 bg-gray-700  text-white">
          Panel Discussion　しまぶー×じゃけぇ
        </p>
      </header>
      <main className="min-h-screen">
        {/* 投稿 */}
        <div className="md:flex items-end">
          <textarea
            className="w-11/12 max-w-3xl border border-gray-900 p-1 mx-2 mt-2 rounded-lg  focus:outline-none "
            // cols={45}
            rows={3}
            maxLength={100}
            placeholder="入力してください"
            value={inputQuestion}
            onChange={onChangeQuestion}
          />
          <button
            className="w-20 px-6 py-2 mx-2 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none"
            onClick={onClickEntry}
          >
            投稿
          </button>
        </div>

        {/* NOW */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "now" && (
              <div key={index} className="bg-yellow-50 pb-1 rounded-3xl mx-1">
                <div className="my-2 mx-2 flex">
                  <button
                    className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 focus:outline-none"
                    onClick={() => onClickNow(questions[index].id)}
                  >
                    NOW
                  </button>
                  <p className="border-b my-auto">
                    {questions[index].question}
                  </p>
                </div>
              </div>
            )
        )}

        {/* 点線 */}
        <div className="border-dashed border-t-4 my-2 mx-3"></div>

        {/* WAIT */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "wait" && (
              <div key={index} className="bg-indigo-50 py-1 rounded-3xl m-1">
                <div className="my-2 mx-2 flex">
                  <button
                    className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 focus:outline-none"
                    onClick={() => onClickWait(questions[index].id)}
                  >
                    WAIT
                  </button>
                  <p className="border-b my-auto ">
                    {questions[index].question}
                  </p>
                  <div
                    className="p-3 cursor-pointer ml-auto"
                    onClick={() => onClickWaitDel(questions[index].id)}
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
              <div key={index} className="bg-gray-50 py-1 rounded-3xl m-1">
                <div className="my-2 mx-2 flex">
                  <button
                    className="px-6 py-2 my-3 mr-2 h-10 text-base font-semibold rounded-full border-b border-purple-300 bg-gray-200 hover:bg-gray-300 text-gray-900 focus:outline-none"
                    onClick={() => onClickDone(questions[index].id)}
                  >
                    DONE
                  </button>
                  <p className="border-b my-auto">
                    {questions[index].question}
                  </p>
                  <div
                    className="p-3 cursor-pointer ml-auto"
                    onClick={() => onClickDoneDel(questions[index].id)}
                  >
                    <FontAwesomeIcon style={iconStyle} icon={faTrashAlt} />
                  </div>
                </div>
              </div>
            )
        )}
      </main>
      <footer>
        <p className="h-11 mt-2  p-2 bg-gray-700  text-white">
          © 2021 てんぱぱ
        </p>
      </footer>
    </div>
  );
}
