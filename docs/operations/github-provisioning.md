# GitHub Provisioning

`gh` is optional in Phase 0 local work. When installed and authenticated, set `SUPERNOVA_GITHUB_OWNER` before creating a private `supernova-platform` repository.

Manual commands:

```sh
gh repo create "$SUPERNOVA_GITHUB_OWNER/supernova-platform" --private --source . --remote origin
git push -u origin main
```

Branch protection should require PR review, status checks, signed commits if available, and no force pushes.
