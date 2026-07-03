from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_match_score(job_skills, resume_skills):

    job = set(skill.strip().lower() for skill in job_skills)

    resume = set(skill.strip().lower() for skill in resume_skills)

    matched = job.intersection(resume)

    if len(job) == 0:
        return 0, []

    score = round((len(matched) / len(job)) * 100)

    return score, list(matched)