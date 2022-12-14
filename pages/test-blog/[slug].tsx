import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'

type FrontMatter = {
  title: string
  date: string
}

type BlogProps = {
  frontMatter: FrontMatter
  markdown: string
}

export default function Blog({ frontMatter, markdown }: BlogProps) {
  console.log(frontMatter)
  console.log(markdown)

  if (!frontMatter) {
    return <></>
  }
  return (
    <div>
      <Head>
        <title>Test Blog | {frontMatter.title}</title>
      </Head>
      <h1>{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      <hr />
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

export const getStaticPaths = async () => {
  const filesInProjects = fs.readdirSync('./src/test-blogs')

  const paths = filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf('.'))

    return { params: { slug: filename } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  console.log('Params ', params.slug)

  const fileContent = await matter(
    fs.readFileSync(`./src/test-blogs/${params.slug}.md`, 'utf8')
  )
  const frontmatterData = fileContent.data
  console.log('Data: ', frontmatterData)

  const markdown = fileContent.content

  return {
    props: { frontMatter: frontmatterData, markdown: markdown },
  }
}
