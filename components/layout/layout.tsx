import Navbar from "./navbar";
import Footer from "./footer";
import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Layout(props: any) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
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
          {props.title ? props.title : "Mahjong scorer"}
        </h1>

        <p className="description">
          {props.description
            ? props.description
            : "Keep track of your mahjong games"}
        </p>
      </header>

      <main className="main">{props.children}</main>

      <Footer />
    </div>
  );
}
