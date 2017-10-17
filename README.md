# PhoneValidator
Get international phone number informations

## Getting Started
Phone Validator is a Javascript object that helps you validate a phone number written in an international format even if it contains other characters that are not numeric. It recognizes Country Code, Country Name, Country Continent, and other useful information. It's also a full-featured object and have persistent information.

### Built in
Phone Validator is built under Javascript without any dependency. It can be used wherever it is necessary to do a verification of the telephone number. It can also be used to get information about the current location of the user after checking the phone

### Installing
#### CDN Integration

Version Spec
<script type="text/javscript" src="https://unpkg.com/phonevalidator@1.0.0/phone.validator.min.js"></scirpt>

Latest Version
<script type="text/javscript" src="https://unpkg.com/phonevalidator/phone.validator.min.js"/>
>Warning: When using the cdn link, you must change the default flag directory to use the country flag link
'''
<script>
  PhoneValidator.useDefaults({},{flagLink:"https://unpkg.com/phonevalidator@1.0.0/flags/$1.$2"});
</script>
'''
#### NPM Integration
'''
npm install --save phonevalidator
''''
<script type="text/javscript" src="./node_modules/phonevalidator/phone.validator.min.js"></script>
<script> 
PhoneValidator.useDefaults({},{flagLink:"./node_modules/phonevalidator/flags/$1.$2"});
</script>
## Local Repository
<script type="text/javscript" src="phone.validator.min.js"></script>

# How to ...
## Basic Usage
1.Get the phone number from a string (even if it's invalid)
  PhoneValidator.init("<string>").val();
i.e: 
  PhoneValidator.init("ehfu00agufga23673j--00023848479dfaii").val()
  >Returns: +23673000238484 which is an invalid phone number
  PhoneValidator.init("(+380) 630-293-53-2").val()
  >Returns: +380630293532 which is a valid phone number
Note:
  PhoneValidator recognize 2 international characters 00 and + :
  - 00 Example 00380630293532 returns +380630293532
  - + Example +380630293532 returns +380630293532
2.Validity of a phone number
  PhoneValidator deals with the phone format of all countries in the world to verify if it's a valid phone number 
   PhoneValidator.init("dsafngjaiodfjajdaoaa").isValid()
  >Returns: false
  PhoneValidator.init("ehfu00agufga23673j--00023848479dfaii").val()
  >Returns: false
   PhoneValidator.init("+23673000238484").val()
  >Returns: false
  PhoneValidator.init("ehfu00agufga23673j--0002333dfaii").isValid()
  >Returns: true Because PhoneValidator.init("ehfu00agufga23673j--0002333dfaii").val() Returns +236730002333 which is a valid Central African Republic phone number format
  PhoneValidator.init(" +1 671-477-8355").isValid()
  >Returns : true 
3.Get the phone country code
  PhoneValidator.init("<string>")["process"].countryCode;
i.e:
  PhoneValidator.init(" +1 671-477-8355")["process"].countryCode;
  >Returns: GU
4.Get the phone country name
  PhoneValidator.init("<string>")["process"].countryName;
i.e:
  PhoneValidator.init(" +1 671-477-8355")["process"].countryName;
  >Returns: Guam
5.Get the phone continent of the country
  PhoneValidator.init("<string>")["process"].countryContinent;
i.e:
  PhoneValidator.init(" +1 671-477-8355")["process"].countryContinent;
  >Returns: OCEANIA
6.Get the phone country flag image link
  PhoneValidator.init("<string>")["process"].countryFlag;
  >Make sure your country's flag directory contains a correct value, See how to Integrate PhoneValidator in your current project in the previous topic
i.e:
  PhoneValidator.init(" +1 671-477-8355")["process"].countryFlag;
  >Returns: https://unpkg.com/phonevalidator@1.0.0/flags/gu.svg
  You can also change the country's flag directory by this way
  PhoneValidator.init("<string>",{},{flagLink:"<flag_directory>"})["process"].countryFlag;
i.e:
  PhoneValidator.init(" +1 671-477-8355",{},{flagLink:"./assets/js/phonevalidator/flags/$1.$2"})["process"].countryFlag;
  >Returns: ./assets/js/phonevalidator/flags/gu.svg <--- this method doesn't change default country's flag directory
7.Get the international country code in phone number format
  PhoneValidator.init("<string>")["process"].countryContinent;
i.e:
  PhoneValidator.init(" +1 671-477-8355")["process"].countryPhoneCode;
  >Returns: OCEANIA
