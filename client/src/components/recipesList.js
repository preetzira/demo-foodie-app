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
        page:0,
        isLoading:false,
        isExhausted:false,
        isNotfound:false
    }

    handleSubmit = () => {
        this.setState({
            page:1,
            recipes:[],
            isLoading:true
        }, () => {
            this.getRecipes()
        })
    }

    getRecipes = async () => {
        const currentSearch = this.state.searchString
        try {
          const url = `https://www.food2fork.com/api/search?key=${API_KEY}&q=${currentSearch}&page=${this.state.page}`
          const data = await fetch(url)
          const recipes = await data.json();
          console.log(recipes)
          if(!recipes.recipes.length){
            this.setState({
                isNotfound:true
            })
            throw new Error('no recipes found')
          } else {
            this.setState({recipes:[...this.state.recipes,...recipes.recipes],isLoading:false})
          }
        } catch (e) {
          console.log(`Something went wrong ${e}`);
          if(e.message === 'no recipes found'){
            this.setState({recipes:[]})
          } else this.setState({recipes:[],isExhausted:true,isLoading:false})
          
        }
    }
    onSearchInputChange = (event) => {
        this.setState({searchString: event.target.value,isNotfound:false,isLoading:false})
    }

    componentDidMount(){
        let isProcessed = false
        window.addEventListener('scroll',(e) => {
            if (window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight > -10 && !isProcessed) { isProcessed = !isProcessed; return;}
            if(isProcessed) {
                isProcessed = false
                window.scrollBy(0,-300)
                this.setState({page:this.state.page+1,isLoading:true})
                this.getRecipes()
            }
        })
    }

    render() {
        console.log(this.state.isLoading && !this.state.isExhausted)
        return (
            <div>
              <form align="center" style={{marginTop : 100, marginBottom : 20, display:'flex',justifyContent:'center'}} action="javascript:void(0)" onSubmit={this.handleSubmit}>
                <TextField
                    id="searchInput"
                    placeholder="Cake,Smoothie,Shake's..."
                    margin="dense"
                    variant="outlined"
                    label="Search for a recipe"
                    onChange={this.onSearchInputChange}
                    value={this.state.searchString}
                    justify="center"
                    type="search"
                    required
                    InputLabelProps={{ required: false }}
                />
                <Button variant="outlined" color="primary" size="large" type="submit" style={{marginTop:9,height: 47.2,marginLeft:5}}>Submit</Button>
              </form>
                { this.state.isExhausted ? (<Typography align="center" style={{color:"#cc0000"}}><b>Pardon!</b> daily api requests limit reached.</Typography>)
                : this.state.recipes.length ? (
                    <Grid container style={{padding:30}} justify="space-around">
                            { this.state.recipes.map((currentRecipe,index) => (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                  <Recipe recipe={currentRecipe}/>
                                </Grid>
                            ))}
                    </Grid>
                ) : null}
                { this.state.isNotfound && !this.state.isExhausted ? <Typography align="center"><span>no recipes found for "<strong>{this.state.searchString}</strong>"</span></Typography> : null }
                { this.state.isLoading && !this.state.isNotfound ? <div align="center" justify="center" style={{marginTop:50,marginBottom:50}} >
                  <CircularProgress />
                </div> : null}
            </div>
        )
    }
}
export default RecipesList;