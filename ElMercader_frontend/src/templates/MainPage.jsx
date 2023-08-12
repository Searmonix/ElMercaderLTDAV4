import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/auth/AuthSlices";
import Admin from "../pages/Admin";

const MainPage = () => {
    const { token, type } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const routes = {
        'ADM': '/admin'
    };

    const effect = () => {
        if (!token)
            navigate('/login');
        else {
            navigate(routes[type]);
        }
    }
    useEffect(effect, [ token, navigate ]);

    return (
        <>
            <div>
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/coord" element={<MainPage />} />
                    <Route path="/asesor" element={<MainPage />} />
                </Routes>
            </div>
        </>
    )
}

export default MainPage