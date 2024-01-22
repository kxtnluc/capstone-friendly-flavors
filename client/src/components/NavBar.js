import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
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

    return (
        <div>
            <Navbar color="light" light fixed="true" expand="lg">
                <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
                    🍜🍴 Friendly Flavors
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
                            <NavLink tag={RRNavLink} to="/recipes/create">
                                Create
                            </NavLink>
                        </NavItem>
                        {loggedInUser ? (<NavItem className="nav-li" onClick={() => setOpen(false)}>
                            <NavLink tag={RRNavLink} to={`/cookbook/${loggedInUser.id}`}>
                                My Cookbook
                            </NavLink>
                        </NavItem>) : ("")}
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