document.getElementById("preloader").style.display = "block";
  const token = localStorage.getItem("token");

function deletePostProduct(event) {
    fetch('https://pragati-api.herokuapp.com/products/delete', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({
            productId: event.target.getAttribute('data-pid'),
        })
    })
        .then(res => res.json())
        .then(res => {
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
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'Yayyy',
                text: 'Your product has been successfully deleted!',
            })
            const delNode = event.target.parentNode.parentNode.parentNode.parentNode;
            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(delNode);
        })
        .catch(err => {

            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'There was an error deleting your product. Please try again!',

            })

        })
}

function deletePostService(event) {

    fetch('https://pragati-api.herokuapp.com/services/delete', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({
            serviceId: event.target.getAttribute('data-pid'),
        })
    })
        .then(res => res.json())
        .then(res => {
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
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'Yayyy',
                text: 'Your service has been successfully deleted!',

            })
            const delNode = event.target.parentNode.parentNode.parentNode.parentNode;
            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(delNode);
        })
        .catch(err => {

            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'There was an error deleting your service. Please try again!',
            })
        })
}

window.onload = () => {
  document.getElementById("preloader").style.display = "none";



function generateModalStuffProduct(res, target) {

    let content = "";
    for (let i = 0; i < res.length; i++) {
        let modal = `
          <div
            class="modal fade"
            id="${res[i].PRODUCT_ID}"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Product Gallery</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div
                    id="control${res[i].PRODUCT_ID}"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">`

        let modalImage = ""

        for (let j = 0; j < res[i].IMAGE.length; j++) {
            if (j === 0) {
                modalImage = modalImage + `<div class="carousel-item active">
                      <img class="d-block w-100" src=${res[i].IMAGE[j].url} alt="First slide" />
                    </div>`
            } else {
                modalImage = modalImage + `<div class="carousel-item">
                        <img class="d-block w-100" src=${res[i].IMAGE[j].url} alt="Second slide" />
                      </div>`
            }
        }

        modal = modal + modalImage

        modal = modal + `</div><a
                      class="carousel-control-prev"
                      href="#control${res[i].PRODUCT_ID}"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#control${res[i].PRODUCT_ID}"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>`

        document.getElementById("modal-dump").insertAdjacentHTML('beforeend', modal);

        //Badge - negotiable
        let badge = "";

        if (res[i].NEGOTIABLE === "false") {
            badge =
                `<span class="badge badge-info" style="font-size: 16px; margin-left: 10px;">Non Negotiable</span>`;
        } else {
            badge =
                `<span class="badge badge-success" style="font-size: 16px; margin-left: 10px;">Negotiable</span>`;
        }

        content =
            content +
            `<div class="row prod-card">
<div class="col-lg-2"></div>
<div class="col-lg-8 col-12">
    <div class="row"
        style="margin: 15px; background-color: white; border: 2px solid transparent; border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">

        <div class="col-12 col-lg-4 img-center">
            <img
              src=${res[i].IMAGE[0].url}
              class="img-fluid hover-shadow cursor img-mq"
              style="width: 100%"
              data-toggle="modal"
              data-target="#${res[i].PRODUCT_ID}"
            />
        </div>
        <div class="col-12 col-lg-8">
            <div class="row" style="padding-top: 15px;">
                <div class="col-8">
                    <h2 style="font-weight: 650; padding-left: 15px;">${res[i].TITLE}</h2>
                </div>
                <div class="col-4">
                    <img src=${res[i].POSTED_BY_PIC} class="buy-prod-profile">
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h6 style="padding-left: 15px; color:gray; font-weight: 500; font-style: italic;">by
                        ${res[i].POSTED_BY}</h6>
                    <p style="padding: 15px 15px 0px 15px; text-align: justify; word-wrap: break-word;">
                        ${res[i].DESCRIPTION}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h6 style="padding-left: 15px; font-size: 18px;">&#8377 ${res[i].PRICE} ${badge}</h6>
                </div>
            </div>
            <div class="row" style="padding-bottom: 20px;">
                <div class="col-lg-6 col-12" style="padding-top: 20px;">
                    <i class="fas fa-map-marker-alt" aria-hidden="true"
                        style="font-size: 20px; padding-left: 15px; padding-top: 5px;"></i>
                    <span>${res[i].CITY}, ${res[i].STATE}</span>
                </div>
                <div class="col-lg-6 col-12" style="text-align: center;">
                    <button onclick="deletePostProduct(event)" id="${res[i].PRODUCT_ID}" data-pid=${res[i].PRODUCT_ID} class="btn btn-danger interest-modal-btn">Delete post</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-lg-2"></div>
</div>`;
    }

    document.getElementById(target).innerHTML = content;
}

function generateModalStuffService(res, target) {

    let content = "";
    for (let i = 0; i < res.length; i++) {
        let modal = `
          <div
            class="modal fade"
            id="${res[i].SERVICE_ID}"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Product Gallery</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div
                    id="control${res[i].SERVICE_ID}"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">`

        let modalImage = ""

        for (let j = 0; j < res[i].IMAGE.length; j++) {
            if (j === 0) {
                modalImage = modalImage + `<div class="carousel-item active">
                      <img class="d-block w-100" src=${res[i].IMAGE[j].url} alt="First slide" />
                    </div>`
            } else {
                modalImage = modalImage + `<div class="carousel-item">
                        <img class="d-block w-100" src=${res[i].IMAGE[j].url} alt="Second slide" />
                      </div>`
            }
        }

        modal = modal + modalImage

        modal = modal + `</div><a
                      class="carousel-control-prev"
                      href="#control${res[i].SERVICE_ID}"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#control${res[i].SERVICE_ID}"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>`

        document.getElementById("modal-dump").insertAdjacentHTML('beforeend', modal);

        //Badge - negotiable
        let badge = "";

        if (res[i].NEGOTIABLE === "false") {
            badge = `<span class="badge badge-info" style="font-size: 16px; margin-left: 10px;">Non Negotiable</span>`;
        } else {
            badge = `<span class="badge badge-success" style="font-size: 16px; margin-left: 10px;">Negotiable</span>`;
        }

        content =
            content +
            `<div class="row prod-card">
<div class="col-lg-2"></div>
<div class="col-lg-8 col-12">
    <div class="row"
        style="margin: 15px; background-color: white; border: 2px solid transparent; border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">

        <div class="col-12 col-lg-4 img-center">
            <img
              src=${res[i].IMAGE[0].url}
              class="img-fluid hover-shadow cursor img-mq"
              style="width: 100%"
              data-toggle="modal"
              data-target="#${res[i].SERVICE_ID}"
            />
        </div>
        <div class="col-12 col-lg-8">
            <div class="row" style="padding-top: 15px;">
                <div class="col-8">
                    <h2 style="font-weight: 650; padding-left: 15px;">${res[i].TITLE}</h2>
                </div>
                <div class="col-4">
                    <img src=${res[i].POSTED_BY_PIC} class="buy-prod-profile">
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h6 style="padding-left: 15px; color:gray; font-weight: 500; font-style: italic;">by
                        ${res[i].POSTED_BY}</h6>
                    <p style="padding: 15px 15px 0px 15px; text-align: justify; word-wrap: break-word;">
                        ${res[i].DESCRIPTION}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h6 style="padding-left: 15px; font-size: 18px;">&#8377 ${res[i].PRICE} ${badge}</h6>
                </div>
            </div>
            <div class="row" style="padding-bottom: 20px;">
                <div class="col-lg-6 col-12" style="padding-top: 20px;">
                    <i class="fas fa-map-marker-alt" aria-hidden="true"
                        style="font-size: 20px; padding-left: 15px; padding-top: 5px;"></i>
                    <span>${res[i].CITY}, ${res[i].STATE}</span>
                </div>
                <div class="col-lg-6 col-12" style="text-align: center;">
                    <button onclick="deletePostService(event)" id="${res[i].SERVICE_ID}" data-pid=${res[i].SERVICE_ID} class="btn btn-danger interest-modal-btn">Delete post</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-lg-2"></div>
</div>`;
    }

    document.getElementById(target).innerHTML = content;
}

fetch("https://pragati-api.herokuapp.com/products/get", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
})
    .then(res => res.json())
    .then(res => {
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
        generateModalStuffProduct(res.message, 'your-products')
    })
    .catch(err => {

        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'There was an error deleting your products. Please try again!',
        })
    })

fetch("https://pragati-api.herokuapp.com/services/get", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
})
    .then(res => res.json())
    .then(res => {
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
        generateModalStuffService(res.message, 'your-services')
    })
    .catch(err => {

        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'There was an error deleting your services. Please try again!',
        })
    })


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
        }
        document.getElementById(
            "user-navbar-details"
        ).innerHTML = userDetails;
    })
    .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was some error, contact pragatiathome@gmail.com.",
        })
      });



fetch("https://pragati-api.herokuapp.com/products/myinterest", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
})
    .then((response) => response.json())
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
        console.log(res.message)
        if (res.message.length === 0) {

            document.getElementById("my-products-interest").parentNode.parentNode.innerHTML = "<div style='text-align: center; text-decoration: underline;'>You have not registered your interest in any of the products yet!</div>";
            document.getElementById("my-products-interest").style.textAlign = 'center';
        }
        else if (res.message) {

            res = res.message;
            let content = "";
            res.forEach((ele, index) => {
                content = content + `<tr style="text-align: center">
            <th scope="row">${index + 1}</th>
            <td>${ele.TITLE}</td>
            <td>${ele.POSTED_BY}</td>
          </tr>`
            })
            document.getElementById("my-products-interest").innerHTML = content;
        } else if (!res.isloggedin) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Please login to view your profile',
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

fetch("https://pragati-api.herokuapp.com/services/myinterest", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
})
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
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
        if (res.message.length === 0) {
            document.getElementById("my-services-interest").parentNode.parentNode.innerHTML = "<div style='text-align: center; text-decoration: underline;'>You have not registered your interest in any of the services yet!</div>";
        }
        else if (res.message) {
            res = res.message;
            let content = "";
            res.forEach((ele, index) => {
                content = content + `<tr style="text-align: center">
          <th scope="row">${index + 1}</th>
          <td>${ele.TITLE}</td>
          <td>${ele.POSTED_BY}</td>
        </tr>`
            })
            document.getElementById("my-services-interest").innerHTML = content;
        } else if (!res.isloggedin) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Please login to view your profile',
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

fetch("https://pragati-api.herokuapp.com/products/recinterest", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
})
    .then((response) => response.json())
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
        if (res.message.length === 0) {
            document.getElementById("rec-products-interest").parentNode.parentNode.innerHTML = "<div style='text-align: center; text-decoration: underline;'>Nobody has registered their interest in your product(s) yet!</div>";
        }
        else if (res.message) {
            res = res.message;
            let content = "";
            res.forEach((ele, index) => {
                content = content + `<tr style="text-align: center">
          <th scope="row" >${index + 1}</th>
          <td>${ele.TITLE}</td>
          <td>${ele.USERNAME}</td>
          <td>${ele.PHONE_NUMBER}</td>
        </tr>`
            })
            document.getElementById("rec-products-interest").innerHTML = content;
        } else if (!res.isloggedin) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Please login to view your profile',
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

fetch("https://pragati-api.herokuapp.com/services/recinterest", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
})
    .then((response) => response.json())
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
        if (res.message.length === 0) {
            document.getElementById("rec-services-interest").parentNode.parentNode.innerHTML = "<div style='text-align: center; text-decoration: underline;'>Nobody has registered their interest in your service(s) yet!</div>";
            
        }
        else if (res.message) {
            res = res.message;
            let content = "";
            res.forEach((ele, index) => {
                content = content + `<tr style="text-align: center">
          <th scope="row">${index + 1}</th>
          <td>${ele.TITLE}</td>
          <td>${ele.USERNAME}</td>
          <td>${ele.PHONE_NUMBER}</td>
        </tr>`
            })
            document.getElementById("rec-services-interest").innerHTML = content;
        } else if (!res.isloggedin) {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Please login to view your profile',
            })
                .then((res) => {
                    window.location.href = "login.html"
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

}
