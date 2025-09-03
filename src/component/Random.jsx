import { useEffect, useState } from "react"
import { CardContent, CardMedia, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import CocktailAPI from "../provider/CocktailAPI"

const cocktail = new CocktailAPI()


function Random() {
    const [random, setRandom] = useState({})
    
    useEffect(() => {
        cocktail.randomCocktail().then(obj => setRandom(obj))
    }, [])

    const ingr = Object.entries(random).filter(arr => arr[0].includes('strIngredient') && arr[1]).map(arr => arr[1])
    const measure = Object.entries(random).filter(arr => arr[0].includes('strMeasure') && arr[1]).map(arr => arr[1])

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }}>
                <CardMedia image={random.strDrinkThumb} alt={random.strDrink} component="img"  />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
                <CardContent>
                    <Typography variant="h5" component="h1">{random.strDrink}</Typography>
                    <Typography variant="h6" component="h2">{random.strCategory} ({random.strAlcoholic})</Typography>
                    <Typography variant="body1" component="p">Glass: {random.strGlass}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{random.strInstructions}</Typography>
                     <List>
                        {ingr.map((prod, i) => 
                            <ListItem key={i} disablePadding>
                                <ListItemIcon><BubbleChartIcon /></ListItemIcon>
                                <ListItemText>{prod} ({measure[i]})</ListItemText>
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Grid>
        </Grid>
    )
}

export default Random