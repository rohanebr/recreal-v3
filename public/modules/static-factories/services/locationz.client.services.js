'use strict';

angular.module('static-factories').factory('Locationz', [
	function() {
		// Industries service logic
		// ...
		var factory = {};
		var locationz = [
			{ name: 'Bagh' },
			{ name: 'Bhimber' },
			{ name: 'khuiratta' },
			{ name: 'Kotli' },
			{ name: 'Mangla' },
			{ name: 'Mirpur' },
			{ name: 'Muzaffarabad' },
			{ name: 'Plandri' },
			{ name: 'Rawalakot' },
			{ name: 'Punch' },
			{ name: 'Amir Chah' },
			{ name: 'Bazdar' },
			{ name: 'Bela' },
			{ name: 'Bellpat' },
			{ name: 'Bagh' },
			{ name: 'Burj' },
			{ name: 'Chah Sandan' },
			{ name: 'Chaman' },
			{ name: 'Chakku' },
			{ name: 'Chhatr' },
			{ name: 'Dalbandin' },
			{ name: 'Dera Bugti' },
			{ name: 'Dhana Sar' },
			{ name: 'Diwana' },
			{ name: 'Duki' },
			{ name: 'Dushi' },
			{ name: 'Duzab' },
			{ name: 'Gajar' },
			{ name: 'Gandava' },
			{ name: 'Garhi Khairo' },
			{ name: 'Garruck' },
			{ name: 'Ghazluna' },
			{ name: 'Girdan' },
			{ name: 'Gulistan' },
			{ name: 'Gwadar' },
			{ name: 'Gwash' },
			{ name: 'Hab Chauki' },
			{ name: 'Hameedabad' },
			{ name: 'Harnai' },
			{ name: 'Hinglaj' },
			{ name: 'Hoshab' },
			{ name: 'Ispikan' },
			{ name: 'Jhal' },
			{ name: 'Jhal Jhao' },
			{ name: 'Jhatpat' },
			{ name: 'Jiwani' },
			{ name: 'Kalandi' },
			{ name: 'Kalat' },
			{ name: 'Kamararod' },
			{ name: 'Kanak' },
			{ name: 'Kandi' },
			{ name: 'Kanpur' },
			{ name: 'Kapip' },
			{ name: 'Kappar' },
			{ name: 'Karodi' },
			{ name: 'Katuri' },
			{ name: 'Kharan' },
			{ name: 'Khuzdar' },
			{ name: 'Kikki' },
			{ name: 'Kohan' },
			{ name: 'Kohlu' },
			{ name: 'Korak' },
			{ name: 'Lahri' },
			{ name: 'Lasbela' },
			{ name: 'Liari' },
			{ name: 'Loralai' },
			{ name: 'Mach' },
			{ name: 'Mand' },
			{ name: 'Mangucha' },
			{ name: 'Mashki Chah' },
			{ name: 'Maslti' },
			{ name: 'Mastung' },
			{ name: 'Mekhtar' },
			{ name: 'Merui' },
			{ name: 'Mianez' },
			{ name: 'Murgha Kibzai' },
			{ name: 'Musa Khel Bazar' },
			{ name: 'Nagha Kalat' },
			{ name: 'Nal' },
			{ name: 'Naseerabad' },
			{ name: 'Nauroz Kalat' },
			{ name: 'Nur Gamma' },
			{ name: 'Nushki' },
			{ name: 'Nuttal' },
			{ name: 'Ormara' },
			{ name: 'Palantuk' },
			{ name: 'Panjgur' },
			{ name: 'Pasni' },
			{ name: 'Piharak' },
			{ name: 'Pishin' },
			{ name: 'Qamruddin Karez' },
			{ name: 'Qila Abdullah' },
			{ name: 'Qila Ladgasht' },
			{ name: 'Qila Safed' },
			{ name: 'Qila Saifullah' },
			{ name: 'Quetta' },
			{ name: 'Rakhni' },
			{ name: 'Robat Thana' },
			{ name: 'Rodkhan' },
			{ name: 'Saindak' },
			{ name: 'Sanjawi' },
			{ name: 'Saruna' },
			{ name: 'Shabaz Kalat' },
			{ name: 'Shahpur' },
			{ name: 'Sharam Jogizai' },
			{ name: 'Shingar' },
			{ name: 'Shorap' },
			{ name: 'Sibi' },
			{ name: 'Sonmiani' },
			{ name: 'Spezand' },
			{ name: 'Spintangi' },
			{ name: 'Sui' },
			{ name: 'Suntsar' },
			{ name: 'Surab' },
			{ name: 'Thalo' },
			{ name: 'Tump' },
			{ name: 'Turbat' },
			{ name: 'Umarao' },
			{ name: 'pirMahal' },
			{ name: 'Uthal' },
			{ name: 'Vitakri' },
			{ name: 'Wadh' },
			{ name: 'Washap' },
			{ name: 'Wasjuk' },
			{ name: 'Yakmach' },
			{ name: 'Zhob' },
			{ name: 'Astor' },
			{ name: 'Baramula' },
			{ name: 'Hunza' },
			{ name: 'Gilgit' },
			{ name: 'Nagar' },
			{ name: 'Skardu' },
			{ name: 'Shangrila' },
			{ name: 'Shandur' },
			{ name: 'Bajaur' },
			{ name: 'Hangu' },
			{ name: 'Malakand' },
			{ name: 'Miram Shah' },
			{ name: 'Mohmand' },
			{ name: 'Khyber' },
			{ name: 'Kurram' },
			{ name: 'North Waziristan' },
			{ name: 'South Waziristan' },
			{ name: 'Wana' },
			{ name: 'NWFP' },
			{ name: 'Abbottabad' },
			{ name: 'Ayubia' },
			{ name: 'Adezai' },
			{ name: 'Banda Daud Shah' },
			{ name: 'Bannu' },
			{ name: 'Batagram' },
			{ name: 'Birote' },
			{ name: 'Buner' },
			{ name: 'Chakdara' },
			{ name: 'Charsadda' },
			{ name: 'Chitral' },
			{ name: 'Dargai' },
			{ name: 'Darya Khan' },
			{ name: 'Dera Ismail Khan' },
			{ name: 'Drasan' },
			{ name: 'Drosh' },
			{ name: 'Hangu' },
			{ name: 'Haripur' },
			{ name: 'Kalam' },
			{ name: 'Karak' },
			{ name: 'Khanaspur' },
			{ name: 'Kohat' },
			{ name: 'Kohistan' },
			{ name: 'Lakki Marwat' },
			{ name: 'Latamber' },
			{ name: 'Lower Dir' },
			{ name: 'Madyan' },
			{ name: 'Malakand' },
			{ name: 'Mansehra' },
			{ name: 'Mardan' },
			{ name: 'Mastuj' },
			{ name: 'Mongora' },
			{ name: 'Nowshera' },
			{ name: 'Paharpur' },
			{ name: 'Peshawar' },
			{ name: 'Saidu Sharif' },
			{ name: 'Shangla' },
			{ name: 'Sakesar' },
			{ name: 'Swabi' },
			{ name: 'Swat' },
			{ name: 'Tangi' },
			{ name: 'Tank' },
			{ name: 'Thall' },
			{ name: 'Tordher' },
			{ name: 'Upper Dir' },
			{ name: 'Ahmedpur East' },
			{ name: 'Ahmed Nager Chatha' },
			{ name: 'Ali Pur' },
			{ name: 'Arifwala' },
			{ name: 'Attock' },
			{ name: 'Basti Malook' },
			{ name: 'Bhagalchur' },
			{ name: 'Bhalwal' },
			{ name: 'Bahawalnagar' },
			{ name: 'Bahawalpur' },
			{ name: 'Bhaipheru' },
			{ name: 'Bhakkar' },
			{ name: 'Burewala' },
			{ name: 'Chailianwala' },
			{ name: 'Chakwal' },
			{ name: 'Chichawatni' },
			{ name: 'Chiniot' },
			{ name: 'Chowk Azam' },
			{ name: 'Chowk Sarwar Shaheed' },
			{ name: 'Daska' },
			{ name: 'Darya Khan' },
			{ name: 'Dera Ghazi Khan' },
			{ name: 'Derawar Fort' },
			{ name: 'Dhaular' },
			{ name: 'Dina City' },
			{ name: 'Dinga' },
			{ name: 'Dipalpur' },
			{ name: 'Faisalabad' },
			{ name: 'Fateh Jang' },
			{ name: 'Gadar' },
			{ name: 'Ghakhar Mandi' },
			{ name: 'Gujranwala' },
			{ name: 'Gujrat' },
			{ name: 'Gujar Khan' },
			{ name: 'Hafizabad' },
			{ name: 'Haroonabad' },
			{ name: 'Hasilpur' },
			{ name: 'Haveli Lakha' },
			{ name: 'Jampur' },
			{ name: 'Jhang' },
			{ name: 'Jhelum' },
			{ name: 'Kalabagh' },
			{ name: 'Karor Lal Esan' },
			{ name: 'Kasur' },
			{ name: 'Kamalia' },
			{ name: 'Kamokey' },
			{ name: 'Khanewal' },
			{ name: 'Khanpur' },
			{ name: 'Kharian' },
			{ name: 'Khushab' },
			{ name: 'Kot Addu' },
			{ name: 'Jahania' },
			{ name: 'Jalla Araain' },
			{ name: 'Jauharabad' },
			{ name: 'Laar' },
			{ name: 'Lahore' },
			{ name: 'Lalamusa' },
			{ name: 'Layyah' },
			{ name: 'Lodhran' },
			{ name: 'Mamoori' },
			{ name: 'Mandi Bahauddin' },
			{ name: 'Makhdoom Aali' },
			{ name: 'Mandi Warburton' },
			{ name: 'Mailsi' },
			{ name: 'Mian Channu' },
			{ name: 'Minawala' },
			{ name: 'Mianwali' },
			{ name: 'Multan' },
			{ name: 'Murree' },
			{ name: 'Muridke' },
			{ name: 'Muzaffargarh' },
			{ name: 'Narowal' },
			{ name: 'Okara' },
			{ name: 'Renala Khurd' },
			{ name: 'Rajan Pur' },
			{ name: 'Pak Pattan' },
			{ name: 'Panjgur' },
			{ name: 'Pattoki' },
			{ name: 'Pirmahal' },
			{ name: 'Qila Didar Singh' },
			{ name: 'Rabwah' },
			{ name: 'Raiwind' },
			{ name: 'Rajan Pur' },
			{ name: 'Rahim Yar Khan' },
			{ name: 'Rawalpindi' },
			{ name: 'Rohri' },
			{ name: 'Sadiqabad' },
			{ name: 'Safdar Abad – (Dhaban Singh)' },
			{ name: 'Sahiwal' },
			{ name: 'Sangla Hill' },
			{ name: 'Samberial' },
			{ name: 'Sarai Alamgir' },
			{ name: 'Sargodha' },
			{ name: 'Shakargarh' },
			{ name: 'Shafqat Shaheed Chowk' },
			{ name: 'Sheikhupura' },
			{ name: 'Sialkot' },
			{ name: 'Sohawa' },
			{ name: 'Sooianwala' },
			{ name: 'Sundar (city)' },
			{ name: 'Talagang' },
			{ name: 'Tarbela' },
			{ name: 'Takhtbai' },
			{ name: 'Taxila' },
			{ name: 'Toba Tek Singh' },
			{ name: 'Vehari' },
			{ name: 'Wah Cantonment' },
			{ name: 'Wazirabad' },
			{ name: 'Ali Bandar' },
			{ name: 'Baden' },
			{ name: 'Chachro' },
			{ name: 'Dadu' },
			{ name: 'Digri' },
			{ name: 'Diplo' },
			{ name: 'Dokri' },
			{ name: 'Gadra' },
			{ name: 'Ghanian' },
			{ name: 'Ghauspur' },
			{ name: 'Ghotki' },
			{ name: 'Hala' },
			{ name: 'Hyderabad' },
			{ name: 'Islamkot' },
			{ name: 'Jacobabad' },
			{ name: 'Jamesabad' },
			{ name: 'Jamshoro' },
			{ name: 'Janghar' },
			{ name: 'Jati (Mughalbhin)' },
			{ name: 'Jhudo' },
			{ name: 'Jungshahi' },
			{ name: 'Kandiaro' },
			{ name: 'Karachi' },
			{ name: 'Kashmor' },
			{ name: 'Keti Bandar' },
			{ name: 'Khairpur' },
			{ name: 'Khora' },
			{ name: 'Klupro' },
			{ name: 'Khokhropur' },
			{ name: 'Korangi' },
			{ name: 'Kotri' },
			{ name: 'Kot Sarae' },
			{ name: 'Larkana' },
			{ name: 'Lund' },
			{ name: 'Mathi' },
			{ name: 'Matiari' },
			{ name: 'Mehar' },
			{ name: 'Mirpur Batoro' },
			{ name: 'Mirpur Khas' },
			{ name: 'Mirpur Sakro' },
			{ name: 'Mithi' },
			{ name: 'Mithani' },
			{ name: 'Moro' },
			{ name: 'Nagar Parkar' },
			{ name: 'Naushara' },
			{ name: 'Naudero' },
			{ name: 'Noushero Feroz' },
			{ name: 'Nawabshah' },
			{ name: 'Nazimabad' },
			{ name: 'Naokot' },
			{ name: 'Pendoo' },
			{ name: 'Pokran' },
			{ name: 'Qambar' },
			{ name: 'Qazi Ahmad' },
			{ name: 'Ranipur' },
			{ name: 'Ratodero' },
			{ name: 'Rohri' },
			{ name: 'Saidu Sharif' },
			{ name: 'Sakrand' },
			{ name: 'Sanghar' },
			{ name: 'Shadadkhot' },
			{ name: 'Shahbandar' },
			{ name: 'Shahdadpur' },
			{ name: 'Shahpur Chakar' },
			{ name: 'Shikarpur' },
			{ name: 'Sujawal' },
			{ name: 'Sukkur' },
			{ name: 'Tando Adam' },
			{ name: 'Tando Allahyar' },
			{ name: 'Tando Bago' },
			{ name: 'Tar Ahamd Rind' },
			{ name: 'Thatta' },
			{ name: 'Tujal' },
			{ name: 'Umarkot' },
			{ name: 'Veirwaro' },
			{ name: 'Warah' }
			];

		// Public API
		factory.getLocationz = function() {
				return locationz;
			};
		return factory;
	}
]);


