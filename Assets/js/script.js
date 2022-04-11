// Example variable that pulls object data from wikimedia api
// var trivBirth = data.births.0.text;


        // This function should fire with init using current month and day, and it should fire when the user inputs data using date picker for the selected month and day.
function getWikiData(month, day) {
    var monthCheck = month;
    var dayCheck = day;
    let Wikiurl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${monthCheck}/${dayCheck}`;

    fetch (Wikiurl, 
        {
           headers: {
               'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhNzk1NzI0NDkwMGMwYTJjOTQwOWUyNjQxM2E1MjNmYSIsImp0aSI6ImFmMTNmNjhkZTVhODdmN2IwYjY4MDgzYWQ2ZjkzZjM0ZjNiMmUwNzhlZTJkOTI4NDcwNDljZDBiYmFiM2Y3NzlhODMwYjVlNmZkN2YwZjMwIiwiaWF0IjoxNjQ5NTIxNjU2LCJuYmYiOjE2NDk1MjE2NTYsImV4cCI6MzMyMDY0MzA0NTYsInN1YiI6IjY5NDA5NzE1IiwiaXNzIjoiaHR0cHM6XC9cL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.fdfsirjDyQi6ONBK3oXzU8Pz5Vy8-c3bXX6W8L2AOcy6kHjVxBsgsqJQpIRhoZva9bnj3BxXVgfWiS727bcunFYsTkNh5RkeXqbJw0nrm78KBEY5EAOlqCyQYwy_GV02VuWRoSF7aQwIOeyJphKmdzf13qmkhLsFTVvk4YXeXPSS_lW435o6RIWE434y3yZllyYnzx8LHpFLsKyxJ3ia1vxjYUCrf8bjQBn3D5uxQGYm1TczkLPxPXAUTc0h4HfIupgzWKs-sMTe3ass_OG98mciox1_mIdvPXUUYbM1ceNasytVq8MHYd9p2kjOxOP-LGkSoiLbLH1IJHgn_Tcq4pSMM7RQ22mDcf8BZ5kDPMOLHLbsTjpJZcDtr-4Bz19wzeq7BD1KFTXGa9_mkkMg_rPX4X6f3xOzWpjFvUAxAM3p1agiKYAqPYiOWc4N-wSnQoU54J4z85AcDyZ6ummaJiaXyiUOOumvzaLuy9djLRgOoyYECCveVlTwSFnkbvwcC2KDgIc5hMABZE2A9ChWN2XTO3Ga0UQwKqLUy6jLjHeE8fI7dQz2G7teWda3AzCh8BWtpVl-GDK3YjKB4VYFHvnVS9Z_DT-JysfkOigGelY2Jg4MKvkFrO-_Xu1EqXC055SJjycboYDCIxhafDXq40qiE-TFwN7OKFVf5AjZAUI',
               'Api-User-Agent': `Today's History Project (ryan.thomas@utexas.edu)`
                   }
           }
       )
   .then(function (response) {
       if (response.ok) {
           response.json().then(function (data) {
               console.log(data);
           });
       }
   });
}

function getNYTData(month, day, year) {
    var monthCheck = month;
    var dayCheck = day;
    var yearCheck = year;
    let NYTurl = `https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=vIlsIhWPGi8CkeUBLZqsQGvY7xM7CNlk`;

    fetch (NYTurl)
        .then(function (response) {
            if (response.ok) {
                    response.json().then(function (data) {
                    console.log(data);
                });
            }
        });
}

// Need to know what date picker input looks like to set up month and day variables

// function dateSelectionHandler(event) {
//     event.preventDefault();

//     getWikiData(month, day);
// }

// Fires when page loads, gets wikidata for the current day
function init() {
    let today = new Date();
    let currentmonth = today.getMonth() + 1;
    let currentday = today.getDate();
    let currentyear = today.getFullYear();
    console.log(currentyear);
    getWikiData(currentmonth, currentday);
    getNYTData(currentmonth, currentday, currentyear);
}

init();

// Event Listeners
// Not ready, doesn't have datepicker element on page yet
// placeholderdateinputEl.addEventListenter("submit", dateSelectionHandler);