import { useEffect, useState } from "react"
import { getCookBookByUserId } from "../../managers/cookBookManager"
import { getRecipesByCookBookId } from "../../managers/recipeManager"
import { RecipeListFormat } from "../recipes/RecipeListFormat"
import { Button, Input } from "reactstrap"

export const MyCookBook = ({ loggedInUser }) => {

    const [cookBook, setCookBook] = useState({})
    const [usersRecipes, setUsersRecipes] = useState([])

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        getCookBookByUserId(loggedInUser.id).then(setCookBook)
        if (cookBook.id !== undefined) getRecipesByCookBookId(cookBook.id).then(setUsersRecipes)

    }, [loggedInUser, cookBook.id])

    const handleCreate = () =>
    {
        console.log("cookbook name:")
        console.log(name)
        console.log("cookbook desc:")
        console.log(desc)
    }

    return (
        <>
            {cookBook == null ? (
                <main className="cbp-main">
                    <section className="cbp-section-header">
                        <div className="cbp-header">{cookBook.title}</div>
                        <div className="cbp-subheader">by {cookBook.userProfile?.firstName} {cookBook.userProfile?.lastName}</div>
                    </section>
                    <div className="cbp-br"></div>
                    <section className="cbp-section-body">
                        <div className="cbp-body-header">About</div>
                        <div className="cbp-body">
                            {cookBook.userProfile?.description ? (`${cookBook.userProfile?.description}`) : (<i>No descritpion...</i>)}
                        </div>
                    </section>
                    <div className="cbp-br"></div>
                    <div className="cbp-rl-header">Featured Recipes:</div>
                    <RecipeListFormat recipes={usersRecipes} />
                </main>
            ) : (
                <main>
                    <section style={{display: "flex", justifyContent:"center", marginTop: "5%"}}>
                        <strong>No Cookbook Found</strong>
                    </section>
                    <section style={{ float: "right", marginTop: "5rem"}}>
                        <Input placeholder="Cookbook Name..." style={{}} type="text" maxLength={24} value={name} onChange={(e) => setName(e.target.value)}/>
                        <Input placeholder="Cookbook Description..." style={{}} type="text" maxLength={24} value={desc} onChange={(e) => setDesc(e.target.value)}/>

                        <Button style={{marginLeft: "5%"}} onClick={handleCreate} color="primary">Create Your Cookbook</Button>
                    </section>
                </main>
            )}
        </>
    )
}