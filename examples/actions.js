
        let allgames = [];
        let filteredgames = [];
        function getDaysLeft(dstring){
            const enddate = new Date(dstring);
            const today = new Date();
            const diff =  enddate - today;
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
        async function loadData() {

            const response = await fetch(
                "https://www.gamerpower.com/api/giveaways"
            );

            const data = await response.json();
            allgames = data ;
            filteredgames = data ;


            const filter = data.filter(game => {
                const plat=game.platforms.toLowerCase();
                const stepic = plat.includes("steam") || plat.includes("epic");
                const isgame = game.type.toLowerCase() === "game";
                return stepic && isgame;
            });
            console.log(filter.length);

            filter.sort((a,b) => {
                return new Date(a.end_date) - new Date(b.end_date);
            });

            const container = document.getElementById("games");
            container.innerHTML = "";

            for (let i = 0; i < filter.length; i++) {

                const gam = filter[i];
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
                const daystext = daysleft === 1 ?
                "1 day left" : `${daysleft} days left`;
                console.log(gam.title, daysleft); 
                container.innerHTML += `
                    <div class="card">
                        <div class="imgcont">
                            <img src="${gam.image}" alt="${gam.title}">
                            <div class="banner">
                                ${daystext}
                            </div>
                            <div class="plat">${plat}</div>
                        </div>
                        <div class="titlecontent">
                            <h2>${gam.title}</h2>
                            <p>Free <span style=" text-decoration:line-through;">${gam.worth}</span></p>
                            <p><strong>Ends </strong>${dayform}</p>
                            
                        </div>
                        <div class="pagelink">
                            <a href=${gam.open_giveaway_url} target="_blank" style="text-decoration: none; color: rgb(234, 242, 227);">
                                CLAIM FREE →
                            </a>
                        </div>
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