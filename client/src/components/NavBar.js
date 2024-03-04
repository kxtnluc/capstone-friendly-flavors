import { useState } from "react";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import {
    Button,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { logout } from "../managers/authManager";
import "./NavBar.css";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);
    const navigate = useNavigate();

    //console.log(loggedInUser)
    //console.log("=====================================================================================")


    return (
        <div>
            <Navbar className="navbar" light fixed="true" expand="lg">
                <NavbarBrand className="mr-auto navbarbrand" tag={RRNavLink} to="/">
                    🍜🍴 Friendly Flavors ~
                </NavbarBrand>

                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={open} navbar>
                    <Nav className="nav-ul" navbar>
                        <NavItem className="nav-li" onClick={() => setOpen(false)}>
                            <NavLink tag={RRNavLink} to="/recipes">
                                Recipes
                            </NavLink>
                        </NavItem>
                        <NavItem className="nav-li" onClick={() => setOpen(false)}>
                            <NavLink tag={RRNavLink} to="/cookbook/list">
                                Cookbooks
                            </NavLink>
                        </NavItem>
                        {loggedInUser ? (<>
                            <NavItem className="nav-li" onClick={() => setOpen(false)}>
                                <NavLink tag={RRNavLink} to="/recipes/create">
                                    Create
                                </NavLink>
                            </NavItem>
                            <NavItem className="nav-li" onClick={() => setOpen(false)}>
                                <NavLink tag={RRNavLink} to={`/cookbook`}>
                                    My Cookbook
                                </NavLink>
                            </NavItem>
                            {loggedInUser.roles.includes("Admin") ? (
                                <NavItem className="nav-li" onClick={() => setOpen(false)}>
                                    <NavLink className="nav-link" tag={RRNavLink} to={`/admin`}>
                                         • Admin •
                                    </NavLink>
                                </NavItem>
                            ) : (
                                ""
                            )}
                            <NavItem className="nav-li">
                                {/* <i className="nav-username">{loggedInUser.firstName} {loggedInUser.lastName}</i> */}
                                <Button
                                    className="nav-log-btn"
                                    size="sm"
                                    color="primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpen(false);
                                        logout().then(() => {
                                            navigate("/")
                                            setLoggedInUser(null);
                                            setOpen(false);
                                        });
                                    }}
                                >
                                    Logout
                                </Button>
                                
                            </NavItem>
                        </>) : (<Nav navbar>
                            <NavItem className="nav-li">
                                <Button className="nav-log-btn" size="sm" onClick={()=>navigate("/login")} color="primary">Login</Button>
                            </NavItem>
                        </Nav>)}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}