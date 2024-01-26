import { useEffect, useState } from "react"
import { getCookBookByUserId } from "../../managers/cookBookManager"
import { getRecipesByCookBookId } from "../../managers/recipeManager"
import { RecipeListFormat } from "../recipes/RecipeListFormat"
import "./CookBookPage.css"

export const CookBookPage = ({loggedInUser}) => 
{

    const [cookBook, setCookBook] = useState({})
    const [usersRecipes, setUsersRecipes] = useState([])

    useEffect(()=>{
        console.log(cookBook.id)
        getCookBookByUserId(loggedInUser.id).then(setCookBook)
        if(cookBook.id !== undefined) getRecipesByCookBookId(cookBook.id).then(setUsersRecipes)
    
    },[loggedInUser, cookBook.id])


    return (
        <main className="cbp-main">
            <section className="cbp-section-header">
                <div className="cbp-header">{cookBook.title}</div>
                <div className="cbp-subheader">by {loggedInUser.firstName} {loggedInUser.lastName}</div>
            </section>
                <div className="cbp-br"></div>
            <section className="cbp-section-body">
                <div className="cbp-body-header">About</div>
                <div className="cbp-body">
                    Introducing Karamel! a delightful cookbook crafted with love and tradition. Immerse yourself in the warmth of cherished family recipes that have stood the test of time, promising to bring the comforting aroma of home-cooked meals to your kitchen. From hearty stews passed down through generations to mouthwatering desserts that evoke sweet memories, this collection is a celebration of the simple joy found in every homemade dish. Whether you're a seasoned home chef or a kitchen novice, "Savoring Home Comforts" offers a diverse array of approachable recipes, each accompanied by heartwarming stories and helpful tips. Embark on a culinary journey that transforms ordinary ingredients into extraordinary, soul-nourishing feasts, making every meal an opportunity to savor the genuine comforts of home.
                </div>
            </section>
                <div className="cbp-br"></div>
            <div className="cbp-rl-header">Featured Recipes:</div>
            <RecipeListFormat recipes={usersRecipes}/>
        </main>
    )
}