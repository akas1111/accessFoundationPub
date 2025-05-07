"use client";
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardLayout from "./layouts";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENTID;
  const auth0Domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN;

  const protocol =
    process.env.NODE_ENV === "development" ? "http://" : "https://";

  const redirect_url = `${protocol}${siteDomain}`;

  return (
    <Auth0Provider
      domain={auth0Domain ?? ""}
      clientId={clientId ?? ""}
      authorizationParams={{
        redirect_uri: redirect_url,
        audience: `https://${auth0Domain}/api/v2/`,
        //audience: `https://login.axcessrent.com/`,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      useRefreshTokensFallback
    >
      <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        <HelmetProvider>
          <div>
            <Helmet>
              <title>Dashboard</title>
            </Helmet>
          </div>
          <DashboardLayout>{children}</DashboardLayout>
        </HelmetProvider>
      </ThemeProvider>
    </Auth0Provider>
  );
}
