import { displayTitle } from "@/lib/utils";
import { IAnime } from "@/type/Anime"

type ListCardProps = {
	anime: IAnime;
	fetchInfo: (animeId: string) => Promise<void>
}

export const ListCard = ({ anime, fetchInfo } : ListCardProps) => {
	return (
		<div
			key={anime.id}
			onClick={() => fetchInfo(anime.id)}
			className="relative group cursor-pointer max-w-[200px] max-h-[250px] min-w-[100px] min-h-[150px] w-[35vw] h-[42vw]"
		>
			<div className="absolute w-full h-full backdrop-blur-sm opacity-0 group-hover:opacity-100" />
			<div className="absolute w-full h-full bg-gradient-to-b from-transparent to-background opacity-0 group-hover:opacity-100" />
			<div className="absolute w-full h-full flex items-center p-3 justify-center text-center opacity-0 !duration-300 group-hover:animate-slideUp">
				<h1 className="absolute text-xl font-semibold line-clamp-6">
					{displayTitle(anime.title)}
				</h1>
			</div>
			<img
				src={anime.coverImage?.extraLarge}
				sizes="(min-width: 1080px) 300px, (min-width: 800px) calc(15.38vw + 37px), 200px"
				className="w-full h-full rounded-lg"
			/>
		</div>
	)
}