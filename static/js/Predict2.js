// Predict.js
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
  "Prayagraj": ["Civil Lines", "Katra", "Lukerganj", "Saidabad", "Shahganj", "Phulpur", "Jhunsi", "Tagore Town", "Kudha", "Other / Enter manually"],
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
