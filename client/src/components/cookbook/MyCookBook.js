import { useEffect, useState } from "react"
import { createCookBook, getCookBookByUserId, updateCookBook } from "../../managers/cookBookManager"
import { getRecipesByCookBookId } from "../../managers/recipeManager"
import { RecipeListFormat } from "../recipes/RecipeListFormat"
import { Button, Input } from "reactstrap"
import { Loading } from "../constants/Loading"

export const MyCookBook = ({ loggedInUser }) => {

    const [loadPage, setLoadPage] = useState(false);
    const [loadRecipes, setLoadRecipes] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const [cookBook, setCookBook] = useState({})
    const [usersRecipes, setUsersRecipes] = useState([])

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const [editMode, setEditMode] = useState(false)

    const [titleInput, setTitleInput] = useState('')
    const [descInput, setDescInput] = useState('')

    useEffect(() => {

        getCookBookByUserId(loggedInUser.id).then(setCookBook)
        if (cookBook.id !== undefined) {
            getRecipesByCookBookId(cookBook.id).then((rArr) => {
                setUsersRecipes(rArr)
                setLoadRecipes(true)
            })
            setLoadPage(true);
        }
        console.log(usersRecipes)
        setTitleInput(cookBook.title)
        setDescInput(cookBook.description)
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
        if (name !== "") {
            setErrorMessage(false);
            createCookBook(cookBookToMake)
            window.location.reload();
        }
        else {
            setErrorMessage(true);
        }
    }

    const toggleEdit = () =>
    {
        setEditMode(!editMode)
    }

    const handleTitleChange = (e) =>
    {
        setTitleInput(e.target.value)
    }

    const handleDescChange = (e) =>
    {
        setDescInput(e.target.value)
    }

    const handleUpdate = () =>
    {
        const updates = 
        {
            id: cookBook.id,
            title: titleInput,
            description: descInput
        }

        updateCookBook(updates)

        toggleEdit();
        window.location.reload();
    }

    if (loadPage && loadRecipes) {
        return (
            <>
                {editMode ?
                        (
                            <main className="cbp-main">
                                <section className="cbp-section-header">
                                    <div><Button color="primary" style={{ float: "right", marginRight: "1rem" }} onClick={handleUpdate}>Save</Button></div>
                                    <div><Button color="danger" style={{ float: "right", marginRight: "1rem" }} onClick={toggleEdit}>Cancel</Button></div>
                                    <Input onChange={handleTitleChange} style={{width: "50rem"}} type="text" placeholder="Cookbook Title..." value={titleInput} className="cbp-header"/>
                                    <div className="cbp-subheader">by {cookBook.userProfile?.firstName} {cookBook.userProfile?.lastName}</div>
                                </section>
                                <div className="cbp-br"></div>
                                <section className="cbp-section-body">
                                    <div className="cbp-body-header">About</div>
                                    <div className="cbp-body">
                                        <Input onChange={handleDescChange} style={{width: "100%"}} type="textarea" placeholder="Description..." value={descInput} className="cbp-header"/>
                                    </div>
                                </section>
                                <div className="cbp-br"></div>
                                <div className="cbp-rl-header">Featured Recipes:</div>
                                {usersRecipes.length !== 0 ? (<RecipeListFormat recipes={usersRecipes} />) : (<i style={{ display: "flex", justifyContent: "center" }}>No Recipes...</i>)}
                            </main>
                        ) : (
                            <main className="cbp-main">
                                <section className="cbp-section-header">
                                    <div><Button color="success" style={{ float: "right", marginRight: "1rem" }} onClick={toggleEdit}>Edit</Button></div>
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
                                <div className="cbp-rl-header">Featured Recipes</div>
                                {usersRecipes.length !== 0 ? (<RecipeListFormat recipes={usersRecipes} />) : (<i style={{ display: "flex", justifyContent: "center" }}>No Recipes...</i>)}
                            </main>
                        )
                    }
            </>
        )
    }

    if (cookBook.title === "Not Found")
    {
        return (
            <>
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
                            {errorMessage ? (<div style={{color: "red", fontWeight: "bold", marginTop: "3rem"}}>Please Input a Title</div>):("")}
                        </div>
                    </section>

                </main>
            </>
        );
    }
    return <Loading/>
}