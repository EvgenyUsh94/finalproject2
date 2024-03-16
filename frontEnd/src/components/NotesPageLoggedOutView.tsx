import styles from '../styles/logoutview.module.css'




const NotesPageLoggedOutView = () => {
  return (
    <div className={styles.style}>
         
      <p className={styles.style}>please login to see your <span className={styles.fancy}>NOTES</span></p>
    </div>
  )
}

export default NotesPageLoggedOutView
