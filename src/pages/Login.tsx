import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { BaseForm } from "../components/organism/BaseForm";
import { supabase } from "../util/supabase";
import Router from "next/router";
import { useState } from "react";

type IForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<IForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignin = async ({ email, password }: IForm) => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      Router.push("/");
    }
  };

  const inputList = [
    {
      type: "email",
      ...register("email", { required: true }),
      placeholder: "Username",
    },
    {
      type: "password",
      ...register("password", { required: true }),
      placeholder: "Password",
    },
  ];

  return (
    <div>
      <BaseForm
        onSubmit={handleSubmit(handleSignin)}
        inputList={inputList}
        buttonText="ログイン"
        errorMessage={errorMessage}
      />
    </div>
  );
}
