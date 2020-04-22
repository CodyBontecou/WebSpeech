const button = document.getElementById("button");
const result = document.getElementById("result");
const main = document.getElementsByTagName("main")[0];
let listening = false;
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();
    // recognition.lang = "es-MX"

    const stop = () => {
        main.classList.remove("speaking");
        recognition.stop();
        button.textContent = "Start listening";
        listening = false;
        speak("Stopped listening")
    };

    const start = () => {
        main.classList.add("speaking");
        speak("Now listening");
        recognition.start();
        button.textContent = "Stop listening";
        listening = true;
    };

    const onResult = event => {
        result.innerHTML = "";
        for (const res of event.results) {
            const text = document.createTextNode(res[0].transcript);
            const p = document.createElement("p");
            if (res.isFinal) {
                p.classList.add("final");
            }
            p.appendChild(text);
            result.appendChild(p);

            if (res[0].transcript.includes("stop")) {
                stop()
            }
        }
    };
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);
    button.addEventListener("click", event => {
        listening ? stop() : start();
    });
} else {
    button.remove();
    const message = document.getElementById("message");
    message.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
}