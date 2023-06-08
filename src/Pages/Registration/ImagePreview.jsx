import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function ImagePreview({ profilePicture, onImageChange }) {
  const location = useLocation();

  return (
    <React.Fragment>
      <Box style={{ height: "100%", width: "50%" }}>
        <label htmlFor="profilePicture">
          <img
            src={
              profilePicture
                ? profilePicture
                : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
            }
            alt=""
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "12px",
            }}
          />
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            style={{ display: "none" }}
            onChange={(e) => onImageChange(e.target.files[0])}
          />
        </label>
      </Box>
    </React.Fragment>
  );
}

export default ImagePreview;
