import {Link} from 'react-router-dom';

// Functional component for displaying a 404 error page
const Error = () => {
    return(
        <section className ='section'>
            {/* Error code */}
            <h2>404</h2>

            {/* Error message */}
            <p>Page not found</p>

            {/* Link to redirect users back to the homepage */}
            <Link to = '/'>back home</Link>
        </section>
    )
}

export default Error;