import React, { useEffect, useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { DisplayBlogs, StyledIcon } from "../../Components/Styles/commonStyles";
import { getBlogs } from "../../Services/Api";
import { Pagination, Stack, Typography } from "@mui/material";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [page, setpage] = useState(1);

  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    let response = await getBlogs();
    setblogs(response.data);

    console.log(blogs,"Blogs display")

  };
  return (
    <>
    <Stack direction={"row"} sx={{ position: "absolute", bottom: "15%", right: "5%", justifyContent:'center', alignItems:"center", gap:"0.1rem" }}>
      <StyledIcon >
      <ContentPasteIcon onClick={() => navigate("/add")}/>
      </StyledIcon>
      <Typography variant="h6">ADD</Typography>
      </Stack>

      <DisplayBlogs direction="row">
        {blogs
          .slice((page - 1) * 8, (page - 1) * 8 + 8)
          .map((curElem, index) => {
            
            return (
              <>
                <BlogCard curElem={curElem} index={index} setblogs={setblogs} />
              </>
            );
          })}
      </DisplayBlogs>
      <Pagination
        sx={{ position: "absolute", bottom: "5%", left: "45%" }}
        count={(blogs?.length / 7).toFixed(0)}
        onChange={(_, value) => {
          setpage(value);
        }}
      />
    </>
  );
};

export default Home;
