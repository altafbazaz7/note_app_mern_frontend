import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  BlogStack,
  FormatStack,
  IconStack,
  StyledBox,
  StyledIcon,
} from "../../Components/Styles/commonStyles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Edit from "@mui/icons-material/Edit";

import HomeIcon from "@mui/icons-material/Home";
import { TextField } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { addBlog, getBlog, updateBlog } from "../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";

const EditBlogSpot = () => {
  const { id } = useParams();
  const [oldState, setOldState] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [editBlog, setEditBlog] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const navigate = useNavigate();

  // the selected ID state is not needed since it can be obtained from the URL parameter
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(id);
        setOldState({
          title: res.data.title,
          description: res.data.description,
          image: res.data.image,
        });
        setEditBlog({
          title: res.data.title,
          description: res.data.description,
          image: res.data.image,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (event) => {
    setEditBlog({
      ...editBlog,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = async (event) => {
    try {
      await updateBlog(id, editBlog);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction="row">
      <IconStack direction="column">
        <StyledIcon>
          <Edit onClick={() => handleEdit(id)} />
        </StyledIcon>
      </IconStack>
      <BlogStack direction="column">
        <StyledBox>
          <FormatStack direction="row">
            <FormatBoldIcon onClick={() => setBold(!bold)} />
            <FormatItalicIcon onClick={() => setItalic(!italic)} />
            <FormatUnderlinedIcon onClick={() => setUnderline(!underline)} />
            <AttachmentIcon type="file" />
          </FormatStack>
          <TextField
            sx={{
              fontWeight: bold ? "bold" : "light",
              fontStyle: italic ? "italic" : "normal",
              textDecoration: underline ? "underline" : "none",
            }}
            onChange={handleChange}
            name="title"
            value={editBlog.title}
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
            value={editBlog.description}
            label="Description"
            multiline
            rows={14}
          />
          <img src={editBlog.image} style={{height:"320px", width:"320px", position:"absolute", top:"15%", right:"1%"}} alt="" srcset="" />
        </StyledBox>

      </BlogStack>
    </Stack>
  );
};

export default EditBlogSpot;
