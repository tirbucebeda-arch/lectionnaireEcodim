(function () {
    const SESSION_ID_KEY = "ecodim_access_id";
    const SESSION_TOKEN_KEY = "ecodim_access_token";
    const LOCK_PREFIX = "ecodim_lock_";
    const BROADCAST_NAME = "ecodim-auth";

    let broadcastChannel = null;
    try {
        broadcastChannel = new BroadcastChannel(BROADCAST_NAME);
    } catch (e) {
        /* navigateur ancien */
    }

    function normalizeId(s) {
        return String(s || "").trim().toLowerCase();
    }

    function lockKeyForId(id) {
        return LOCK_PREFIX + normalizeId(id);
    }

    function getAllowedSet() {
        const list = window.ACCESS_ALLOWED_IDENTIFIERS;
        if (!Array.isArray(list) || list.length === 0) return new Set();
        return new Set(list.map(normalizeId));
    }

    function isAllowed(id) {
        const n = normalizeId(id);
        if (!n) return false;
        return getAllowedSet().has(n);
    }

    function randomToken() {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return "t-" + String(Date.now()) + "-" + String(Math.random()).slice(2);
    }

    function readLock(id) {
        const raw = localStorage.getItem(lockKeyForId(id));
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function isSessionValid() {
        const id = sessionStorage.getItem(SESSION_ID_KEY);
        const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
        if (!id || !token || !isAllowed(id)) return false;
        const data = readLock(id);
        return Boolean(data && data.token === token);
    }

    function clearLockIfCurrent() {
        const id = sessionStorage.getItem(SESSION_ID_KEY);
        const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
        if (!id || !token) return;
        const data = readLock(id);
        if (data && data.token === token) {
            localStorage.removeItem(lockKeyForId(id));
        }
    }

    function postBroadcast(payload) {
        if (broadcastChannel) {
            try {
                broadcastChannel.postMessage(payload);
            } catch (e) {
                /* ignore */
            }
        }
    }

    function showApp() {
        const gate = document.getElementById("accessGate");
        const root = document.getElementById("appRoot");
        if (gate) gate.hidden = true;
        if (root) root.hidden = false;
        document.body.classList.add("access-granted");
    }

    function hideApp() {
        const gate = document.getElementById("accessGate");
        const root = document.getElementById("appRoot");
        if (gate) gate.hidden = false;
        if (root) root.hidden = true;
        document.body.classList.remove("access-granted");
    }

    function forceLogout(message) {
        sessionStorage.removeItem(SESSION_ID_KEY);
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
        hideApp();
        document.body.classList.remove("access-granted");
        window.dispatchEvent(new CustomEvent("ecodim-access-revoked"));
        const err = document.getElementById("accessError");
        if (err && message) err.textContent = message;
    }

    function grantAccess(id) {
        const n = normalizeId(id);
        const token = randomToken();
        sessionStorage.setItem(SESSION_ID_KEY, n);
        sessionStorage.setItem(SESSION_TOKEN_KEY, token);
        try {
            localStorage.setItem(
                lockKeyForId(n),
                JSON.stringify({ token: token, ts: Date.now() })
            );
        } catch (e) {
            sessionStorage.removeItem(SESSION_ID_KEY);
            sessionStorage.removeItem(SESSION_TOKEN_KEY);
            const err = document.getElementById("accessError");
            if (err) {
                err.textContent =
                    "Stockage local indisponible (navigateur privé ou bloqué). Réessaie ou autorise les cookies / données du site.";
            }
            return;
        }
        postBroadcast({
            type: "ecodim-session",
            action: "login",
            id: n,
            token: token
        });
        showApp();
        window.dispatchEvent(new CustomEvent("ecodim-access-granted"));
    }

    function revokeAccess() {
        const id = sessionStorage.getItem(SESSION_ID_KEY);
        clearLockIfCurrent();
        sessionStorage.removeItem(SESSION_ID_KEY);
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
        hideApp();
        postBroadcast({
            type: "ecodim-session",
            action: "logout",
            id: id ? normalizeId(id) : null
        });
        window.dispatchEvent(new CustomEvent("ecodim-access-revoked"));
        const input = document.getElementById("accessIdentifier");
        if (input) {
            input.value = "";
            input.focus();
        }
    }

    function handleStorageEvent(e) {
        if (!e.key || e.key.indexOf(LOCK_PREFIX) !== 0) return;
        const myId = sessionStorage.getItem(SESSION_ID_KEY);
        const myToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
        if (!myId || !myToken) return;
        if (e.key !== lockKeyForId(myId)) return;

        if (!e.newValue) {
            forceLogout(
                "Ta session n'est plus valide (déconnexion ou autre onglet)."
            );
            return;
        }
        try {
            const data = JSON.parse(e.newValue);
            if (data.token !== myToken) {
                forceLogout(
                    "Cet identifiant est déjà utilisé : une autre connexion a pris le relais (autre onglet ou fenêtre sur cet appareil)."
                );
            }
        } catch (err) {
            forceLogout("");
        }
    }

    function handleBroadcast(ev) {
        const msg = ev.data;
        if (!msg || msg.type !== "ecodim-session") return;
        const myId = sessionStorage.getItem(SESSION_ID_KEY);
        const myToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
        if (!myId || !myToken) return;
        if (msg.id !== myId) return;
        if (msg.action === "login" && msg.token && msg.token !== myToken) {
            forceLogout(
                "Cet identifiant est déjà utilisé : une autre connexion a pris le relais (autre onglet ou fenêtre sur cet appareil)."
            );
            return;
        }
        if (msg.action === "logout" && msg.id === myId) {
            sessionStorage.removeItem(SESSION_ID_KEY);
            sessionStorage.removeItem(SESSION_TOKEN_KEY);
            hideApp();
            document.body.classList.remove("access-granted");
            window.dispatchEvent(new CustomEvent("ecodim-access-revoked"));
            const err = document.getElementById("accessError");
            if (err) err.textContent = "Déconnexion depuis un autre onglet.";
        }
    }

    function verifySessionStillValid() {
        if (!document.body.classList.contains("access-granted")) return;
        if (!isSessionValid()) {
            forceLogout(
                "Session expirée ou identifiant utilisé ailleurs sur cet appareil."
            );
        }
    }

    function initAccessGate() {
        const form = document.getElementById("accessForm");
        const input = document.getElementById("accessIdentifier");
        const err = document.getElementById("accessError");

        window.addEventListener("storage", handleStorageEvent);
        if (broadcastChannel) {
            broadcastChannel.addEventListener("message", handleBroadcast);
        }
        setInterval(verifySessionStillValid, 15000);

        if (isSessionValid()) {
            showApp();
        } else {
            sessionStorage.removeItem(SESSION_ID_KEY);
            sessionStorage.removeItem(SESSION_TOKEN_KEY);
            hideApp();
        }

        if (form && input) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                if (err) err.textContent = "";
                if (isAllowed(input.value)) {
                    grantAccess(input.value);
                } else if (err) {
                    err.textContent = "Identifiant incorrect ou non autorisé.";
                }
            });
        }

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                revokeAccess();
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAccessGate);
    } else {
        initAccessGate();
    }
})();
