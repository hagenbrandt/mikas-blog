import Head from 'next/head'
import Body from 'next/head'
import Link from 'next/link'

type LayoutProps = {
  children: React.ReactNode
  home?: boolean
}

const Layout = ({ children, home }: LayoutProps) => {
  return (
    <div>
      <Head>
        <meta name="description" content="Mikas Blog" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content="Mikas Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <header>{!home && <Link href="/">Home</Link>}</header>
        <div>{children}</div>
        <footer></footer>
      </Body>
    </div>
  )
}

export default Layout
