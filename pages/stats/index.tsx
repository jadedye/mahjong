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
        <p>There will be stats...</p>
      </div>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Stats" description="See your player and game stats here!">
      {page}
    </Layout>
  );
};
