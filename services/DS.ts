export interface Mewe {

    // Role: admin, startup

    auth: [
        authId: {
            role: string,
            phoneNo: string,
            createdAt: Date,
            mode: string // otp, google
        }
    ]
    
    startups: [
        authId: {
            name: string,
            phoneNo: string,
            createdAt: Date,
            email: string,
            profilePic: {
                url: string
            },
            basic: {
                name: string,
                coverPic: {
                    mob: string,
                    url: string,
                    thumb: string
                },
                category: {
                    id: string,
                    name: string
                },
                followers: number,
            }

            //sub-collection
            details: {
                //doc name -> advance
                advance: {
                    name: string,
                    founderName: string,
                    coFounderName: string,
                    social: {
                        linkedin: string,
                    },
                    category: {
                        id: string,
                        name: string
                    },
                    address: {
                        line1: string,
                        line2: string
                    },
                    city: string,
                    companySize: number,
                    yearOfFormation: number,
                    description: string,
                    panNo: string,
                    logo: {
                        mob: string,
                        url: string,
                        thumb: string
                    },
                    currentFinancialIncome: number,
                    currentValuation: number,
                    typeOfInvestement: string,
                    amount: number,
                }
            }
        }
    ],

    admins: [
        authId: {
            name: string,
            phoneNo: string,
            createdAt: Date
        }
    ]

    categories: [
        categoryId: {
            name: string,
            createdAt: Date,
            image: {
                url: string
            },
        }
    ]

    schemes: [
        docId: {
            name: string,
            description: string,
            image: {
                mob: string,
                url: string,
                thumb: string
            },
            link: string
        }
    ],

    posts: [
        docId: {
            createdAt: Date,
            createdBy: {
                id: string,
                name: string,
                image: {
                    mob: string,
                    url: string,
                    thumb: string
                }
            },
            title: string,
            description: string,
            location: string,
            images: [{
                mob: string,
                url: string,
                thumb: string
            }],
            stats: {
                totalLikes: number,
                totalComments: number
            }

            //sub-collection

            comments: [
                docId: {
                    message: string,
                    createdBy: {
                        id: string,
                        name: string,
                        image: {
                            mob: string,
                            url: string,
                            thumb: string
                        }
                    },
                    createdAt: Date,
                }
            ]
        }
    ]

    webinars: [
        docId: {
            active: boolean,
            createdAt: Date,
            image: {
                mob: string,
                url: string,
                thumb: string
            },
            title: string,
            description: string,
            duration: string,
            date: string,
            time: string,
            by: {
                id: string // startup-id
                name: string
            }
            meetingLink: string,
            faq: [{
                ques: string,
                ans: string
            }],
            terms: string
        }
    ]
}





/*
Admin Screens: 
        1. Category 
        2. Startup list - details and their posts
        3. Chat
        4. Govt. Schemes
        5. Create Webinars
*/