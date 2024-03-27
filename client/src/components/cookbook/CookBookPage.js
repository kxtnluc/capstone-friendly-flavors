import { useEffect, useState } from "react"
import { getCookBookByUserId } from "../../managers/cookBookManager"
import { getRecipesByCookBookId } from "../../managers/recipeManager"
import { RecipeListFormat } from "../recipes/RecipeListFormat"
import "./CookBookPage.css"
import { useParams, useNavigate } from "react-router-dom"
import { Loading } from "../constants/Loading"
import { Button } from "reactstrap"
import { acceptFriendRequest, addFriendRequest, deleteDeclineOrCancelRequest, getFriendsById } from "../../managers/friendsManager"

export const CookBookPage = ({ loggedInUser }) => 
{

    const navigate = useNavigate();

    const [loadPage, setLoadPage] = useState(false)

    const [cookBook, setCookBook] = useState({})
    const [user, setUser] = useState({})
    const [usersRecipes, setUsersRecipes] = useState([])
    const { userid } = useParams();

    const [friends, setFriends] = useState({})

    useEffect(()=>{
        //console.log(cookBook.id)
        getCookBookByUserId(userid).then(setCookBook)
        if (cookBook.id !== undefined) {

            if (loggedInUser !== null)
            {
                getFriendsById(loggedInUser.id, cookBook.userProfile.id).then(setFriends)
            }


            getRecipesByCookBookId(cookBook.id).then((rArr) => {
                setUsersRecipes(rArr)
                setLoadPage(true)
            })

        }
    },[loggedInUser, cookBook.id])

    const handleUnfriend = () => {

        const friendObjId = friends.id

        deleteDeclineOrCancelRequest(friendObjId).then(() => {
            getFriendsById(loggedInUser.id, cookBook.userProfile.id).then(setFriends)
            console.log("unfriend")
        })

    }

    const handleAddFriend = () => {

        const friendRequestObj = {
            friendUserOneId: loggedInUser.id,
            friendUserTwoId: parseInt(userid)
        }

        console.log(friendRequestObj)

        addFriendRequest(friendRequestObj).then(() => {
            getFriendsById(loggedInUser.id, cookBook.userProfile.id).then(setFriends)
            console.log("added!")
        })

    }

    const handleAcceptRequest = () => {
        const friendObjId = friends.id

        acceptFriendRequest(friendObjId).then(() => {
            getFriendsById(loggedInUser.id, cookBook.userProfile.id).then(setFriends)
            console.log("accepted!")
        })

    }


    if (loadPage) {
        return (
            <main className="cbp-main">
                <section className="cbp-section-header">
                    <div className="cbp-header">{cookBook.title}</div>
                    <div className="cbp-subheader" style={{ float: "left", marginRight: "1rem" }}>by {cookBook.userProfile?.firstName} {cookBook.userProfile?.lastName}</div>
                    {loggedInUser ? ( //checks if the user is logged in to an account
                        <>
                            {friends.friendUserOneId === loggedInUser.id || friends.friendUserTwoId === loggedInUser.id ? //a check to see if there is already a valid friend obj
                                (
                                    <>
                                        {friends.accepted ? //checks if this valid friend obj is a request, or an accepted friend 
                                            ( //if accepted --->
                                                <>
                                                    <Button onClick={handleUnfriend} size="sm" className="cbp-subhead-btn" color="danger">Unfriend</Button>
                                                </>
                                            )
                                            :
                                            ( //if a request --->
                                                <>
                                                    {friends.friendUserOneId === loggedInUser.id && friends.accepted === false ?  //checks if the logged in user is the friend request SENDER or RECEIVER
                                                        (<Button onClick={handleUnfriend} size="sm" className="cbp-subhead-btn" color="warning">Unsend Request</Button>)
                                                        :
                                                        (<Button onClick={handleAcceptRequest} size="sm" className="cbp-subhead-btn" color="primary">Accept Request</Button>)
                                                    }
                                                </>
                                            )}

                                        
                                    </>
                                )
                                :
                                (
                                    <>
                                        {loggedInUser.id === parseInt(userid) ? //last check to make sure the cookbook page is not the logged in user's
                                            (<Button className="cbp-subhead-btn"  size="sm" disabled color="secondary">Friend</Button>)
                                            : 
                                            (<Button onClick={handleAddFriend} className="cbp-subhead-btn"  size="sm" color="primary">Friend</Button>)}
                                    </>
                                )}
                        </>
                    ) : ( //this button appears to non-logged-in users, but redirects them to the login page...
                        <Button onClick={() => navigate("/login")} size="sm" color="primary">Add Friend</Button>
                    )}
                    
                    
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
                {usersRecipes.length !== 0 ? (<RecipeListFormat recipes={usersRecipes} />) : (<i style={{ display: "flex", justifyContent: "center" }}>No Recipes...</i>)}
            </main>
        )
    }
    return <Loading/>
}