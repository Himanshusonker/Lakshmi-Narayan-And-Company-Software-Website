import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import AdminServices from "./admin/AdminServices";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import AdminProjects from "./admin/AdminProjects";
import AdminTestimonials from "./admin/AdminTestimonials";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import GetQuote from "./pages/GetQuote";
import AdminLeads from "./admin/AdminLeads";
import AdminMessages from "./admin/AdminMessages";



const App=()=>{
  return(
    <>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/services" element={<Services/>}/>
                <Route path="/services/:slug" element={<ServiceDetail/>}/>
                <Route path="/admin/services" element={<AdminServices/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/about-us" element={<About/>}/>
                <Route path="/our-work" element={<Projects/>}/>
                <Route path="/our-work/:slug" element={<ProjectDetail/>}/>
                <Route path="/admin/projects" element={<AdminProjects/>}/>
                <Route path="/admin/testimonials" element={<AdminTestimonials/>}/>
                <Route path="/testimonials" element={<Testimonials/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/get-quote" element={<GetQuote/>}/>
                <Route path="/admin/leads" element={<AdminLeads/>}/>
                <Route path="/admin/messages" element={<AdminMessages/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    </>
  );
}
export default App;

