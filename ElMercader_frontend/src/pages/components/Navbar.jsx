import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth/AuthSlices";

function Navbar() {
    const dispatch = useDispatch();

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img width="25" height="25" src="https://img.icons8.com/small/16/small-business.png" alt="small-business" className="d-inlineblock align-text-top" />
                            El Mercader LTDA
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link active" aria-current="page" href="#">Usuarios</a>
                                <a className="nav-link" href="./gadgetHome.html">Productos</a>
                                
                                <button type="submit" onClick={() => dispatch(logout())}>Logout</button>

                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar;