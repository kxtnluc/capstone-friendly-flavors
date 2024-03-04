import { useEffect, useState } from "react"
import { getCookBookByUserId } from "../../managers/cookBookManager"
import { getRecipesByCookBookId } from "../../managers/recipeManager"
import { RecipeListFormat } from "../recipes/RecipeListFormat"
import "./CookBookPage.css"
import { useParams } from "react-router-dom"
import { Loading } from "../constants/Loading"

export const CookBookPage = ({loggedInUser}) => 
{

    const [loadPage, setLoadPage] = useState(false)

    const [cookBook, setCookBook] = useState({})
    const [user, setUser] = useState({})
    const [usersRecipes, setUsersRecipes] = useState([])
    const {userid} = useParams();

    useEffect(()=>{
        console.log(cookBook.id)
        getCookBookByUserId(userid).then(setCookBook)
        if (cookBook.id !== undefined) {
            getRecipesByCookBookId(cookBook.id).then((rArr) => {
                setUsersRecipes(rArr)
                setLoadPage(true)
            })
        }

    
    },[loggedInUser, cookBook.id])

    if (loadPage) {
        return (
            <main className="cbp-main">
                <section className="cbp-section-header">
                    <div className="cbp-header">{cookBook.title}</div>
                    <div className="cbp-subheader">by {cookBook.userProfile?.firstName} {cookBook.userProfile?.lastName}</div>
                </section>
                    <div className="cbp-br"></div>
                <section className="cbp-section-body">
                    <div className="cbp-body-header">About</div>
                    <div className="cbp-body">
                        {cookBook.description ? (`${cookBook.description}`):(<i>No descritpion...</i>)}
                    </div>
                </section>
                    <div className="cbp-br"></div>
                <div className="cbp-rl-header">Featured Recipes</div>
                {usersRecipes.length !== 0 ? (<RecipeListFormat recipes={usersRecipes} />):(<i style={{display: "flex", justifyContent: "center"}}>No Recipes...</i>)}
            </main>
        )
    }
    return <Loading/>
}