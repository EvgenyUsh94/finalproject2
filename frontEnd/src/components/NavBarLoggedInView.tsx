
import { Button, Navbar } from 'react-bootstrap'
import { User } from '../models/user'
import * as UsersApi from '../network/users_api'
import btnStyle from '../styles/btnStyle.module.css'

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}


const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {
    async function logout() {
        try {
            await UsersApi.logout()
            onLogoutSuccessful()
        } catch (error) {
            console.error(error)
        }

    }
    return (

        <>
            <Navbar.Text className='me-2'>
                Signd in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout} className={`${btnStyle.btnStyle}`}>Log out</Button>


        </>

    )
}

export default NavBarLoggedInView
