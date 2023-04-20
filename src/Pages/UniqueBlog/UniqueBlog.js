import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BlogStack,
  IconStack,
  StyledBox,
  StyledIcon,
} from "../../Components/Styles/commonStyles";
import HomeIcon from "@mui/icons-material/Home";
import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getBlog, textToSpeech } from "../../Services/Api";

const BlogSpot = () => {

  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleTextToSpeech = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("voice_code", "en-US-1");
    encodedParams.append("text", blog.description);
    encodedParams.append("speed", "1.00");
    encodedParams.append("pitch", "1.00");
    encodedParams.append("output_type", "audio_url");

    const options = {
      method: 'POST',
      url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'db50af9302msh8b97730b421dc48p1756c2jsn595b690ce03b',
        'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
      },
      data: encodedParams
    };

    axios.request(options)
      .then((response) => {
        console.log(response.data.result.audio_url, "audioURL")

        setAudioUrl(response.data.result.audio_url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [blog, setblog] = useState({
    title: "",
    description: "",
    image: ""
  });
  const loadBlogDetails = async () => {
    const response = await getBlog(id);
    setblog(response.data);
  };

  useEffect(() => {
    loadBlogDetails();
  

  }, []);

 
 

  const navigate = useNavigate();
  const { id } = useParams();



  return (
    <Stack direction="row" >
      <IconStack direction="column">
        <StyledIcon>
          <HomeIcon onClick={() => navigate("/")} />

        </StyledIcon>
      </IconStack>
      <BlogStack direction="row" style={{width:"75vw", position:"absolute",left:'15%' }}>
      <button style={{cursor:"pointer"}} onClick={handleTextToSpeech}>Convert to Audio</button>

        <StyledBox sx={{ backgroundColor: "white !important" }}>
          <TextField
            read-only
            name="title"
            value={blog.title}
            label="Title"
            multiline
          />
          <TextField
            read-only
            name="description"
            value={blog.description}
            label="Description"
            multiline
            rows={14}
          />
        </StyledBox>
        <img src={blog.image} style={{height:"200px", width:"350px"}}/>
      {audioUrl && !isPlaying && <button   onClick={handlePlay}>Play Audio</button>}
      {audioUrl && isPlaying && <button  onClick={handleStop}>Stop Audio</button>}

      </BlogStack>
    </Stack>
  );
};

export default BlogSpot;
