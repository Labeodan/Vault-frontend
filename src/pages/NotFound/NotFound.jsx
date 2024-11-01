import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className={styles.homeLink}>
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
