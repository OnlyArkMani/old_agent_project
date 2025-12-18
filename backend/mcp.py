import random

def mcp_decision(query):
    # Simple heuristic: longer queries or those with 'search' are more likely to need search
    query_length = len(query.split())
    trials = 100
    search_score = 0

    for _ in range(trials):
        if 'search' in query.lower() or query_length > 5:
            search_score += random.uniform(0.7, 1.0)
        else:
            search_score += random.uniform(0.0, 0.3)

    avg_score = search_score / trials
    return 'search' if avg_score > 0.5 else 'direct'