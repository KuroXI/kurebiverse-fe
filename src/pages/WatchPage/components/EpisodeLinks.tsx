import { useState, FC, useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import { proxyImage } from "@/lib/utils";
import { Link } from "react-router-dom";
import { IEpisode } from "@/type/Anime";
import { PlayArrow } from "@mui/icons-material";

interface Props {
	data: IEpisode[] | undefined;
	animeId: string | undefined;
	currentPageNumber: number;
	dataIsLoading: boolean;
	episodeNumber: number;
}

const EpisodeLinks: FC<Props> = ({ data, animeId, currentPageNumber, dataIsLoading, episodeNumber }: Props) => {
	const [currentPage, setCurrentPage] = useState(currentPageNumber);
	const episodesPerPage = 12;
	const totalPages = Math.ceil((data?.length || 0) / episodesPerPage);
	const startIndex = (currentPage - 1) * episodesPerPage;
	const endIndex = startIndex + episodesPerPage;

	const handlePageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setCurrentPage(event.target.value as number);
	};

	const pageOptions = Array.from({ length: totalPages }, (_, index) => ({
		label: `${index + 1}`,
		value: index + 1,
	}));

	const episodeLinks = useMemo(() => {
		if (data) {
			const episodesForCurrentPage = data.slice(startIndex, endIndex);

			if (episodesForCurrentPage) {
				return episodesForCurrentPage.map((episode, index) => (
					<Link
						key={`${episode.title}-${index}`}
						to={
							currentPage === 1
								? `/watch/${animeId}?episodeId=${episode.id}&episodeNumber=${
										currentPage === 1 ? index + 1 : index + 1 + episodesPerPage * (currentPage - 1)
								  }`
								: `/watch/${animeId}?episodeId=${episode.id}&page=${currentPage}&episodeNumber=${
										currentPage === 1 ? index + 1 : index + 1 + episodesPerPage * (currentPage - 1)
								  }`
						}
					>
						<Box
							sx={{
								display: "flex",
								position: "relative",
								alignItems: "center",
								marginBottom: "10px",
								cursor: "pointer",
								width: "100%",
								borderRadius: "0.5em",
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.1)",
									"& .play-arrow": {
										visibility: "visible",
									},
									"& img": {
										opacity: 0.7,
									},
								},
							}}
						>
							<Box className="min-w-[180px] min-h-[110px] w-[180px] h-[110px] relative overflow-hidden rounded mr-5">
								<img
									src={proxyImage(episode.image)}
									alt={episode.title}
									className="absolute inset-0 w-full h-full object-cover object-center"
									loading="lazy"
								/>
							</Box>
							<p
								className={`${
									episodeNumber ===
									(currentPage === 1 ? index + 1 : index + 1 + episodesPerPage * (currentPage - 1))
										? "text-[#94f16f]"
										: "text-[#bebcbc]"
								} text-md flex justify-center items-center`}
							>
								<span className="font-bold text-xl mr-3">
									{currentPage === 1 ? index + 1 : index + 1 + episodesPerPage * (currentPage - 1)}
								</span>{" "}
								<span className="font-bold text-sm w-32">{episode.title}</span>
							</p>
							<PlayArrow
								className="play-arrow"
								sx={{
									color: "white",
									position: "absolute",
									left: 67,
									visibility: "hidden",
									fontSize: "50px",
								}}
							/>
						</Box>
					</Link>
				));
			}
			return null;
		}
	}, [animeId, currentPage, data, endIndex, startIndex, episodeNumber]);

	if (dataIsLoading) {
		return (
			<Box className="justify-center flex mb-10">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box>
			{totalPages > 1 && (
				<Box className="w-full mb-5">
					<label className="text-gray-600">Select Episode Page: </label>
					<select
						value={currentPage}
						onChange={handlePageChange}
						className="block w-full mt-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white bg-[#111111]"
					>
						{pageOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</Box>
			)}
			{episodeLinks}
		</Box>
	);
};

export default EpisodeLinks;
