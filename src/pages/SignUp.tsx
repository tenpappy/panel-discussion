import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { BaseForm } from "../components/organism/BaseForm";
import { supabase } from "../util/supabase";

type IForm = {
  email: string;
  password: string;
  passwordConf: string;
};

export default function SignUp() {
  const { register, handleSubmit } = useForm<IForm>();
  const handleSignup = ({ email, password }: IForm) => {
    supabase.auth.signUp({ email, password });
  };

  const inputList = [
    { type: "email", name: "email", ...register("email", { required: true }) },
    {
      type: "password",
      name: "password",
      ...register("password", { required: true }),
    },
    {
      type: "password",
      name: "passwordConf",
      ...register("passwordConf", { required: true }),
    },
  ];

  return (
    <div>
      <p className="text-4xl text-green-600 ">新規登録処理実装中です</p>

      <BaseForm
        onSubmit={handleSubmit(handleSignup)}
        inputList={inputList}
        buttonText="サインアップ"
      />
    </div>
  );
}
