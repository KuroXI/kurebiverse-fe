export type UserInitialState = {
	userId: string;
	username: string;
	profileUrl?: string;
	coverUrl?: string;
	email: string;
};

export type SelectorState = {
	user: UserInitialState;
};
