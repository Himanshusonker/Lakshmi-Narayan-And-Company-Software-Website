import { Link, Outlet } from "react-router-dom";

import NavbarAI from "./component/NavbarAI";
import FooterAI from "./component/FooterAI";
import ScrollToTopAI from "./component/ScrollToTopAI";


const LayoutAI=()=>{

    return(
        <>
                <ScrollToTopAI/>
                <NavbarAI/>

                <main className="main-content">
                    <Outlet/>
                </main>
                    
                <FooterAI/>
        </>
    );
}
export default LayoutAI;