import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '../src/components/Layout'

type Blog = {
  title: string
  date: Date
  slug: string
}

export default function Home({ blogs }: { blogs: Blog[] }) {
  if (!blogs.length) {
    return <></>
  }

  return (
    <Layout home>
      <h1>Mikas Blog</h1>
      <ul>
        {blogs.map((blog) => {
          const date = renderDateToLocaleString(blog.date)

          return (
            <li key={blog.slug}>
              <Link href={`/blog/${blog.slug}`}>
                <span>{`${date}: ${blog.title}`}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )

  function renderDateToLocaleString(date: Date) {
    return new Date(date)
      .toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      })
      .split('.')
      .join('/')
  }
}

export async function getStaticProps() {
  const files = fs.readdirSync('./src/blogs')
  const blogs = files.map((file) => {
    const fileName = fs.readFileSync(`./src/blogs/${file}`)
    const matterData = matter(fileName)

    return {
      ...matterData.data,
      slug: file.slice(0, file.indexOf('.')),
    }
  })

  return {
    props: {
      blogs,
    },
  }
}
