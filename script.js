let JOKE_API = "https://v2.jokeapi.dev";
let jokeType = "Any";

const btn = document.querySelector("#button");
const audioEl = document.querySelector("#audio");
const jokeTypeEl = document.querySelector("#type");
const loaderEl = document.querySelector(".loader");

function replaceDotWithExclamation(text) {
  return text.replace(/\./g, "!");
}

const getJoke = async () => {
  try {
    if (jokeTypeEl.value) {
      jokeType = jokeTypeEl.value;
    }
    console.log(jokeType);
    const response = await fetch(`${JOKE_API}/joke/${jokeType}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const joke = await response.json();
    // console.log(joke);
    return joke;
  } catch (err) {
    console.log(err);
    return null;
  }
};

btn.addEventListener("click", async () => {
  let text = "";

  loaderEl.hidden = false;
  btn.hidden = true;
  const joke = await getJoke();
  console.log(joke);
  if (!joke) return;

  if (joke.type === "single") {
    text = joke.joke;
  } else if (joke.type == "twopart") {
    text = joke.setup + joke.delivery;
  }

  text = replaceDotWithExclamation(text);
  const t2pAduio = await puter.ai.txt2speech(text, "en-GB");

  loaderEl.hidden = true;
  btn.hidden = false;
  btn.disabled = true;

  audioEl.src = t2pAduio.src;
  audioEl.play();

  audioEl.addEventListener(
    "ended",
    () => {
      btn.disabled = false;
    },
    { once: true }
  );
});
