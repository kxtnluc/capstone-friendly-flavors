import { Button } from "reactstrap"
import "./Home.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export const Home = () => {

    const navigate = useNavigate();

    const [isUnload, setIsUnload] = useState(false)

    return (
        <main className="h-main">
            {!isUnload ?
                (
                    <section className="h-section">
                        <div className="h-header">
                            Friendly Flavors
                        </div>
                    </section>
                ) : (
                    <section className="h-section anim-unload">
                        <div className="h-header">
                            Friendly Flavors
                        </div>
                    </section>
                )}

            {!isUnload ? (
                <section className="h-section-button">
                    <div className="h-button-div">
                        <Button onClick={() => {
                            setIsUnload(true)
                            setTimeout(()=>{
                                navigate("/recipes")
                            }, 2000)
                        }} className="h-btn" color="success">Find a new flavor →</Button>
                    </div>
                </section>
            ) : (
                <section className="h-section-button anim-fadeout">
                    <div className="h-button-div">
                        <Button onClick={() => {
                            setIsUnload(true)
                        }} className="h-btn" color="success">Find a new flavor →</Button>
                    </div>
                </section>
            )}

        </main>
    )
}