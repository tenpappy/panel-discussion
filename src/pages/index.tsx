import { useEffect, useState } from "react";
import { supabase } from "../util/supabase";
import { HeadInfo } from "../components/organism/HeadInfo";
import { Header } from "./../components/organism/Header";
import { Entry } from "./../components/molecule/Entry";
import { StatusAndQuestion } from "../components/molecule/StatusAndQuestion";
import { Footer } from "./../components/organism/Footer";

export default function Home() {
  // 質問入力欄
  const [inputQuestion, setInputQuestion] = useState("");
  // DBから取得したデータ
  const [questions, setQuestions] = useState([]);
  // ログインしているか
  const [isLogin, setIsLogin] = useState(false);

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
    if (updateEerror)
      alert(
        "ステータス更新処理に失敗しました。他の人がステータスを変更した可能性があります。"
      );

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
        alert(
          "ステータス更新処理(now->done)に失敗しました。他の人がステータスを変更した可能性があります。"
        );
    }

    // update（wait->now）
    const { error: updateError2 } = await supabase
      .from("questions")
      .update({ "status-kbn": "now" })
      .eq("id", id);
    if (updateError2)
      alert(
        "ステータス更新処理(wait->now)に失敗しました。他の人がステータスを変更した可能性があります。"
      );

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
    if (updateError)
      alert(
        "ステータス更新処理に失敗しました。他の人がステータスを変更した可能性があります。"
      );

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
    if (deleteError)
      alert(
        "データ削除処理に失敗しました。他の人がステータスを変更した可能性があります。"
      );

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

  // ログイン状態取得
  useEffect(() => {
    console.log("ログインチェック");
    const user = supabase.auth.user();
    user ? setIsLogin(true) : setIsLogin(false);
  }, []);

  console.log("★★★レンダリング");

  return (
    <div>
      <HeadInfo
        title="パネルディスカッション"
        content="パネルディスカッション用のツールです"
      />
      <Header
        title="Panel Discussion"
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <main className="min-h-screen">
        <div className="bg-yellow-50">背景色テスト</div>
        <div className="bg-yellow-100">背景色テスト</div>
        <div className="bg-yellow-200">背景色テスト</div>
        <div className="bg-yellow-300">背景色テスト</div>
        <div className="bg-yellow-400">背景色テスト</div>
        <div className="bg-yellow-500">背景色テスト</div>
        <div className="bg-yellow-600">背景色テスト</div>
        <div className="bg-yellow-700">背景色テスト</div>
        <div className="bg-yellow-800">背景色テスト</div>
        <div className="bg-yellow-900">背景色テスト</div>
        <div className="bg-indigo-50">背景色テスト</div>
        <div className="bg-indigo-100">背景色テスト</div>
        <div className="bg-indigo-200">背景色テスト</div>
        <div className="bg-indigo-300">背景色テスト</div>
        <div className="bg-indigo-400">背景色テスト</div>
        <div className="bg-indigo-500">背景色テスト</div>
        <div className="bg-indigo-600">背景色テスト</div>
        <div className="bg-indigo-700">背景色テスト</div>
        <div className="bg-indigo-800">背景色テスト</div>
        <div className="bg-indigo-900">背景色テスト</div>
        <div className=" text-green-50 font-black">文字色テスト</div>
        <div className=" text-green-100 font-black">文字色テスト</div>
        <div className=" text-green-200 font-black">文字色テスト</div>
        <div className=" text-green-300 font-black">文字色テスト</div>
        <div className=" text-green-400 font-black">文字色テスト</div>
        <div className=" text-green-500 font-black">文字色テスト</div>
        <div className=" text-green-600 font-black">文字色テスト</div>
        <div className=" text-green-700 font-black">文字色テスト</div>
        <div className=" text-green-800 font-black">文字色テスト</div>
        <div className=" text-green-900 font-black">文字色テスト</div>
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
              <StatusAndQuestion
                key={index}
                onClick={onClickNow}
                id={questions[index].id}
                question={questions[index].question}
                bgColor="yellow"
                isDeletable={false}
                name="NOW"
                isLogin={isLogin}
              />
            )
        )}

        {/* 点線 */}
        <div className="border-dashed border-t-4 my-2 mx-3"></div>

        {/* WAIT */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "wait" && (
              <StatusAndQuestion
                key={index}
                onClick={onClickWait}
                id={questions[index].id}
                question={questions[index].question}
                bgColor="indigo"
                isDeletable={true}
                name="WAIT"
                onClickDel={onClickDel}
                isLogin={isLogin}
              />
            )
        )}

        {/* DONE */}
        {Object.keys(questions).map(
          (index) =>
            questions[index]["status-kbn"] === "done" && (
              <StatusAndQuestion
                key={index}
                onClick={onClickDone}
                id={questions[index].id}
                question={questions[index].question}
                bgColor="gray"
                isDeletable={true}
                name="DONE"
                onClickDel={onClickDel}
                isLogin={isLogin}
              />
            )
        )}
      </main>
      <Footer />
    </div>
  );
}
