# 🎮 STEALIT

STEALIT helps gamers discover free games and limited-time giveaways available on platforms such as **Steam** and the **Epic Games Store**. It brings currently available offers together in one place so players can find games and claim them before the offers expire.

🌐 **Live website:** https://stealit-steel.vercel.app/

## ✨ Features

- 🎁 **Free-game discovery** — fetches giveaway information from the GamerPower API.
- 🕹️ **Steam and Epic Games Store** — focuses on game offers available on these platforms.
- ⏳ **Limited-time offers** — shows giveaway details and links to the relevant claim pages.
- 💡 **Game suggestions** — lets visitors submit suggestions through a Google Apps Script endpoint connected to Google Sheets.
- 📩 **Email updates** — uses EmailOctopus for subscriber signups and a welcome email.
- 📱 **Web-based experience** — access the site through a browser.

## 🧰 Tech Stack

- HTML, CSS, JavaScript
- [GamerPower API](https://www.gamerpower.com/api)
- Google Apps Script and Google Sheets (suggestion submissions)
- EmailOctopus (email signup and campaigns)
- [Vercel](https://vercel.com/) (hosting)

## 🚀 Run Locally

1. Clone this repository:

   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   ```

2. Open the project folder.
3. Open `index.html` in your browser, or use a local development server such as the VS Code Live Server extension.
4. Check that the website loads and that the games section can retrieve data from the GamerPower API.

> **Note:** The exact setup may depend on the filenames and configuration included in the repository. If your main HTML file has a different name, open that file instead.

## ⚙️ How It Works

1. The website requests giveaway data from the GamerPower API.
2. JavaScript filters the results to show game giveaways for supported platforms.
3. The page displays available offers with details and links to claim them.
4. Visitors can submit game suggestions through the configured Google Apps Script endpoint.
5. Visitors can subscribe to email updates through the EmailOctopus signup form.
6. Weekly free-game updates can be sent as EmailOctopus campaigns.

## 📁 Project Structure

The project may be organized similarly to this:

```text
STEALIT/
├── index.html       # Main website page
├── games.css        # Website styling
├── actions.js       # Game data, suggestion form, and page interactions
└── README.md        # Project documentation
```


## 🔐 Configuration & Privacy

- The website uses third-party services, including GamerPower, Google Apps Script/Google Sheets, EmailOctopus, and Vercel.
- Review each service's terms and privacy practices before using it.
- If you publish your source code publicly, check it for private information before uploading.
- **Do not commit API keys, passwords, private subscriber data, or sensitive deployment details.**
- If you later move endpoints or change signup settings, update the relevant configuration in the project files.


## 📥 Help STEALIT Emails Reach Your Inbox

STEALIT sends updates about free games and limited-time offers. Email providers may sort these messages into **Promotions** or occasionally **Spam**. These steps can help you find future updates more easily.

### If a STEALIT email lands in Spam

1. Open Gmail and go to **Spam**.
2. Open the STEALIT email.
3. Click or tap **Report not spam** (or **Not spam**, depending on your Gmail version).

### There is a high chance that STEALIT email lands in Promotions, and you won't receive the notifications. So do this

You can create a filter to recive future emails to your inbox:

1. Open Gmail on a computer and click the search options icon beside the search bar.
2. Enter the sender's exact email address in the **From** field. Use the address shown on the STEALIT email; don't copy an example address unless it matches the actual sender. Use (skrishnaamal10.gmail.com@send.eomail5.com) in our site's case.
3. Click **Create filter**.
4. Select **Categorize as → Primary**.
5. Click **Create filter** to save.

Gmail's menus can differ between devices and accounts. Moving a message or creating a filter applies to that recipient's Gmail account only; STEALIT cannot change these settings for subscribers.

> **Note:** These steps are optional and do not guarantee Primary placement or notifications. Gmail may continue to classify newsletters as Promotions. Subscribers can also check their Gmail notification settings and device permissions if they want alerts for new mail.

## 📬 Email Updates

STEALIT uses EmailOctopus for subscriber signups and email communication. Campaign frequency and content may change. Subscribers should use the unsubscribe link included in the emails if they no longer wish to receive updates.

## 🤝 Contributing

Suggestions and improvements are welcome!

1. Fork the repository.
2. Create a branch for your change.
3. Make and test your changes.
4. Open a pull request describing what you changed.

## ⚖️ Disclaimer

STEALIT is an independent project and is not affiliated with, endorsed by, or sponsored by Steam, Valve, Epic Games, GamerPower, or EmailOctopus. Game availability and giveaway deadlines are determined by the respective providers and may change at any time. Always check the official claim page for current terms and availability.

---

Made for gamers who love free games. 🎮
