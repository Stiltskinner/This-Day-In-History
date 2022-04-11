let today = new Date();
let month = today.getMonth() + 1;
let day = today.getDate();
let Wikiurl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

let wikiresponse =   fetch (Wikiurl, 
             {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJhNzk1NzI0NDkwMGMwYTJjOTQwOWUyNjQxM2E1MjNmYSIsImp0aSI6ImFmMTNmNjhkZTVhODdmN2IwYjY4MDgzYWQ2ZjkzZjM0ZjNiMmUwNzhlZTJkOTI4NDcwNDljZDBiYmFiM2Y3NzlhODMwYjVlNmZkN2YwZjMwIiwiaWF0IjoxNjQ5NTIxNjU2LCJuYmYiOjE2NDk1MjE2NTYsImV4cCI6MzMyMDY0MzA0NTYsInN1YiI6IjY5NDA5NzE1IiwiaXNzIjoiaHR0cHM6XC9cL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.fdfsirjDyQi6ONBK3oXzU8Pz5Vy8-c3bXX6W8L2AOcy6kHjVxBsgsqJQpIRhoZva9bnj3BxXVgfWiS727bcunFYsTkNh5RkeXqbJw0nrm78KBEY5EAOlqCyQYwy_GV02VuWRoSF7aQwIOeyJphKmdzf13qmkhLsFTVvk4YXeXPSS_lW435o6RIWE434y3yZllyYnzx8LHpFLsKyxJ3ia1vxjYUCrf8bjQBn3D5uxQGYm1TczkLPxPXAUTc0h4HfIupgzWKs-sMTe3ass_OG98mciox1_mIdvPXUUYbM1ceNasytVq8MHYd9p2kjOxOP-LGkSoiLbLH1IJHgn_Tcq4pSMM7RQ22mDcf8BZ5kDPMOLHLbsTjpJZcDtr-4Bz19wzeq7BD1KFTXGa9_mkkMg_rPX4X6f3xOzWpjFvUAxAM3p1agiKYAqPYiOWc4N-wSnQoU54J4z85AcDyZ6ummaJiaXyiUOOumvzaLuy9djLRgOoyYECCveVlTwSFnkbvwcC2KDgIc5hMABZE2A9ChWN2XTO3Ga0UQwKqLUy6jLjHeE8fI7dQz2G7teWda3AzCh8BWtpVl-GDK3YjKB4VYFHvnVS9Z_DT-JysfkOigGelY2Jg4MKvkFrO-_Xu1EqXC055SJjycboYDCIxhafDXq40qiE-TFwN7OKFVf5AjZAUI',
                    'Api-User-Agent': `Today's History Project (ryan.thomas@utexas.edu)`
                        }
                }
            )
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                });
            }
        });

let NYTurl = `https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=vIlsIhWPGi8CkeUBLZqsQGvY7xM7CNlk`;

let NYTresponse = fetch (NYTurl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                });
            }
        });
    
        // Testing out a branch