import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Recipe from './recipe'

const API_KEY = <"PUT_YOUR_FORK2FOOD_API_KEY_HERE">


class RecipesList extends Component {
    state = {
        recipes: [],
        searchString: '',
        lastSearch:'',
        page:1,
        isLoading:false
    }

    getRecipes = async () => {
        const currentSearch = this.state.searchString
        const lastSearch = this.state.lastSearch
        try {
          const url = `https://www.food2fork.com/api/search?key=${API_KEY}&q=${currentSearch.length ? currentSearch : lastSearch}&page=${this.state.page}`
          const data = await fetch(url)
          const recipes = await data.json();
          if(!recipes.count && !this.state.page){
            throw new Error('no recipes found')
          } else {
            this.setState({recipes:[...this.state.recipes,...recipes.recipes], searchString:'',isLoading:false})
          }
        } catch (e) {
          console.log(`Something went wrong ${e}`);
          this.setState({recipes:[]})
        }
    }
    onSearchInputChange = (event) => {
        this.setState({searchString: event.target.value, lastSearch: event.target.value})
    }

    componentDidMount(){
      window.addEventListener('scroll',(e) => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        window.requestAnimationFrame(()=>window.scrollBy(0,-500))
        this.setState({page:this.state.page+1,isLoading:true})
        this.getRecipes()
      })
    }

    render() {
        return (
            <div>
              <form align="center" style={{marginTop : 100, marginBottom : 20}} action="javascript:void(0)" onSubmit={this.getRecipes}>
                <TextField
                    id="searchInput"
                    placeholder="Cake,Smoothie,Shake's..."
                    margin="dense"
                    variant="outlined"
                    label="Search for a recipe"
                    onChange={this.onSearchInputChange}
                    value={this.state.searchString}
                    justify="center"
                    />
                <Button variant="outlined" color="primary" size="large" type="submit" style={{marginTop:9,padding:9.5,marginLeft:5}}>Submit</Button>
              </form>
                { this.state.recipes.length ? (
                    <Grid container style={{padding:30}} justify="space-around">
                            { this.state.recipes.map((currentRecipe,index) => (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                  <Recipe recipe={currentRecipe}/>
                                </Grid>
                            ))}
                    </Grid>
                ) : <Typography align="center">no recipes found for "{React.createElement("b",{},this.state.searchString)}"</Typography> }
                {this.state.isLoading ? <div align="center" justify="center" style={{marginTop:50,marginBottom:50}} >
                  <CircularProgress />
                </div> : null}
            </div>
        )
    }
}
export default RecipesList;
