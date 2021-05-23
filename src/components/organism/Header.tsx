import React, { VFC } from "react";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  title: string;
};

export const Header: VFC<Props> = (props) => {
  const { title } = props;
  const iconStyle: React.CSSProperties = { margin: 4, width: 16 };

  return (
    <header className="flex h-10 mb-2 p-2 bg-gray-700 text-white">
      <p>{title}</p>
      <div className="flex w-20 ml-auto">
        <Link href="/Login">
          <a>ログイン</a>
        </Link>
        <Link href="/Login">
          <a>
            <FontAwesomeIcon
              icon={faSignInAlt}
              // className="cursor-pointer w-4 pt-1 ml-1"
              className="cursor-pointer"
              style={iconStyle}
            />
          </a>
        </Link>
      </div>
    </header>
  );
};
