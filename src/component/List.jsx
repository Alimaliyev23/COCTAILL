import { Grid } from "@mui/material"
import Item from "./Item"
import CocktailAPI from "../provider/CocktailAPI"
import { useEffect, useState } from "react"

const cocktail = new CocktailAPI()

function List() {
    const [cocktailList, setCocktailList] = useState([])

    useEffect(() => {
        cocktail.listCocktailByLetter('a').then(arr => setCocktailList(arr))
    }, [])

    return (
        <Grid container spacing={3}>
            {cocktailList.map((item, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Item item={item} />
                </Grid>
            ))}
        </Grid>
    )
}

export default List