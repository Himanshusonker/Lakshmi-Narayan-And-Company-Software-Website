const mongoose = require("mongoose");


// ===================================================================================================
//                                          SERVICE SCHEMA
// ===================================================================================================

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        icon: {
            type: String,
            default: ""
        },

        link: {
            type: String,
            default: "/services"
        }
    }
);


// ===================================================================================================
//                                           PROJECT SCHEMA
// ===================================================================================================

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            required: true
        },

        link: {
            type: String,
            default: "#"
        }
    }
);


// ===================================================================================================
//                                      TESTIMONIAL SCHEMA
// ===================================================================================================

const testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        designation: {
            type: String,
            default: ""
        },

        message: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 5
        },

        image: {
            type: String,
            default: ""
        }
    }
);


// ==================================================================================================
//                                              HOME PAGE SCHEMA
// ==================================================================================================

const homeSchema = new mongoose.Schema(
    {
        hero: {
            badge: {
                type: String,
                default: "We Build. You Grow."
            },

            title: {
                type: String,
                required: true
            },

            highlightedTitle: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                required: true
            },

            buttonText: {
                type: String,
                default: "Get Started"
            },

            buttonLink: {
                type: String,
                default: "/contact"
            },

            secondaryButtonText: {
                type: String,
                default: "View Our Work"
            },

            secondaryButtonLink: {
                type: String,
                default: "/our-work"
            },

            image: {
                type: String,
                default: ""
            }
        },


        trustedText: {
            type: String,
            default: "Trusted by businesses across India"
        },


        servicesTitle: {
            type: String,
            default: "Our Services"
        },

        servicesDescription: {
            type: String,
            default: ""
        },

        services: [serviceSchema],


        about: {
            smallTitle: {
                type: String,
                default: "About Us"
            },

            title: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                default: ""
            },

            image: {
                type: String,
                default: ""
            },

            buttonText: {
                type: String,
                default: "Learn More"
            }
        },


        statistics: [
            {
                number: {
                    type: String,
                    required: true
                },

                title: {
                    type: String,
                    required: true
                }
            }
        ],


        projectsTitle: {
            type: String,
            default: "Some Of Our Recent Projects"
        },

        projects: [projectSchema],


        whyChooseUs: [
            {
                title: {
                    type: String,
                    required: true
                },

                description: {
                    type: String,
                    required: true
                },

                icon: {
                    type: String,
                    default: ""
                }
            }
        ],


        testimonialsTitle: {
            type: String,
            default: "What Our Clients Say"
        },

        testimonials: [testimonialSchema],


        cta: {
            title: {
                type: String,
                default: "Let's Build Something Amazing Together"
            },

            description: {
                type: String,
                default: ""
            },

            buttonText: {
                type: String,
                default: "Get In Touch"
            },

            buttonLink: {
                type: String,
                default: "/contact"
            }
        }
    },

    {
        timestamps: true
    }
);

const HomeModel = mongoose.model( "HomePage", homeSchema );
module.exports = HomeModel;