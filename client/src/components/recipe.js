import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'

const useStyles = makeStyles(theme => ({
  card: {
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

const Recipe = (props) => {
    const classes = useStyles();
    return(
        <div>
            { props.recipe ? (
                <Card className="card-slide" style={{margin:10}}>
                    <CardMedia className={classes.media}
                    image={props.recipe.image_url}
                    title={props.recipe.title}
                    />
                    <CardContent style={{paddingBottom:0}}>
                      <Typography gutterBottom variant="inherit" component="h4">
                          {props.recipe.title.length < 25 ? props.recipe.title : `${props.recipe.title.substring(0,25)}...`}
                      </Typography>
                      <Typography component="span">
                          <small><strong>Publisher: </strong>{props.recipe.publisher}</small>
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button size="small" color="primary" href={props.recipe.source_url} target="_blank" rel="noopener noreferrer">
                        Source
                      </Button>
                      <Button size="small" color="primary" href={props.recipe.f2f_url} target="_blank" rel="noopener noreferrer">
                        View
                      </Button>
                    </CardActions>
                </Card>
            ) : null}
        </div>
    )
}
export default Recipe
