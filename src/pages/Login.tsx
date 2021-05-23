import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { BaseForm } from "../components/organism/BaseForm";
import { supabase } from "../util/supabase";
import Router from "next/router";

type IForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<IForm>();
  const handleSignin = async ({ email, password }: IForm) => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      alert(error);
      console.log(error.message);
      console.log(error);
    } else {
      Router.push("/");
    }
  };

  const inputList = [
    {
      type: "email",
      ...register("email", { required: true }),
      // placeholder: "Username",
    },
    {
      type: "password",
      ...register("password", { required: true }),
      // placeholder: "Password",
    },
  ];

  const onClickLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
      console.log(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="bg-yellow-600 text-green-600 text-3xl hover:bg-red-900">
        ログイン、ログアウト機能実装中！！！！！！！！！
      </h1>
      <button className="bg-yellow-400" onClick={onClickLogout}>
        ログアウト
      </button>
      <BaseForm
        onSubmit={handleSubmit(handleSignin)}
        inputList={inputList}
        buttonText="ログイン"
      />
    </div>
  );
}
