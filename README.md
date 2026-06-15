# 1FS Photography & Rentals

A premium, sleek, and high-end studio website built with React, Vite, and Tailwind CSS. Featuring a "Gallery Monochrome" theme designed to highlight stunning photography.

## Features
- **Premium UI/UX:** Ultra-sleek monochrome palette with elegant typography.
- **Photoshoot Packages:** Browse and select premium packages.
- **Camera Rentals:** Live cart system for renting high-end cameras and gear.
- **Booking Calendar:** Interactive UI for booking dates.
- **WhatsApp Integration:** Direct booking and rental checkout via WhatsApp.
- **Admin Dashboard:** Manage bookings, rentals, and gear fleet.

## How to Run Locally

1. Open your terminal in this project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server (we use a special command for Windows path compatibility):
   ```bash
   node node_modules/vite/bin/vite.js dev
   ```
4. Open the provided `localhost` link in your browser.

## How to Publish to GitHub Pages (Live Website)

This project is pre-configured with a GitHub Action (`.github/workflows/deploy.yml`) to automatically build and deploy your website to GitHub Pages!

**Follow these exact steps:**

1. **Create a GitHub Repository:**
   - Go to [GitHub.com](https://github.com) and click **New Repository**.
   - Name it (e.g., `1fs-photography`). Do **NOT** initialize with a README, .gitignore, or license.
   - Click **Create repository**.

2. **Push Your Code:**
   - Open your terminal in this project folder.
   - Run these commands, replacing `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPO_NAME>` with your actual details:
     ```bash
     git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
     git branch -M main
     git push -u origin main
     ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click on the **Settings** tab.
   - In the left sidebar, click on **Pages**.
   - Under "Build and deployment", change the Source to **GitHub Actions**.
   - GitHub will automatically detect your `deploy.yml` file and start building your website!

4. **View Your Live Site!**
   - Click the **Actions** tab to watch the build finish.
   - Once it turns green, your website is live! The URL will be provided in the action summary (usually `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`).

---
*Designed with precision for 1FS Studio.*
