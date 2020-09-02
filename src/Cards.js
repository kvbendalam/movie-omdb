import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function Cards(props) {
    const classes = useStyles();

    const [isFavourite, setIsFavourite] = React.useState(false);
    const [favouriteData, setFavouriteData] = React.useState([])

    function handleFavourite() {
        setIsFavourite(!isFavourite)
        if (!isFavourite) {
            setFavouriteData(props.data)
            localStorage.setItem("Favourite", JSON.stringify(favouriteData))
        }
    }

    return (
        <div>
            {props.data.Error &&
                <p style={{ color: "red" }}>{props.data.Error}</p>
            }

            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.data.Title}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.data.Title}
                    subheader={props.data.Year}
                />
                <CardMedia
                    className={classes.media}
                    image={props.data.Poster}
                    title={props.data.Title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.data.Plot}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        {
                            isFavourite && (
                                <FavoriteIcon onClick={handleFavourite} />
                            )
                        }

                        {
                            !isFavourite && (
                                <FavoriteBorderIcon onClick={handleFavourite} />
                            )
                        }
                    </IconButton>
                </CardActions>
            </Card>

        </div>

    )
}

export default Cards
