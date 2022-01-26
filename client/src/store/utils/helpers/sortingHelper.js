export const byMostRecent = (a, b) => {
	let aMessageFinalIndex = a.messages.length - 1;
	let bMessageFinalIndex = b.messages.length - 1;

	const aMostRecentUpdate =
		a.messages.length > 0
			? new Date(a.messages[aMessageFinalIndex].createdAt)
			: 0;
	const bMostRecentUpdate =
		b.messages.length > 0
			? new Date(b.messages[bMessageFinalIndex].createdAt)
			: 0;
	return bMostRecentUpdate - aMostRecentUpdate;
};
