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
                // profilePic: {
                //     url: string
                // },
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
                    followers: number, //0
                    following: number //0
                }
    
                savedStartups: string[] // auth ids of startups
    
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
                        // logo: {
                        //     mob: string,
                        //     url: string,
                        //     thumb: string
                        // },
                        currentFinancialIncome: number,
                        currentValuation: number,
                        typeOfInvestement: string,
                        amount: number,
                    }
                }
    
                followers: [
                    authId: {
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
                    }
                ],
    
                following: [
                    authId: {
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
                    }
                ]
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
                link: string,
                createdAt: Date,
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
    
    
    
    
        chat: [
    
            authId: { //AYUSH
                totalUnreads: number
    
                //sub-collection
                startups: [
                    authId: { //SONAL
                        name: string
                        coverPic: string
                        lastMsg: string,
                        lastMsgAt: Date,
                        totalUnReads: number
    
                        //sub-collection
                        messages: [
                            docId: { //HI
                                createdAt: Date,
                                type: 'text',
                                msg: string,
                                by: string, // authId
                            }
                        ]
                    }
                ]
            },
    
            authId: { //SONAL
                totalUnreads: number
    
                //sub-collection
    
                startups: [
                    authId: { //AYUSH
                        name: string
                        coverPic: string
                        lastMsg: string,
                        lastMsgAt: Date,
                        totalUnReads: number
    
                        //sub-collection
                        messages: [
                            docId: {
                                createdAt: Date,
                                type: 'text',
                                msg: string,
                                by: string, // authId
                            }
                        ]
                    }
                ]
            },
    
            authId: { //HARSH
                totalUnreads: number
    
                //sub-collection
    
                startups: [
                    authId: {
                        name: string
                        coverPic: string
                        lastMsg: string,
                        lastMsgAt: Date,
                        totalUnReads: number
    
                        //sub-collection
                        messages: [
                            docId: {
                                createdAt: Date,
                                type: 'text',
                                msg: string,
                                by: string, // authId
                            }
                        ]
                    }
                ]
            },
        ]
    
        articles: [
            docId: {
                name: string,
                description: string,
                image: {
                    mob: string,
                    url: string,
                    thumb: string
                },
                link: string,
                createdAt: Date,
            }
        ]
    
        notifications: {
            docId: {
                title: string,
                message: string,
                createdAt: Date,
            }
        }
    }

    /*
    Admin Screens: 
            1. Category 
            2. Startup list - details and their posts
            3. Govt. Schemes
            4. Create Webinars
    */