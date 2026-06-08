#[INFO! THIS APP IS UNDER REDEVELOPMENT, THE README.md CONTENT MAY BE INCORRECT]
# 📚 epubCreator.html – EPUB 3 Completer

**epubCreator.html** is a powerful client-side web tool that transforms your raw content (XHTML chapters, images, audio) into a fully structured **EPUB 3** project.  
It generates a ready-to-package ZIP archive compliant with the EPUB 3 specification – perfect for authors, publishers, and DIY e-book creators.

> 🧪 **Live demo?** Just open `index.html` in any modern browser – no server required!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Web-brightgreen)
![EPUB 3](https://img.shields.io/badge/EPUB-3.0-orange)

---

## ✨ Features

- **Upload existing ZIP** – Bring your own XHTML, CSS, images, and audio files.
- **Smart file detection** – Automatically identifies chapters, cover images, media assets.
- **Full metadata editor**  
  Title, subtitle, volume, author, contributors, language, identifier, date, publisher, description, subjects, series info.
- **Add extra titles & contributors** – Dynamic fields for multiple entries.
- **Reorder chapters** – Drag & drop or arrow buttons to control the reading order (spine).
- **Generates EPUB 3 structure**  
  - Mimetype (uncompressed)  
  - `META-INF/container.xml`  
  - `EPUB/content.opf` (full manifest, spine, metadata)  
  - `EPUB/toc.xhtml` (navigation document)  
  - Optional `cover.xhtml` if missing  
- **Media support** – Images (cover property) and audio files are automatically added to the manifest.
- **One-click download** – Get a ready-to-package ZIP archive. Re-compress with `mimetype` stored (see instructions).
- **Fully client-side** – Your files never leave your computer. Fast, private, secure.

---

## 🚀 How to Use

### 1. Get the tool
Clone or download this repository:
```bash
git clone https://github.com/YogabyAllwaysever/epubCreator.html.git
```

Then open index.html in your browser.

2. Prepare your content (optional)

You can start from scratch or upload an existing ZIP.
To test, use the 📥 Template Chapter button inside the tool.

Recommended folder structure inside your ZIP:

```
your-book.zip
├── mimetype (optional – will be recreated)
├── META-INF/
│   └── container.xml (optional – will be recreated)
└── EPUB/
    ├── chapter1.xhtml
    ├── chapter2.xhtml
    ├── cover.xhtml (optional – will be regenerated)
    ├── toc.xhtml (optional – will be regenerated)
    ├── images/
    │   └── cover.png (important)
    └── audio/
        └── background.mp3 (opsional – if you have audio for this book)
```

⚠️ The tool will reorganise files into EPUB/ automatically. Existing content.opf or nav files are ignored and replaced.

3. Upload your ZIP

Click the upload zone and select your ZIP file. The tool will:

· List all detected XHTML files as chapters (excluding cover.xhtml and toc.xhtml)
· Show images and audio files
· Mark any cover image (based on filename cover or location)

4. Edit metadata

Fill in or modify:

· Main title (required)
· Author (required)
· Language, identifier, date, publisher, etc.
· Add extra titles or contributors as needed

5. Arrange chapters

Use drag & drop or the ⬆️ / ⬇️ buttons to set the correct reading order.

6. Generate & Download

Click the ✨ Generate & Download EPUB Struktur button.
The tool will output a ZIP archive named epub_completed.zip.

7. Final packaging (important!)

EPUB requires the mimetype file to be uncompressed and the first file in the archive.
To create a valid .epub from the generated ZIP:

Using most archive managers (e.g., 7-Zip, WinRAR, Keka):

· Extract the generated epub_completed.zip into a folder.
· Re-compress only the contents of the extracted folder into a new ZIP using store (no compression) for mimetype and DEFLATE for the rest.
    ➜ Then rename .zip to .epub.

Using command line (Linux/macOS):

```bash
unzip epub_completed.zip -d epub_temp
cd epub_temp
zip -0Xq ../book.epub mimetype
zip -Xr9D ../book.epub META-INF EPUB
cd ..
```

💡  Tips: You can just rename the file name and format it to [book].epub

📖 The generated structure is fully EPUB 3 compliant – you just need to ensure the correct compression.

---

🧰 Technology Stack

- HTML5 / CSS3 – Responsive, dark rounded UI with press‑effect buttons.
- JavaScript (ES6) – All logic runs locally in your browser.
- JSZip – For reading and writing ZIP files.
- Font Awesome 6 – Clean icons.
- Outfit Font – Modern, rounded typeface.
- SuperRoundedUI - Design UI Language from Allwaysever

No build steps, no dependencies to install – just open index.html.

---

📁 Repository Contents

```
epubCreator.html/
├── index.html          # Main application (all-in-one HTML/CSS/JS)
├── README.md           # This file
└── LICENSE         # MIT License
```

The repository name is epubCreator.html, but the entry file is index.html – simply open it to start.

---

🤝 Contributing

Contributions, bug reports, and feature requests are welcome!
Please open an issue or submit a pull request.

Development

The entire tool is self-contained in index.html. To hack on it:

1. Clone the repository.
2. Edit index.html (styles, logic, structure).
3. Test locally by opening the file in a browser.

---

📄 License

This project is licensed under the MIT License – [see the LICENSE file for details](LICENSE).

---

🙏 Acknowledgements

- JSZip – ZIP handling.
- Font Awesome – Icons.
- Outfit Font – Typography.
- EPUB 3 Specification – Standard reference.
- SuperRoundedUI - Design UI Language.

---

📧 Contact & Support

For questions or suggestions, feel free to open an issue or reach out via GitHub Discussions.

---

Happy publishing! 🎉
Create beautiful EPUB 3 books with ease.