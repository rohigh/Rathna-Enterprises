# Rathna Blog CMS

The Rathna website uses Sanity for blog content. Editors work in a separate, secure browser-based studio and never need to edit code or use GitHub.

Editor URL: https://rathna-enterprises-cms.sanity.studio/

## Editor workflow

1. Open the Rathna Content Studio URL.
2. Sign in with the invited email address.
3. Choose **Blog post** and click **Create**.
4. Add the title, click **Generate** beside Page URL, and complete the summary, category, cover image and article.
5. Use **Preview** to review the entry, then click **Publish**.

Published posts automatically appear in the **Latest from Rathna** section of the website. Drafts stay private.

## Local development

The main website reads these variables:

```text
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

The Studio uses matching `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` values. Keep local values in `.env.local`; never commit account tokens.
