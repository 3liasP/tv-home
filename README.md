# TV Home
### Home Page for Big Screen TV
---
## About
- Simple static webpage to be used as configurable Smart TV-like UI with big screens
- Can be configured to use custom links, thumbnails and can automatically fetch icons for added links
- Supports easy keyboard navigation with arrow keys for familiar UX
- Work in progress!

## Installation & Usage
1. Install compitable version of Node.js for your operating system
2. Clone this repository:
```bash
git clone git@github.com:3liasP/tv-home.git
```
3. Navigate to this repository
```bash
cd tv-home/
```
4. Install dependencies
```bash
npm install
```
5. Copy `template.env` to `.env`
```bash
cp template.env .env
```
6. Edit `.env` if necessary (e.g. configure port, your custom link JSON-file, etc...)
7. Start server with
```bash
npm run dev
```
8. Open browser at address `localhost:3000`

## Custozation & Configuration
- You can edit and add links via editing the [template.json](public/assets/json/template.json) or by creating a new file there, e.g. `links.json`.
- Remember to specify your custom JSON-file in the `.env` you created!
- Background can be replaced by replacing the [background.jpg](public/assets/bak/background.jpg)
- In [img/](public/assets/img/) you can add custom thumbnail images for links if you wish to use those instead of website initials or favicons
- Fetching favicons automatically can be turned off and on with by modifying `.env`

---
Contributions and pull requests are welcome!