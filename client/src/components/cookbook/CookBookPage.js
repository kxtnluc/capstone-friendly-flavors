import { useEffect, useState } from "react"
import { getCookBookByUserId } from "../../managers/cookBookManager"

export const CookBookPage = ({loggedInUser}) => 
{

    const [cookBook, setCookBook] = useState({})

    useEffect(()=>{
        getCookBookByUserId(loggedInUser.id).then(setCookBook)
    },[])

    console.log(loggedInUser)

    return (
        <main>
            <section>
                Cookbook of {loggedInUser.firstName}: {cookBook.title}
            </section>
        </main>
    )
}