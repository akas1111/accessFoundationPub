//"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/app/(DashboardLayout)/layouts/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layouts/sidebar/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "@/utils/UserContext";
import LoadingScreen from "./shared/LoadingScreen";
import { USER } from "@/utils/endpoints";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Footer from "./footer";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "80px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface DProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  //user details & at from private api
  const [userData, setUserData] = useState<any>({});
  const hasUserData = useRef(false);
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    error,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      user &&
      !userData?.at &&
      !hasUserData.current
    ) {
      //debug
      console.log(
        isLoading,
        isAuthenticated,
        user,
        userData?.at,
        hasUserData.current
      );
      const getAccessToken = async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          //{cacheMode: "off"}
          console.log("ATOK");
          //hit users private api using the token
          const resp = await axios
            .post(USER.getInitalInfo, {
              token: accessToken,
              email: user?.email,
            })
            .catch((e) => {
              console.error("unauthorized user", e);
            });
          const data = resp?.data?.data ?? {};
          hasUserData.current = true; //extra flag
          setUserData((dt: any) => ({ at: accessToken, ...data, ...dt }));
        } catch (e: any) {
          console.log(e?.message);
        }
      };
      getAccessToken();
    }
  }, [isLoading, isAuthenticated, user]);

  if (isLoading && true) {
    return <LoadingScreen text="Loading..." />;
  }
  if (error) {
    console.log(error);
    logout({ logoutParams: { returnTo: window.location.origin } });
    return <h2 style={{ textAlign: "center" }}>Error occured...</h2>;
  }
  if (isAuthenticated && user) {
    if (userData?.at != null) {
      return (
        <div style={{ position: "relative" }}>
          <UserContext.Provider value={userData}>
            <MainWrapper className="mainwrapper">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
              />
              <PageWrapper className="page-content-wrapper">
                <Header
                  toggleMobileSidebar={() => setMobileSidebarOpen(true)}
                />
                <Container
                  maxWidth={false}
                  sx={{
                    paddingTop: "20px",
                    //maxWidth: "1200px",
                    minHeight: "60vh",
                  }}
                >
                  <Box
                  //sx={{ minHeight: "calc(100vh - 170px)" }}
                  >
                    {children}
                  </Box>
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    pauseOnHover={false}
                    draggable={false}
                    limit={1}
                    toastClassName="axs-toast"
                  />
                </Container>
              </PageWrapper>
            </MainWrapper>
          </UserContext.Provider>
          <Footer />
        </div>
      );
    } else {
      return <LoadingScreen text="Preparing your account..." />;
    }
  } else {
    loginWithRedirect();
    return;
  }
}
