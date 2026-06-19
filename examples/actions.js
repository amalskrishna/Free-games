
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
        const navbar = document.getElementById("navbar");
        window.addEventListener("scroll", () => {
            if (window.scrollY > 1) {
                navbar.classList.add("overlay");
            } else {
                navbar.classList.remove("overlay");
            }
        });