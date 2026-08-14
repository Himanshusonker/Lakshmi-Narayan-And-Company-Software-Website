import { Link, Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

const Layout=()=>{

    return(
        <>
            
                <Navbar/>

                <main className="main-content">
                    <Outlet/>
                </main>
                    
                <Footer/>
        </>
    );
}
export default Layout;