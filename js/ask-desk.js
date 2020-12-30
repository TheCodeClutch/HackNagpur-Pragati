document.getElementById("preloader").style.display = "block";



  // update function for btn and top opener id
function generateModal(customId) {
    document.getElementById("fake-modal-container").insertAdjacentHTML(
      "beforeend",
      `<div class="modal fade" id=${customId} tabindex="-1" role="dialog" aria-labelledby="answerModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
  <h5 class="modal-title" id="answerModalLabel">Post Your Answer</h5>
  <button type="button" class="close" data-dismiss="modal" id="post-ans-modal-close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
    <textarea id=${customId}postDesc style="width : 100%; min-height : 100px; border:2px solid #f1cdc5" placeholder="Post Answer"
    title="Post Answer"></textarea>
</div>
<div class="modal-footer text-center">
  <button data-questionId=${customId} type="button" style="background-color: #961e47; color: white" class="btn" id="answer-modal-btn" onclick="postAnswer(event)">Post</button>
</div>
</div>
</div>
</div>`
    );
  }

  window.onload = () => {
    document.getElementById("preloader").style.display = "none";
    // User details - Navbar
    const token = localStorage.getItem("token");
    // please wait ...
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
        }
      })
      .catch((err) => {
        // submit
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was some error, contact pragatiathome@gmail.com.",
        })
      });

    document.getElementById("modal-btn").addEventListener("click", () => {
      var ques = document.getElementById("postQuest").value;
      var desc = document.getElementById("postDesc").value;

      let status = [];
      if (ques.length < 1) {
        document.getElementById("postQuest").style.borderColor = "#98234b";
        document.getElementById("postQuest").value = "";
        document.getElementById("postQuest").placeholder =
          "Please type your question";
        status.push("false");
      } else {
        status.push("true");
      }

      if (desc.length < 1) {
        document.getElementById("postDesc").style.borderColor = "#98234b";
        document.getElementById("postDesc").value = "";
        document.getElementById("postDesc").placeholder =
          "Please type your question description";
        status.push("false");
      } else {
        status.push("true");
      }

      if (status.includes("false")) {
        return false;
      } else {
        fetch(`https://api.meaningcloud.com/sentiment-2.1?key=cdd3596a15c1debe314b912a6895cefd&of=json&txt=${encodeURI(ques + " " + desc)}&lang=en`)
          .then((res) => res.json())
          .then((res) => {
            if (
              res.score_tag === "N" ||
              res.score_tag === "N+" ||
              res.score_tag === "NEU"
            ) {
              Swal.fire({
                icon: "error",
                title: "Submission failed",
                text: "Please do not spread hate!!",
              });
            } else {

              document.getElementById("modal-btn").value = "Please Wait...";
              fetch("https://pragati-api.herokuapp.com/askdesk/add/question", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({
                  title: document.getElementById("postQuest").value,
                  description: document.getElementById("postDesc").value,
                }),
              })
                .then((res) => res.json())
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
                  // add for successful submission
                  document.getElementById("modal-btn").value = "Post"
                  Swal.fire({
                    icon: "success",
                    title: "Yayy",
                    text: "Your question has been successfully posted!",
                  });
                  document.getElementById("post-ques-close").click();
                })
                .catch((err) => {

                  document.getElementById("modal-btn").value = "Post";
                  // add banner for error while adding
                  Swal.fire({
                    icon: "error",
                    title: "Oopss..",
                    text:
                      "There was some error while posting your question. Please try again!",
                  });
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

    // get the question according to search
    document.getElementById("quesSearch").addEventListener("input", (event) => {
      const query = event.target.value;

      fetch("https://pragati-api.herokuapp.com/askdesk/search?q=" + query)
        .then((res) => res.json())
        .then((res) => {

          const questions = res.message;
          let content = "";
          for (let i = 0; i < questions.length; i++) {
            content =
              content +
              `<div class=" row justify-content-center mt-5">
            <div class="col-lg-6 col-12 mb-5">
                <div class="card mt-3 pb-5">
                    <div class="card-header bg-white text-center border-0 ">
                        <div class="row justify-content-center ">
                            <div class="col"> <img class="align-self-center text-center outside img-fluid"
                                    style="border-radius: 50px;" src=${questions[i].QUESTION_BY_PIC} width="120"
                                    height="120">
                            </div>
                        </div>

                        <div class="row text-center name">
                            <div class="col">
                                <h5 class="mb-0 profile-pic font-weight-bold mt-1" style="color:#961e47;">
                                    ${questions[i].QUESTION_BY}</h5>
                                    <span>${questions[i].QUESTION_BY_PROFESSION}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body pt-0 text-center pb-3 mt-3 ">
                        <div class="row justify-content-center">
                            <div class="col-md-12 col">
                                <p class="bold"> <span><img class="img-fluid quotes"
                                            src="https://i.imgur.com/U20aFIt.png" width="40"
                                            height="40"></span>${questions[i].QUESTION}
                                    <span><img class="img-fluid quotes-down"
                                            src="https://i.imgur.com/DPzmyiD.png" width="40" height="40">
                                    </span>
                                </p>
                                <p style="font-size: 22px;">${questions[i].DESCRIPTION}</p>
                            </div>
                        </div>
                        <div class="col-12" style="text-align: center;">
                            <button id="answer-btn" class="btn" data-toggle="modal" data-target=#${questions[i].QUESTION_ID} >Post Answer</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>`;
            generateModal(questions[i].QUESTION_ID);

            // add answer script too
            for (let j = 0; j < questions[i].ANSWER.length; j++) {
              content =
                content +
                `<div class=" row justify-content-center" style="margin-top:-80px">
                              <div class="col-lg-6 col-12 mb-5">
                                  <div class="card mt-3 pb-5">
                                      <div class="card-header bg-white text-center border-0 ">
                                          <div class="row justify-content-center ">
                                              <div class="col"> <img class="align-self-center text-center outside img-fluid"
                                                      style="border-radius: 50px;" src=${questions[i].ANSWER[j].PROFILE_PIC} width="120"
                                                      height="120">
                                              </div>
                                          </div>
                                          <div class="row text-center name">
                                              <div class="col">
                                                  <h5 class="mb-0 profile-pic font-weight-bold mt-1" style="color:#961e47;">
                                                      ${questions[i].ANSWER[j].ANSWER_BY}</h5>
                                                  <h6 class="mt-3">${questions[i].ANSWER[j].PROFESSION}</h6>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="card-body pt-0 text-center pb-3 mt-3 ">
                                          <div class="row justify-content-center">
                                              <div class="col-md-12 col">

                                                  <p style="font-size: 22px; text-align: justify;">${questions[i].ANSWER[j].DESCRIPTION}</p>

                                              </div>
                                          </div>

                                      </div>
                                  </div>
                              </div>

                          </div>`;
            }
          }
          document.getElementById("askdesk-content").innerHTML = content;
        })
        .catch((err) => {

          Swal.fire({
            icon: "error",
            title: "Oopss..",
            text: "Fetching failed. Contact us at pragatiathome@gmail.com",
          });
        });
    });
  };

  // to post answer
  function postAnswer(event) {
    const questionId = event.target.getAttribute("data-questionId");


    var postAns = document.getElementById(`${questionId}postDesc`).value;
    let status = [];
    if (postAns.length < 1) {
      document.getElementById(`${questionId}postDesc`).style.borderColor =
        "#98234b";
      document.getElementById(`${questionId}postDesc`).value = "";
      document.getElementById(`${questionId}postDesc`).placeholder =
        "Please type your answer";
      status.push("false");
    } else {
      status.push("true");
    }

    if (status.includes("false")) {

      return false;
    }
    //fetch call
    else {
      // sentiment analysis
      document.getElementById("answer-modal-btn").value = "Please Wait...";
      fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=cdd3596a15c1debe314b912a6895cefd&of=json&txt=${encodeURI(document.getElementById(`${questionId}postDesc`).value)}&lang=en`)
        .then((res) => res.json())
        .then((res) => {
            document.getElementById("answer-btn").value = "Posting...";
          if (
            res.score_tag === "N" ||
            res.score_tag === "N+" ||
            res.score_tag === "NEU"
          ) {
            Swal.fire({
              icon: "error",
              title: "Submission failed",
              text: "Please do not spread hate!!",
            });
          } else {
            document.getElementById("answer-modal-btn").value = "Please Wait...";
            fetch("https://pragati-api.herokuapp.com/askdesk/add/answer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({
                questionId,
                answer: document.getElementById(`${questionId}postDesc`).value,
              }),
            })
              .then((res) => res.json())
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
                console.log("This is the answer addition ", res);

                Swal.fire({
                  icon: "success",
                  title: "Yayy",
                  text: "Your answer has been successfully posted!",
                });
                document.getElementById("answer-modal-btn").value = "Post";
                document.getElementById("post-ans-modal-close").click();
              })
              .catch((err) => {

                Swal.fire({
                  icon: "error",
                  title: "Oopss..",
                  text:
                    "There was some error while posting your answer. Please try again!",
                });
                document.getElementById("answer-modal-btn").value = "Post";
              });
          }
        })
        .catch((err) => {

          Swal.fire({
            icon: "error",
            title: "Oopss..",
            text:
              "There was some error while posting your answer. Please try again!",
          });
          document.getElementById("answer-modal-btn").value = "Post";
        });
    }
  }
