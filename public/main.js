const socket = io()

function login() {
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
        let callback = request("login", loginInfo)

        if (callback == "noUser") {
            document.getElementById("loginContainer").style.display = "none"
            document.getElementById("registerContainer").style.display = "block"
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