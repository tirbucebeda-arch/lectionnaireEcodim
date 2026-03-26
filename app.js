const bibleBooks = {
    ancienTestament: [
        "Genese", "Exode", "Levitique", "Nombres", "Deuteronome", "Josue", "Juges", "Ruth", "1 Samuel", "2 Samuel",
        "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras", "Nehemie", "Esther", "Job", "Psaumes", "Proverbes",
        "Ecclesiaste", "Cantique des cantiques", "Esaie", "Jeremie", "Lamentations", "Ezechiel", "Daniel", "Osee", "Joel", "Amos",
        "Abdias", "Jonas", "Michee", "Nahum", "Habacuc", "Sophonie", "Aggee", "Zacharie", "Malachie"
    ],
    nouveauTestament: [
        "Matthieu", "Marc", "Luc", "Jean", "Actes", "Romains", "1 Corinthiens", "2 Corinthiens", "Galates", "Ephesiens",
        "Philippiens", "Colossiens", "1 Thessaloniciens", "2 Thessaloniciens", "1 Timothee", "2 Timothee", "Tite", "Philemon", "Hebreux", "Jacques",
        "1 Pierre", "2 Pierre", "1 Jean", "2 Jean", "3 Jean", "Jude", "Apocalypse"
    ]
};
const bookAbbreviations = {
    "Genese": ["gen", "ge", "gn"],
    "Exode": ["exo", "ex"],
    "Levitique": ["lev", "lv"],
    "Nombres": ["nom", "nb", "nm"],
    "Deuteronome": ["deut", "dt"],
    "Josue": ["jos", "js"],
    "Juges": ["jug", "jg"],
    "Ruth": ["ru"],
    "1 Samuel": ["1 sam", "1sa"],
    "2 Samuel": ["2 sam", "2sa"],
    "1 Rois": ["1 rois", "1r"],
    "2 Rois": ["2 rois", "2r"],
    "Psaumes": ["ps", "psaume"],
    "Proverbes": ["prov", "pr"],
    "Esaie": ["es", "esa"],
    "Jeremie": ["jer", "jr"],
    "Ezechiel": ["ez", "eze"],
    "Daniel": ["dan", "dn"],
    "Matthieu": ["mt", "mat"],
    "Marc": ["mc", "mr"],
    "Luc": ["lc", "lk"],
    "Jean": ["jn", "jean"],
    "Actes": ["ac", "act"],
    "Romains": ["rm", "rom"],
    "1 Corinthiens": ["1 co", "1cor"],
    "2 Corinthiens": ["2 co", "2cor"],
    "Galates": ["ga", "gal"],
    "Ephesiens": ["ep", "eph"],
    "Philippiens": ["php", "ph"],
    "Colossiens": ["col"],
    "1 Thessaloniciens": ["1 th", "1th"],
    "2 Thessaloniciens": ["2 th", "2th"],
    "1 Timothee": ["1 tm", "1ti"],
    "2 Timothee": ["2 tm", "2ti"],
    "Tite": ["tit"],
    "Philemon": ["phm"],
    "Hebreux": ["heb", "he"],
    "Jacques": ["jc", "jaq"],
    "1 Pierre": ["1 pi", "1p"],
    "2 Pierre": ["2 pi", "2p"],
    "1 Jean": ["1 jn", "1jean"],
    "2 Jean": ["2 jn", "2jean"],
    "3 Jean": ["3 jn", "3jean"],
    "Jude": ["jd"],
    "Apocalypse": ["ap", "apo"]
};

const seedDefinitions = {
    alliance: "Engagement solennel entre Dieu et son peuple.",
    grace: "Faveur immeree de Dieu accordee a l'etre humain.",
    foi: "Confiance en Dieu, en sa parole et en ses promesses.",
    repentance: "Retour a Dieu avec changement de coeur.",
    salut: "Delivrance du peche par Jesus-Christ.",
    sanctification: "Processus de croissance dans une vie sainte.",
    priere: "Dialogue avec Dieu dans la foi.",
    adoration: "Hommage rendu a Dieu avec reverence.",
    evangile: "Bonne nouvelle du salut en Jesus-Christ.",
    parabole: "Recit symbolique enseignant une verite spirituelle.",
    benediction: "Faveur et protection de Dieu.",
    resurrection: "Victoire de Jesus sur la mort.",
    obeissance: "Choix de suivre la volonte de Dieu.",
    pardon: "Remise des fautes accordee par Dieu.",
    compassion: "Amour qui agit pour soulager la souffrance.",
    misericorde: "Bonte de Dieu envers les pecheurs.",
    disciple: "Personne qui suit et apprend de Jesus.",
    royaume: "Regne de Dieu dans les coeurs et dans le monde.",
    prophete: "Porte-parole de Dieu.",
    temple: "Lieu consacre a l'adoration de Dieu.",
    eglise: "Communaute des croyants en Jesus-Christ.",
    apostre: "Envoye de Dieu pour annoncer l'Evangile.",
    conversion: "Changement de vie vers Dieu.",
    louange: "Expression de reconnaissance envers Dieu.",
    saint: "Mis a part pour Dieu.",
    justice: "Conformite a la volonte de Dieu.",
    verite: "Ce qui est conforme a Dieu et a sa parole.",
    paix: "Etat de reconciliation avec Dieu et les autres.",
    joie: "Contentement profond qui vient de Dieu.",
    esperance: "Attente confiante des promesses de Dieu.",
    charite: "Amour pratique envers Dieu et le prochain.",
    temoignage: "Action de raconter ce que Dieu fait.",
    sagesse: "Capacite de vivre selon Dieu.",
    humilite: "Attitude de coeur qui se soumet a Dieu.",
    idolatrie: "Adoration de ce qui n'est pas Dieu.",
    tentation: "Epreuve qui pousse au peche.",
    peche: "Rebellion contre la volonte de Dieu.",
    redemption: "Liberation obtenue par le sacrifice du Christ.",
    croix: "Signe du sacrifice de Jesus pour le salut.",
    bapteme: "Signe d'engagement dans la foi chretienne."
};

const stopWords = new Set([
    "alors", "aussi", "avec", "dans", "dont", "elle", "elles", "entre", "etre", "fais", "fait", "font", "nous", "vous", "pour", "plus",
    "tout", "tous", "toute", "toutes", "leur", "leurs", "comme", "quand", "cette", "celui", "celle", "ceux", "celles", "ainsi", "afin",
    "tres", "bien", "meme", "mais", "donc", "parce", "sans", "sont", "sera", "suis", "etre", "avoir", "doit", "doivent", "peut", "peuvent",
    "vers", "sur", "sous", "chez", "afin", "rien", "comment", "pourquoi", "quelle", "quelles", "quel", "quels", "est", "des", "les", "une",
    "que", "qui", "aux", "nos", "vos", "ses", "son", "mes", "tes", "mon", "ton", "leur", "leurs", "ceci", "cela", "cette", "cet", "dans",
    "lors", "apres", "avant", "jour", "jours", "ecole", "dimanche", "niveau", "lecon", "programme", "evaluation", "revision", "objectif"
]);

let dictionaryIndex = [];
let currentMonthFilter = "";
let currentPrepSearch = "";
const liturgySections = window.liturgySections || {};

function switchTab(tabId) {
    const panels = document.querySelectorAll(".tab-panel");
    const buttons = document.querySelectorAll(".tab-btn");

    panels.forEach(panel => {
        panel.classList.remove("active");
    });
    buttons.forEach(button => {
        button.classList.remove("active");
    });

    const targetPanel = document.getElementById(tabId);
    const targetButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const prepControls = document.getElementById("prepControls");

    if (targetPanel) targetPanel.classList.add("active");
    if (targetButton) targetButton.classList.add("active");
    if (prepControls) {
        if (tabId === "prepTab") {
            prepControls.classList.add("active");
        } else {
            prepControls.classList.remove("active");
        }
    }
}

function selectLiturgyPart(partId, buttonEl) {
    const content = document.getElementById("liturgyContent");
    if (!content) return;
    content.textContent = liturgySections[partId] || "Section indisponible.";

    const buttons = document.querySelectorAll(".liturgy-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    if (buttonEl) buttonEl.classList.add("active");
}

// Fonction pour ouvrir un livre de la Bible dans un nouvel onglet
function openBibleBook(bookName) {
    // Convertir les noms français en noms d'URL pour saintebible.com
    const bookMap = {
        "Genese": "genese",
        "Exode": "exode",
        "Levitique": "levitique",
        "Nombres": "nombres",
        "Deuteronome": "deuteronome",
        "Josue": "josue",
        "Juges": "juges",
        "Ruth": "ruth",
        "1 Samuel": "1-samuel",
        "2 Samuel": "2-samuel",
        "1 Rois": "1-rois",
        "2 Rois": "2-rois",
        "1 Chroniques": "1-chroniques",
        "2 Chroniques": "2-chroniques",
        "Esdras": "esdras",
        "Nehemie": "nehemie",
        "Esther": "esther",
        "Job": "job",
        "Psaumes": "psaumes",
        "Proverbes": "proverbes",
        "Ecclesiaste": "ecclesiaste",
        "Cantique des cantiques": "cantique-des-cantiques",
        "Esaie": "esaie",
        "Jeremie": "jeremie",
        "Lamentations": "lamentations",
        "Ezechiel": "ezechiel",
        "Daniel": "daniel",
        "Osee": "osee",
        "Joel": "joel",
        "Amos": "amos",
        "Abdias": "abdias",
        "Jonas": "jonas",
        "Michee": "michee",
        "Nahum": "nahum",
        "Habacuc": "habacuc",
        "Sophonie": "sophonie",
        "Aggee": "aggee",
        "Zacharie": "zacharie",
        "Malachie": "malachie",
        "Matthieu": "matthieu",
        "Marc": "marc",
        "Luc": "luc",
        "Jean": "jean",
        "Actes": "actes",
        "Romains": "romains",
        "1 Corinthiens": "1-corinthiens",
        "2 Corinthiens": "2-corinthiens",
        "Galates": "galates",
        "Ephesiens": "ephesiens",
        "Philippiens": "philippiens",
        "Colossiens": "colossiens",
        "1 Thessaloniciens": "1-thessaloniciens",
        "2 Thessaloniciens": "2-thessaloniciens",
        "1 Timothee": "1-timothee",
        "2 Timothee": "2-timothee",
        "Tite": "tite",
        "Philemon": "philemon",
        "Hebreux": "hebreux",
        "Jacques": "jacques",
        "1 Pierre": "1-pierre",
        "2 Pierre": "2-pierre",
        "1 Jean": "1-jean",
        "2 Jean": "2-jean",
        "3 Jean": "3-jean",
        "Jude": "jude",
        "Apocalypse": "apocalypse"
    };
    
    const urlBook = bookMap[bookName] || bookName.toLowerCase().replace(/\s+/g, '-');
    const bibleUrl = `https://saintebible.com/${urlBook}/1.htm`;
    window.open(bibleUrl, '_blank');
}

function renderBibleBooks(query = "") {
    const oldList = document.getElementById("oldTestamentList");
    const newList = document.getElementById("newTestamentList");
    const bibleCount = document.getElementById("bibleCount");
    if (!oldList || !newList) return;

    const search = normalizeText(query.trim().replace(/[0-9]+\s*:\s*[0-9-]+/g, "").trim());
    const filterByQuery = (book) => {
        if (!search) return true;
        const candidates = [book, ...(bookAbbreviations[book] || [])].map(normalizeText);
        return candidates.some(item => item.includes(search));
    };

    const oldFiltered = bibleBooks.ancienTestament.filter(filterByQuery);
    const newFiltered = bibleBooks.nouveauTestament.filter(filterByQuery);

    // Rendre les chips cliquables
    oldList.innerHTML = oldFiltered.map(book => `<div class="chip" onclick="openBibleBook('${book.replace(/'/g, "\\'")}')" style="cursor: pointer;">${book}</div>`).join("");
    newList.innerHTML = newFiltered.map(book => `<div class="chip" onclick="openBibleBook('${book.replace(/'/g, "\\'")}')" style="cursor: pointer;">${book}</div>`).join("");

    if (bibleCount) {
        bibleCount.textContent = `${oldFiltered.length + newFiltered.length} livre(s) trouve(s)`;
    }
}

function renderDictionary(query = "") {
    const container = document.getElementById("dictionaryList");
    const countLabel = document.getElementById("dictionaryCount");
    if (!container) return;

    const search = normalizeText(query.trim());
    const results = dictionaryIndex.filter(item =>
        normalizeText(item.mot).includes(search) ||
        normalizeText(item.definition).includes(search)
    );

    if (countLabel) {
        countLabel.textContent = `${results.length} mot(s) consultable(s)`;
    }

    if (!results.length) {
        container.innerHTML = '<p class="empty-state">Aucun resultat pour cette recherche.</p>';
        return;
    }

    container.innerHTML = results
        .slice(0, 250)
        .map(item => `
            <article class="dict-item">
                <h4>${item.mot}</h4>
                <p>${item.definition}</p>
                <div class="dict-meta">Occurrences dans les lecons: ${item.occurrences}</div>
                <div class="dict-tags">${item.references.map(ref => `<span class="dict-tag">${ref}</span>`).join("")}</div>
            </article>
        `)
        .join("");
}

function normalizeText(value) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function tokenize(value) {
    return value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]{4,}/g) || [];
}

function buildDictionaryIndex() {
    const terms = new Map();

    function addTerm(rawWord, ref) {
        const normalized = normalizeText(rawWord);
        if (!normalized || normalized.length < 4 || stopWords.has(normalized)) return;

        if (!terms.has(normalized)) {
            terms.set(normalized, { mot: capitalizeWord(normalized), occurrences: 0, references: new Set() });
        }

        const entry = terms.get(normalized);
        entry.occurrences += 1;
        if (ref) entry.references.add(ref);
    }

    Object.entries(lessons).forEach(([date, lesson]) => {
        const textBlocks = [
            lesson.titre,
            lesson.reference,
            lesson.versetSouligner,
            lesson.objectifSpecifique,
            lesson.objectifOperationnel,
            lesson.introduction,
            lesson.pointCulminant,
            lesson.messageTransmettre,
            lesson.messageCentral,
            lesson.versetRetenir,
            ...(lesson.progression || []),
            ...(lesson.evaluation || [])
        ].filter(Boolean);

        textBlocks.forEach(block => {
            tokenize(block).forEach(word => addTerm(word, date));
        });
    });

    Object.entries(seedDefinitions).forEach(([word]) => addTerm(word, null));

    dictionaryIndex = Array.from(terms.entries())
        .map(([key, data]) => ({
            mot: data.mot,
            definition: seedDefinitions[key] || "Terme present dans les lecons ECODIM 2026.",
            occurrences: data.occurrences,
            references: Array.from(data.references).slice(0, 8)
        }))
        .sort((a, b) => b.occurrences - a.occurrences || a.mot.localeCompare(b.mot));
}

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function showDetails() {
    const selectedSunday = document.getElementById("sundaySelect").value;
    const selectedLevel = document.getElementById("levelSelect").value;
    const detailsDiv = document.getElementById("details");

    if (!selectedSunday || !selectedLevel) {
        detailsDiv.innerHTML = '<p class="empty-state" style="color:#dc2626;">Veuillez selectionner un dimanche ET un niveau.</p>';
        return;
    }

    let lesson;
    if (selectedSunday === "02 Août" && selectedLevel === "3") {
        lesson = lessons["02 Août (3)"];
    } else if (selectedSunday === "01 Novembre" && selectedLevel === "3") {
        lesson = lessons["02 Novembre"];
    } else if (selectedSunday === "01 Novembre" && (selectedLevel === "1" || selectedLevel === "2")) {
        lesson = lessons["01 Novembre"];
    } else if (selectedSunday === "26 Octobre" && selectedLevel === "3") {
        lesson = lessons["26 Octobre"];
    } else if (selectedSunday === "25 Octobre" && selectedLevel === "3") {
        lesson = lessons["26 Octobre"];
    } else {
        lesson = lessons[selectedSunday];
    }

    if (!lesson) {
        detailsDiv.innerHTML = '<p class="empty-state" style="color:#dc2626;">Aucune preparation disponible pour cette date.</p>';
        return;
    }

    let html = `
        <div class="summary">
            <h3 style="color: white; margin-top: 0;">📅 ${selectedSunday} - Niveau ${selectedLevel}</h3>
            <p><span class="label">📖 Leçon :</span> <span class="value">${lesson.lecon || "—"}</span></p>
            <p><span class="label">📌 Thème :</span> <span class="value">${lesson.titre}</span></p>
            <p><span class="label">🔖 Référence :</span> <span class="value">${lesson.reference}</span></p>
            <p><span class="label">🎯 Objectif spécifique :</span> <span class="value">${lesson.objectifSpecifique}</span></p>
        </div>
        
        <div class="preparation">
            <h3>Préparation détaillée</h3>
            
            <div class="verse">📌 Verset à souligner : ${lesson.versetSouligner}</div>
            
            <h4>Objectif opérationnel</h4>
            <p>${lesson.objectifOperationnel}</p>
            
            <h4>Introduction</h4>
            <p>${lesson.introduction}</p>
            
            <h4>Progression</h4>
            <ul>
    `;

    lesson.progression.forEach(point => {
        html += `<li>${point}</li>`;
    });

    html += `</ul>
            
            <div class="highlight">🔔 Point culminant : ${lesson.pointCulminant}</div>
            
            <p><strong>👉 Message à transmettre :</strong> ${lesson.messageTransmettre}</p>
            
            <h4>Message central</h4>
            <p>${lesson.messageCentral}</p>
            
            <h4>Verset à retenir</h4>
            <div class="verse">📖 ${lesson.versetRetenir}</div>
            
            <h4>Évaluation</h4>
            <ol>
    `;

    lesson.evaluation.forEach(question => {
        html += `<li>${question}</li>`;
    });

    html += `</ol>
        </div>`;

    detailsDiv.innerHTML = html;
}

function filterMonth(month) {
    currentMonthFilter = month;
    applyPreparationFilters();
}

function resetFilter() {
    currentMonthFilter = "";
    currentPrepSearch = "";
    const prepSearch = document.getElementById("prepSearch");
    if (prepSearch) prepSearch.value = "";
    applyPreparationFilters();
}

function applyPreparationFilters() {
    const select = document.getElementById("sundaySelect");
    const counter = document.getElementById("counter");
    const countText = document.getElementById("prepSearchCount");
    if (!select) return;

    const currentValue = select.value;
    let visibleCount = 0;

    for (const option of select.options) {
        if (option.value === "") continue;

        const monthOk = !currentMonthFilter || option.value.includes(currentMonthFilter);
        const searchOk = matchLessonSearch(option.value, currentPrepSearch);
        const isVisible = monthOk && searchOk;

        option.style.display = isVisible ? "" : "none";
        if (isVisible) visibleCount++;
    }

    if (counter) {
        counter.textContent = currentMonthFilter
            ? `${visibleCount} dimanche(s) en ${currentMonthFilter}`
            : `${visibleCount} dimanche(s) disponible(s)`;
    }
    if (countText) countText.textContent = `${visibleCount} resultat(s) pour la preparation`;
    if (select.selectedOptions[0] && select.selectedOptions[0].style.display === "none") {
        select.value = "";
    } else if (!currentValue) {
        select.value = "";
    }
}

function matchLessonSearch(date, query) {
    if (!query) return true;
    const lesson = lessons[date];
    if (!lesson) return normalizeText(date).includes(query);

    const searchable = [
        date,
        lesson.titre,
        lesson.reference,
        lesson.lecon,
        lesson.versetSouligner,
        lesson.objectifSpecifique,
        lesson.objectifOperationnel,
        lesson.messageCentral
    ]
        .filter(Boolean)
        .map(normalizeText)
        .join(" ");

    return searchable.includes(query);
}

let ecodimAppInitialized = false;

function runEcodimAppInit() {
    if (ecodimAppInitialized) return;
    if (!document.body.classList.contains("access-granted")) return;
    ecodimAppInitialized = true;
    applyPreparationFilters();
    renderBibleBooks();
    buildDictionaryIndex();
    renderDictionary();
    selectLiturgyPart("intro", document.querySelector('.liturgy-btn[onclick*="intro"]'));
}

window.onload = function () {
    runEcodimAppInit();
};

window.addEventListener("ecodim-access-granted", runEcodimAppInit);
window.addEventListener("ecodim-access-revoked", function () {
    ecodimAppInitialized = false;
});

document.getElementById("sundaySelect").addEventListener("change", function () {
    const level = document.getElementById("levelSelect").value;
    if (this.value && level) showDetails();
});

document.getElementById("levelSelect").addEventListener("change", function () {
    const sunday = document.getElementById("sundaySelect").value;
    if (this.value && sunday) showDetails();
});

document.getElementById("dictionarySearch").addEventListener("input", function () {
    renderDictionary(this.value);
});

document.getElementById("bibleSearch").addEventListener("input", function () {
    renderBibleBooks(this.value);
});

document.getElementById("prepSearch").addEventListener("input", function () {
    currentPrepSearch = normalizeText(this.value.trim());
    applyPreparationFilters();
});