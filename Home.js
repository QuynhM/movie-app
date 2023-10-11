import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import data from "../data/data.json";
import { styled } from "@mui/material/styles";

const PaginationStyle = styled(Pagination)(() => ({
  color: "white",
  marginBottom: "7px",
  justifyContent: "center",
  display: "flex",
}));
function Home() {
  const jobsPerPage = 5;
  const totalPages = Math.ceil(data.length / jobsPerPage);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search

  // Filter jobs based on search term
  const filteredJobs = data.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const start = (currentPage - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    setJobs(filteredJobs.slice(start, end));
  }, [currentPage, filteredJobs]);

  return (
    <Container sx={{ p: 3 }} maxWidth="lg">
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid key={job.id} item md={4} sm={6} xs={12}>
            <JobCard
              id={job.id}
              title={job.title}
              skills={job.skills}
              description={job.description}
            />
          </Grid>
        ))}
      </Grid>
      <PaginationStyle
        count={totalPages}
        onChange={(event, value) => {
          setCurrentPage(value);
        }}
        sx={{ marginTop: "40px" }}
      />
    </Container>
  );
}

export default Home;
