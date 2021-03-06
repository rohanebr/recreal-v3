'use strict';

angular.module('static-factories').factory('Industries', [
	function() {
		// Industries service logic
		// ...
		var factory = {};
		var industries = [
			{ group: 'corp fin'	    	, name: 'Accounting' },
			{ group: 'man tech tran'	, name: 'Airlines/Aviation'	},
			{ group: 'leg org'	    	, name: 'Alternative Dispute Resolution'	},
			{ group: 'hlth'				, name: 'Alternative Medicine'	},
			{ group: 'art med'			, name: 'Animation'	},
			{ group: 'good'				, name: 'Apparel & Fashion'	},
			{ group: 'cons'				, name: 'Architecture & Planning'	},
			{ group: 'art med rec'		, name: 'Arts and Crafts	'},
			{ group: 'man'				, name: 'Automotive'	},
			{ group: 'gov man'			, name: 'Aviation & Aerospace'	},
			{ group: 'fin'				, name: 'Banking'},
			{ group: 'gov hlth tech'	, name: 'Biotechnology'	},
			{ group: 'med rec'			, name: 'Broadcast Media'	},
			{ group: 'cons'				, name: 'Building Materials'	},
			{ group: 'corp man'			, name: 'Business Supplies and Equipment'	},
			{ group: 'fin'				, name: 'Capital Markets'	},
			{ group: 'man'				, name: 'Chemicals'	},
			{ group: 'org serv'			, name: 'Civic & Social Organization'	},
			{ group: 'cons gov'			, name: 'Civil Engineering'	},
			{ group: 'cons corp fin'	, name: 'Commercial Real Estate'	},
			{ group: 'tech'				, name: 'Computer & Network Security'	},
			{ group: 'med rec'			, name: 'Computer Games'	},
			{ group: 'tech'				, name: 'Computer Hardware'	},
			{ group: 'tech'				, name: 'Computer Networking'	},
			{ group: 'tech'				, name: 'Computer Software'	},
			{ group: 'cons'				, name: 'Construction'	},
			{ group: 'good man'			, name: 'Consumer Electronics'	},
			{ group: 'good man'			, name: 'Consumer Goods'	},
			{ group: 'org serv'			, name: 'Consumer Services'	},
			{ group: 'good'				, name: 'Cosmetics'	},
			{ group: 'agr'				, name: 'Dairy'	},
			{ group: 'gov tech'			, name: 'Defense & Space'	},
			{ group: 'art med'			, name: 'Design'	},
			{ group: 'edu'				, name: 'Education Management'	},
			{ group: 'edu org'			, name: 'E-Learning'	},
			{ group: 'good man'			, name: 'Electrical/Electronic Manufacturing'	},
			{ group: 'med rec'			, name: 'Entertainment'	},
			{ group: 'org serv'			, name: 'Environmental Services'	},
			{ group: 'corp rec serv'	, name: 'Events Services'	},
			{ group: 'gov'				, name: 'Executive Office'	},
			{ group: 'corp serv'		, name: 'Facilities Services'	},
			{ group: 'agr'				, name: 'Farming'	},
			{ group: 'fin'				, name: 'Financial Services'	},
			{ group: 'art med rec'		, name: 'Fine Art'	},
			{ group: 'agr'				, name: 'Fishery'	},
			{ group: 'rec serv'			, name: 'Food & Beverages'	},
			{ group: 'good man serv'	, name: 'Food Production'	},
			{ group: 'org'				, name: 'Fund-Raising'	},
			{ group: 'good man'			, name: 'Furniture'	},
			{ group: 'rec'				, name: 'Gambling & Casinos'	},
			{ group: 'cons man'			, name: 'Glass, Ceramics & Concrete'	},
			{ group: 'gov'				, name: 'Government Administration'	},
			{ group: 'gov'				, name: 'Government Relations'	},
			{ group: 'art med'			, name: 'Graphic Design'	},
			{ group: 'hlth rec'			, name: 'Health, Wellness and Fitness'	},
			{ group: 'edu'				, name: 'Higher Education'	},
			{ group: 'hlth'				, name: 'Hospital & Health Care'	},
			{ group: 'rec serv tran'	, name: 'Hospitality'	},
			{ group: 'corp'				, name: 'Human Resources'	},
			{ group: 'corp good tran'	, name: 'Import and Export'	},
			{ group: 'org serv'			, name: 'Individual & Family Services'	},
			{ group: 'cons man'			, name: 'Industrial Automation'	},
			{ group: 'med serv'			, name: 'Information Services'	},
			{ group: 'tech'				, name: 'Information Technology and Services'	},
			{ group: 'fin'				, name: 'Insurance'	},
			{ group: 'gov'				, name: 'International Affairs'	},
			{ group: 'gov org tran'		, name: 'International Trade and Development'	},
			{ group: 'tech'			    , name: 'Internet'	},
			{ group: 'fin'				, name: 'Investment Banking'	},
			{ group: 'fin'				, name: 'Investment Management'	},
			{ group: 'gov leg'			, name: 'Judiciary'	},
			{ group: 'gov leg'			, name: 'Law Enforcement'	},
			{ group: 'leg'				, name: 'Law Practice'	},
			{ group: 'leg'				, name: 'Legal Services'	},
			{ group: 'gov leg'			, name: 'Legislative Office'	},
			{ group: 'rec serv tran'	, name: 'Leisure, Travel & Tourism'	},
			{ group: 'med rec serv'		, name: 'Libraries'	},
			{ group: 'corp tran'		, name: 'Logistics and Supply Chain'	},
			{ group: 'good'				, name: 'Luxury Goods & Jewelry'	},
			{ group: 'man'				, name: 'Machinery'	},
			{ group: 'corp'				, name: 'Management Consulting'	},
			{ group: 'tran'				, name: 'Maritime'	},
			{ group: 'corp'				, name: 'Market Research'	},
			{ group: 'corp med'			, name: 'Marketing and Advertising'	},
			{ group: 'cons gov man'		, name: 'Mechanical or Industrial Engineering'	},
			{ group: 'med rec'			, name: 'Media Production'	},
			{ group: 'hlth'				, name: 'Medical Devices'	},
			{ group: 'hlth'				, name: 'Medical Practice'	},
			{ group: 'hlth'				, name: 'Mental Health Care'	},
			{ group: 'gov'				, name: 'Military'	},
			{ group: 'man'				, name: 'Mining & Metals'	},
			{ group: 'art med rec'		, name: 'Motion Pictures and Film'	},
			{ group: 'art med rec'		, name: 'Museums and Institutions'	},
			{ group: 'art rec'			, name: 'Music'	},
			{ group: 'gov man tech'		, name: 'Nanotechnology'	},
			{ group: 'med rec'			, name: 'Newspapers'	},
			{ group: 'org'				, name: 'Non-Profit Organization Management'	},
			{ group: 'man'				, name: 'Oil & Energy'	},
			{ group: 'med'				, name: 'Online Media'	},
			{ group: 'corp'				, name: 'Outsourcing/Offshoring'	},
			{ group: 'serv tran'		, name: 'Package/Freight Delivery'	},
			{ group: 'good man'			, name: 'Packaging and Containers'	},
			{ group: 'man'				, name: 'Paper & Forest Products'	},
			{ group: 'art med rec'		, name: 'Performing Arts'	},
			{ group: 'hlth tech'		, name: 'Pharmaceuticals'	},
			{ group: 'org'				, name: 'Philanthropy'	},
			{ group: 'art med rec'		, name: 'Photography'	},
			{ group: 'man'				, name: 'Plastics'	},
			{ group: 'gov org'			, name: 'Political Organization'	},
			{ group: 'edu'				, name: 'Primary/Secondary Education'	},
			{ group: 'med rec'			, name: 'Printing'	},
			{ group: 'corp'				, name: 'Professional Training & Coaching'	},
			{ group: 'corp org'			, name: 'Program Development'	},
			{ group: 'gov'				, name: 'Public Policy'	},
			{ group: 'corp'				, name: 'Public Relations and Communications'	},
			{ group: 'gov'				, name: 'Public Safety'	},
			{ group: 'med rec'			, name: 'Publishing'	},
			{ group: 'man'				, name: 'Railroad Manufacture'	},
			{ group: 'agr'				, name: 'Ranching'	},
			{ group: 'cons fin good'	, name: 'Real Estate'	},
			{ group: 'rec serv'			, name: 'Recreational Facilities and Services'	},
			{ group: 'org serv'			, name: 'Religious Institutions'	},
			{ group: 'gov man org'		, name: 'Renewables & Environment'	},
			{ group: 'edu gov'			, name: 'Research'	},
			{ group: 'rec serv'			, name: 'Restaurants'	},
			{ group: 'good man'			, name: 'Retail'	},
			{ group: 'corp org serv'	, name: 'Security and Investigations'	},
			{ group: 'tech'				, name: 'Semiconductors'	},
			{ group: 'man'				, name: 'Shipbuilding'	},
			{ group: 'good rec'			, name: 'Sporting Goods'	},
			{ group: 'rec'				, name: 'Sports'	},
			{ group: 'corp'				, name: 'Staffing and Recruiting'	},
			{ group: 'good'				, name: 'Supermarkets'	},
			{ group: 'gov tech'			, name: 'Telecommunications'	},
			{ group: 'man'				, name: 'Textiles'	},
			{ group: 'gov org'			, name: 'Think Tanks'	},
			{ group: 'good'				, name: 'Tobacco'	},
			{ group: 'corp gov serv'	, name: 'Translation and Localization'	},
			{ group: 'tran'				, name: 'Transportation/Trucking/Railroad'	},
			{ group: 'man'				, name: 'Utilities'	},
			{ group: 'fin tech'			, name: 'Venture Capital & Private Equity'	},
			{ group: 'hlth'				, name: 'Veterinary'	},
			{ group: 'tran'				, name: 'Warehousing'	},
			{ group: 'good'				, name: 'Wholesale'	},
			{ group: 'good man rec'		, name: 'Wine and Spirits'	},
			{ group: 'tech'				, name: 'Wireless'	},
			{ group: 'art med rec'		, name: 'Writing and Editing'	}
			];

		// Public API
		factory.getIndustries = function() {
				return industries;
			};
		return factory;
	}
]);


