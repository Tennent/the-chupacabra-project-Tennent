import './Layout.css'
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <div className="navBar">
                <Link to={"/"}>
                    <button>Home</button>
                </Link>
                <Link to={"selecthero"}>
                    <button>Select Hero</button>
                </Link>
                <Link to={"herodashboard"}>
                    <button>Hero Dashboard</button>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}