// this tool enable you to use random search, It intelligencily returning a correct phone number
(function(exports){
	/* Initialize */
	exports.init=function(_incomeText/*, info, option*/){
		var currentOption,currentPhoneInfo;
		if(arguments[1]!==undefined){
			currentPhoneInfo=compileInfo(arguments[1])
		}else{
			currentPhoneInfo=getInfo()
		}
		if(arguments[2]!==undefined){
			currentOption=compileOptions(arguments[2])
		}else{
			currentOption=getOption()
		}
		incomeText=compileIncomeText(_incomeText);
		_temp.isValid=(incomeText.length > 8);
		if(!_temp.isValid){
			callEvent("invalid_number",_incomeText);
		}
		callEvent("before_initialize",_incomeText);
		incomeText=compileIncomeText(_incomeText);
		_temp.isValid=(incomeText.length > 8);
		if ((incomeText.length > 8) &&  currentOption.getAll===true)  {
			_temp.phoneNumber=incomeText;
			_temp.phoneLength=incomeText.replace(/\+/,"").length || 0;
			_temp.suscriberNumber=(incomeText.substr(-9)||0);
			_temp.countryPhoneCode=incomeText.replace(/\+/,"").replace(_temp.suscriberNumber,"");
			if(phones[incomeText.replace(/\+/,"").substr(0,4)]) {
				_temp.countryPhoneCode=incomeText.replace(/\+/,"").substr(0,4);
				if(incomeText.replace(/\+/,"").length > 10) _temp.suscriberNumber=(incomeText.substr((incomeText.replace(/\+/,"").length-1) * -1));
			}
			if(phones[incomeText.replace(/\+/,"").substr(0,5)]) {
				_temp.countryPhoneCode=incomeText.replace(/\+/,"").substr(0,5);
				if(incomeText.replace(/\+/,"").length > 10) _temp.suscriberNumber=(incomeText.substr((incomeText.replace(/\+/,"").length-1) * -1));
			}
			if(phones[incomeText.replace(/\+/,"").substr(0,6)]) {
				_temp.countryPhoneCode=incomeText.replace(/\+/,"").substr(0,6);
				if(incomeText.replace(/\+/,"").length > 10) _temp.suscriberNumber=(incomeText.substr((incomeText.replace(/\+/,"").length-1) * -1));
			}
			_temp.countryCode=phones[_temp.countryPhoneCode];
			_temp.countryName=countries[_temp.countryCode];
			_temp.countryContinent=countries_continent_map[countries_continent[_temp.countryCode]];
			try{
				_temp.countryCodeExist=true;
				_temp.countryFlag=compileFlagLink(_temp.countryCode,currentOption);
			}catch(e){
				_temp.countryCodeExist=false;
				callEvent("unknown_country",_temp);
			}
			callEvent("all_got",_temp);
		}
		return {
			val:function(){
				callEvent("value_got",incomeText);
				return incomeText
			},
			isValid:function(){
				callEvent("verified",_temp.isValid);
				return _temp.isValid
			},
			proccess:exports
		}
	}
	/* Environnement Vars */
	var eventTriggers,incomeText,currentOption,currentPhoneInfo;
	const _default={
		phoneInfo:{
			_defaultCountryCode:1,
			minPhoneCodeLength:1,
			minPhoneLength:9,
			maxPhoneCodeLength:3,
			maxPhoneLengthE123:12,
			maxPhoneLengthAutorized:15,
			satellitePhoneLength:12,
			satellitePhoneCodeLength:4,
			_defaultInternationalMarker:"+",
			availableInternationalMarkers:["+","00"]
		},
		options:{
			flagLink:"./flags/$1.$2",
			flagExtension:"svg",
			liveScan:true,
			useGPS:true,
			getAll:true,
			ignoreSatellite:true,
		}
	};
	var _temp={
		isValid:false,
		phoneNumber:0,
		phoneLength:0,
		countryCodeExist:false,
		suscriberNumber:0,
		countryName:0,
		countryCode:0,
		countryContinent:0,
		countryPhoneCode:0,
	}
	var events={};
	/* Environnement Vars */

	/* Private Functions */
	function callEvent(eventname,obj){
		if(events[eventname]){
			events[eventname].apply(null,[obj]);
		}else{
			console.log("The event : "+eventname+" doesn't trigger any function");
		}
	}
	function thatOpt(opt,label){
		if(opt!==undefined){
			return opt;
		}else{
			return getOption()[label];
		}
	}
	function thatInfo(info,label){
		if(info!==undefined){
			return info;
		}else{
			return getInfo()[label];
		}
	}
	function setInfo(info){
		localStorage.setItem("phoneinfojson",JSON.stringify(compileInfo(info)));
		localStorage.setItem("phoneinfoset","true");
	}
	function getInfo(){
		try{
			if (localStorage.getItem("phoneinfoset")==="true") {
				return JSON.parse(localStorage.getItem("phoneinfojson"));
			}else{
				return _default.phoneInfo;
			}
		}catch(e){
			return _default.phoneInfo;
		}
	}
	function clearInfo(){
		localStorage.setItem("phoneinfojson","");
		localStorage.setItem("phoneinfoset","false");
	}
	function setOption(option){
		localStorage.setItem("phoneoptionjson",JSON.stringify(compileOptions(option)));
		localStorage.setItem("phoneoptionset","true");
	}
	function getOption(){
		try{
			if (localStorage.getItem("phoneoptionset")==="true") 
				return JSON.parse(localStorage.getItem("phoneoptionjson"));
			else
				return _default.options;
		}catch(e){
			return _default.options;
		}
	}
	function clearOption(){
		localStorage.setItem("phoneoptionjson","");
		localStorage.setItem("phoneoptionset","false");
	}
	function compileInfo(inInfo){
		return {
			_defaultCountryCode:thatInfo(inInfo._defaultCountryCode,"_defaultCountryCode"),
			minPhoneCodeLength:thatInfo(inInfo.minPhoneCodeLength,"minPhoneCodeLength"),
			minPhoneLength:thatInfo(inInfo.minPhoneLength,"minPhoneLength"),
			maxPhoneCodeLength:thatInfo(inInfo.maxPhoneCodeLength,"maxPhoneCodeLength"),
			maxPhoneLengthE123:thatInfo(inInfo.maxPhoneLengthE123,"maxPhoneLengthE123"),
			maxPhoneLengthAutorized:thatInfo(inInfo.maxPhoneLengthAutorized,"maxPhoneLengthAutorized"),
			_defaultInternationalMarker:thatInfo(inInfo._defaultInternationalMarker,"_defaultInternationalMarker"),
			availableInternationalMarkers:thatInfo(inInfo.availableInternationalMarkers,"availableInternationalMarkers")
		 }
	}
	function compileOptions(iOpt){
		return {
			liveScan:thatOpt(iOpt.liveScan,"liveScan"),
			useGPS:thatOpt(iOpt.useGPS,"useGPS"),
			getAll:thatOpt(iOpt.getAll,"getAll"),
			flagLink:thatOpt(iOpt.flagLink,"flagLink"),
			flagExtension:thatOpt(iOpt.flagExtension,"flagExtension")
		}
	}
	function compileIncomeText(incomeText){
	  var cl=(((incomeText.toString().indexOf("+")>=0)?"+":"")+incomeText.toString().replace(/\D*/g,"")).replace(/^(\+)*[0]*/,"+");
	  return cl.substr(0,16);
	}
	function compileFlagLink(countrycode,_options){
		return compileOptions(_options).flagLink.replace("$1",countrycode.toLowerCase()).replace("$2",compileOptions(_options).flagExtension)
	}
	/* Private Functions */

	/* Environnement Vars */
	exports.useDefaults=function(val){
		if(arguments[0]===true){
			setInfo(_default.phoneInfo);
		}else if((arguments[0] instanceof Array) || (arguments[0] instanceof Object)){
			setInfo(compileInfo(val));
		}
		if((arguments[1] instanceof Array) || (arguments[1] instanceof Object)){
			setOption(compileOptions(arguments[1]));
		}
	}
	exports.addEventListener=function(event,fn){
		events[event]=fn;
	}
	exports.output={
		get phoneLength(){
			return _temp.phoneLength
		},
		get suscriberNumber(){
			return _temp.suscriberNumber
		},
		get countryName(){
			return _temp.countryName
		},
		get countryCode(){
			return _temp.countryCode
		},
		get countryPhoneCode(){
			return _temp.countryPhoneCode
		},
		get countryContinent(){
			return _temp.countryContinent
		},
		get countryFlag(){
			return _temp.countryFlag
		},
		get phoneNumber(){
			return _temp.phoneNumber
		}
	}
})(this.PhoneValidator={});

var countries_continent={"BD": "AS", "BE": "EU", "BF": "AF", "BG": "EU", "BA": "EU", "BB": "NA", "WF": "OC", "BL": "NA", "BM": "NA", "BN": "AS", "BO": "SA", "BH": "AS", "BI": "AF", "BJ": "AF", "BT": "AS", "JM": "NA", "BV": "AN", "BW": "AF", "WS": "OC", "BQ": "NA", "BR": "SA", "BS": "NA", "JE": "EU", "BY": "EU", "BZ": "NA", "RU": "EU", "RW": "AF", "RS": "EU", "TL": "OC", "RE": "AF", "TM": "AS", "TJ": "AS", "RO": "EU", "TK": "OC", "GW": "AF", "GU": "OC", "GT": "NA", "GS": "AN", "GR": "EU", "GQ": "AF", "GP": "NA", "JP": "AS", "GY": "SA", "GG": "EU", "GF": "SA", "GE": "AS", "GD": "NA", "GB": "EU", "GA": "AF", "SV": "NA", "GN": "AF", "GM": "AF", "GL": "NA", "GI": "EU", "GH": "AF", "OM": "AS", "TN": "AF", "JO": "AS", "HR": "EU", "HT": "NA", "HU": "EU", "HK": "AS", "HN": "NA", "HM": "AN", "VE": "SA", "PR": "NA", "PS": "AS", "PW": "OC", "PT": "EU", "SJ": "EU", "PY": "SA", "IQ": "AS", "PA": "NA", "PF": "OC", "PG": "OC", "PE": "SA", "PK": "AS", "PH": "AS", "PN": "OC", "PL": "EU", "PM": "NA", "ZM": "AF", "EH": "AF", "EE": "EU", "EG": "AF", "ZA": "AF", "EC": "SA", "IT": "EU", "VN": "AS", "SB": "OC", "ET": "AF", "SO": "AF", "ZW": "AF", "SA": "AS", "ES": "EU", "ER": "AF", "ME": "EU", "MD": "EU", "MG": "AF", "MF": "NA", "MA": "AF", "MC": "EU", "UZ": "AS", "MM": "AS", "ML": "AF", "MO": "AS", "MN": "AS", "MH": "OC", "MK": "EU", "MU": "AF", "MT": "EU", "MW": "AF", "MV": "AS", "MQ": "NA", "MP": "OC", "MS": "NA", "MR": "AF", "IM": "EU", "UG": "AF", "TZ": "AF", "MY": "AS", "MX": "NA", "IL": "AS", "FR": "EU", "IO": "AS", "SH": "AF", "FI": "EU", "FJ": "OC", "FK": "SA", "FM": "OC", "FO": "EU", "NI": "NA", "NL": "EU", "NO": "EU", "NA": "AF", "VU": "OC", "NC": "OC", "NE": "AF", "NF": "OC", "NG": "AF", "NZ": "OC", "NP": "AS", "NR": "OC", "NU": "OC", "CK": "OC", "XK": "EU", "CI": "AF", "CH": "EU", "CO": "SA", "CN": "AS", "CM": "AF", "CL": "SA", "CC": "AS", "CA": "NA", "CG": "AF", "CF": "AF", "CD": "AF", "CZ": "EU", "CY": "EU", "CX": "AS", "CR": "NA", "CW": "NA", "CV": "AF", "CU": "NA", "SZ": "AF", "SY": "AS", "SX": "NA", "KG": "AS", "KE": "AF", "SS": "AF", "SR": "SA", "KI": "OC", "KH": "AS", "KN": "NA", "KM": "AF", "ST": "AF", "SK": "EU", "KR": "AS", "SI": "EU", "KP": "AS", "KW": "AS", "SN": "AF", "SM": "EU", "SL": "AF", "SC": "AF", "KZ": "AS", "KY": "NA", "SG": "AS", "SE": "EU", "SD": "AF", "DO": "NA", "DM": "NA", "DJ": "AF", "DK": "EU", "VG": "NA", "DE": "EU", "YE": "AS", "DZ": "AF", "US": "NA", "UY": "SA", "YT": "AF", "UM": "OC", "LB": "AS", "LC": "NA", "LA": "AS", "TV": "OC", "TW": "AS", "TT": "NA", "TR": "AS", "LK": "AS", "LI": "EU", "LV": "EU", "TO": "OC", "LT": "EU", "LU": "EU", "LR": "AF", "LS": "AF", "TH": "AS", "TF": "AN", "TG": "AF", "TD": "AF", "TC": "NA", "LY": "AF", "VA": "EU", "VC": "NA", "AE": "AS", "AD": "EU", "AG": "NA", "AF": "AS", "AI": "NA", "VI": "NA", "IS": "EU", "IR": "AS", "AM": "AS", "AL": "EU", "AO": "AF", "AQ": "AN", "AS": "OC", "AR": "SA", "AU": "OC", "AT": "EU", "AW": "NA", "IN": "AS", "AX": "EU", "AZ": "AS", "IE": "EU", "ID": "AS", "UA": "EU", "QA": "AS", "MZ": "AF"};
var countries_continent_map={"AS":"ASIA","EU":"EUROPE","AF":"AFRICA","NA":"NORTH AMERICA","OC":"OCEANIA","AN":"ANTARCTICA","SA":"SOUTH AMERICA"}
var countries={"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"};
var phones={"1":"UM","7":"KZ","20":"EG","27":"ZA","30":"GR","31":"NL","32":"BE","33":"FR","34":"ES","36":"HU","39":"IT","40":"RO","41":"CH","43":"AT","44":"GB","45":"DK","46":"SE","47":"NO","48":"PL","49":"DE","51":"PE","52":"MX","53":"CU","54":"AR","55":"BR","56":"CL","57":"CO","58":"VE","60":"MY","61":"AU","62":"ID","63":"PH","64":"NZ","65":"SG","66":"TH","81":"JP","82":"KR","84":"VN","86":"CN","90":"TR","91":"IN","92":"PK","93":"AF","94":"LK","95":"MM","98":"IR","211":"SS","212":"MA","213":"DZ","216":"TN","218":"LY","220":"GM","221":"SN","222":"MR","223":"ML","224":"GN","225":"CI","226":"BF","227":"NE","228":"TG","229":"BJ","230":"MU","231":"LR","232":"SL","233":"GH","234":"NG","235":"TD","236":"CF","237":"CM","238":"CV","239":"ST","240":"GQ","241":"GA","242":"CG","243":"CD","244":"AO","245":"GW","246":"IO","248":"SC","249":"SD","250":"RW","251":"ET","252":"SO","253":"DJ","254":"KE","255":"TZ","256":"UG","257":"BI","258":"MZ","260":"ZM","261":"MG","262":"YT","263":"ZW","264":"NA","265":"MW","266":"LS","267":"BW","268":"SZ","269":"KM","290":"SH","291":"ER","297":"AW","298":"FO","299":"GL","350":"GI","351":"PT","352":"LU","353":"IE","354":"IS","355":"AL","356":"MT","357":"CY","358":"FI","359":"BG","370":"LT","371":"LV","372":"EE","373":"MD","374":"AM","375":"BY","376":"AD","377":"MC","378":"SM","379":"VA","380":"UA","381":"RS","382":"ME","385":"HR","386":"SI","387":"BA","389":"MK","420":"CZ","421":"SK","423":"LI","500":"FK","501":"BZ","502":"GT","503":"SV","504":"HN","505":"NI","506":"CR","507":"PA","508":"PM","509":"HT","590":"MF","591":"BO","592":"GY","593":"EC","594":"GF","595":"PY","596":"MQ","597":"SR","598":"UY","599":"SX","670":"TL","672":"NF","673":"BN","674":"NR","675":"PG","676":"TO","677":"SB","678":"VU","679":"FJ","680":"PW","681":"WF","682":"CK","683":"NU","685":"WS","686":"KI","687":"NC","688":"TV","689":"PF","690":"TK","691":"FM","692":"MH","850":"KP","852":"HK","853":"MO","855":"KH","856":"LA","870":"PN","880":"BD","886":"TW","960":"MV","961":"LB","962":"JO","963":"SY","964":"IQ","965":"KW","966":"SA","967":"YE","968":"OM","970":"PS","971":"AE","972":"IL","973":"BH","974":"QA","975":"BT","976":"MN","977":"NP","992":"TJ","993":"TM","994":"AZ","995":"GE","996":"KG","998":"UZ","1246":"BB","1441":"BM","1876":"JM","":"AQ","1242":"BS","441534":"JE","1671":"GU","441481":"GG","1473":"GD","1829":"DO","1787":"PR","1939":"PR","1670":"MP","1664":"MS","441624":"IM","1869":"KN","1345":"KY","1809":"DO","1767":"DM","1284":"VG","1758":"LC","1868":"TT","1649":"TC","1784":"VC","1268":"AG","1264":"AI","1340":"VI","1684":"AS","35818":"AX"}

PhoneValidator.addEventListener("all_got",function(obj){
	console.log("all_got_function : ",obj);
});

PhoneValidator.init("+380-630-290-354");