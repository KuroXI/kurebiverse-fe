import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AnimeModal = () => {
  const isModalOpen = useSelector(
    (state: { modal: { isModalOpen: boolean } }) => state.modal.isModalOpen
  );

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  return <Box sx={style}>{animeName}</Box>;
};

export { AnimeModal };
