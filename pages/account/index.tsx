import type { ReactElement } from "react";
import Layout from "../../components/layout/layout";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient.js";
import Auth from "../../components/account/auth";
import Account from "../../components/account/account";

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
        <a href="/players" className="card">
          <h2>Players</h2>
          <p>Manage your players</p>
        </a>

        <a href="/games" className="card">
          <h2>Continue game</h2>
          <p>Continue your current game</p>
        </a>

        <a href="/stats" className="card">
          <h2>Stats</h2>
          <p>Who's the champion?</p>
        </a>

        <a href="/settings" className="card">
          <h2>Settings</h2>
          <p>Edit scoring rules, special hands and more</p>
        </a>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Manage players">{page}</Layout>;
};
