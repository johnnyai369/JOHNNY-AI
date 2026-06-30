async function send() {
    let msg = document.getElementById("msg").value;

    if (msg == "") return;

    document.getElementById("chat").innerHTML +=
        "<p><b>You:</b> " + msg + "</p>";

    document.getElementById("msg").value = "";

    const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: msg
        })
    });

    const data = await res.json();

    document.getElementById("chat").innerHTML +=
        "<p><b>JOHNNY AI:</b> " + data.reply + "</p>";
}