import { getAllPostIds, getPostData, getSortedPsotsData } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div>
      <Head>
        <title> {postData.title} </title>
      </Head>
      <article>
        <h1> {postData.title} </h1>
        <div>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}>

        </div>
      </article>

    </div>
  )
};

export default Post;

export const getstaticPath: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  // [{params: { id: 'pre-rendering'}. {param...}}] 이런식으로 들어있음

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFata = await getPostData(params.id as string);

  return {
    props: {
      postData,
    },
  };
};
