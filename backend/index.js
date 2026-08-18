const express=require("express");
const mongoose=require("mongoose");
const app=express();
require('dotenv').config();

const HomeRouter=require("./Routes/homerouter");

const serviceRouter= require("./Routes/serviceRouter");

const adminRouter= require("./Routes/adminRouter");

const aboutRouter= require("./Routes/aboutRouter");

const projectRouter = require("./Routes/projectRouter");

const testimonialRoutes= require("./Routes/testimonialRoutes");

const contactRouter= require("./Routes/contactRouter");

const leadRouter= require("./Routes/leadRouter");

const whatsappRoute= require("./Routes/whatsappRoute");

const clientAuthRouter= require("./Routes/clientAuthRouter");

const adminCompanyRouter = require("./Routes/adminCompanyRouter");

const adminProjectRouter= require("./Routes/adminProjectRouter");

const clientProjectRouter= require("./Routes/clientProjectRouter");

const cors=require('cors');
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(
    cors({
        origin:[
            "http://localhost:5173",
            "https://lakshminarayanandco.com",
            "https://www.lakshminarayanandco.com"
        ],
        credentials: true
    })
);
mongoose.connect(process.env.DATABASE_URL+process.env.DATABASE_NAME).then(()=>{
    console.log("MongoDB Connected")
}).catch((error)=>{
    console.log("MongoDB Connection Error:", error)
});
const PORT=process.env.PORT       ||       7070

app.use("/home", HomeRouter);

app.use("/api/services", serviceRouter);

app.use("/admin", adminRouter);

app.use("/api/about", aboutRouter);

app.use("/api/projects", projectRouter);

app.use("/api/testimonials", testimonialRoutes);

app.use("/api/contact", contactRouter);

app.use("/api/whatsapp", whatsappRoute);

app.use("/leads", leadRouter);

app.use("/api/client-auth", clientAuthRouter);

app.use("/api/admin/companies", adminCompanyRouter);

app.use("/api/admin/projects", adminProjectRouter);

app.use("/api/client/projects", clientProjectRouter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Lakshmi Narayan And Company Backend is Running"
    });
});

app.listen(PORT, ()=>{
    console.log("app run on: "+PORT)
})