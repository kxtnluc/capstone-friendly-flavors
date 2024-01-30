import { useEffect, useState } from "react"
import { createCookBook, getCookBookByUserId } from "../../managers/cookBookManager"
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
        console.log(usersRecipes)

    }, [loggedInUser, cookBook.id])

    const handleCreate = () => {
        // console.log("cookbook name:")
        // console.log(name)
        // console.log("cookbook desc:")
        // console.log(desc)

        const cookBookToMake = {
            userProfileId: loggedInUser.id,
            title: name,
            description: desc
        }
        // console.log(cookBookToMake)
        createCookBook(cookBookToMake)
        // window.location.reload();
    }


    return (
        <>
            {cookBook.title !== "Not Found" ? (
                <main className="cbp-main">
                    <section className="cbp-section-header">
                        <div className="cbp-header">{cookBook.title}</div>
                        <div className="cbp-subheader">by {cookBook.userProfile?.firstName} {cookBook.userProfile?.lastName}</div>
                    </section>
                    <div className="cbp-br"></div>
                    <section className="cbp-section-body">
                        <div className="cbp-body-header">About</div>
                        <div className="cbp-body">
                            {cookBook.description ? (`${cookBook.description}`) : (<i>No descritpion...</i>)}
                        </div>
                    </section>
                    <div className="cbp-br"></div>
                    <div className="cbp-rl-header">Featured Recipes:</div>
                    {usersRecipes.length !== 0 ? (<RecipeListFormat recipes={usersRecipes} />):(<i style={{display: "flex", justifyContent: "center"}}>No Recipes...</i>)}
                </main>
            ) : (
                <main>
                    <section style={{ textAlign: "center", marginTop: "5rem" }}>
                        <strong>No Cookbook Found</strong>
                    </section>
                    <section style={{ textAlign: "center", marginTop: "5rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Input
                                placeholder="Cookbook Name..."
                                style={{ width: "70rem", marginBottom: "1rem" }}
                                type="text"
                                maxLength={24}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                placeholder="Cookbook Description..."
                                style={{ width: "70rem", marginBottom: "1rem" }}
                                type="text"
                                maxLength={180}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />

                            <Button onClick={handleCreate} color="primary">
                                Create Your Cookbook
                            </Button>
                        </div>
                    </section>

                </main>
            )}
        </>
    )
}