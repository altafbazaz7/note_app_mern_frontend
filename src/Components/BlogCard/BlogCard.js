import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { BlogCard } from "../Styles/commonStyles";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { deleteBlog } from "../../Services/Api";


export default function ActionAreaCard(props) {
  const getId = props.curElem._id;
  const navigate = useNavigate();


  const handleUpdateBlog =  (id) => {
    console.log("id",id)
    navigate(`/update/${id}`);
  };


  const handleDeleteBlog = async (id) => {
    try {
      const res = await deleteBlog(id);
      props.setblogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  

  return (
    <>
  
      <BlogCard>
      <CardActionArea>
        <CardContent onClick={() => navigate(`view/${props.curElem._id}`)}>
        <Stack direction={"row"} gap={"1rem"}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {props.curElem.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.curElem.description.length > 100
              ? props.curElem.description.slice(0, 100) + "..."
              : props.curElem.description}
          </Typography>
             
          </Box>
          <Box>
          <img src={props.curElem.image}  height={"130px"} width={"170px"} alt="" srcset="" />

          </Box>
          </Stack>

        </CardContent>

      </CardActionArea>

      <Stack
        position={"relative"}
        direction={"row"}
        sx={{ cursor: "pointer" }}
        >
        <Edit   onClick={() => handleUpdateBlog(getId)}/>
        <DeleteIcon onClick={() => handleDeleteBlog(getId)} />
      </Stack>
    </BlogCard>
    
 
    </>
  );
}
