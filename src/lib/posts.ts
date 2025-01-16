import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const defaultLocale = 'en'
const postsDirectory = path.join(process.cwd(),'posts')

export function getSortedPostsData(locale: string) {
  const _postsDirectory = defaultLocale == locale ? postsDirectory : path.join(postsDirectory, locale)

  // 获取 posts 目录下的文件名并过滤
  const fileNames = fs.readdirSync(_postsDirectory)
    .filter(fileName => {
      // 只保留 .md 文件
      const isMarkdown = fileName.endsWith('.md')
      // 忽略以 . 开头的隐藏文件
      const isNotHidden = !fileName.startsWith('.')
      // 确保是文件而不是目录
      const isFile = fs.statSync(path.join(_postsDirectory, fileName)).isFile()
      
      return isMarkdown && isNotHidden && isFile
    })
    
  const allPostsData = fileNames.map((fileName) => {
    // 移除 ".md" 获取文件名作为 id
    const id = fileName.replace(/\.md$/, '')

    // 读取 markdown 文件内容
    const fullPath = path.join(_postsDirectory, fileName)
    console.log("-----", fullPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 使用 gray-matter 解析 markdown 文件的元数据
    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as { date: string; title: string; description: string })
    }
  })

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(id: string, locale: string) {
  const _postsDirectory = defaultLocale == locale ? postsDirectory : path.join(postsDirectory, locale)
  const fullPath = path.join(_postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用 gray-matter 解析 markdown 文件的元数据
  const matterResult = matter(fileContents)

  // 使用 remark 将 markdown 转换为 HTML 字符串
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; description: string })
  }
}
