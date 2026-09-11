/*// Predict.js
// Full client-side state -> city -> subcity dynamic dropdown logic.
// 1) stateCities (from your provided list)
// 2) citySubcities (some populated examples; extend as needed)
// 3) UI code to populate selects and show manual input when necessary

// ---------- state -> cities mapping (use your full mapping) ----------
const stateCities = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara Mankachar", "Tinsukia", "Udalguri"],
  "Bihar": [ "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnea", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran" ],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sukma", "Surajpur", "Surguja", "Mohla-Manpur-Ambagarh Chowki"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Bengaluru Urban", "Bengaluru Rural", "Belagavi", "Ballari", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nashik", "Nanded", "Nagpur", "Nandurbar", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Thoubal", "Ukhrul" ],
  "Meghalaya": ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Khliehriat", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "West Garo Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Khawzawl"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundergarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Sri Muktsar Sahib"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Tanjore", "Theni", "Thiruvarur", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Prayagraj", "Amethi", "Ambedkar Nagar", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Ayodhya", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],

  // UNION TERRITORIES
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Agatti", "Amini", "Andrott", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Minicoy"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
};

// ---------- city -> subcity mapping (examples; add more as needed) ----------
const citySubcities = {
  // Uttar Pradesh - Prayagraj (a.k.a. Allahabad)
  "Prayagraj": ["Nawabganj",  "Soraon" ,"Phaphamau", "MauAima", "LalGopalGanj", "Malak Harhar" ,"Kaudhihar","Shivgadh" ,"Mansurabad" ,"Tharwai" ,"Atrampur" ,"Holagadh" ,"Dahiyavan" ,"Pithipur" ,"Ismailganj"],
  "Lucknow": ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Mahanagar", "Kaiserbagh", "Other / Enter manually"],
  "Kanpur Nagar": ["Kalyanpur", "Swaroop Nagar", "Govind Nagar", "Jhansi Rani", "Civil Lines", "Other / Enter manually"],
  "Varanasi": ["Cantt", "Godowlia", "Sigra", "Rathyatra", "Lal Bahadur Shastri", "Other / Enter manually"],
  "Agra": ["Taj Ganj", "Civil Lines", "Shahganj", "Khandari", "Fatehabad Road", "Other / Enter manually"],
  "Gautam Buddh Nagar": ["Noida Sector 1", "Noida Sector 18", "Greater Noida", "Surajpur", "Other / Enter manually"],
  // Maharashtra
  "Mumbai City": ["Colaba", "Churchgate", "Bandra", "Dadar", "Andheri East", "Andheri West", "Bandra Kurla Complex", "Other / Enter manually"],
  "Pune": ["Shivajinagar", "Koregaon Park", "Hinjewadi", "Baner", "Kharadi", "Other / Enter manually"],
  "Nagpur": ["Civil Lines", "Sitabuldi", "Dhantoli", "Mihan", "Other / Enter manually"],
  // Karnataka
  "Bengaluru Urban": ["Koramangala", "Whitefield", "MG Road", "Indiranagar", "Jayanagar", "Other / Enter manually"],
  "Mysuru": ["Gokulam", "VV Mohalla", "Yadavgiri", "Rajiv Nagar", "Other / Enter manually"],
  // Tamil Nadu
  "Chennai": ["T. Nagar", "Adyar", "Velachery", "Tambaram", "Anna Nagar", "Other / Enter manually"],
  "Coimbatore": ["RS Puram", "Gandhipuram", "Peelamedu", "Avinashi Road", "Other / Enter manually"],
  // West Bengal
  "Kolkata": ["Park Street", "Salt Lake", "Ballygunge", "Howrah", "Dum Dum", "Other / Enter manually"],
  // Delhi (NCT)
  "New Delhi": ["Connaught Place", "Chanakyapuri", "Karol Bagh", "R.K. Puram", "Other / Enter manually"],
  "Central Delhi": ["Daryaganj", "Paharganj", "Chandni Chowk", "Other / Enter manually"],
  // Jammu & Kashmir / Ladakh
  "Srinagar": ["Dal Lake", "Lal Chowk", "Rajbagh", "Baramulla Road", "Other / Enter manually"],
  "Leh": ["Old Leh", "Choglamsar", "Sankar", "Other / Enter manually"],
  // Goa
  "North Goa": ["Mapusa", "Panjim", "Calangute", "Baga", "Anjuna", "Other / Enter manually"],
  // Add more city -> subcity arrays as you need...
};

// ---------- Utility functions to safely get arrays ----------
function getCitiesForState(state) {
  return stateCities[state] ? stateCities[state].slice() : [];
}
function getSubcitiesForCity(city) {
  return citySubcities[city] ? citySubcities[city].slice() : null;
}

// ---------- DOM references ----------
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const subcityContainer = document.querySelector(".subcity .choose"); // where the select/input lives
// keep reference to the subcity select element (exists in your HTML)
let subcitySelect = document.getElementById("subcity");

// Create a manual subcity text input (hidden by default)
const manualSubcityInput = document.createElement("input");
manualSubcityInput.type = "text";
manualSubcityInput.id = "subcity_manual";
manualSubcityInput.name = "subcity_manual";
manualSubcityInput.placeholder = "Enter Subcity / Locality";
manualSubcityInput.style.display = "none";
manualSubcityInput.className = "form-control"; // optional so it looks consistent

// append manual input to same container (hidden until needed)
subcityContainer.appendChild(manualSubcityInput);

// Helper to reset a select element and add a default option
function resetSelect(selectEl, defaultText = "Select") {
  selectEl.innerHTML = "";
  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = defaultText;
  selectEl.appendChild(opt);
}

// Populate city dropdown when state changes
stateSelect.addEventListener("change", function () {
  const selectedState = this.value;
  resetSelect(citySelect, "Select City");

  // reset subcity UI
  showSubcitySelect();
  resetSelect(subcitySelect, "Select Subcity");

  if (selectedState) {
    const cities = getCitiesForState(selectedState);
    if (cities.length > 0) {
      cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  }
});

// When city changes, populate subcity dropdown or show manual input
citySelect.addEventListener("change", function () {
  const selectedCity = this.value;
  const subcities = getSubcitiesForCity(selectedCity);

  // ensure manual input hidden by default
  manualSubcityInput.style.display = "none";
  showSubcitySelect();
  resetSelect(subcitySelect, "Select Subcity");

  if (subcities === null) {
    // no prefilled subcities for this city
    // provide "Other / Enter manually" option and show manual input when selected
    const otherOpt = document.createElement("option");
    otherOpt.value = "__other__";
    otherOpt.textContent = "Other / Enter manually";
    subcitySelect.appendChild(otherOpt);

    // Also add a template "No data available" option
    const ndOpt = document.createElement("option");
    ndOpt.value = "__no_data__";
    ndOpt.disabled = true;
    ndOpt.textContent = "No subcity list available — choose Other to enter manually";
    subcitySelect.appendChild(ndOpt);

    // if user wants to type immediately, optionally show manual input:
    // We keep it hidden until they pick "Other / Enter manually".
  } else {
    // populate known subcities array
    subcities.forEach(sc => {
      const option = document.createElement("option");
      option.value = sc;
      option.textContent = sc;
      subcitySelect.appendChild(option);
    });
  }
});

// when user selects a subcity option, if it's the __other__ value, show manual input
// ensure we handle dynamic replacement of subcitySelect if necessary
function onSubcityChangeHandler(e) {
  const val = e.target.value;
  if (val === "__other__" || val === "Other / Enter manually") {
    manualSubcityInput.style.display = "block";
    manualSubcityInput.focus();
  } else {
    manualSubcityInput.style.display = "none";
  }
}

// ensure listener is attached
subcitySelect.addEventListener("change", onSubcityChangeHandler);

// If for some reason subcity select is replaced/changed, re-run hooking:
function showSubcitySelect() {
  // ensure we have the element by id
  subcitySelect = document.getElementById("subcity");
  if (subcitySelect) {
    // remove previous listener to avoid duplicates, then reattach
    subcitySelect.removeEventListener("change", onSubcityChangeHandler);
    subcitySelect.addEventListener("change", onSubcityChangeHandler);
    // hide manual input by default
    manualSubcityInput.style.display = "none";
    // ensure select is visible
    subcitySelect.style.display = "inline-block";
  }
}

// Utility to get final subcity value for form submission
// If manual input visible and filled, prefer that, else return selected option
function getSubcityValue() {
  if (manualSubcityInput.style.display !== "none" && manualSubcityInput.value.trim() !== "") {
    return manualSubcityInput.value.trim();
  }
  if (subcitySelect && subcitySelect.value && subcitySelect.value !== "") {
    if (subcitySelect.value === "__other__") {
      // user selected Other but didn't type — return blank
      return "";
    }
    return subcitySelect.value;
  }
  return "";
}

// Example: if you have a form submit button, you can call getSubcityValue()
// const submitBtn = document.getElementById("predictSubmit");
// submitBtn.addEventListener("click", function(e) {
//   e.preventDefault();
//   const finalSubcity = getSubcityValue();
//   console.log("Final Subcity:", finalSubcity);
//   // proceed with prediction using other inputs
// });

// Initialize on page load: populate state list (optional if already in HTML)
function init() {
  // If your state <select> is already filled in your HTML (it is), skip repopulating.
  // But if you prefer to populate from stateCities automatically, uncomment below:

  // resetSelect(stateSelect, "Select State");
  // Object.keys(stateCities).forEach(st => {
  //   const opt = document.createElement("option");
  //   opt.value = st;
  //   opt.textContent = st;
  //   stateSelect.appendChild(opt);
  // });

  // ensure subcity select exists
  showSubcitySelect();
  resetSelect(subcitySelect, "Select Subcity");
}

// run init
init();
*/

// Predict.js
// State -> City -> SubDistrict -> SubCity dynamic selects
// - Populates districts for selected state
// - Populates subdistricts (tehsils) for selected district
// - Populates subcities for selected subdistrict
// - If no data exists, shows "Other / Enter manually" option and exposes manual input
// - On form submit, sets hidden input SubCity_final = final subcity (manual or selected)

// ------------------ state -> cities mapping (already provided earlier) ------------------
const stateCities = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara Mankachar", "Tinsukia", "Udalguri"],
  "Bihar": [ "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnea", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran" ],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sukma", "Surajpur", "Surguja", "Mohla-Manpur-Ambagarh Chowki"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Bengaluru Urban", "Bengaluru Rural", "Belagavi", "Ballari", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nashik", "Nanded", "Nagpur", "Nandurbar", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Thoubal", "Ukhrul" ],
  "Meghalaya": ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Khliehriat", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "West Garo Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Khawzawl"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundergarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Sri Muktsar Sahib"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Tanjore", "Theni", "Thiruvarur", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Prayagraj", "Amethi", "Ambedkar Nagar", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Ayodhya", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],

  // UNION TERRITORIES
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Agatti", "Amini", "Andrott", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Minicoy"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
};

// ------------------ district -> subdistricts (tehsils) mapping ------------------
// Prayagraj subdistricts as requested
const districtSubdistricts = {
  // Prayagraj (real list you requested)
  "Prayagraj": ["Bara", "Handia", "Karchhana", "Koraon", "Meja", "Phulpur", "Sadar", "Soraon"],

  // Major districts with placeholders (replace placeholders with real tehsil names as needed)
  "Agra": ["Agra-Tehsil1", "Agra-Tehsil2", "Other / Enter manually"],
  "Aligarh": ["Aligarh-Tehsil1", "Aligarh-Tehsil2", "Other / Enter manually"],
  "Amethi": ["Amethi-Tehsil1", "Amethi-Tehsil2", "Other / Enter manually"],
  "Ambedkar Nagar": ["AmbedkarNagar-Tehsil1", "AmbedkarNagar-Tehsil2", "Other / Enter manually"],
  "Amroha": ["Amroha-Tehsil1", "Amroha-Tehsil2", "Other / Enter manually"],
  "Auraiya": ["Auraiya-Tehsil1", "Auraiya-Tehsil2", "Other / Enter manually"],
  "Azamgarh": ["Azamgarh-Tehsil1", "Azamgarh-Tehsil2", "Other / Enter manually"],
  "Baghpat": ["Baghpat-Tehsil1", "Baghpat-Tehsil2", "Other / Enter manually"],
  "Bahraich": ["Bahraich-Tehsil1", "Bahraich-Tehsil2", "Other / Enter manually"],
  "Ballia": ["Ballia-Tehsil1", "Ballia-Tehsil2", "Other / Enter manually"],
  "Balrampur": ["Balrampur-Tehsil1", "Balrampur-Tehsil2", "Other / Enter manually"],
  "Banda": ["Banda-Tehsil1", "Banda-Tehsil2", "Other / Enter manually"],
  "Barabanki": ["Barabanki-Tehsil1", "Barabanki-Tehsil2", "Other / Enter manually"],
  "Bareilly": ["Bareilly-Tehsil1", "Bareilly-Tehsil2", "Other / Enter manually"],
  "Basti": ["Basti-Tehsil1", "Basti-Tehsil2", "Other / Enter manually"],
  "Bhadohi": ["Bhadohi-Tehsil1", "Bhadohi-Tehsil2", "Other / Enter manually"],
  "Bijnor": ["Bijnor-Tehsil1", "Bijnor-Tehsil2", "Other / Enter manually"],
  "Bulandshahr": ["Bulandshahr-Tehsil1", "Bulandshahr-Tehsil2", "Other / Enter manually"],
  "Chandauli": ["Chandauli-Tehsil1", "Chandauli-Tehsil2", "Other / Enter manually"],
  "Chitrakoot": ["Chitrakoot-Tehsil1", "Chitrakoot-Tehsil2", "Other / Enter manually"],
  "Deoria": ["Deoria-Tehsil1", "Deoria-Tehsil2", "Other / Enter manually"],
  "Etah": ["Etah-Tehsil1", "Etah-Tehsil2", "Other / Enter manually"],
  "Etawah": ["Etawah-Tehsil1", "Etawah-Tehsil2", "Other / Enter manually"],
  "Ayodhya": ["Ayodhya-Tehsil1", "Ayodhya-Tehsil2", "Other / Enter manually"],
  "Farrukhabad": ["Farrukhabad-Tehsil1", "Farrukhabad-Tehsil2", "Other / Enter manually"],
  "Fatehpur": ["Fatehpur-Tehsil1", "Fatehpur-Tehsil2", "Other / Enter manually"],
  "Firozabad": ["Firozabad-Tehsil1", "Firozabad-Tehsil2", "Other / Enter manually"],

  // Gautam Buddh Nagar (Noida / Greater Noida) example placeholders
  "Gautam Buddh Nagar": ["Noida-Tehsil1", "GreaterNoida-Tehsil1", "Other / Enter manually"],

  "Ghaziabad": ["Ghaziabad-Tehsil1", "Ghaziabad-Tehsil2", "Other / Enter manually"],
  "Ghazipur": ["Ghazipur-Tehsil1", "Ghazipur-Tehsil2", "Other / Enter manually"],
  "Gonda": ["Gonda-Tehsil1", "Gonda-Tehsil2", "Other / Enter manually"],
  "Gorakhpur": ["Gorakhpur-Tehsil1", "Gorakhpur-Tehsil2", "Other / Enter manually"],
  "Hamirpur": ["Hamirpur-Tehsil1", "Hamirpur-Tehsil2", "Other / Enter manually"],
  "Hapur": ["Hapur-Tehsil1", "Hapur-Tehsil2", "Other / Enter manually"],
  "Hardoi": ["Hardoi-Tehsil1", "Hardoi-Tehsil2", "Other / Enter manually"],
  "Hathras": ["Hathras-Tehsil1", "Hathras-Tehsil2", "Other / Enter manually"],
  "Jalaun": ["Jalaun-Tehsil1", "Jalaun-Tehsil2", "Other / Enter manually"],
  "Jaunpur": ["Jaunpur-Tehsil1", "Jaunpur-Tehsil2", "Other / Enter manually"],
  "Jhansi": ["Jhansi-Tehsil1", "Jhansi-Tehsil2", "Other / Enter manually"],
  "Kannauj": ["Kannauj-Tehsil1", "Kannauj-Tehsil2", "Other / Enter manually"],
  "Kanpur Dehat": ["KanpurDehat-Tehsil1", "KanpurDehat-Tehsil2", "Other / Enter manually"],
  "Kanpur Nagar": ["Kanpur-SD1", "Kanpur-SD2", "Other / Enter manually"],

  "Kasganj": ["Kasganj-Tehsil1", "Kasganj-Tehsil2", "Other / Enter manually"],
  "Kaushambi": ["Kaushambi-Tehsil1", "Kaushambi-Tehsil2", "Other / Enter manually"],
  "Kushinagar": ["Kushinagar-Tehsil1", "Kushinagar-Tehsil2", "Other / Enter manually"],
  "Lakhimpur Kheri": ["Lakhimpur-Tehsil1", "Lakhimpur-Tehsil2", "Other / Enter manually"],
  "Lalitpur": ["Lalitpur-Tehsil1", "Lalitpur-Tehsil2", "Other / Enter manually"],
  "Lucknow": ["Lucknow-SD1", "Lucknow-SD2", "Other / Enter manually"],
  "Maharajganj": ["Maharajganj-Tehsil1", "Maharajganj-Tehsil2", "Other / Enter manually"],
  "Mahoba": ["Mahoba-Tehsil1", "Mahoba-Tehsil2", "Other / Enter manually"],
  "Mainpuri": ["Mainpuri-Tehsil1", "Mainpuri-Tehsil2", "Other / Enter manually"],
  "Mathura": ["Mathura-Tehsil1", "Mathura-Tehsil2", "Other / Enter manually"],
  "Mau": ["Mau-Tehsil1", "Mau-Tehsil2", "Other / Enter manually"],
  "Meerut": ["Meerut-Tehsil1", "Meerut-Tehsil2", "Other / Enter manually"],
  "Mirzapur": ["Mirzapur-Tehsil1", "Mirzapur-Tehsil2", "Other / Enter manually"],
  "Moradabad": ["Moradabad-Tehsil1", "Moradabad-Tehsil2", "Other / Enter manually"],
  "Muzaffarnagar": ["Muzaffarnagar-Tehsil1", "Muzaffarnagar-Tehsil2", "Other / Enter manually"],
  "Pilibhit": ["Pilibhit-Tehsil1", "Pilibhit-Tehsil2", "Other / Enter manually"],
  "Pratapgarh": ["Pratapgarh-Tehsil1", "Pratapgarh-Tehsil2", "Other / Enter manually"],
  "Rampur": ["Rampur-Tehsil1", "Rampur-Tehsil2", "Other / Enter manually"],
  "Saharanpur": ["Saharanpur-Tehsil1", "Saharanpur-Tehsil2", "Other / Enter manually"],
  "Sambhal": ["Sambhal-Tehsil1", "Sambhal-Tehsil2", "Other / Enter manually"],
  "Sant Kabir Nagar": ["SantKabirNagar-Tehsil1", "SantKabirNagar-Tehsil2", "Other / Enter manually"],
  "Shahjahanpur": ["Shahjahanpur-Tehsil1", "Shahjahanpur-Tehsil2", "Other / Enter manually"],
  "Shamli": ["Shamli-Tehsil1", "Shamli-Tehsil2", "Other / Enter manually"],
  "Shrawasti": ["Shrawasti-Tehsil1", "Shrawasti-Tehsil2", "Other / Enter manually"],
  "Siddharthnagar": ["Siddharthnagar-Tehsil1", "Siddharthnagar-Tehsil2", "Other / Enter manually"],
  "Sitapur": ["Sitapur-Tehsil1", "Sitapur-Tehsil2", "Other / Enter manually"],
  "Sultanpur": ["Sultanpur-Tehsil1", "Sultanpur-Tehsil2", "Other / Enter manually"],
  "Unnao": ["Unnao-Tehsil1", "Unnao-Tehsil2", "Other / Enter manually"],
  "Varanasi": ["Varanasi-SD1", "Varanasi-SD2", "Other / Enter manually"]
};


// ------------------ subdistrict -> subcities mapping ------------------
// For Soraon (exactly as you requested)
const subdistrictSubcities = {
  "Soraon": ["Soraon","Phaphamau","MauAima","LalGopalGanj","Malak Harhar","Kaudhihar","Shivgadh","Mansurabad","Tharwai","Atrampur","Holagadh","Dahiyavan","Pithipur","Ismailganj"],
  // For other subdistricts add dummy lists:
  "Bara": ["BaraTown","BaraVillage1","Other / Enter manually"],
  "Handia": ["HandiaTown","HandiaColony","Other / Enter manually"],
  "Karchhana": ["Karchhana-Local1","Karchhana-Local2"],
  // Examples for Lucknow dummy:
  "Lucknow-SD1": ["Gomti Nagar", "Indira Nagar", "Other / Enter manually"],
  "Lucknow-SD2": ["Aliganj", "Hazratganj"],
  // ...add more as required
};

// ------------------ city -> subcities fallback (if you previously had citySubcities) ------------------
// Keep the older citySubcities as fallback for when subdistrict isn't used
const citySubcities = {
  "Lucknow": ["Gomti Nagar","Hazratganj","Aliganj","Indira Nagar","Mahanagar","Kaiserbagh","Other / Enter manually"],
  "Kanpur Nagar": ["Kalyanpur","Swaroop Nagar","Govind Nagar","Jhansi Rani","Civil Lines","Other / Enter manually"],
  "Varanasi": ["Cantt","Godowlia","Sigra","Rathyatra","Lal Bahadur Shastri","Other / Enter manually"],
  "Prayagraj": ["Nawabganj","Phaphamau","Other / Enter manually"], // fallback
  // add more if you want...
};

// ------------------ DOM references ------------------
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const tehsilSelect = document.getElementById("tehsil");      // subdistrict select
const subcitySelect = document.getElementById("subcity");    // subcity select (name changed to SubCity_select)
const subcityContainer = document.querySelector(".subcity .choose");

// create manualSubcity input (user can type a locality)
const manualSubcityInput = document.createElement("input");
manualSubcityInput.type = "text";
manualSubcityInput.id = "subcity_manual";
manualSubcityInput.placeholder = "Enter Subcity / Locality";
manualSubcityInput.style.display = "none";
manualSubcityInput.className = "form-control";

// append to .choose so layout remains consistent
subcityContainer.appendChild(manualSubcityInput);

// helper to reset select
function resetSelect(selectEl, defaultText = "Select") {
  selectEl.innerHTML = "";
  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = defaultText;
  selectEl.appendChild(opt);
}

// get cities for state
function getCitiesForState(state) {
  return stateCities[state] ? stateCities[state].slice() : [];
}

// get subdistricts for district
function getSubdistrictsForDistrict(district) {
  return districtSubdistricts[district] ? districtSubdistricts[district].slice() : null;
}

// get subcities for subdistrict (prefer subdistrict mapping first)
function getSubcitiesForSubdistrict(subdistrict) {
  return subdistrictSubcities[subdistrict] ? subdistrictSubcities[subdistrict].slice() : null;
}

// fallback: get subcities for city (if no subdistrict mapping defined)
function getSubcitiesForCity(city) {
  return citySubcities[city] ? citySubcities[city].slice() : null;
}

// show/hide manual subcity input and ensure subcitySelect visible when appropriate
function showSubcitySelect() {
  // Ensure listeners attached
  subcitySelect.style.display = "inline-block";
  manualSubcityInput.style.display = "none";
  // reattach change handler
  subcitySelect.removeEventListener("change", onSubcityChangeHandler);
  subcitySelect.addEventListener("change", onSubcityChangeHandler);
}

// handle state change -> populate cities
stateSelect.addEventListener("change", function () {
  const selectedState = this.value;
  resetSelect(citySelect, "Select City");
  resetSelect(tehsilSelect, "Select Sub District");
  resetSelect(subcitySelect, "Select Subcity");
  manualSubcityInput.style.display = "none";

  if (selectedState) {
    const cities = getCitiesForState(selectedState);
    cities.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
  }
});

// handle city change -> populate subdistricts (tehsil) if available; else default behavior
citySelect.addEventListener("change", function () {
  const selectedCity = this.value;
  resetSelect(tehsilSelect, "Select Sub District");
  resetSelect(subcitySelect, "Select Subcity");
  manualSubcityInput.style.display = "none";

  if (!selectedCity) return;

  const subdistricts = getSubdistrictsForDistrict(selectedCity);
  if (subdistricts && subdistricts.length > 0) {
    // populate tehsil select with the district's subdistrict list
    subdistricts.forEach(sd => {
      const opt = document.createElement("option");
      opt.value = sd;
      opt.textContent = sd;
      tehsilSelect.appendChild(opt);
    });
    // Optionally add 'Other / Enter manually' as last choice
    const other = document.createElement("option");
    other.value = "__other_tehsil__";
    other.textContent = "Other / Enter manually";
    tehsilSelect.appendChild(other);
  } else {
    // No subdistrict data for this district — keep tehsil empty and allow direct subcity selection
    const opt = document.createElement("option");
    opt.value = "__no_data__";
    opt.disabled = true;
    opt.textContent = "No subdistrict list available";
    tehsilSelect.appendChild(opt);

    // populate subcity from city-level fallback (if exists)
    const citySubcitiesList = getSubcitiesForCity(selectedCity);
    if (citySubcitiesList && citySubcitiesList.length > 0) {
      resetSelect(subcitySelect, "Select Subcity");
      citySubcitiesList.forEach(sc => {
        const scOpt = document.createElement("option");
        scOpt.value = sc;
        scOpt.textContent = sc;
        subcitySelect.appendChild(scOpt);
      });
      // ensure manual input hidden initially
      manualSubcityInput.style.display = "none";
      showSubcitySelect();
    } else {
      // No city-level data either -> present an Other option only
      resetSelect(subcitySelect, "Select Subcity");
      const otherOpt = document.createElement("option");
      otherOpt.value = "__other__";
      otherOpt.textContent = "Other / Enter manually";
      subcitySelect.appendChild(otherOpt);

      const ndOpt = document.createElement("option");
      ndOpt.value = "__no_data__";
      ndOpt.disabled = true;
      ndOpt.textContent = "No subcity list available — choose Other to enter manually";
      subcitySelect.appendChild(ndOpt);
      showSubcitySelect();
    }
  }
});

// handle tehsil change -> populate subcity based on selected tehsil
tehsilSelect.addEventListener("change", function () {
  const selectedTehsil = this.value;
  resetSelect(subcitySelect, "Select Subcity");
  manualSubcityInput.style.display = "none";

  if (!selectedTehsil) return;

  if (selectedTehsil === "__other_tehsil__") {
    // If user chooses to enter tehsil manually, provide only manual subcity option
    const otherOpt = document.createElement("option");
    otherOpt.value = "__other__";
    otherOpt.textContent = "Other / Enter manually";
    subcitySelect.appendChild(otherOpt);

    const ndOpt = document.createElement("option");
    ndOpt.value = "__no_data__";
    ndOpt.disabled = true;
    ndOpt.textContent = "Enter locality manually";
    subcitySelect.appendChild(ndOpt);
    showSubcitySelect();
    return;
  }

  // try subdistrict -> subcities mapping
  const scList = getSubcitiesForSubdistrict(selectedTehsil);
  if (scList && scList.length > 0) {
    scList.forEach(sc => {
      const opt = document.createElement("option");
      opt.value = sc;
      opt.textContent = sc;
      subcitySelect.appendChild(opt);
    });
    // add Other option
    const otherOpt = document.createElement("option");
    otherOpt.value = "__other__";
    otherOpt.textContent = "Other / Enter manually";
    subcitySelect.appendChild(otherOpt);
    showSubcitySelect();
  } else {
    // No mapping for this tehsil — fallback to citySubcities (based on currently selected city)
    const selectedCity = citySelect.value;
    const fallback = getSubcitiesForCity(selectedCity);
    if (fallback && fallback.length > 0) {
      fallback.forEach(sc => {
        const opt = document.createElement("option");
        opt.value = sc;
        opt.textContent = sc;
        subcitySelect.appendChild(opt);
      });
      const otherOpt = document.createElement("option");
      otherOpt.value = "__other__";
      otherOpt.textContent = "Other / Enter manually";
      subcitySelect.appendChild(otherOpt);
      showSubcitySelect();
    } else {
      // No fallback available — allow manual input only
      resetSelect(subcitySelect, "Select Subcity");
      const otherOpt = document.createElement("option");
      otherOpt.value = "__other__";
      otherOpt.textContent = "Other / Enter manually";
      subcitySelect.appendChild(otherOpt);
      const ndOpt = document.createElement("option");
      ndOpt.value = "__no_data__";
      ndOpt.disabled = true;
      ndOpt.textContent = "No subcity list available — choose Other to enter manually";
      subcitySelect.appendChild(ndOpt);
      showSubcitySelect();
    }
  }
});

// handle subcity select change -> show manual input if user chose Other
function onSubcityChangeHandler(e) {
  const val = e.target.value;
  if (val === "__other__") {
    manualSubcityInput.style.display = "block";
    manualSubcityInput.value = ""; // reset
    manualSubcityInput.focus();
  } else {
    manualSubcityInput.style.display = "none";
  }
}

// attach handler
subcitySelect.addEventListener("change", onSubcityChangeHandler);

// Utility to get final subcity value for submission
function getSubcityValue() {
  // prefer manual input if visible and non-empty
  if (manualSubcityInput.style.display !== "none" && manualSubcityInput.value.trim() !== "") {
    return manualSubcityInput.value.trim();
  }
  // else take selected option from select
  if (subcitySelect && subcitySelect.value && subcitySelect.value !== "") {
    if (subcitySelect.value === "__other__") {
      // user selected Other but didn't type; return empty string (server can validate)
      return "";
    }
    return subcitySelect.value;
  }
  return "";
}

// Init: attach submit handler so we set final hidden input before sending
const predictForm = document.getElementById("predictForm");
const hiddenFinalSubcity = document.getElementById("SubCity_final");

predictForm.addEventListener("submit", function (e) {
  // before submit, compute final subcity
  const finalSubcity = getSubcityValue();
  hiddenFinalSubcity.value = finalSubcity;
  // allow the form to submit normally; server receives SubCity field
  // If you want client-side validation, you may intercept here and show message
});

// optional init to ensure selects have defaults
function init() {
  // If the state select was already filled by HTML, do nothing.
  resetSelect(citySelect, "Select City");
  resetSelect(tehsilSelect, "Select Sub District");
  resetSelect(subcitySelect, "Select Subcity");
  manualSubcityInput.style.display = "none";

  showSubcitySelect();
}

init();
