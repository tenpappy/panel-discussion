import { useEffect, useState } from "react";
import { supabase } from "../util/supabase";
import { HeadInfo } from "../components/organism/HeadInfo";
import { Header } from "./../components/organism/Header";
import { Entry } from "./../components/molecule/Entry";
import { StatusAndQuestion } from "../components/molecule/StatusAndQuestion";

export default function Home() {
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
      if (updateError) alert("ステータス更新処理(now->done)に失敗しました");
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
  // DELボタン
  const onClickDel = async (id: number) => {
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
  // 初回データ取得
  useEffect(() => {
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
      <HeadInfo
        title="パネルディスカッション"
        content="パネルディスカッション用のツールです"
      />
      <Header title="Panel Discussion　しまぶー×じゃけぇ" />
      <main className="min-h-screen">
        {/* 投稿 */}
        <Entry
          value={inputQuestion}
          onChange={onChangeQuestion}
          onClick={onClickEntry}
        />

        {/* NOW */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "now" && (
              <div key={index} className={`bg-yellow-50 pb-1 rounded-3xl mx-1`}>
                <StatusAndQuestion
                  key={index}
                  onClick={onClickNow}
                  id={questions[index].id}
                  question={questions[index].question}
                  bgColor="yellow"
                  isDeletable={false}
                  name="NOW"
                />
              </div>
            )
        )}

        {/* 点線 */}
        <div className="border-dashed border-t-4 my-2 mx-3"></div>

        {/* WAIT */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "wait" && (
              <div
                key={index}
                className={`bg-indigo-200 pb-1 rounded-3xl mx-1`}
              >
                <StatusAndQuestion
                  key={index}
                  onClick={onClickWait}
                  id={questions[index].id}
                  question={questions[index].question}
                  bgColor="indigo"
                  isDeletable={true}
                  name="WAIT"
                  onClickDel={onClickDel}
                />
              </div>
            )
        )}

        {/* DONE */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "done" && (
              <div key={index} className={`bg-gray-50 pb-1 rounded-3xl mx-1`}>
                <StatusAndQuestion
                  key={index}
                  onClick={onClickDone}
                  id={questions[index].id}
                  question={questions[index].question}
                  bgColor="gray"
                  isDeletable={true}
                  name="DONE"
                  onClickDel={onClickDel}
                />
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
