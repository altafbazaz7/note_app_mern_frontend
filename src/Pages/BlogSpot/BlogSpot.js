import { Stack } from "@mui/system";
import React, { useState } from "react";
import {
  BlogStack,
  FormatStack,
  IconStack,
  StyledBox,
  StyledIcon,
} from "../../Components/Styles/commonStyles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, TextField, Typography } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import FileBase from "react-file-base64";

import { addBlog } from "../../Services/Api";
import { useNavigate } from "react-router-dom";

const BlogSpot = () => {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleAdd = async () => {
    await addBlog(blog);
    navigate("/");
    
  };

  return (
    <Stack direction="row">
      <IconStack direction="column">
        <StyledIcon>
          <HomeIcon onClick={() => navigate("/")} />
        </StyledIcon>
        <StyledIcon>
          <ContentPasteIcon onClick={handleAdd} />
        </StyledIcon>

      </IconStack>
      <BlogStack direction="column">
        <StyledBox>
          <FormatStack direction="row">
            <FormatBoldIcon onClick={() => setBold(!bold)} />
            <FormatItalicIcon onClick={() => setItalic(!italic)} />
            <FormatUnderlinedIcon onClick={() => setUnderline(!underline)} />
            <FileBase
            type="file"
            multiple={false}
            onDone={({ base64, file }) => {
              if (file.size > 50000) {
                alert("File size should not exceed 50 KB.");
              } else {
                setBlog({ ...blog, image: base64 });
              }
            }}
          />
          </FormatStack>
          <TextField
            sx={{
              fontWeight: bold ? "bold" : "light",
              fontStyle: italic ? "italic" : "normal",
              textDecoration: underline ? "underline" : "none",
            }}
            onChange={handleChange}
            name="title"
            value={blog.title}
            label="Title"
            multiline
          />
          <TextField
            sx={{
              fontWeight: bold ? "bold" : "light",
              fontStyle: italic ? "italic" : "normal",
              textDecoration: underline ? "underline" : "none",
            }}
            onChange={handleChange}
            name="description"
            label="Description"
            multiline
            rows={14}
          />
  

        </StyledBox>
      </BlogStack>
    </Stack>
  );
};

export default BlogSpot;
