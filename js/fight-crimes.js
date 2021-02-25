 


window.onload = function () {
     
    document.getElementById("submit-btn").addEventListener("click", () => {
        var age = document.getElementById("agecategoryList").value;
        var crime = document.getElementById("crimecategoryList").value;
        var desc = document.getElementById("prodDesc").value;

        let status = [];

        if (desc.length < 1) {
            document.getElementById("prodDesc").style.borderColor = "red";
            document.getElementById("prodDesc").value = "";
            document.getElementById("labelDesc").innerHTML =
                "Please enter valid description";
            status.push("false");
        } else {
            status.push("true");
        }

        if (status.includes("false")) {

            return false;
        } else {


            //Fetch call to be added
        }
    });
};

function logout(event) {
    localStorage.removeItem("token");
}
