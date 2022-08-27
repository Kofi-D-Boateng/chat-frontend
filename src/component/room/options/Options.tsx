import { FC, MouseEvent } from "react";
import Play from "@mui/icons-material/PlayCircleFilledOutlined";
import Pause from "@mui/icons-material/Pause";
import Group from "@mui/icons-material/Group";
import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import Chat from "@mui/icons-material/Chat";
import Share from "@mui/icons-material/Share";
import { IconButton, Badge, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Options: FC<{
  onSetVideo: () => void;
  onSetAudio: () => void;
  onHide: () => void;
  onLeave: (e: MouseEvent<HTMLButtonElement>) => void;
  onLink: () => void;
  length: number;
  count: number;
  isMobile: boolean;
}> = ({ onHide, onSetAudio, onSetVideo, length, onLeave, count, onLink }) => {
  const video = useSelector((state: RootState) => state.video);

  return (
    <>
      <IconButton sx={{ color: "white", margin: "0 10px" }} onClick={onLink}>
        <Share fontSize="large" />
      </IconButton>
      <IconButton
        sx={{ color: "white" }}
        children={
          <Badge badgeContent={length + 1}>
            <Group fontSize="large" />
          </Badge>
        }
      />
      {video.canHear ? (
        <IconButton
          sx={{ color: "white", margin: "0 10px" }}
          value="mute"
          onClick={onSetAudio}
        >
          <Mic fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          sx={{ color: "white", margin: "0 10px" }}
          value="unmute"
          onClick={onSetAudio}
        >
          <MicOff fontSize="large" />
        </IconButton>
      )}
      {video.isPlaying ? (
        <IconButton
          sx={{ color: "white", margin: "0 10px" }}
          value="pause"
          onClick={onSetVideo}
          size="small"
          children={<Pause fontSize="large" />}
        />
      ) : (
        <IconButton
          sx={{ color: "white", margin: "0 10px" }}
          value="play"
          onClick={onSetVideo}
          size="small"
          children={<Play fontSize="large" />}
        />
      )}
      <IconButton
        sx={{ color: "white", margin: "0 10px" }}
        onClick={onHide}
        children={
          <Badge style={{ color: "white" }} badgeContent={count}>
            <Chat fontSize="large" />
          </Badge>
        }
      />
      <Button
        id="leave-room-btn"
        sx={{ flexGrow: "1", margin: "0 10px" }}
        variant="contained"
        color="error"
        size="small"
        value="Leave"
        onClick={onLeave}
      >
        Leave
      </Button>
    </>
  );
};

export default Options;
