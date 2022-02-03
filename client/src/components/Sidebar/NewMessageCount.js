import { makeStyles } from "@material-ui/core/styles";
import { Box, Badge } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    marginRight: "20px",
    height: "20px",
  },
}));

const NewMessageCount = (props) => {
  const classes = useStyles();
  const { conversation } = props;

  return (
    <Box className={classes.root}>
      <Badge
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        style={{ right: 20 }}
        badgeContent={conversation.unreadMessages}
        color="primary"
        colorPrimary={"#3F92FF"}
        max={99}
      />
    </Box>
  );
};

export default NewMessageCount;
