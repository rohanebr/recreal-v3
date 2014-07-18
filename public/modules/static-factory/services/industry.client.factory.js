// 'use strict';

// // Authentication service for user variables
// angular.module('static-factory').factory('IndustriesFactory', 
// 	function(){
// 		var factory = {};
// 		var industries = [
// 		{name:'Hardware'},
// 		{name:'Software'}
//     	];
//    	factory.getIndustries = function () {
//         return industries;
//     };
//     return factory;
// 	});


'use strict';
angular.module('static-factory').factory('IndustriesFactory', function () {
    var factory = {};

    var candidates = [{
        _id: 1,
        BasicProfile: {
            firstname: 'Muddaser',
            lastname: 'Ahmed',
            headline: 'Project Manager',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc1/v/t1.0-1/c170.12.621.621/s160x160/229945_10151473985828998_93472226_n.jpg?oh=4c9d0be55bddf378b870478eb117c023&oe=542BC66A&__gda__=1411634144_bbe4ff7c8be5236fbc68a388489e050e',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'muddaserahmed@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 8,
            rating: 5.0,
            availability: 5,
            contact_no: '+92 332 5525405',
            salary_expectation: 25000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '5',
            interests: '',
            certificates:'4',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007-01-01',
                end_date: '2011-01-01'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005-01-01',
                end_date: '2007-01-01'
            }],
            Positions: [{
                company_name: 'Computers and Networking Services',
                start_date: '2012-01-01',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'LCC',
                start_date: '2011-01-01',
                end_date: '2012-01-01',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 2,
        BasicProfile: {
            firstname: 'Khal',
            lastname: 'Drogo',
            headline: 'Project Manager',
            industry: 'Software',
            location: 'Multan',
            pictureurl: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/t1.0-1/c0.7.160.160/p160x160/10394486_10204056596484830_2655386530176190373_n.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'khaldrogo@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 3,
            rating: 4.0,
            availability: 15,
            contact_no: '+92 332 5525405',
            salary_expectation: 25000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Telecom Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007-01-01',
                end_date: '2011-01-01'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005-01-01',
                end_date: '2007-01-01'
            }],
            Positions: [{
                company_name: 'ZTE Telecoms',
                start_date: '2012-01-01',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'Agiltron',
                start_date: '2011-01-01',
                end_date: '2012-01-01',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 3,
        BasicProfile: {
            firstname: 'Nikola',
            lastname: 'Tesla',
            headline: 'Project Manager',
            industry: 'Software',
            location: 'Peshawar',
            pictureurl: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/t1.0-1/c0.0.160.160/p160x160/10369587_707794442633781_669528191365123058_n.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'nikolatesla@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 2,
            rating: 2.0,
            availability: 15,
            contact_no: '+92 332 5525405',
            salary_expectation: 25000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'8',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Eletrical Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007-01-01',
                end_date: '2011-01-01'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005-01-01',
                end_date: '2007-01-01'
            }],
            Positions: [{
                company_name: 'Intel Coorpuration',
                start_date: '2012',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'IBM',
                start_date: '2011-01-01',
                end_date: '2012-01-01',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 4,
        BasicProfile: {
            firstname: 'Ahsin',
            lastname: 'Anwar',
            headline: 'Cheif Technology Officer',
            industry: 'Software',
            location: 'Lahore',
            pictureurl: 'https://scontent-b-ams.xx.fbcdn.net/hphotos-xfp1/t1.0-9/10371724_801781756499237_2709934368145858040_n.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'ahsinanwar@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 4,
            rating: 4.5,
            availability: 15,
            contact_no: '+92 332 5525405',
            salary_expectation: 15000,
            skype_name: 'ahsinanwar',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'5',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007-01-01',
                end_date: '2011-01-01'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005-01-01',
                end_date: '2007-01-01'
            }],
            Positions: [{
                company_name: 'Computers and Networking Services',
                start_date: '2012',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'Huwaei Technology',
                start_date: '2008-01-01',
                end_date: '2009-01-01',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 5,
        BasicProfile: {
            firstname: 'Zafer',
            lastname: 'Mehmood',
            headline: 'Project Director',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-prn2/t1.0-9/46834_414668781954664_5980570_n.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'zafarmehmood@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 3,
            rating: 4.0,
            availability: 15,
            contact_no: '+92 332 5525405',
            salary_expectation: 25000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007-01-01',
                end_date: '2011-01-01'
            }, {
                degree: 'MS',
                study_field: 'Software Engineering',
                notes: '',
                school: 'Air University',
                start_date: '2011-01-01',
                end_date: '2014-01-01'
            }],
            Positions: [{
                company_name: 'Microsoft Corpurations',
                start_date: '2011',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Project Manager'
            }, {
                company_name: 'Tire 4',
                start_date: '2010-01-01',
                end_date: '2011-01-01',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 6,
        BasicProfile: {
            firstname: 'Steve',
            lastname: 'Jobs',
            headline: 'CEO',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDXXmUK9XXdLb1g&w=264&h=264&url=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb9%2FSteve_Jobs_Headshot_2010-CROP.jpg%2F720px-Steve_Jobs_Headshot_2010-CROP.jpg&cfs=1&f&fallback=hub_person',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'stevejobs@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 10,
            rating: 5.0,
            availability: 20,
            contact_no: '+92 332 5525405',
            salary_expectation: 40000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '1980',
                end_date: '1984'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '1978',
                end_date: '1980'
            }],
            Positions: [{
                company_name: 'Apple, Inc',
                start_date: '1992',
                end_date: '2013',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'Elixer',
                start_date: '2009',
                end_date: '2013',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 7,
        BasicProfile: {
            firstname: 'Elon',
            lastname: 'Musk',
            headline: 'Director',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'https://fbexternal-a.akamaihd.net/safe_image.php?d=AQAnmcitCC44YP0u&w=264&h=264&url=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F0%2F04%2FElon_Musk_-_The_Summit_2013.jpg%2F720px-Elon_Musk_-_The_Summit_2013.jpg&cfs=1&f&fallback=hub_person',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'elonmusk@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 5,
            rating: 3.0,
            availability: 20,
            contact_no: '+92 332 5525405',
            salary_expectation: 40000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '1990',
                end_date: '1994'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '1988',
                end_date: '1990'
            }],
            Positions: [{
                company_name: 'Space -X',
                start_date: '2002',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'PayPal',
                start_date: '2006',
                end_date: '2008',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 8,
        BasicProfile: {
            firstname: 'Guy',
            lastname: 'Kawasaki',
            headline: 'Director',
            industry: 'Software',
            location: 'San Jose',
            pictureurl: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c69.88.486.486/s160x160/944448_550531471665826_2043023874_n.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'guykawasaki@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 15,
            rating: 4.0,
            availability: 20,
            contact_no: '+92 332 5525405',
            salary_expectation: 40000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007',
                end_date: '2011'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005',
                end_date: '2007'
            }],
            Positions: [{
                company_name: 'Apple, Inc',
                start_date: '2014',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'Motorola',
                start_date: '2009',
                end_date: '2013',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 9,
        BasicProfile: {
            firstname: 'Micheal',
            lastname: 'Dell',
            headline: 'Director',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Michael_Dell_2010.jpg/220px-Michael_Dell_2010.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'michealdell@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 5,
            rating: 3.0,
            availability: 20,
            contact_no: '+92 332 5525405',
            salary_expectation: 40000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007',
                end_date: '2011'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005',
                end_date: '2007'
            }],
            Positions: [{
                company_name: 'Dell, Inc',
                start_date: '1990',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'HP, Inc',
                start_date: '2009',
                end_date: '2013',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 10,
        BasicProfile: {
            firstname: 'Gerard',
            lastname: 'Butler',
            headline: 'Director',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Gerard_Butler_%28Berlin_Film_Festival_2011%29.jpg/220px-Gerard_Butler_%28Berlin_Film_Festival_2011%29.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'gerardbutler@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 15,
            rating: 5.0,
            availability: 20,
            contact_no: '+92 332 5525405',
            salary_expectation: 40000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007',
                end_date: '2011'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005',
                end_date: '2007'
            }],
            Positions: [{
                company_name: 'Real Steel ',
                start_date: '2014',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'Shifa International',
                start_date: '2009',
                end_date: '2013',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 11,
        BasicProfile: {
            firstname: 'Monis',
            lastname: 'Rehman',
            headline: 'Director',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'http://a3.images.crunchbase.com/image/upload/c_pad,h_98,w_98/v1397182058/c5b0d930fe6d691a8a60c03e7c9efed7.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'monisrehman@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 5,
            rating: 3.0,
            availability: 20,
            contact_no: '+92 332 5525405',
            salary_expectation: 40000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007',
                end_date: '2011'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005',
                end_date: '2007'
            }],
            Positions: [{
                company_name: 'Rozee.pk',
                start_date: '2003',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'Naseeb Networks',
                start_date: '1990',
                end_date: '1999',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }, {
        _id: 12,
        BasicProfile: {
            firstname: 'Larry',
            lastname: 'Elison',
            headline: 'Director',
            industry: 'Software',
            location: 'Islamabad',
            pictureurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Larry_Elllison_on_stage.jpg/220px-Larry_Elllison_on_stage.jpg',
            linkedinprofileurl: 'http://www.linkedin.com/profile/view?id=108526618&trk=spm_pic',
            specialities: 'Cooking, Singing, Dancing in the rain, Mopping',
            summary: 'Software development professional with two years experience programming in C#.Net and JAVA. Skilled in specifications gathering, troubleshooting, and quality assurance testing.',
            email:'larryelison@gmail.com',
            address:'555-1/A, Martan Road, Westridge Bazar Rawalpindi',
            nationality:'Pakistani'
        },
        Candidate: {
            xp: 8,
            rating: 3.0,
            availability: 20,
            contact_no: '+92 332 5525405',
            salary_expectation: 40000,
            skype_name: 'muddaser.ahmed',
            linkedinOath: {
                secret: '',
                token: ''
            }
        },
        FullProfile: {
            associations: '',
            honors: '',
            interests: '',
            certificates:'6',
            test_failed:5,
            test_passed:6,
            Educations: [{
                degree: 'BS(CE)',
                study_field: 'Computer Engineering',
                notes: '',
                school: 'Comsats',
                start_date: '2007',
                end_date: '2011'
            }, {
                degree: 'FSC',
                study_field: 'Pre-Engineering',
                notes: '',
                school: 'F.G Sir Syed College',
                start_date: '2005',
                end_date: '2007'
            }],
            Positions: [{
                company_name: 'Oracle Corporation',
                start_date: '1985',
                end_date: '',
                is_current: true,
                summary: 'Reviewing current systems Presenting ideas for system improvements, including cost proposals Working closely with analysts, designers and staff Producing detailed specifications and writing the programme codes Testing the product in controlled, real situations before going live Preparation of training manuals for users Maintaining the systems once they are up and running',
                title: 'Software Developer'
            }, {
                company_name: 'Amdahl Corporation',
                start_date: '1980',
                end_date: '1985',
                is_current: false,
                summary: 'Collecting and analyzing Radio Frequency Data. Diagnosing and proposing solutions for the Radio Network at Single Site and Cluster level Comning up with ways to improve other RF KPIs',
                title: 'RF Optimization Engineer'
            }]
        }
    }
    ];
    factory.getJobCandidates = function () {
        return candidates;
    };
    factory.candidates = candidates;
    return factory;
});
