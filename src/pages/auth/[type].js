import React from "react";
import { useRouter } from "next/router";
import Meta from "components/Meta";
import AuthSection from "components/AuthSection";

function AuthPage(props) {
  const router = useRouter();

  return (
    <>
      <Meta title="Auth" />
      <AuthSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        type={router.query.type}
        providers={["google"]}
        afterAuthPath={router.query.next || "/"}
      />
    </>
  );
}

export const getStaticPaths = () => ({
  paths: [
    { params: { type: "signin" } },
    { params: { type: "signup" } },
    { params: { type: "forgotpass" } },
    { params: { type: "changepass" } },
  ],
  fallback: true,
});

export function getStaticProps({ params }) {
  return { props: {} };
}

export default AuthPage;
