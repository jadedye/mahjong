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
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Hand scorer"
      description="Do you really want to know how much you could have gotten?"
    >
      {page}
    </Layout>
  );
};
