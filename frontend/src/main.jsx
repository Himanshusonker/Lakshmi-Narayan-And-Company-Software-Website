import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./css/style.css";
import "./css/Footer.css";
import "./css/Services.css";
import "./css/ServiceDetail.css";
import "./css/AdminServices.css";
import "./css/AdminLogin.css";
import "./css/AdminDashboard.css";
import "./css/About.css";
import "./css/Projects.css";
import "./css/ProjectDetail.css";
import "./css/AdminProjects.css";
import "./css/AdminTestimonials.css";
import "./css/Testimonials.css";
import "./css/Contact.css";
import "./css/GetQuote.css";
import "./css/AdminLeads.css";
import "./css/AdminMessages.css";
import "./css/blog.css";
import "./css/faq.css";
import "./css/blog-detail.css";
import "./css/pricing.css";
import "./css/technologies.css";
import "./css/seo.css";
import "./css/security.css";
import "./css/LegalPages.css";
import "./css/WhatsAppButton.css";
import "./css/ClientRegister.css";
import "./css/ClientLogin.css";
import "./css/AdminCompanies.css";
import "./css/AdminCompaniesProjects.css";
import "./css/ClientDashboard.css";
import "./css/ClientProjectDetails.css";
import store from './productStore.jsx';
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
            <App />
        </Provider>
);
