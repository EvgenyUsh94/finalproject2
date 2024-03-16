
import { User } from '../models/user'
import { Container, Nav, Navbar } from 'react-bootstrap'
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './form/NavBarLoggedOutView';
import styles from "../styles/navBar.module.css"

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}


const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky='top' className={styles.navBar}>
            <Container  >
                <Navbar.Brand >
                    Your Notes App
                </Navbar.Brand >
                <Navbar.Toggle aria-controls='main-navbar' ></Navbar.Toggle>
                <Navbar.Collapse id="main-navbar" >
                    <Nav className={`ms-auto `}>
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <NavBarLoggedOutView onSignInClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>





        </Navbar>
    )
}

export default NavBar
