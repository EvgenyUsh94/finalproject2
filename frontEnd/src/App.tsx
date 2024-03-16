
import { Container } from 'react-bootstrap';

import styles from './styles/notesPage.module.css';

import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as UsersApi from '../src/network/users_api'
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';


function App() {

  const [loggInUser, setloggInUser] = useState<User | null>(null)

  const [showSignUpModal, setshowSignUpModal] = useState(false)
  const [showLoginModal, setshowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser()
        setloggInUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser
  }, [])

  return (
    <div>
      <NavBar
        loggedInUser={loggInUser}
        onLoginClicked={() => setshowLoginModal(true)}
        onSignUpClicked={() => setshowSignUpModal(true)}
        onLogoutSuccessful={() => setloggInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggInUser
            ? <NotesPageLoggedInView />
            : <NotesPageLoggedOutView />
          }
        </>
      </Container>
      {showSignUpModal &&
        <SignUpModal
          onDismiss={() => setshowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setloggInUser(user)
            setshowSignUpModal(false)
          }}
        />

      }
      {showLoginModal &&
        <LoginModal
          onDismiss={() => setshowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setloggInUser(user)
            setshowLoginModal(false)
          }}
        />
      }
    </div>
  )
}

export default App
