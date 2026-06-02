# Deployment checklist (production)

This site is a static HTML/CSS/JS build. For production, use HTTPS, serve the files with a modern static host, and apply baseline security + SEO settings.

## 1) Hosting and HTTPS

- Enable HTTPS and redirect `http://` to `https://`.
- Use HTTP/2 or HTTP/3 where available.
- Enable gzip/brotli compression for HTML/CSS/JS/SVG.
- Ensure `404.html` is configured as the not-found page on your host.

## 2) Security headers

For Netlify / Cloudflare Pages, this repo includes an `/_headers` file with baseline security headers and caching.

If you are using Nginx/Apache/etc, copy the same headers into your server config:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`

## 3) SEO basics

- Verify `robots.txt` and `sitemap.xml` are reachable:
  - `https://lexcyberwall.com/robots.txt`
  - `https://lexcyberwall.com/sitemap.xml`
- Add the domain in Google Search Console and Bing Webmaster Tools, then submit the sitemap.
- Keep page titles and meta descriptions unique per page (already done in this repo).
- Publish genuinely useful content regularly (services, incident briefs, security guides). Ranking cannot be guaranteed purely by technical SEO.

## 4) Email and disclosure

- Make sure `contact@lexcyberwall.com` is monitored for inbound leads.
- Make sure `security@lexcyberwall.com` is monitored for vulnerability reports.
- Keep `/.well-known/security.txt` up to date (the `Expires:` field should be renewed before it lapses).
