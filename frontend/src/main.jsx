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
import store from './productStore.jsx';
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
            <App />
        </Provider>
);
