import type { ReactElement } from "react";
import Layout from "../../components/layout/layout";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient.js";
import Auth from "../../components/account/auth";
import Account from "../../components/account/account";
import Link from "next/link";

export default function Page() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <div>
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
      <div className="grid">
        <Link href="/games/new" className="card">
          <h2>Start new game</h2>
          <p>Player 1 enters the fray...</p>
        </Link>

        <Link href="/games/current" className="card">
          <h2>Continue game</h2>
          <p>Continue your current game</p>
        </Link>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Games" description="Get your tiles out!">
      {page}
    </Layout>
  );
};
