async function send() {
    let msg = document.getElementById("msg").value.trim();

    if (msg === "") return;

    let chat = document.getElementById("chat");

    // User Message
    chat.innerHTML += `<p><b>You:</b> ${msg}</p>`;
    document.getElementById("msg").value = "";
    chat.scrollTop = chat.scrollHeight;

    // Thinking Message
    chat.innerHTML += `<p id="loading"><b>JOHNNY AI:</b> 🤖 Thinking...</p>`;
    chat.scrollTop = chat.scrollHeight;

    try {
        const res = await fetch("https://johnny-ai-0e34.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: msg
            })
        });

        // Thinking कम से कम 2 सेकंड दिखे
        await new Promise(resolve => setTimeout(resolve, 2000));

        const data = await res.json();

        const loading = document.getElementById("loading");
        if (loading) loading.remove();

        chat.innerHTML += `<p><b>JOHNNY AI:</b> ${data.reply}</p>`;
        chat.scrollTop = chat.scrollHeight;

    } catch (err) {

        const loading = document.getElementById("loading");
        if (loading) loading.remove();

        chat.innerHTML += `<p><b>JOHNNY AI:</b> ❌ Server Error</p>`;
        chat.scrollTop = chat.scrollHeight;

        console.error(err);
    }
}

document.getElementById("msg").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        send();
    }
});