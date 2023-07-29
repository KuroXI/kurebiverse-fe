import { Info, PlayArrow } from "@mui/icons-material";
import { Box } from "@mui/material";

const Hero = () => {
  return (
    <Box className="bg-[#333333] xl:h-[90vh] lg:h-[80vh] md:h-[70vh] sm:h-[60vh] h-[50vh] flex justify-start items-center text-white relative">
      <Box
        className="absolute w-full h-full flex items-center justify-center"
        style={{
          boxShadow: "0 0 5px 20px #141414",
          backgroundColor: "#141414",
        }}
      >
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none bg-gradient-to-r from-[#141414] to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none bg-gradient-to-t from-[#141414] to-transparent"></div>
        <img
          src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/21519-1ayMXgNlmByb.jpg"
          alt="video-demo"
          className="object-cover h-full w-full"
        />
      </Box>
      <Box className="pl-16 text-xl z-20">
        <h2 className="font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl">
          Kimi No Na Wa
        </h2>
        <Box className="">
          <Box className="flex gap-5 my-3">
            <p className="text-[#6adf34] font-bold">73% Match</p>
            <p>2023</p>
            <p>4 episodes</p>
          </Box>
          <p className="w-1/3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur...
          </p>
        </Box>
        <Box className="flex justify-start items-center text-center gap-5 mt-10">
          <button className="px-10 py-5 bg-white rounded-sm font-bold">
            <p className="text-black">
              <span className="mr-2">
                <PlayArrow className="text-xl" />
              </span>
              Watch Episode 1
            </p>
          </button>
          <button className="px-10 py-5 bg-[#424242] rounded-sm font-bold">
            <p>
              <span className="mr-2">
                <Info />
              </span>
              More Information
            </p>
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
