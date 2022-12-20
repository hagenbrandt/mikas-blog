import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Head from 'next/head'
import Layout from '../../src/components/Layout'

type FrontMatter = {
  title: string
  date: string
}

type BlogProps = {
  frontMatter: FrontMatter
  markdown: string
}

export default function Blog({ frontMatter, markdown }: BlogProps) {
  if (!frontMatter) {
    return <></>
  }
  return (
    <Layout>
      <div>
        <Head>
          <title>Test Blog | {frontMatter.title}</title>
        </Head>
        <article>
          <h1>{frontMatter.title}</h1>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const filesInProjects = fs.readdirSync('./src/blogs')

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
  const fileContent = await matter(
    fs.readFileSync(`./src/blogs/${params.slug}.md`, 'utf8')
  )
  const frontmatterData = fileContent.data
  const markdown = fileContent.content

  return {
    props: { frontMatter: frontmatterData, markdown: markdown },
  }
}
