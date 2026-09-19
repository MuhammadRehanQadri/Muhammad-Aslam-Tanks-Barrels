# Aslam Drums & Barrels — aslamdrums.ae

Static site for Muhammad Aslam Tanks & Barrels Maintenance (Al Sajaa Industrial
Area, Sharjah). Plain HTML/CSS/JS, no build step, no test suite. Live at
https://aslamdrums.ae.

## Always commit, push and deploy

Every change ships in the same turn. Do not leave verified work sitting as an
uncommitted edit or as an unpushed commit on `main`, and do not ask first —
this file is standing authorization to push and deploy.

1. **Verify first.** Preview with `preview_start` → `static-site`
   (http://localhost:4173) and check the change in the browser. Nothing ships
   unverified.
2. **Commit** only the files touched this turn (`git status` first, never
   `git add -A`).
3. **Push:** `git push origin main`.
4. **Confirm the deploy** rather than assuming it. GitHub Pages builds from
   `main` at `/` (legacy build, about a minute): watch the "pages build and
   deployment" run with `gh run watch <id> --exit-status`, then
   `curl -sI https://aslamdrums.ae/<changed-file>` and check that
   `last-modified` is the deploy you just made.
5. **Report** the commit and the live URL.

Before pushing, run `git status -sb`: if `main` is ahead by more than your own
commits, older work is going live too — name those commits to the user.

Unchanged by this: never force-push or rewrite history, and never revert,
restage or sweep in files another session modified.

## Notes

- Assets have no version query and the CDN sends `cache-control: max-age=600`,
  so returning visitors can get the old CSS/JS for up to 10 minutes after a deploy.
- Anything user-facing appears on several pages (7 HTML files, each with its own
  header, footer, meta and share tags). List every place a string lives before
  editing one of them.
