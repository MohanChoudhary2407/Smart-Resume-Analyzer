# Smart Resume Analyzer with AI-Based Feedback

An intermediate-level AI capstone prototype built with Python Flask, HTML/CSS/JavaScript, SQLite, and **spaCy NLP**.

## Features

- Upload PDF and DOCX resumes (maximum 8 MB)
- Extract text from text-based PDFs and DOCX files
- Resume completeness score out of 100, with a transparent ten-check breakdown
- Role-based skill matching for Data Analyst, Web Developer, AI Engineer, and Cloud Engineer
- **spaCy NLP skill extraction** using tokenization and PhraseMatcher over a configurable skill vocabulary
- **Optional job-description comparison**: paste a job description to extract recognized skills and compare the resume against those skills
- Matched skills, skills to review, ATS-readability checks, and rule-based improvement suggestions
- SQLite analysis history (up to 50 records shown)
- Downloadable PDF analysis report
- Responsive dashboard UI

## What the NLP feature does

The app uses `spacy.blank("en")` and spaCy's `PhraseMatcher` to find known skill phrases in the resume and optional job description. This uses spaCy's NLP tokenization and phrase-matching pipeline and does **not** require downloading a separate language model. The skill vocabulary and aliases are maintained in `ROLE_SKILLS` and `SKILL_ALIASES` in `app.py`.

When a job description is supplied, the analyzer uses the skills it recognizes in that description as the comparison target. If it finds no supported skills in the description, it falls back to the selected role's starter list. Without a job description, the selected role's starter list is used.

This is a transparent, dictionary-based NLP prototype, not a semantic model or a commercial ATS. It may miss synonyms, skills outside the vocabulary, or skills expressed in unusual ways. Extend the vocabulary for your domain and test it against sample resumes.

## Requirements

- Python 3.10 or newer recommended
- pip
- Windows, macOS, or Linux
- Internet connection for installing dependencies

## Setup (Windows PowerShell)

Open PowerShell in this project folder:

```powershell
python -m venv .venv
```

Activate the environment:

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell says running scripts are disabled, allow activation **for this terminal session only**:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

Then install dependencies and start the app:

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
python app.py
```

If the `python` command is unavailable, install Python from https://www.python.org/downloads/windows/ and select **Add Python to PATH** during setup. Close and reopen the terminal afterward. You can also run the environment's Python directly without activation:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

## Setup (macOS/Linux)

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000 in your browser.

## Project structure

```text
smart_resume_analyzer/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── results.html
│   └── history.html
└── static/
    ├── css/style.css
    └── js/main.js
```

The SQLite database (`resume_analyzer.db`) is created automatically when the app starts.

## Scoring

### Resume completeness score
Ten checks are worth 10 points each: contact information, education, skills, projects, experience, summary/objective, certifications, action-oriented content, measurable achievements, and readable length.

### Role/job-description skill match score
The score is the number of recognized target skills found in the resume divided by the number of recognized target skills, multiplied by 100. A supplied job description takes priority if spaCy detects supported skills in it; otherwise the selected role's starter list is used.

These are educational heuristics, not a real ATS vendor score or a prediction of hiring outcomes.

## Test it

1. Upload a text-based PDF or DOCX resume.
2. Select one of the four target roles.
3. Optionally paste the job description for a specific job.
4. Review the resume score, matched/missing skills, NLP-extracted skills, readability checks, and suggestions.
5. Download the PDF report and open Analysis History.

A scanned/image-only PDF may not contain extractable text. This prototype does not include OCR. Convert it to a text-based PDF or DOCX before analysis.

## Privacy and security

- The uploaded file and extracted resume text are processed in memory and are not saved by this app.
- SQLite stores the original filename, target role, scores, matched/missing skills, suggestions, and timestamp. Treat this as personal data.
- Before public deployment, add authentication, CSRF protection, stronger secret management, data-retention/deletion controls, rate limiting, and a production server configuration.
- Set `SECRET_KEY` through an environment variable before deployment.
- Do not run Flask debug mode in production.

## Limitations and future work

- No model training or external AI API is used; NLP skill extraction uses spaCy PhraseMatcher and an editable vocabulary.
- ATS compatibility is an estimate, not an actual result from an ATS provider.
- Synonyms and skills outside the configured vocabulary may not be detected.
- PDF text extraction can miss content in columns, tables, icons, or scanned documents.
- Potential future additions: semantic similarity, OCR, editable history deletion, charts, unit tests, and a larger validated skill dictionary.
