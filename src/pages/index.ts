import React from "react";

const LandingPage = React.lazy(() => import("./LandingPage"));
const WatchPage = React.lazy(() => import("./WatchPage"));
const Authentication = React.lazy(() => import("./Authentication"));
const Discover = React.lazy(() => import("./Discover"));

export { Authentication, LandingPage, WatchPage, Discover };
