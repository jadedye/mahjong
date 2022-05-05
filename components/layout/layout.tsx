import Navbar from './navbar'
import Footer from './footer'
import Head from 'next/head'

export default function Layout(props: any) {
  return (
    <div>
     
      <Head>
        <title>Mahjong scorer</title>
        <meta name="description" content="Keep track of your mahjong games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <header className="header">
          <h1 className="title">
          {props.title? props.title: "Mahjong scorer"}
        </h1>

        <p className="description">
          {props.description? props.description: "Keep track of your mahjong games"}
        </p>
          </header>

      <main className="main">
          
        
          {props.children}
        </main>

      <Footer />
    </div>
  )
}