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

    console.log(loggedInUser)

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
                                    <NavLink tag={RRNavLink} to={`/ingredient/create`}>
                                        Ingredients
                                    </NavLink>
                                </NavItem>
                            ) : (
                                ""
                            )}
                        </>) : ("")}
                    </Nav>
                </Collapse>

                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav navbar></Nav>
                        </Collapse>
                        <Button
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
                    </>
                ) : (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    );
}