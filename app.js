const letters = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

const categories = [
  "ZIGARETTEN UND TABAKMARKEN",
  "ZEICHENTRICKCHARAKTERE",
  "SCHEIDUNGSGRÜNDE",
  "ELEMENTE DES PERIODENSYSTEMS",
  "EIN GEBRAUCHSGEGENSTAND",
  "FLÜSSIGKEITEN",
  "EIN FLUSS ODER SEE",
  "ETWAS ZUM LESEN",
  "EIN WASSERTIER",
  "PIZZA- UND NUDELGERICHTE",
  "EINE FRUCHT",
  "EINE BEKANNTE PERSÖNLICHKEIT",
  "EISTRUHE",
  "KRANKHEITEN",
  "KÄSETHEKE",
  "STÄDTE IN NRW",
  "TV- UND RADIOSENDER",
  "BELEIDIGUNGEN",
  "EIN LANDTIER",
  "MATERIALIEN",
  "KOSENAMEN",
  "GRÜNDE FRIEDRICH MERZ ZU HASSEN",
  "EIN WERKZEUG",
  "WÖRTER FÜR GENITALIEN",
  "EINE STADT IN DEUTSCHLAND",
  "EIN SÄUGETIER",
  "VERWANDTE",
  "GRÜNDE EINE VERABREDUNG ABZUSAGEN",
  "SÜSSIGKEITEN",
  "EIN WORT MIT DER ENDUNG -UNG",
  "TATWAFFEN",
  "OBST UND GEMÜSE",
  "BRÖTCHENTHEKE",
  "KÜNDIGUNGSGRÜNDE",
  "TEIL EINES KRAFTFAHRZEUGS",
  "SPIELE",
  "FORTBEWEGUNGSMITTEL",
  "SERIEN",
  "ETWAS AUS DIESEM RAUM",
  "EIN WORT MIT DER ENDUNG -LOS",
  "TECHNOLOGIEUNTERNEHMEN",
  "ETWAS AUS HOLZ",
  "EIN WOHNUNGSGEGENSTAND",
  "EIN WORT MIT DER ENDUNG -HEIT",
  "EINE STADT IM AUSLAND",
  "EIN VORNAME",
  "EIN LAND",
  "EINE TÄTIGKEIT",
  "EIN GETRÄNK",
  "BERG ODER GEBIRGE",
  "KOSMETIK",
  "EIN WORT MIT CK",
  "EIN WORT DAS MIT Z ENDET",
  "AUTO- UND MOTORRADMARKEN",
  "TEIL DES MENSCHLICHEN KÖRPERS",
  "EINE SPORTART",
  "EIN OPFER",
  "GEWÜRZE",
  "EINE BLUME",
  "TEIL EINES GEBÄUDES",
  "EIN MUSIKINSTRUMENT",
  "WURSTTHEKE",
  "ETWAS AUS GLAS",
  "INTERPRET*INNEN",
  "MÄRCHENCHARAKTERE",
  "SEHENSWÜRDIGKEITEN",
  "AUTOKENNZEICHEN",
  "TEIL DES FAHRRADS",
  "EINE PFLANZE",
  "ETWAS AUS DEM GARTEN",
  "SYNONYME FÜR KACKE",
  "EINE FARBE",
  "SPEISE ODER NAHRUNGSMITTEL",
  "EIN KLEIDUNGSSTÜCK",
  "EIN BERUF",
  "FILME",
  "WÖRTER MIT GLEICHEN ANFANGS- UND ENDBUCHSTABEN",
  "EIN TIER, DAS FLIEGEN KANN",
  "GRÜNDE MÜTTER ZU CANCELN",
  "SYNONYME FÜR SCHEIDE",
  "RED FLAGS",
  "SYNONYME FÜR BUSEN",
  "SYNONYME FÜR PENIS",
  "SYNONYME FÜR SEX",
  "SITUATIONEN IN DENEN ES UNANGENEHM WÄRE EINE LATTE ZU HABEN",
  "SEXY BEI MÄNNERN",
  "SEXY BEI FRAUEN",
  "WÜRDE ICH BUMSEN",
  "SAUCEN UND DIPS",
  "IM SNACKREGAL",
  "GRÜNDE NICHT VEGAN ZU SEIN",
  "NAMEN",
  "BIERMARKEN",
  "FLÜSSIGKEITEN DIE MAN NICHT TRINKEN WILL",
  "MORDGRÜNDE",
  "LEUTE AUS AHAUS",
  "PORNOSUCHLEISTE",
  "GRÜNDE KEINE KINDER ZU BEKOMMEN",
  "GRÜNDE KINDER ZU BEKOMMEN",
  "GRÜNDE POLITIKER*INNEN ZU CANCELN",
  "GRÜNDE SEIN KIND AUS DEM KINDERGARTEN ZU NEHMEN",
  "IM KÜHLSCHRANK",
  "DINGE DIE BLAU SIND",
  "EIN WORT MIT SIEBEN BUCHSTABEN",
  "GESCHENKIDEEN",
  "SUCHT/LASTER",
  "IST EKELIG",
  "DAFÜR SCHÄMT MAN SICH",
  "DAFÜR WIRD MAN GELOBT",
  "AUSREDE FÜR VERSPÄTUNG",
  "BERÜHMTE TOTE",
  "IN DER HANDTASCHE",
  "MACHT MAN TÄGLICH",
  "KANN STINKEN (MUSS ABER NICHT)",
  "MACHT MAN HEIMLICH",
  "KANN MAN NICHT KAUFEN",
  "GIBT ES IM SUPERMARKT",
  "HUNDENAMEN",
  "BERUFE",
  "SONGS",
  "COCKTAILKARTE",
  "GRÜNDE SEX ABZUBRECHEN",
  "GRÜNDE SEX ZU HABEN",
  "EINE GESCHÄFTSIDEE"
];

const letterValue = document.getElementById("letter-value");
const categoryValue = document.getElementById("category-value");
const statusText = document.getElementById("status-text");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const btnNewGame = document.getElementById("btn-new-game");
const btnRules = document.getElementById("btn-rules");
const btnCloseRules = document.getElementById("btn-close-rules");
const rulesOverlay = document.getElementById("rules-overlay");

let deck = [];
let currentIndex = -1;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createDeck() {
  const shuffledLetters = shuffle(letters);
  const shuffledCategories = shuffle(categories);
  const length = Math.max(shuffledLetters.length, shuffledCategories.length);
  const pairs = [];

  for (let i = 0; i < length; i++) {
    pairs.push({
      letter: shuffledLetters[i % shuffledLetters.length],
      category: shuffledCategories[i % shuffledCategories.length]
    });
  }

  return pairs;
}

function renderStartCard() {
  letterValue.textContent = "A-Z";
  categoryValue.textContent = "KATEGORIE";
  statusText.textContent = "STARTKARTE AKTIV. TIPPE AUF „NÄCHSTE KARTEN“.";
}

function renderCurrentPair() {
  const pair = deck[currentIndex];
  letterValue.textContent = pair.letter;
  categoryValue.textContent = pair.category;
  statusText.textContent = `RUNDE ${currentIndex + 1} VON ${deck.length}.`;
}

function updateButtons() {
  btnPrev.disabled = currentIndex <= -1;
  btnNext.disabled = currentIndex >= deck.length - 1;
}

function startNewGame() {
  deck = createDeck();
  currentIndex = -1;
  renderStartCard();
  updateButtons();
}

function showNextPair() {
  if (currentIndex < deck.length - 1) {
    currentIndex += 1;
    renderCurrentPair();
    updateButtons();
  }
}

function showPreviousPair() {
  if (currentIndex > -1) {
    currentIndex -= 1;
    if (currentIndex === -1) {
      renderStartCard();
    } else {
      renderCurrentPair();
    }
    updateButtons();
  }
}

function openRules() {
  rulesOverlay.classList.remove("hidden");
  rulesOverlay.setAttribute("aria-hidden", "false");
}

function closeRules() {
  rulesOverlay.classList.add("hidden");
  rulesOverlay.setAttribute("aria-hidden", "true");
}

btnNext.addEventListener("click", showNextPair);
btnPrev.addEventListener("click", showPreviousPair);
btnNewGame.addEventListener("click", startNewGame);
btnRules.addEventListener("click", openRules);
btnCloseRules.addEventListener("click", closeRules);

rulesOverlay.addEventListener("click", (event) => {
  if (event.target === rulesOverlay) {
    closeRules();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !rulesOverlay.classList.contains("hidden")) {
    closeRules();
  }
});

window.addEventListener("load", () => {
  startNewGame();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
});
