import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import LoadingScreen from "./LoadingScreen";
import MovieBox from "./movie/MovieBox";
import { Box, Grid } from "@mui/material";
import NoMatchPage from "../pages/NoMatchPage";
import MoviesByGenre from "./MoviesByGenre";
import MoviesBySearch from "./MoviesBySearch";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function MSearchBar() {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const q = searchParams.get("query");

  const [query, setQuery] = useState(q ? q : "");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/?query=${query}`);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            name="q"
            placeholder="Search"
            defaultValue={query ?? undefined}
            inputProps={{ "arial-label": "search" }}
            onChange={handleSearchChange}
          />
          <input type="submit" hidden /> {/* hidden submit button */}
        </Search>
      </Box>
    </>
  );
}

export default MSearchBar;
