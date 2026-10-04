const KEY = CryptoJS.enc.Utf8.parse("BRETNY_AES192_KEY_123456");
const IV = CryptoJS.enc.Utf8.parse("1234567890123456");

let userName = "";
function continueUser() {

    const name = document.getElementById("name").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    userName = name;

    document.getElementById("user").textContent = userName;

    document.getElementById("welcomeBox").style.display = "none";
    document.getElementById("postBox").style.display = "block";
}

function makePost() {

    const post = document.getElementById("post").value.trim();

    if (post === "") {
        alert("Please write a caption.");
        return;
    }

    const date = new Date().toLocaleString();
    const originalData = JSON.stringify({
        name: userName,
        post: post,
        date: date
    });

    const encrypted = CryptoJS.AES.encrypt(
        originalData,
        KEY,
        {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    ).ciphertext.toString(CryptoJS.enc.Base64);

    const postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML =
        '<div class="original">ORIGINAL POST</div>' +
        '<p>' + escapeHTML(post) + '</p>' +
        '<small>' + date + '</small>' +
        '<div class="encrypted-title">ENCRYPTED</div>' +
        '<div class="encrypted">' + encrypted + '</div>';

    document.getElementById("posts").prepend(postDiv);

    document.getElementById("post").value = "";
}

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
