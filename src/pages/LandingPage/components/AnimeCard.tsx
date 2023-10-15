import { proxyImage } from "@/lib/utils.ts";
import { ITitle, ICoverImage } from "@/type/Anime";

type AnimeCardType = {
	onClick: () => void;
	title: ITitle;
	coverImage: ICoverImage | null;
};

export default function AnimeCard({ title, coverImage, onClick }: AnimeCardType) {
	return (
		<div
			onClick={onClick}
			className={
				"relative max-w-[200px] max-h-[300px] min-w-[150px] min-h-[200px] w-[20vw] h-[26vw] inline-block mr-2"
			}
		>
			<img
				src={proxyImage(coverImage?.extraLarge)}
				alt={title.english || title.romaji || title.native}
				sizes={"(min-width: 1080px) 200px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
				className={"h-full w-full cursor-pointer rounded-lg"}
			/>
		</div>
	);
}
