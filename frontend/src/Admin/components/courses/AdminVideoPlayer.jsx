/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import ReactPlayer from "react-player";

const AdminVideoPlayer = ({ videoLink, setVideoLink }) => {
  const [duration, setDuration] = useState(0);

  const handleProgress = ({ playedSeconds }) => {
    const remainingTime = duration - playedSeconds;
    if (remainingTime <= 1) {
      runFunction();
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const runFunction = () => {
    setVideoLink((value) => value + 1);
  };

  return (
    <div
      className="video-wrapper"
      onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
    >
      <ReactPlayer
        key={videoLink} // Force re-render on videoLink change
        url={videoLink}
        controls
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
        s
        playing={true} // Enable autoplay
        width="100%"
        height="auto"
        onError={(e) => console.error("Error loading video", e)}
        onProgress={handleProgress}
        onDuration={handleDuration} // Capture video duration
      />
    </div>
  );
};

export default AdminVideoPlayer;
