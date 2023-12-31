import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

// 게시글을 렌더링하는 React 컴포넌트입니다.
export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  // 게시글의 HTML 구조를 반환합니다.
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}




// 정적 경로를 생성하는 함수입니다.
export const getStaticPaths: GetStaticPaths = async () => {

  // 모든 게시글의 ID를 가져옵니다.
  const paths = getAllPostIds();
  console.log("paths", paths);

  // 정적으로 생성할 경로를 설정합니다.
  return {
    paths,
    fallback: false,
  };
};




// 정적 속성을 생성하는 함수입니다.
export const getStaticProps: GetStaticProps = async ({ params }) => {

  // 요청된 ID에 해당하는 게시글 데이터를 가져옵니다.
  const postData = await getPostData(params.id as string);
  
  // 가져온 게시글 데이터를 props로 전달합니다.
  return {
    props: {
      postData,
    },
  };
};
