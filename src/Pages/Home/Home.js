import React, { useEffect, useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { DisplayBlogs, StyledIcon } from "../../Components/Styles/commonStyles";
import { getBlogs } from "../../Services/Api";
import { Pagination, Stack, Typography } from "@mui/material";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    let response = await getBlogs();
    setBlogs(response.data);
    setTotalPages(Math.ceil(response.data.length / 6));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * 6;
  const endIndex = page * 6;
  const displayedBlogs = blogs.slice(startIndex, endIndex);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.1rem",
        }}
      >
        <StyledIcon>
          <ContentPasteIcon onClick={() => navigate("/add")} />
        </StyledIcon>
        <Typography variant="h6">ADD</Typography>
      </Stack>

      <DisplayBlogs direction="row">
        {displayedBlogs.map((blog) => (
          <BlogCard key={blog.id} curElem={blog} setBlogs={setBlogs} />
        ))}
      </DisplayBlogs>

      <Pagination
        sx={{ position: "absolute", bottom: "5%", left: "45%" }}
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
};

export default Home;
