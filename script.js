
const button = document.querySelector(".show-list");
const inputField = document.querySelector("#inputField");
const harita = document.querySelector("#map");



var data = [{
    "city": "bursa",
    "petshop": "miyav"

}, {
    "city": "izmir",
    "petshop": "overdose"
}, {
    "city": "Istanbul",
    "petshop": "tarantula"
}, {
    "city": "izmir",
    "petshop": "gemi"
}];


if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(sucessfullLookup, showError);

}

else {
    alert("tarayıcı konum bilgisine erişemedi. desteklenmedi.")
}

function sucessfullLookup(position) {
    const apı_key = "0436ce3d7a0f4664b24b8c3570b2f7af ";
    const { latitude, longitude } = position.coords;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apı_key}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {

            let details = result.results[0].components;

            let { country, province } = details



            document.getElementById("results").innerHTML = `
        
        <p>You are in ${country} country</p>
        <p> You are in ${province} city </p>
        <p> Please fill the text field for showing pet shops <p>
        `;



            // document.getElementById("inputField").value = `
            // You are in ${country}
            // `;

            document.getElementById("inputField").value = ''

        });
    console.log()
};



navigator.geolocation.getCurrentPosition(sucessfullLookup, console.log)
function showError(error) {
    if (error.code == 1) {
        alert("kullanıcı izni reddeder.")
    }
    else if (error.code == 2) {
        alert("konum alınamadı.")
    } else {
        alert("hata oluştu.")
    }
}


button.addEventListener("click", function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function () {

            function getCountryPetShop(konum) {
                return data.filter(
                    function (data) {
                        return data.city == konum
                    }
                );
            }
            var konum = inputField.value;
            console.log("konum" + konum);
            console.log(data[0].city); //bursa

            switch (konum) {
                case 'bursa':
                    document.getElementById("results").innerHTML = "city name: " + getCountryPetShop(konum)[0].city + "<br/>" + "petshop name: " + getCountryPetShop(konum)[0].petshop
                    harita.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97495.30686489353!2d28.960899001347038!3d40.21510548971032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3dddda4176cf%3A0xbbdc2b7fb592644f!2sPet%20Shop%20Bursa!5e0!3m2!1sen!2str!4v1660076657044!5m2!1sen!2str" width="800" height="650" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                    break;
                case 'Istanbul':
                    document.getElementById("results").innerHTML = "city name: " + getCountryPetShop(konum)[0].city + "<br/>" + "petshop name: " + getCountryPetShop(konum)[0].petshop
                    harita.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96289.3800205275!2d28.90326968871152!3d41.04618599268386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6146bc0f71d%3A0x7fb3216e860216de!2sPet%20World!5e0!3m2!1sen!2str!4v1660076751062!5m2!1sen!2str" width="800" height="650" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                    break;
                case 'izmir':
                    document.getElementById("results").innerHTML = "city name: " + getCountryPetShop(konum)[0].city + "<br/>" + "petshop name: " + getCountryPetShop(konum)[0].petshop + " and <br/>" + getCountryPetShop(konum)[1].petshop
                    harita.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100033.55688196604!2d27.071778002587937!3d38.41724050786822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbdea9b7f030ad%3A0xd0e85bbd6666f142!2sPetshop%20Zoo!5e0!3m2!1sen!2str!4v1660075666074!5m2!1sen!2str" width="800" height="650" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                    break;
                default:
                    alert("maalesef o şehirde petshop mevcut değildir")
                    document.getElementById("inputField").value = ''

            }

        });

    } else {
        alert("başarısız");
    }
});
















