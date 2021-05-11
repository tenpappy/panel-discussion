import Head from "next/head";
import { VFC } from "react";

type Props = {
  title: string;
  content: string;
};

export const HeadInfo: VFC<Props> = (props) => {
  const { title, content } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};
