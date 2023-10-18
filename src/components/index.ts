import React from "react";
import { SEO } from "./SEO";
const Navbar = React.lazy(() => import("./Navbar"));
const VideoPlayer = React.lazy(() => import("./VideoPlayer"));

export { Navbar, SEO, VideoPlayer };
