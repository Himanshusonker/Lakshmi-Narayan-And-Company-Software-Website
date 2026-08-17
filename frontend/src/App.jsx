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
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import BlogDetail from "./pages/BlogDetail";
import Pricing from "./pages/Pricing";
import Technologies from "./pages/Technologies";
import SEO from "./pages/SEO";
import Security from "./pages/Security";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import WhatsAppButton from "./component/WhatsAppButton";



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
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/blog/:slug" element={<BlogDetail/>}/>
                <Route path="/faq" element={<FAQ/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/technologies" element={<Technologies/>}/>
                <Route path="/seo" element={<SEO/>}/>
                <Route path="/security" element={<Security/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/terms" element={<Terms/>}/>

                </Route>
            </Routes>
            <WhatsAppButton />
        </BrowserRouter>
    </>
  );
}
export default App;

