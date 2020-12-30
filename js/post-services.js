document.getElementById("preloader").style.display = "block";




  var fileInput = document.getElementById('prodImg');
fileInput.onchange = function (event) {
    var input = this.files.length;
    if (input === 1) {
        document.getElementById('new-upload-btn').value = '1 File Selected';
    }
    else if (input === 2) {
        document.getElementById('new-upload-btn').value = '2 Files Selected';
    }
    else if (input === 3) {
        document.getElementById('new-upload-btn').value = '3 Files Selected';
    }
    else{
        //document.getElementById('new-upload-btn').value = 'More than 3 Files Selected';
        event.preventDefault();
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'You cannot select more than 3 pictures!'
        })
    }
};

function resetInputValues() {
    document.getElementById("prodName").value = '';
    // document.getElementById("categoryList").selected =
    document.getElementById("prodDesc").value = '';
    document.getElementById("prodPrice").value = '';
    document.getElementById("prodNeg").value = "false";
    document.getElementById('new-upload-btn').value = "Choose files";
}

window.onload = function () {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("submit-btn").addEventListener("click", () => {
        var pname = document.getElementById("prodName").value;
        var pdesc = document.getElementById("prodDesc").value;
        var pcat = document.getElementById("categoryList").value;
        var pprice = document.getElementById("prodPrice").value;
        var pneg = document.getElementById("prodNeg").checked;
        var pimg = document.getElementById("prodImg").value;

        let status = [];

        if (pname.length <= 1) {
            document.getElementById("prodName").style.borderColor = "red";
            document.getElementById("prodName").value = "";
            document.getElementById("labelName").innerHTML =
                "Please enter valid name";
            status.push("false");
        } else {
            status.push("true");
        }

        if (pdesc.length < 1) {
            document.getElementById("prodDesc").style.borderColor = "red";
            document.getElementById("prodDesc").value = "";
            document.getElementById("labelDesc").innerHTML =
                "Please enter valid description";
            status.push("false");
        } else {
            status.push("true");
        }

        if (pcat.length <= 1) {
            document.getElementById("categoryList").style.borderColor = "red";
            status.push("false");
        } else {
            status.push("true");
        }

        if (pprice.length <= 1) {
            document.getElementById("prodPrice").style.borderColor = "red";
            document.getElementById("prodPrice").value = "";
            document.getElementById("labelPrice").innerHTML =
                "Please enter valid price";
            status.push("false");
        } else {
            status.push("true");
        }

        if (status.includes("false")) {

            return false;
        } else {


            let formData = new FormData();
            let input = document.getElementById("prodImg");
            for (const file of input.files) {
                formData.append("image", file, file.name);
            }
            formData.append("title", pname);
            formData.append("description", pdesc);
            formData.append("category", pcat);
            formData.append("price", pprice);
            formData.append("negotiable", pneg);


            document.getElementById("submit-btn").value = "Please wait...";
            fetch(`https://api.meaningcloud.com/sentiment-2.1?key=cdd3596a15c1debe314b912a6895cefd&of=json&txt=${encodeURI(pname + " " + pdesc)}&lang=en`)
            .then(res => res.json())
            .then(res => {
                document.getElementById("submit-btn").value = "Submit";

              if(res.score_tag === "N" || res.score_tag === "N+" || res.score_tag === "NEU"){
                Swal.fire({
                    icon: "error",
                    title: "Submission failed",
                    text: "Please do not spread hate!!",
                });
              } else {
                  fetch("https://pragati-api.herokuapp.com/services/add", {
                      method: "POST",
                      headers: new Headers({
                          Authorization: window.localStorage.getItem("token"),
                      }),
                      body: formData,
                  })
                      .then(function (response) {
                          return response.json();
                      })
                      .then((res) => {
                        if(res.isloggedin && !res.isloggedin){
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Please login first :)",
                          })
                          .then(res => {
                            window.location.href = "login.html";
                          })
                          return;
                        }
                          console.log("This is the response", res);
                        document.getElementById("submit-btn").value = "Submit";

                          if (res.message) {
                              Swal.fire({
                                  icon: "success",
                                  title: "Yayyy",
                                  text: "Your service has been successfully posted!",
                              });
                              // window.location.href = "buyprod.html";
                              document.getElementById("submit-btn").value = "Submit";
                              resetInputValues();
                          }
                      })
                      .catch((err) => {

                          Swal.fire({
                              icon: "error",
                              title: "Oops..",
                              text:
                                  "There was an error posting your service. Please try again!",
                          });
                          document.getElementById("submit-btn").value = "Submit";
                      });
                }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "There was some error, contact pragatiathome@gmail.com.",
              })
            });
        }
    });
};

// User details - Navbar
const token = localStorage.getItem("token");
fetch("https://pragati-api.herokuapp.com/auth/isloggedin", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
})
    .then((response) => response.json())
    .then((res) => {

        let userDetails = "";
        if (res.message) {
            userDetails =
                userDetails +
                `
            <img src=${res.profile_pic} class="buy-prod-profile-navbar">
            <div id="user-navbar-name" style="color: black;"> ${res.name} </div>`;
            document.getElementById(
                "user-navbar-details"
            ).innerHTML = userDetails;
        } else {
            document.getElementById(
                "login-signup"
            ).innerHTML = `<li class="nav-item" style="padding-left: 30px; padding-right: 30px;">
      <a class="nav-link" href="signup.html"
        ><span class="fas fa-user-plus"></span> Signup</a
      >
    </li>
    <li class="nav-item" style="padding-left: 30px; padding-right: 30px;">
      <a class="nav-link" href="login.html"
        ><span class="fas fa-sign-in-alt"></span> Login</a
      >
    </li>`;
    Swal.fire({
        icon: 'info',
        title: 'Oops..',
        text: 'Please login to post a service',
    })
    .then(() => {
      window.location.href = "login.html"
    })
        }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was some error, contact pragatiathome@gmail.com.",
      })
    });

function logout(event) {
    localStorage.removeItem("token");
}
