const NewMessageCount = (props) => {
	const { conversation } = props;

	return (
		<div>
			<h1>{conversation.unreadMsgs}</h1>
		</div>
	);
};

export default NewMessageCount;
