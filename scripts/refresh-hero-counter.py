#!/usr/bin/env python3
"""Refresh the "N clips sorted into finished vlogs" counter on the home page.

The number is a literal in index.html, not a live fetch — a live endpoint would
mean putting a PostHog *personal* API key in the Worker to serve a marketing
stat, which is a lot of blast radius for a figure that moves ~800/month.

    export POSTHOG_API_KEY=...        # already in ~/.zshrc
    python3 scripts/refresh-hero-counter.py           # show what it would do
    python3 scripts/refresh-hero-counter.py --write   # patch index.html

Run it at release time, alongside the version-string bumps. Review and commit
yourself; this never commits or pushes.
"""
import io, json, os, re, sys, urllib.request

PROJECT = "424832"
HTML = os.path.join(os.path.dirname(__file__), "..", "index.html")
# Lifetime clips the pipeline has actually processed. Counts every completed
# render including dev-mode QA, which is most of the total today.
HOGQL = ("SELECT sum(toFloat64OrNull(toString(properties.totalClips))), count() "
         "FROM events WHERE event = 'render_completed'")


def fetch():
    key = os.environ.get("POSTHOG_API_KEY")
    if not key:
        sys.exit("POSTHOG_API_KEY is not set (it lives in ~/.zshrc).")
    req = urllib.request.Request(
        f"https://us.posthog.com/api/projects/{PROJECT}/query/",
        data=json.dumps({"query": {"kind": "HogQLQuery", "query": HOGQL}}).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    rows = json.load(urllib.request.urlopen(req, timeout=30))["results"]
    if not rows or rows[0][0] is None:
        sys.exit("PostHog returned no rows — refusing to write.")
    return int(rows[0][0]), int(rows[0][1])


def main():
    clips, renders = fetch()
    s = io.open(HTML, encoding="utf-8").read()

    pat = r'(<span class="hero-stat-num">)([\d,]+)(</span>)'
    m = re.search(pat, s)
    if not m:
        sys.exit("Couldn't find the counter span in index.html.")
    current = int(m.group(2).replace(",", ""))

    # Cumulative, so it can only climb. A drop means a partial or wrong query.
    if clips < current:
        sys.exit(f"Refusing to write: PostHog says {clips:,}, page says "
                 f"{current:,}. This number should never go down.")

    print(f"  page      {current:,}")
    print(f"  posthog   {clips:,}  (+{clips - current:,} over {renders:,} renders)")

    if clips == current:
        print("  already current — nothing to do.")
        return
    if "--write" not in sys.argv:
        print("  dry run. re-run with --write to patch index.html.")
        return

    io.open(HTML, "w", encoding="utf-8").write(
        re.sub(pat, lambda x: x.group(1) + f"{clips:,}" + x.group(3), s, count=1))
    print(f"  wrote {clips:,} to index.html — review and commit.")


if __name__ == "__main__":
    main()
