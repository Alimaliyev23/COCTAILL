import { Divider } from "@mui/material"
import List from "./List"
import Random from "./Random"

function Main() {
    return (
        <>
            <Random />
            <Divider component="hr" sx={{my: 3}} />
            <List />
        </>
    )
}

export default Main