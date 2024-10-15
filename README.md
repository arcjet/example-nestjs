<a href="https://arcjet.com" target="_arcjet-home">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://arcjet.com/logo/arcjet-dark-lockup-voyage-horizontal.svg">
    <img src="https://arcjet.com/logo/arcjet-light-lockup-voyage-horizontal.svg" alt="Arcjet Logo" height="128" width="auto">
  </picture>
</a>

# Arcjet NestJS example app

[Arcjet](https://arcjet.com) helps developers protect their apps in just a few
lines of code. Bot detection. Rate limiting. Email validation. Attack
protection. Data redaction. A developer-first approach to security.

This is an example NestJS application demonstrating the use of multiple
features.

## Features

- Bot protection shows how a page can be protected from automated clients.
- Rate limiting shows the use of different rate limit configurations depending
  on the authenticated user. A logged-in user can make more requests than an
  anonymous user.
- Signup form protection uses Arcjet's server-side email verification configured
  to block disposable providers and ensure that the domain has a valid MX
  record. It also includes rate limiting and bot protection to prevent automated
  abuse.
- Sensitive info protects against clients sending you sensitive information such
  as PII that you do not wish to handle.
- Attack protection demonstrates Arcjet Shield, which detects suspicious
  behavior such as SQL injection and cross-site scripting attacks.

## Deploy it now

[![Deploy with Vercel][vercel_button]][vercel_deploy]
&nbsp; &nbsp;
[![Deploy to Netlify][netlify_button]][netlify_deploy]

## Run locally

1. [Register for a free Arcjet account](https://app.arcjet.com).

2. Install dependencies:

```bash
npm ci
```

1. Rename `.env.local.example` to `.env.local` and add your Arcjet key.

2. Start the dev server

```bash
npm run start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Try it out

NestJS is a server-side framework, so you won't see much in the browser. Here
are some API routes to try:

### Bot protection

The `/bots` route uses a guard to protect the controller. All automated clients
will receive a 403 response. `curl` is considered an automated client by
default, so you can test it with:

```bash
curl -v http://localhost:3000/bots
```

The `/bots-advanced` route returns a more customized response:

```bash
curl -v http://localhost:3000/bots-advanced
```

### Rate limiting

The `/rate-limit` route uses a fixed window rate limit. Send 3 requests in quick
succession to see the rate limit in action:

```bash
curl -v http://localhost:3000/rate-limiting
```

The `/rate-limit-advanced` route uses a token bucket rate limit with a
customized response. Send 3 requests in quick succession to see it working:

```bash
curl -v http://localhost:3000/rate-limiting-advanced
```

### Sensitive info

The `/sensitive-info` route uses a guard to protect the controller. It will
block requests containing credit card numbers:

```bash
curl -v http://localhost:3000/sensitive-info \
  -H "Content-Type: text/plain" \
  -X POST \
  --data "Hello my credit card is 4111111111111111"
```

The `/sensitive-info-advanced` route returns a more customized response:

```bash
curl -v http://localhost:3000/sensitive-info-advanced \
  -H "Content-Type: text/plain" \
  -X POST \
  --data "Hello my credit card is 4111111111111111"
```

### Attack protection

The `/attack` route uses Arcjet Shield to detect and block attacks, such as SQL
injection and cross-site scripting. To simulate an attack, send a request with
the special header:

```bash
curl -v http://localhost:3000/attack \
  -H "x-arcjet-suspicious: true"
```

After the 5th request, your IP will be blocked for 15 minutes. Suspicious
requests must meet a threshold before they are blocked to avoid false positives.

Shield is configured as a default rule in the `app.module.ts` file because you
typically want to apply it to every route.

## Need help?

Check out [the docs](https://docs.arcjet.com/), [contact
support](https://docs.arcjet.com/support), or [join our Discord
server](https://arcjet.com/discord).

## Stack

- Auth: [Auth.js](https://authjs.dev/)
- App: [NestJS](https://nestjs.com/)
- UI: [shadcn/ui](https://ui.shadcn.com/)
- Form handling: [React Hook Form](https://react-hook-form.com/) (see also [our
  full form protection
  example](https://github.com/arcjet/arcjet-js/tree/main/examples/nextjs-14-react-hook-form))
- Client-side validation: [Zod](https://zod.dev/)
- Security: [Arcjet](https://arcjet.com/)

[vercel_deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farcjet%2Fexample-nestjs&project-name=arcjet-example&repository-name=arcjet-example&developer-id=oac_1GEcKBuKBilVnjToj1QUwdb8&demo-title=Arcjet%20Example%20&demo-description=Example%20rate%20limiting%2C%20bot%20protection%2C%20email%20verification%20%26%20form%20protection.&demo-url=https%3A%2F%2Fgithub.com%2Farcjet%2Fexample-nestjs&demo-image=https%3A%2F%2Fapp.arcjet.com%2Fimg%2Fexample-apps%2Fvercel%2Fdemo-image.jpg&integration-ids=oac_1GEcKBuKBilVnjToj1QUwdb8&external-id=example-nestjs
[vercel_button]: https://vercel.com/button
[netlify_deploy]: https://app.netlify.com/start/deploy?repository=https://github.com/arcjet/example-nestjs
[netlify_button]: https://www.netlify.com/img/deploy/button.svg
