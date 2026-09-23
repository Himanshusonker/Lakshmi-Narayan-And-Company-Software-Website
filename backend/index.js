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

const clientWorkRequestRouter=require("./Routes/clientWorkRequestRouter");

const adminWorkRequestRouter=require("./Routes/adminWorkRequestRouter");

const clientInvoicePaymentRouter=require("./Routes/clientInvoiceRouter");

const caRouter = require("./Routes/caRouter");

const caInvoiceRouter =require("./Routes/caInvoiceRouter");

const caDocumentRouter=require("./Routes/caDocumentRouter");

// ============================================================
//  Start AI Router
// ============================================================

const homeAIRouter = require("./Routes/homeAIRouter");

const siteAIRouter = require("./Routes/siteAIRouter");

const aiRouter = require("./Routes/aiRouter");

const serviceAIRouter = require("./Routes/serviceAIRouter");

const aiSolutionRouter = require("./Routes/aiSolutionRouter");

const projectAIRouter = require("./Routes/projectAIRouter");

const contactAIRouter = require("./Routes/contactAIRouter");

const adminAIDashboardRouter = require("./Routes/adminAIDashboardRouter");

const aiAssistantRouter =require("./Routes/aiAssistantRouter");



const {notFound, errorHandler} = require("./middleware/errorAIMiddleware");

const CLIENT_URL =process.env.CLIENT_URL || "http://localhost:5173";

const cors=require('cors');

const allowedOrigins = [ 
            CLIENT_URL, 
            "http://localhost:5173", 
            "https://lakshminarayanandco.com", 
            "https://www.lakshminarayanandco.com", 
        ];

const helmet = require("helmet");

const { apiLimiter, } = require("./middleware/rateLimitAIMiddleware");

const securityMiddleware = require("./middleware/securityAIMiddleware");

const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use( 
    cors({ 
    origin: function (origin, callback) { 
        
        // Allow server-to-server / Postman requests 
        
        if (!origin) { 
            
            return callback(null, true); 
        
        } 
        
        if (allowedOrigins.includes(origin)) { 
            
            return callback(null, true); 
        
        } 
        
        return callback( 
            
            new Error("Not allowed by CORS") 
        
        ); 
    }, 
    
    credentials: true, 
    methods: [ 
        "GET", 
        "POST", 
        "PUT", 
        "PATCH", 
        "DELETE", 
        "OPTIONS", 
    ], 
    
    allowedHeaders: [ 
        "Content-Type", 
        "Authorization", 
    ], 
}) 
);

// app.use(
//     cors({
//         origin:[
//             CLIENT_URL,
//             "http://localhost:5173",
//             "https://lakshminarayanandco.com",
//             "https://www.lakshminarayanandco.com"
//         ],
//         credentials: true
//     })
// );
// mongoose.connect(process.env.DATABASE_URL+process.env.DATABASE_NAME).then(()=>{
//     console.log("MongoDB Connected")
// }).catch((error)=>{
//     console.log("MongoDB Connection Error:", error)
// });
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

app.use("/api/client/work-requests", clientWorkRequestRouter);

app.use("/api/admin/work-requests", adminWorkRequestRouter);

// app.use("/api", clientInvoiceRoutes);

app.use("/api", clientInvoicePaymentRouter);

app.use("/api", caRouter);

app.use("/api", caInvoiceRouter);

app.use("/api/ca/documents", caDocumentRouter);

// ============================================================
//                         Start AI
// ============================================================

app.use("/homeai", homeAIRouter);

app.use("/site", siteAIRouter);

app.use("/api/ai", aiRouter);

app.use("/api/servicesai", serviceAIRouter);

app.use("/api/ai-solutions", aiSolutionRouter);

app.use("/api/projectsai", projectAIRouter);

app.use("/api/contactai", contactAIRouter);

app.use("/api/adminai/dashboard", adminAIDashboardRouter);

app.use("/api/ai-assistant", aiAssistantRouter);

// =========================================================
// 404
// =========================================================

app.use(notFound);


// =========================================================
// ERROR HANDLER
// =========================================================

app.use(errorHandler);

app.use(securityMiddleware);

app.use(apiLimiter);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Lakshmi Narayan And Company AI Website Backend is Running",
        version: "1.0.0"
    });
});

// app.get("/", (req, res) => {

//     res.status(200).json({

//         success: true,

//         message: "AI Website Backend API is running"

//     });

// });



// =========================================================
// DATABASE + SERVER
// =========================================================

const startServer = async () => {

    try {

        const databaseUrl=process.env.DATABASE_URL || "mongodb+srv://himanshusonker90_db_user:XdKrWxqdlBxHtIGI@cluster0.sabhzdy.mongodb.net/lakshminarayanandcodata?appName=Cluster0";

        const databaseName=process.env.DATABASE_NAME || "lakshminarayanandco";

        if (!databaseUrl) {
            
            throw new Error("DATABASE_URL is not configured");
        }

        await mongoose.connect(databaseUrl, {dbName: databaseName});

        console.log(`MongoDB Connected: ${databaseName}`);

        app.listen(PORT, ()=>{

                console.log(`AI Website Backend running on port ${PORT}`);

                console.log(`http://localhost:${PORT}`);

            }
        );

    } catch (error) {

        console.error("Server startup error:", error.message);

        process.exit(1);
    }
};

startServer();

// app.listen(PORT, ()=>{
//     console.log("app run on: "+PORT)
// })