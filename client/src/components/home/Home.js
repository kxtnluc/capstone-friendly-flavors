import { Button } from "reactstrap"
import "./Home.css"
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const navigate = useNavigate();

    return (
        <main className="h-main">
            <section className="h-section">
                <div className="h-header">
                    Friendly Flavors
                </div>
            </section>
            <section className="h-section-button">
                <div className="h-button-div">
                    <Button onClick={()=>navigate("/recipes")} className="h-btn" color="success">Find a new flavor →</Button>
                </div>
            </section>
        </main>
    )
}