const socket = io()

async function login() {
    let usernameBox = document.getElementById("usernameBox")
    let passwordBox = document.getElementById("passwordBox")

    let loginInfo = {
        "username":usernameBox.value,
        "password":passwordBox.value
    }

    if (loginInfo.username == "" || loginInfo.password == "") {
        console.log("empty")
        return
    } else {
        let callback = await request("login", loginInfo)

        if (callback == "noUser") {
            document.getElementById("loginContainer").style.display = "none"
            document.getElementById("registerContainer").style.display = "block"
        }

        if (callback == "incorrectPassword") {
            console.log("incorrect password")
        }

        if (callback == "success") {
            document.getElementById("loginContainer").style.display = "none"
            document.getElementById("mainContainer").style.display = "block"
        }
    }
}

async function register() {
    let usernameBox = document.getElementById("newUsernameBox")
    let passwordBox = document.getElementById("newPasswordBox")

    let loginInfo = {
        "username":usernameBox.value,
        "password":passwordBox.value
    }

    if (loginInfo.username == "" || loginInfo.password == "") {
        console.log("empty")
        return
    } else {
        let callback = await request("register", loginInfo)

        if (callback == "userExists") {
            console.log("user exists")
        }
        if (callback == "success") {
            document.getElementById("loginContainer").style.display = "block"
            document.getElementById("registerContainer").style.display = "none"

            document.getElementById("usernameBox").value = ""
            document.getElementById("passwordBox").value = ""
        }
    }
}

async function request(requestType, data) {
    return new Promise((resolve, reject) => {
        socket.emit("request", requestType, data, (callback) => {
            console.log(callback);
            if (callback) {
                resolve(callback);
            } else {
                reject(new Error("Request failed"));
            }
        });
    });
}

socket.on("server", (type, data, callback) =>{
    if (type == "initialise") {
        document.getElementById("mainContainer").innerHTML += `<div id="worldContainer" style="display:grid;grid-template-columns:repeat(300,50px);grid-template-rows:repeat(300,50px);">hi</div>`

        callback()
    }
    
    if (type == "world") {}
})