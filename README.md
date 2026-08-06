# lesleynase.com

A plain HTML/CSS/JS business site — no build step required, so it deploys as-is to Hostinger.

## Structure

- `index.html`, `about.html`, `services.html`, `contact.html` — the four pages
- `css/styles.css` — all styling
- `js/main.js` — mobile nav, active-link highlighting, contact form validation
- `contact-handler.php` — processes the contact form submission via PHP `mail()`

## Customizing content

Everything in brackets like `[Your Tagline Here]` or `$XXX` is placeholder — search each HTML file for these and replace with real copy, pricing, and contact info. Also update:

- `hello@lesleynase.com` and `(000) 000-0000` (appears in header CTA, contact page, and footer of every page)
- `TO_EMAIL` at the top of `contact-handler.php` — this is where form submissions actually get sent
- The "LN" placeholder mark in the hero and the `photo-placeholder` block on `about.html` — swap for a real logo/photo when you have one

## Deploying to Hostinger via Git

Hostinger's hPanel can auto-deploy this site straight from a Git repository — no FTP or plugin needed.

1. Create a new repository on GitHub (or GitLab/Bitbucket) and push this project to it:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In hPanel, go to **Websites → lesleynase.com → Advanced → Git**.
3. Enter your repository URL and branch (`main`), then set the deploy path to `public_html`.
4. Click **Create/Deploy**. Hostinger will pull the repo directly into your site's document root.
5. Any time you push new commits to the branch, redeploy from that same Git panel (or enable auto-deploy if Hostinger offers it on your plan).

## Testing the contact form

`contact-handler.php` needs a real PHP environment to run (Hostinger shared hosting provides this automatically). It can't be tested locally without a PHP server — after deploying, submit the live form once to confirm mail delivery, and check your spam folder the first time.
