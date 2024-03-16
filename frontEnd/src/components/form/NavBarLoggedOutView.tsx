import { Button } from "react-bootstrap"
import style from "../../styles/btnStyle.module.css"

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onSignInClicked: () => void
}

const NavBarLoggedOutView = ({ onSignUpClicked, onSignInClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignUpClicked} className={style.btnStyle}>Sign Up</Button>
            <Button onClick={onSignInClicked} className={style.btnStyle}>Sign in</Button>


        </>
    )
}

export default NavBarLoggedOutView
