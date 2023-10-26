import { SpinnerIcon } from "../ui/icons"

export const Loader = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<SpinnerIcon className="h-10 w-10 animate-spin"/>
		</div>
	)
}