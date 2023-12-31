import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 현재 작업 디렉토리의 'posts' 폴더 경로를 설정합니다.
const postsDirectory = path.join(process.cwd(), "posts");




// 게시글 데이터를 정렬하여 반환하는 함수입니다.
export function getSortedPostsData() {

  // posts 디렉토리에서 파일 이름을 읽습니다.
  const fileNames = fs.readdirSync(postsDirectory);

  // 각 파일 이름을 사용하여 게시글 데이터를 가져옵니다.
  const allPostsData = fileNames.map((fileName) => {
    // 파일 이름에서 '.md' 확장자를 제거하여 ID를 생성합니다.
    const id = fileName.replace(/\.md$/, "");

    // 파일의 전체 경로를 설정합니다.
    const fullPath = path.join(postsDirectory, fileName);

    // 파일의 내용을 읽습니다.
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter를 사용하여 메타 데이터를 추출합니다.
    const matterResult = matter(fileContents);

    // id와 메타 데이터를 객체로 반환합니다.
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  // 게시글을 날짜별로 정렬합니다.
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}




// 모든 게시글 ID를 가져오는 함수입니다.
export function getAllPostIds() {

  // posts 디렉토리에서 파일 이름을 읽습니다.
  const fileNames = fs.readdirSync(postsDirectory);

  // 각 파일 이름을 ID로 변환하여 반환합니다.
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}




// 특정 게시글의 데이터를 가져오는 함수입니다.
export async function getPostData(id: string) {

  // 게시글의 전체 경로를 설정합니다.
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  // 게시글 내용을 읽습니다.
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matter를 사용하여 메타 데이터를 추출합니다.
  const matterResult = matter(fileContents);

  // remark를 사용하여 마크다운 내용을 HTML로 변환합니다.
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // id, 변환된 HTML 내용, 메타 데이터를 객체로 반환합니다.
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
