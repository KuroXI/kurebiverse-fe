import {ReactElement, useEffect} from "react";
import ReactPortal from "./ReactPortal.tsx";
import {Close} from "@mui/icons-material";
import { Box } from "@mui/material";

interface ConfirmationModalProps {
  children: ReactElement
  isOpen: boolean
  handleClose: () => void
}

export default function ConfirmationModal({ children, isOpen, handleClose } : ConfirmationModalProps) {
  useEffect(() => {
    const closeOnESCKey = (event: KeyboardEvent) => event.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnESCKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnESCKey);
    }
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () : void => {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId={"modal-manga-information"}>
      <Box className={"z-50 transition duration-300 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0"}>
        <Box
          onClick={handleClose}
          className="fixed inset-0 backdrop-blur-[2px] transition-opacity"
        />
        <Box className={"relative w-auto x-auto max-w-3xl rounded-md overflow-x-hidden overflow-y-scroll bg-[#141414]"}>
          <Box className={"transform duration-300 relative flex-auto bg-white drop-shadow-md"}>
            <Box className={"relative max-h-[700px] bg-[#141414]"}>
              <Close
                onClick={handleClose}
                fontSize={"medium"}
                className={"z-[99] cursor-pointer top-[10px] right-[10px] bg-black bg-opacity-20 rounded-full text-white absolute"}
              />
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </ReactPortal>
  )
}