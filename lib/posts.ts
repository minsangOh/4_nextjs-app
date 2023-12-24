import fs from "fs";
import path from "path";
import matter from "gray-matter";
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPsotsData() {
  // posts 파일 이름 잡아주기
  const fileNames = fs.readdirSync(postsDirectory);

  const allpostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\/md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...allpostsData(matterResult.data as { date: string; title: string }),
    };
  });

  // Sorting
  return allpostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
