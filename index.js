// https://randomuser.me/api/?results=24
// async await methode asynchrone

let userData = [];

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData);
};

const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);
    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
  };

  document.body.innerHTML = userData
    .map(
      (toto) =>
        `
        <div class="card">
            <img src=${toto.picture.large} alt="photo de ${toto.name.last}">
            <h3>${toto.name.first} ${toto.name.last}</h3>
            <p>${toto.location.city}, ${dateParser(toto.dob.date)}</p>
            <em>Menbre depuis ${dayCalc(toto.registered.date)} jours </em>
        </div>
      `
    )
    .join("");
};

userDisplay();
