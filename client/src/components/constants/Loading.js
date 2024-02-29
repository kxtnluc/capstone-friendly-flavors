import { Spinner } from "reactstrap"
import "./Loading.css"


export const Loading = () => {
    return (
        <div className="l-container">
            <Spinner className="l-spinner" color="primary">Loading. . .</Spinner>
        </div>
    )
}