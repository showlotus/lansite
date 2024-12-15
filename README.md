# Lansite

<!-- 适用于在局域网下，机器 A 由于防火墙限制无法访问某些页面，而机器 B 可以访问。通过在机器 B 本地开启一个 lansite 服务，机器 A 通过该服务输入要访问的页面 U，由 lansite 借助 Puppeteer 在机器 B 上加载完页面后，将页面 U 的 HTML 在 lansite 上渲染出来，然后机器 A 就能在 lansite 上看到页面 U。 -->

This mode applies to the LAN where machine A cannot access certain pages due to firewall restrictions, but machine B can access certain pages. By enabling a local lansite service on machine B, machine A enters the page U to be accessed through this service. After loading the page on machine B with Puppeteer, lansite will render the HTML of page U on lansite. Machine A will then see page U on lansite.

## Development

Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview
```

## Deploy

In the current project directory:

```bash
node .output/server/index.mjs
```

Custom port:

```bash
PORT=3872 node .output/server/index.mjs
```
