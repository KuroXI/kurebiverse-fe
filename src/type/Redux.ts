export type initStateType = {
	userId: string;
	username: string;
	profileUrl?: string;
	coverUrl?: string;
	email: string;
};

export type selectorProps = {
	user: initStateType;
};
