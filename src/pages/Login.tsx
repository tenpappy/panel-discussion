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
      name: "email",
      ...register("email", { required: true }),
    },
    {
      type: "password",
      name: "password",
      ...register("password", { required: true }),
    },
  ];

  return (
    <div>
      <p className="text-4xl text-green-600 ">ログイン処理実装中です</p>
      <BaseForm
        onSubmit={handleSubmit(handleSignin)}
        inputList={inputList}
        buttonText="サインイン"
      />
    </div>
  );
}
