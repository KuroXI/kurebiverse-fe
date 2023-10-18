import React from 'react';

const Navbar = React.lazy(() => import('./Navbar'));
const SEO = React.lazy(() => import('./SEO'));
const VideoPlayer = React.lazy(() => import('./VideoPlayer'));

export { Navbar, SEO, VideoPlayer };