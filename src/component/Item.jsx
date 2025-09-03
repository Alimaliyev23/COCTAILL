import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

function Item({item}) {
    return (
        <Card>
            <CardActionArea>
                <CardMedia image={item.strDrinkThumb} alt={item.strDrink} component="img" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{item.strDrink} </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary', height: '75px'}}>
                        {item.strInstructions.slice(0, 100) + (item.strInstructions.length > 100 ? '...' : '')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Item