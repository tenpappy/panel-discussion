import React, { VFC } from "react";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { supabase } from "../../util/supabase";

type Props = {
  title: string;
  isLogin: boolean;
  setIsLogin: any;
};

export const Header: VFC<Props> = (props) => {
  const { title, isLogin, setIsLogin } = props;
  const onClickLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
      console.log(error.message);
      console.log(error);
    } else {
      setIsLogin();
    }
  };
  return (
    <header className="flex h-10 mb-2 p-2 bg-gray-700 text-white">
      <p>{title}</p>
    </header>
  );
};
