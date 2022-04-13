// Example variable that pulls object data from wikimedia api
// var trivBirth = data.births.0.text;
var datePicker = document.querySelector('#date-picker');
var datePickerForm = document.querySelector('#date-picker-form');
var selectedDate;
// bookBox is a placeholder div that serves as parent element for everything created in NYTDisplay function
var bookBox = document.querySelector("#book-box");

// This function should fire with init using current month and day, and it should fire when the user inputs data using date picker for the selected month and day.

function getWikiData(month, day) {
    let Wikiurl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

    fetch(Wikiurl,
        {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhNzk1NzI0NDkwMGMwYTJjOTQwOWUyNjQxM2E1MjNmYSIsImp0aSI6ImFmMTNmNjhkZTVhODdmN2IwYjY4MDgzYWQ2ZjkzZjM0ZjNiMmUwNzhlZTJkOTI4NDcwNDljZDBiYmFiM2Y3NzlhODMwYjVlNmZkN2YwZjMwIiwiaWF0IjoxNjQ5NTIxNjU2LCJuYmYiOjE2NDk1MjE2NTYsImV4cCI6MzMyMDY0MzA0NTYsInN1YiI6IjY5NDA5NzE1IiwiaXNzIjoiaHR0cHM6XC9cL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.fdfsirjDyQi6ONBK3oXzU8Pz5Vy8-c3bXX6W8L2AOcy6kHjVxBsgsqJQpIRhoZva9bnj3BxXVgfWiS727bcunFYsTkNh5RkeXqbJw0nrm78KBEY5EAOlqCyQYwy_GV02VuWRoSF7aQwIOeyJphKmdzf13qmkhLsFTVvk4YXeXPSS_lW435o6RIWE434y3yZllyYnzx8LHpFLsKyxJ3ia1vxjYUCrf8bjQBn3D5uxQGYm1TczkLPxPXAUTc0h4HfIupgzWKs-sMTe3ass_OG98mciox1_mIdvPXUUYbM1ceNasytVq8MHYd9p2kjOxOP-LGkSoiLbLH1IJHgn_Tcq4pSMM7RQ22mDcf8BZ5kDPMOLHLbsTjpJZcDtr-4Bz19wzeq7BD1KFTXGa9_mkkMg_rPX4X6f3xOzWpjFvUAxAM3p1agiKYAqPYiOWc4N-wSnQoU54J4z85AcDyZ6ummaJiaXyiUOOumvzaLuy9djLRgOoyYECCveVlTwSFnkbvwcC2KDgIc5hMABZE2A9ChWN2XTO3Ga0UQwKqLUy6jLjHeE8fI7dQz2G7teWda3AzCh8BWtpVl-GDK3YjKB4VYFHvnVS9Z_DT-JysfkOigGelY2Jg4MKvkFrO-_Xu1EqXC055SJjycboYDCIxhafDXq40qiE-TFwN7OKFVf5AjZAUI',
                'Api-User-Agent': `Today's History Project (ryan.thomas@utexas.edu)`
            }
        })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    dailyDeath(data);
                    dailyBirth(data);
                });
            }
        });
}

function getNYTData(date) {
    let NYTurl = `https://api.nytimes.com/svc/books/v3/lists/overview/${date}.json?api-key=vIlsIhWPGi8CkeUBLZqsQGvY7xM7CNlk`;

    fetch(NYTurl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayNYT(data);
                });
            }
        });
}

// Sets up the datepicker element and formats it, prevents user from picking a date after current date
$(function () {
    $("#date-picker").datepicker({
        dateFormat: "yy-mm-dd",
        maxDate: "+0d"
    });

});

//  Fires when the user presses submit after selecting a date. It calls get functions for api data for the selected date from NYT and wikimedia
function dateSubmitHandler(event) {
    event.preventDefault();
    var dateInput = datePicker.value;
    var dateArray = dateInput.split('-', 3);
    var month = dateArray[1];
    var day = dateArray[2];
    getNYTData(dateInput);
    getWikiData(month, day);
}

//grabs daily death info from wikimedia
function dailyDeath(data) {
    var ifBox = document.querySelector('#death-box')
    if (ifBox) {
        ifBox.remove();
    }
    var randomizer = Math.floor(Math.random() * data.deaths.length);
    var accessDeath = data.deaths[randomizer];
    var nameOfDeceased = accessDeath.pages[0].displaytitle;
    var descriptionOfDeceased = accessDeath.pages[0].extract;
    if (!accessDeath.pages[0].originalimage) {
        console.log("no image")
    } else {
        var imageOfDeceasedSrc = accessDeath.pages[0].originalimage.source;
    }
    var linkOfDeceased = accessDeath.pages[0].content_urls.desktop.page;

    //creates elements based on the data about the daily death
    var deathBox = document.querySelector('.death-box')
    console.log(deathBox);
    // div element to hold died on this day data
    var box = document.createElement('div')
    box.setAttribute('id', 'death-box')
    box.setAttribute('class', 'content-card-borders content-card')
    deathBox.append(box)
    // "Daily Death" title element
    var deathTitle = document.createElement('h1')
    deathTitle.setAttribute('class', 'card-title')
    deathTitle.textContent = "Daily Death!";
    box.append(deathTitle)
    // Name of deceased on this day
    var name = document.createElement('h2')
    name.setAttribute('class', 'card-header')
    name.textContent = nameOfDeceased;
    box.append(name)
    // description of deceased on this day
    var description = document.createElement('p')
    description.setAttribute('class', 'death-text')
    description.textContent = descriptionOfDeceased;
    box.append(description)
    // image of the deceased
    var image = document.createElement('img')
    image.setAttribute('class', 'box-img')
    image.src = imageOfDeceasedSrc;
    box.append(image)
    // link to wikipedia page the deceased on this day
    var link = document.createElement('a')
    link.setAttribute('href', linkOfDeceased)
    link.textContent = "Learn more!";
    box.append(link)
}

// grabs daily birth data from wikimedia
function dailyBirth(data) {
    console.log(data)
    var ifBox = document.querySelector('#birth-box')
    if (ifBox) {
        ifBox.remove();
    }
    var randomizer = Math.floor(Math.random() * data.births.length);
    var accessBirth = data.births[randomizer];
    var nameOfBorn = accessBirth.pages[0].displaytitle;
    var descriptionOfBorn = accessBirth.pages[0].extract;
    if (!accessBirth.pages[0].originalimage) {
        console.log("no image")
    } else {
        var imageOfBornSrc = accessBirth.pages[0].originalimage.source;
    }
    var linkOfBorn = accessBirth.pages[0].content_urls.desktop.page;

    //creates elements based on the data about the daily death
    var birthBox = document.querySelector('.birth-box')
    // div for born on this day data
    var box = document.createElement('div')
    box.setAttribute("id", "birth-box")
    box.setAttribute('class', 'content-card-borders content-card')
    birthBox.append(box)
    // title for daily birth
    var birthTitle = document.createElement('h1')
    birthTitle.setAttribute('class', 'card-title')
    birthTitle.textContent = "Born on this day:";
    box.append(birthTitle)
    // name of person born on this day
    var name = document.createElement('h2')
    name.setAttribute('class', 'card-header')
    name.textContent = nameOfBorn;
    box.append(name)
    // description of person born on this day
    var description = document.createElement('p')
    description.setAttribute('class', 'box-text')
    description.textContent = descriptionOfBorn;
    box.append(description);
    // image of person born on this day
    var image = document.createElement('img')
    image.setAttribute('class', 'box-img')
    image.src = imageOfBornSrc;
    box.append(image)
    // link to wikipedia page for person born on this day
    var link = document.createElement('a')
    link.setAttribute('href', linkOfBorn)
    link.textContent = "Learn more!";
    box.append(link)
}

function displayNYT(data) {
    // Desired data for bestelling combined ebook and print fiction
    var fictionTitle = data.results.lists[0].books[0].title;
    var fictionAuthor = data.results.lists[0].books[0].author;
    var fictionImage = data.results.lists[0].books[0].book_image;
    var fictionDescription = data.results.lists[0].books[0].description;
    var fictionURL = data.results.lists[0].books[0].amazon_product_url;
    // Desired data for bestelling combined ebook and print non-fiction
    var nfictionTitle = data.results.lists[1].books[0].title;
    var nfictionAuthor = data.results.lists[1].books[0].author;
    var nfictionImage = data.results.lists[1].books[0].book_image;
    var nfictionDescription = data.results.lists[1].books[0].description;
    var nfictionURL = data.results.lists[1].books[0].amazon_product_url;
    // Create container elements for each type of book
    var fictionBox = document.createElement('div');
    var nfictionBox = document.createElement('div');
    // Apply classes and IDs to to container elements
    fictionBox.setAttribute('class','book-sec');
    fictionBox.setAttribute('id','fic-sec');
    nfictionBox.setAttribute('class','book-sec');
    nfictionBox.setAttribute('id','non-fic-sec');
    // Generate containers for each data point
    var fictionBoxTitle = document.createElement('h3');
    var fictionBoxAuthor = document.createElement('h4');
    var fictionBoxImage = document.createElement('div');
    var fictionBoxDescription = document.createElement('p');
    var fictionBoxURL = document.createElement('div');
    var nfictionBoxTitle = document.createElement('h3');
    var nfictionBoxAuthor = document.createElement('h4');
    var nfictionBoxImage = document.createElement('div');
    var nfictionBoxDescription = document.createElement('p');
    var nfictionBoxURL = document.createElement('div');
    // Generate img elements for fiction and n fiction images
    var fictionImgContainer = document.createElement('img');
    var nfictionImgContainer = document.createElement('img');
    // Set classes and IDs for data elements
    fictionBoxTitle.setAttribute('class','card-header');
    fictionBoxAuthor.setAttribute('class','book-author'); //class book-author needs to be defined in CSS
    fictionBoxImage.setAttribute('class','book-pic');
    fictionBoxDescription.setAttribute('class','book-text');
    fictionBoxURL.setAttribute('class', 'book-url'); //class book-url needs to be defined in CSS
    fictionBoxTitle.setAttribute('id','fic-title');
    fictionBoxAuthor.setAttribute('id','fic-author');
    fictionBoxImage.setAttribute('id','fic-pic');
    fictionBoxDescription.setAttribute('id','fic-text');
    fictionBoxURL.setAttribute('id','fic-url');
    nfictionBoxTitle.setAttribute('class','card-header');
    nfictionBoxAuthor.setAttribute('class','book-author'); //class book-author needs to be defined in CSS
    nfictionBoxImage.setAttribute('class','book-pic');
    nfictionBoxDescription.setAttribute('class','book-text');
    nfictionBoxURL.setAttribute('class', 'book-url'); //class book-url needs to be defined in CSS
    nfictionBoxTitle.setAttribute('id','non-fic-title');
    nfictionBoxAuthor.setAttribute('id','non-fic-author');
    nfictionBoxImage.setAttribute('id','non-fic-pic');
    nfictionBoxDescription.setAttribute('id','non-fic-text');
    nfictionBoxURL.setAttribute('id','non-fic-url');
    // Fill img containers with img src
    fictionImgContainer.src = fictionImage;
    nfictionImgContainer.src = nfictionImage;
    // Add alt text to images
    fictionImgContainer.alt = "Cover art for " + fictionTitle;
    nfictionImgContainer.alt = "Cover art for " +nfictionTitle;
    // Fill each data element with appropriate data
    fictionBoxTitle.textContent = fictionTitle;
    fictionBoxAuthor.textContent = fictionAuthor;
    fictionBoxURL.innerHTML = `<a href="`+fictionURL+`">Amazon Store Page</a>`
    fictionBoxDescription.textContent = fictionDescription;
    nfictionBoxTitle.textContent = nfictionTitle;
    nfictionBoxAuthor.textContent = nfictionAuthor;
    nfictionBoxURL.innerHTML = `<a href="`+nfictionURL+`">Amazon Store Page</a>`;
    nfictionBoxDescription.textContent = nfictionDescription;
    // Append img containers to lis
    fictionBoxImage.appendChild(fictionImgContainer);
    nfictionBoxImage.appendChild(nfictionImgContainer);
    // Append data-containing elements to parent containers
    fictionBox.appendChild(fictionBoxImage);
    fictionBox.appendChild(fictionBoxTitle);
    fictionBox.appendChild(fictionBoxAuthor);
    fictionBox.appendChild(fictionBoxDescription);
    fictionBox.appendChild(fictionBoxURL);
    nfictionBox.appendChild(nfictionBoxImage);
    nfictionBox.appendChild(nfictionBoxTitle);
    nfictionBox.appendChild(nfictionBoxAuthor);
    nfictionBox.appendChild(nfictionBoxDescription);
    nfictionBox.appendChild(nfictionBoxURL);
    // Append fiction and nfiction containers to parent container
    bookBox.appendChild(fictionBox);
    bookBox.appendChild(nfictionBox);
}

function init() {
    let today = new Date();
    let currentmonth = today.getMonth() + 1;
    let currentday = today.getDate();
    let fullDate = moment().format("YYYY-MM-DD");
    getWikiData(currentmonth, currentday);
    getNYTData(fullDate);
}

init();

// Event Listeners
// Fires when the user submits the date picker
datePickerForm.addEventListener("submit", dateSubmitHandler);