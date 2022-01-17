import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
// components
import Sidebar from "../components/Sidebar";
import { Routes } from "../routes";
import { AdminsPage } from "./Admins";
import { ClassroomsPage } from "./Classrooms";
import NotFoundPage from "./commons/NotFound";
import ServerError from "./commons/ServerError";
import Signin from "./commons/Signin";
import Settings from "./Settings";
import { UsersPage } from "./Users";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "../store";
import useUserContext from "../hooks/useUserContext";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  const { user } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
              <Footer toggleSettings={toggleSettings} showSettings={false} />
            </main>
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const HomePage = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Switch>
            <RouteWithLoader
              exact
              path={Routes.Signin.path}
              component={Signin}
            />
            <RouteWithLoader
              exact
              path={Routes.NotFound.path}
              component={NotFoundPage}
            />
            <RouteWithLoader
              exact
              path={Routes.ServerError.path}
              component={ServerError}
            />
            {/* pages */}
            <RouteWithSidebar
              exact
              path={Routes.Admins.path}
              component={AdminsPage}
            />
            <RouteWithSidebar
              exact
              path={Routes.Users.path}
              component={UsersPage}
            />
            <RouteWithSidebar
              exact
              path={Routes.Classrooms.path}
              component={ClassroomsPage}
            />
            <RouteWithSidebar
              exact
              path={Routes.AdminDetails.path}
              component={Settings}
            />
            <Redirect to={Routes.Signin.path} />
          </Switch>
        </AppProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
};
