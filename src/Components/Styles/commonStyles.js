import { Icon, Stack } from '@mui/material';
import {styled} from '@mui/material/styles';
import theme from './websiteTheme';

export const StyledIcon = styled(Icon)(({ theme }) => ({
    background: theme.palette.primary.main,
    padding:'10px',
    borderRadius:"20%",
    width:"2rem"
  }));

  
export const IconStack = styled(Stack)(({ theme }) => ({
    backgroundColor:"white",
    width:"10vw",
    height:"100vh",
    displat:"flex",
    alignItems:"center",
    rowGap:"1rem",
    borderRight:"3px solid silver",
    cursor:"pointer",

  }));

  export const BlogStack = styled(Stack)(({ theme }) => ({
    width:"75%",
    height:"100vh",

    backgroundColor:"white",
    alignItems:"center"
  }));

  export const StyledBox = styled(Stack)(({ theme }) => ({
    width:"80%",
    border:"1px solid black",
    marginTop:"2.5%",
    backgroundColor: theme.palette.primary.main,
    color:"black"
  }));

  export const FormatStack = styled(Stack)(({ theme }) => ({
    justifyContent:"center",
    columnGap:"1rem",
    alignItems: "center",
    padding:"0px 10px"
  }));


  export const DisplayBlogs = styled(Stack)(({ theme }) => ({
    display:"flex",
    justifyContent:"space-evenly",
    flexWrap: "wrap",
    gap:"1rem",
    marginTop:"2.5%",
  }));

  export const BlogCard = styled(Stack)(({ theme }) => ({
    width:"500px",
    padding:"0rem 2rem",
    backgroundColor: theme.palette.primary.main,
    borderRadius:"15px",
    height:"auto",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:'center'
  }));