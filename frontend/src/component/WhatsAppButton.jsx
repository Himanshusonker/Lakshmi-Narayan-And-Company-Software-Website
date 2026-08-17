import React from "react";

const WhatsAppButton=()=>{
    const phoneNumber = "919335187678";

    const message = encodeURIComponent("Hello Lakshmi Narayan And Company, I am interested in your services.");

    const whatsappUrl= `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-button" aria-label="Chat with us on WhatsApp">
            <span className="whatsapp-icon">💬</span>
            <span>Chat on WhatsApp</span>
        </a>
    );
};
export default WhatsAppButton;