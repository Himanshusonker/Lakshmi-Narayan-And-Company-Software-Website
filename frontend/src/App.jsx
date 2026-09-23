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
import ClientRegister from "./pages/ClientRegister";
import ClientLogin from "./pages/ClientLogin";
import AdminCompanies from "./admin/AdminCompanies";
import AdminCompaniesProjects from "./admin/AdminCompaniesProjects";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProjectDetails from "./pages/ClientProjectDetails";
import AdminWorkRequests from "./admin/AdminWorkRequests";
import ClientWorkRequest from "./pages/ClientWorkRequest";
import ClientInvoices from "./pages/ClientInvoices";
import ClientInvoiceDetails from "./pages/ClientInvoiceDetails";
import AdminInvoices from "./admin/AdminInvoices";
import CADashboard from "./pages/CADashboard";
import CALogin from "./pages/CALogin";
import AdminCA from "./admin/AdminCA";


import HomeAI from "./pagesAI/HomeAI";
import LayoutAI from "./LayoutAI";
import ServicesAI from "./pagesAI/ServicesAI";
import ServiceAIDetails from "./pagesAI/ServiceAIDetails";
import AISolutions from "./pagesAI/AISolutions";
import AISolutionDetails from "./pagesAI/AISolutionDetails";
import ProjectsAI from "./pagesAI/ProjectsAI";
import ProjectAIDetails from "./pagesAI/ProjectAIDetails";
import PricingAI from "./pagesAI/PricingAI";
import ResourcesAI from "./pagesAI/ResourcesAI";
import AboutAI from "./pagesAI/AboutAI";
import ContactAI from "./pagesAI/ContactAI";
import AdminAIDashboard from "./adminAI/AdminAIDashboard";
import AIChat from "./pagesAI/AIChat";





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
                <Route path="/client/register" element={<ClientRegister/>}/>
                <Route path="/client/login" element={<ClientLogin/>}/>
                <Route path="/admin/companies" element={<AdminCompanies/>}/>
                <Route path="/admin/companiesprojects" element={<AdminCompaniesProjects/>}/>
                <Route path="/client/dashboard" element={<ClientDashboard/>}/>
                <Route path="/client/projects/:id" element={<ClientProjectDetails/>}/>
                <Route path="/admin/work-requests" element={<AdminWorkRequests/>}/>
                <Route path="/client/work-requests" element={<ClientWorkRequest/>}/>
                <Route path="/client/invoices" element={<ClientInvoices/>}/>
                <Route path="/client/invoices/:id" element={<ClientInvoiceDetails/>}/>
                <Route path="/admin/invoices" element={<AdminInvoices/>}/>
                <Route path="/admin/ca-registration" element={<AdminCA/>}/>
                <Route path="/ca/login" element={<CALogin/>}/>
                <Route path="/ca/dashboard" element={<CADashboard/>}/>

                                

                </Route>

                <Route path="/" element={<LayoutAI/>}>
                <Route path="/homeai" element={<HomeAI/>}/>
                <Route path="/servicesai" element={<ServicesAI/>}/>
                <Route path="/servicesai/:slug" element={<ServiceAIDetails/>}/>
                <Route path="/ai-solutions" element={<AISolutions/>}/>
                <Route path="/ai-solutions/:slug" element={<AISolutionDetails/>}/>
                <Route path="/projectsai" element={<ProjectsAI/>}/>
                <Route path="/projectsai/:slug" element={<ProjectAIDetails/>}/>
                <Route path="/pricingai" element={<PricingAI/>}/>
                <Route path="/resourcesai" element={<ResourcesAI/>}/>
                <Route path="/aboutai" element={<AboutAI/>}/>
                <Route path="/contactai" element={<ContactAI/>}/>
                <Route path="/adminai/dashboard" element={<AdminAIDashboard/>}/>
                <Route path="ai-assistant" element={<AIChat/>}/>

                </Route>

            </Routes>
            <WhatsAppButton />
        </BrowserRouter>
    </>
  );
}
export default App;

