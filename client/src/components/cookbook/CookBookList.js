import { useEffect, useState } from "react"
import { CookBookListFormat } from "./CookBookListFormat"
import { getAllCookBooks } from "../../managers/cookBookManager"
import "./CookBookList.css"

export const CookBookList = () => {

    const [cookBooks, setCookBooks] = useState([])

    useEffect(()=>{
        getAllCookBooks().then(setCookBooks)
    },[])

    return (
        <main className="cl-main">
            <section className="cl-section-header">
                <div className="cl-header">Cookbooks</div>

            </section>
            <CookBookListFormat cookBooks={cookBooks}/>
        </main>
    )
}