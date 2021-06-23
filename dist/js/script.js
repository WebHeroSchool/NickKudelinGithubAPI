// Обновляем страницу
let urlParamStr = window.location.search;

function parseParamSearch(searchStr) {
    let paramObj = {};
    let paramArr = searchStr.substring(1).split("&");
    for (let i of paramArr) {
        let paramNow = i.split("=");
        paramObj[`${paramNow[0]}`] = paramNow[1];
    }
    return paramObj;
}

let urlParamObj = parseParamSearch(urlParamStr);
let userGitHubID = urlParamObj.username;
console.log("fsdfdf");

let inputGitId = document.getElementById("username");
let headerTitle = document.querySelector(".header-title");

headerTitle.innerHTML += userGitHubID ? userGitHubID : "";
inputGitId.value = userGitHubID;

// отправляем запрос
let baseUrl = "https://api.github.com/users/";
let url = baseUrl + userGitHubID;

let answerFromGithub = fetch(url)
    .then((response) => response.json())
    .then((json) => {
        if (json.message == "Not Found") {
            let errorText = document.createElement("p");
            errorText.innerHTML = "Информация о пользователе не доступна";
            document.querySelector(".container").append(errorText);
            return
        }

        let urlForLink = "https://github.com/" + json.login;
        let imgAvatar = json.avatar_url;
        let nameOfUser = json.name;
        let bioOfUser = json.bio;

        let avatar = document.createElement("img");
        avatar.setAttribute("src", imgAvatar);
        avatar.classList.add("center-img");
        let hr = document.createElement("hr");
        document.querySelector(".container").append(avatar);
        document.querySelector(".container").append(hr);

        let link = document.createElement("a");
        link.setAttribute("href", urlForLink);
        link.innerHTML = nameOfUser ? nameOfUser : "У пользователя нет имени.";
        document.querySelector(".container").append(link);

        let bio = document.createElement("p");
        bio.innerHTML = bioOfUser ? bioOfUser : "Нет информации о пользователе.";
        document.querySelector(".container").append(bio);

    })
    .catch(err => {
        console.log(err);
    });


