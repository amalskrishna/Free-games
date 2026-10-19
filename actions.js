
        let allgames = [];
        let filteredgames = [];
        function getDaysLeft(dstring){
            const enddate = new Date(dstring);
            const today = new Date();
            const diff =  enddate - today;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor( (diff%(1000*60*60*24))/(1000*60*60));
            const minutes= Math.floor((diff%(1000*60*60))/(1000*60));
            if(days>0){
                return days===1
                    ? "1 day left"
                    : `${days} days left`;
            }
            else if (days<0){
                return "Expired";
            }
            return `${hours}h ${minutes}m left`;
        }
        
        function displayGames(games) {
            const container = document.getElementById("games");
            container.innerHTML = "";

            if (games.length === 0) {
                container.innerHTML = "<p style='text-align: center;'>No games found.</p>";
                return;
            }

            for (let i = 0; i < games.length; i++) {

                const gam = games[i];
                const x = gam.platforms.split(", ");
                const plat = x[1].toUpperCase();
                const datea = new Date(gam.end_date.split( )[0]);
                const dayform = datea.toLocaleDateString("en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
                );
                const daysleft = getDaysLeft(gam.end_date);
            
                console.log(gam.title, daysleft); 
                container.innerHTML += `
                    <div class="card">
                        <div class="imgcont">
                            <img src="${gam.image}" alt="${gam.title}">
                            <div class="banner">
                                ${daysleft}
                            </div>
                            <div class="plat">${plat}</div>
                        </div>
                        <div class="titlecontent">
                            <h2>${gam.title}</h2>
                            <p>Free <span style=" text-decoration:line-through;">${gam.worth}</span></p>
                            <p><strong>Ends </strong>${dayform}</p>
                            
                        </div>
                        <a href=${gam.open_giveaway_url} target="_blank" style="text-decoration: none; color: rgb(234, 242, 227);">
                        <div class="pagelink">
                                CLAIM →
                            
                        </div>
                        </a>
                    </div>
                `;
            }
        }

        async function loadData() {

            const response = await fetch(
                "https://www.gamerpower.com/api/giveaways"
            );

            const data = await response.json();
            allgames = data ;
            filteredgames = data ;


            const filters = data.filter(game => {
                const plat=game.platforms.toLowerCase();
                const stepic = plat.includes("steam") || plat.includes("epic");
                const isgame = game.type.toLowerCase() === "game";
                return stepic && isgame;
            });
            filteredgames = filters;
            displayGames(filteredgames);
            
            console.log(filters.length);

            filters.sort((a,b) => {
                return new Date(a.end_date) - new Date(b.end_date);
            });


            const container = document.getElementById("games");
            container.innerHTML = "";

            for (let i = 0; i < filters.length; i++) {

                const gam = filters[i];
                const x = gam.platforms.split(", ");
                const plat = x[1].toUpperCase();
                const datea = new Date(gam.end_date.split( )[0]);
                const dayform = datea.toLocaleDateString("en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
                );
                const daysleft = getDaysLeft(gam.end_date);
            
                console.log(gam.title, daysleft); 
                container.innerHTML += `
                    <div class="card">
                        <div class="imgcont">
                            <img src="${gam.image}" alt="${gam.title}">
                            <div class="banner">
                                ${daysleft}
                            </div>
                            <div class="plat">${plat}</div>
                        </div>
                        <div class="titlecontent">
                            <h2>${gam.title}</h2>
                            <p>Free <span style=" text-decoration:line-through;">${gam.worth}</span></p>
                            <p><strong>Ends </strong>${dayform}</p>
                            
                        </div>
                        <a href=${gam.open_giveaway_url} target="_blank" style="text-decoration: none; color: rgb(234, 242, 227);">
                        <div class="pagelink">
                                CLAIM →
                            
                        </div>
                        </a>
                    </div>
                `;
            }
        }
        loadData();
        
        const searchInput = document.getElementById("search");

        searchInput.addEventListener("input", function () {
            const query = searchInput.value.trim().toLowerCase();

            const results = filteredgames.filter(game =>
                game.title.toLowerCase().includes(query)
            );

            displayGames(results);
        });

        const navbar = document.getElementById("navbar");
        window.addEventListener("scroll", () => {
            if (window.scrollY > 1) {
                navbar.classList.add("overlay");
            } else {
                navbar.classList.remove("overlay");
            }
        });

        
    
/* Reusable popup controller */

// Open any popup
document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal-target]");

    if (trigger) {
        const modalId = trigger.dataset.modalTarget;
        const modal = document.getElementById(modalId);

        if (modal) {
            openModal(modal);
        }
    }

    // Close using the X button
    const closeBtn = event.target.closest(".modal .close-btn");

    if (closeBtn) {
        closeModal(closeBtn.closest(".modal"));
    }

    // Close by clicking the overlay
    if (event.target.classList.contains("modal")) {
        closeModal(event.target);
    }
});

function openModal(modal) {
    modal.classList.add("is-open");

    const message = modal.querySelector(".modal-message");
    if (message) message.textContent = "";

    // Focus the first input, if present
    modal.querySelector("input")?.focus();
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove("is-open");
    }
}

// Close the currently open popup with Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal.is-open").forEach(closeModal);
    }
});


const BACKEND_URL = "https://script.google.com/macros/s/AKfycbweAZ-1pBu-z-6bDr433L06uWtMQVPzmNfIRGolg7O6iBKVk3UN7pil9EiyVN9TDqSE-A/exec";

document.addEventListener("submit", async (event) => {
    const form = event.target;

    if (!form.matches(
        ".subscribe-form, .suggestion-form, #subscribe-form, #suggestion-form"
    )) {
        return;
    }

    event.preventDefault();

    const modal = form.closest(".modal");
    const isSubscribe =
        form.matches("#subscribe-form, .subscribe-form");

    const message = isSubscribe
        ? modal.querySelector("#subscribe-message")
        : modal.querySelector(".modal-message");

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    const payload = new URLSearchParams();

    if (isSubscribe) {
        payload.set("action", "subscribe");
        payload.set(
            "email",
            form.querySelector('input[type="email"]').value.trim()
        );
    } else {
        payload.set("action", "suggestion");
        payload.set(
            "suggestion",
            form.querySelector("textarea").value.trim()
        );
    }

    if (!payload.get(isSubscribe ? "email" : "suggestion")) {
        message.textContent = "Please fill in the required field.";
        return;
    }

    button.disabled = true;
    button.textContent = "Submitting...";
    message.textContent = "";

    try {
        await fetch(BACKEND_URL, {
            method: "POST",
            mode: "no-cors",
            body: payload
        });

        message.textContent = isSubscribe
            ? "Thanks! Your subscription request has been sent."
            : "Thanks! Your suggestion has been sent.";

        form.reset();
    } catch (error) {
        console.error("Submission error:", error);
        message.textContent =
            "Could not send your submission. Please try again.";
    } finally {
        button.disabled = false;
        button.textContent = originalText;
    }
});



