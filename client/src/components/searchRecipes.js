import React from 'react';
import '../App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import RecipesList from './recipesList'


const NavBar = () => {
    return(
        <div>
          <AppBar position="fixed">
              <Toolbar style={{alignSelf:"center"}}>
                  <Typography variant="subtitle1" color="inherit" component="p">
                    food2Fork
                  </Typography>
              </Toolbar>
          </AppBar>
        </div>
    )
}

const Footer = () => {
    return(
        <div style={{position:"fixed",bottom:0,paddingTop:10,paddingBottom:10,paddingLeft:50,background:"#cfcfcf",width:"100%",boxSizing:"border-box"}}>
          <footer>
              <small><strong style={{color:"#cc0000"}}>Disclaimer:</strong> This is a demo app created using <a href="https://www.food2fork.com/" target="_blank" rel="noopener noreferrer">food2Fork</a> free API. App may not work when daily free quota limit reached.</small>
          </footer>
        </div>
    )
}

function App(){
  return (
    <div>
      <NavBar />
      <RecipesList />
      <Footer />
    </div>
  );
}

export default App;
