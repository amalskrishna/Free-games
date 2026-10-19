
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

        
    const subscribeBtn = document.getElementById("subscribe-btn");
    const subscribeModal = document.getElementById("subscribe-modal");
    const closeSubscribe = document.getElementById("close-subscribe");
    const subscribeForm = document.getElementById("subscribe-form");
    const subscriberEmail = document.getElementById("subscriber-email");
    const subscribeMessage = document.getElementById("subscribe-message");

    // Open the popup
    subscribeBtn.addEventListener("click", () => {
        subscribeModal.style.display = "flex";
        subscribeMessage.textContent = "";
        subscriberEmail.focus();
    });

    // Close using the X button
    closeSubscribe.addEventListener("click", () => {
        subscribeModal.style.display = "none";
    });

    // Close when clicking outside the card
    subscribeModal.addEventListener("click", (event) => {
        if (event.target === subscribeModal) {
            subscribeModal.style.display = "none";
        }
    });

    // Close using the Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            subscribeModal.style.display = "none";
        }
    });

    // Handle form submission
    subscribeForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = subscriberEmail.value.trim();

        if (!email) {
            subscribeMessage.textContent = "Please enter your email address.";
            return;
        }

        subscribeMessage.textContent =
            "Thanks for your interest! Email storage will be connected soon.";

        subscribeForm.reset();
    });
