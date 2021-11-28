import React from "react";
import "styles/global.scss";
import "styles/components/index.scss";
import NavbarCustom from "components/NavbarCustom";;
import { AuthProvider } from "util/auth";
import { QueryClientProvider } from "util/db";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <>
          <NavbarCustom
            bg="white"
            variant="light"
            expand="md"
            logo="/logo.png"
          />
          <Component {...pageProps} />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
