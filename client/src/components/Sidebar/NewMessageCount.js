import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";



const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    textAlign: "center",
    marginRight: "20px",
  },
  text: {
    padding: "2px 7px",
    background: "#3F92FF",
    borderRadius: "50%",
    fontFamily: "Open Sans",
    fontSize: "10px",
    fontWeight: 700,
    lineHeight: "14px",
    color: "#FFFFFF",
  }
}));

const NewMessageCount = (props) => {
  const classes = useStyles();
	const { conversation } = props;

	return (
		<Box className={classes.root}>
			<Typography className={classes.text}>{conversation.unreadMsgs}</Typography>
		</Box>
	);
};

export default NewMessageCount;
