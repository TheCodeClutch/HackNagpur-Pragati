document.getElementById("preloader").style.display = "block";

window.onload = () => {
    document.getElementById("preloader").style.display = "none";

    document.getElementById("forgotpassword").addEventListener("click", () => {
      Swal.fire({
        title: "Enter your email",
        input: "text",
        inputAttributes: { autocapitalize: "off" },
        showCancelButton: true,
        confirmButtonText: "Submit",
      })
      .then(result => {
        if(result.isConfirmed){
          fetch("https://pragati-api.herokuapp.com/auth/forgotpw", {
              method: "POST",
              headers: new Headers({ "content-type": "application/json" }),
              body: JSON.stringify({
                  email: result.value,
              })
          })
          .then(res => res.json())
          .then(res => {
            
            if(res.noSuchUser){
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No such user exist try signing up first'
              });
            } else if (res.message){
              Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'The password was successfully reset'
              });
            } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops..',
                  text: 'Fetching failed. Contact us at pragatiathome@gmail.com',
              })
            }
          })
          .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Fetching failed. Contact us at pragatiathome@gmail.com',
            })
          })
        } else {
          // nothing it's just user closed the popup
        }
      })
    })

    document.getElementById("sub").addEventListener("click", function (e) {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        let status = [];

        let re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if (re.test(email.trim())) {
            status.push("true");
        } else {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("email").value = "";
            document.getElementById("label1").innerHTML =
                "Please enter valid email";

            status.push("false");

            document.getElementById("email").classList.add("red");
        }

        var len = password.length;
        if (len <= 6) {
            status.push("false");
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password").value = "";
            document.getElementById("label2").innerHTML =
                "Please enter valid password more than 6 characters";
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            
            return false;
        } else {
            
            document.getElementById("sub").value = "Loading...";

            fetch("https://pragati-api.herokuapp.com/auth/login", {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    
                    if (res.token) {
                        localStorage.setItem("token", res.token);
                        window.location.href = "buy-products.html";
                        document.getElementById("sub").value = "LogIn";
                    } else if (res.noSuchUser){
            
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No such user exist try signing up first'
                        });
                    
                        document.getElementById("sub").value = "LogIn";
                    } else if(res.wrongPassword){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'The password entered by the user was wrong',
                        });
                        document.getElementById("sub").value = "LogIn";
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please enter correct username and password.',
                        });
                        document.getElementById("sub").value = "LogIn";
                    }
                })
                .catch((err) => {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There was an issue from our side. Please try again',
                    });
                    document.getElementById("sub").value = "LogIn";
                });
        }
    });
};
