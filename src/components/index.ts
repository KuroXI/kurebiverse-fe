import { lazy } from "react";
import { SEO } from "./SEO";
const Navbar = lazy(() => import("./Navbar"));

export { Navbar, SEO };
