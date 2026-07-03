KNOWN_SKILLS = [
    "python",
    "java",
    "javascript",
    "react",
    "node",
    "express",
    "fastapi",
    "django",
    "flask",
    "html",
    "css",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "git",
    "docker",
    "aws",
    "linux",
    "bootstrap",
    "tailwind",
]


def extract_skills(text):
    text = text.lower()

    skills = []

    for skill in KNOWN_SKILLS:
        if skill in text:
            skills.append(skill)

    return skills