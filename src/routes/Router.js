import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
// import Discovery from "../pages/Discovery";
import MovieDetail from "../components/movie/MovieDetail";
// import FavoritePage from "../pages/Favorite";
import NoMatch from "../pages/NoMatchPage";

import LoginPage from "../pages/LoginPage";
import MoviesByGenre from "../components/MoviesByGenre";
import ParentComponent from "../components/MoviesBySearch";
import MoviesBySearch from "../components/MoviesBySearch";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/genre/:genreId/:genreName" element={<MoviesByGenre />} />
        <Route path="/search/" element={<MoviesBySearch />} />
      </Route>
    </Routes>
  );
}

export default Router;
