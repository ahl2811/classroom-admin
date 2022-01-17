import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
// components
import Sidebar from "../components/Sidebar";
import useUserContext from "../hooks/useUserContext";
import { Routes } from "../routes";
import { AppProvider } from "../store";
import { AdminsPage } from "./Admins";
import { ClassroomDetailsPage } from "./ClassroomDetails";
import { ClassroomsPage } from "./Classrooms";
import { AddPasswordPage } from "./commons/AddPassword";
import NotFoundPage from "./commons/NotFound";
import ServerError from "./commons/ServerError";
import Signin from "./commons/Signin";
import { AdminDetailsPage } from "./Settings";
import { UsersPage } from "./Users";

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

  const { user } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content pb-4">
              <Navbar />
              <div className="mt-2">
                <Component {...props} />
              </div>
              {/* <Footer toggleSettings={toggleSettings} showSettings={false} /> */}
            </main>
          </>
        ) : (
          <Redirect
            to={{
              pathname: Routes.Signin.path,
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
            <RouteWithLoader
              exact
              path={Routes.AddPassword.path}
              component={AddPasswordPage}
            />
            {/* pages */}
            <RouteWithSidebar
              exact
              path={Routes.AdminDetails.path}
              component={AdminDetailsPage}
            />
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
              path={Routes.ClassroomDetails.path}
              component={ClassroomDetailsPage}
            />
            <Redirect to={Routes.Signin.path} />
          </Switch>
        </AppProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
};
