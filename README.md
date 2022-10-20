# cm_nuxt_wordpress_2022

## Nuxt

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

### Setup

Make sure to install the dependencies:

```bash
npm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Generate static files for production:

```bash
npm run generate
```

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## Wordpress

Add your domain to `./wp-content/themes/custom-redirect/index.php`

### Plugins

- Classic Editor (https://wordpress.org/plugins/classic-editor/)
- Easy Updates Manager (https://wordpress.org/plugins/stops-core-theme-and-plugin-updates/)
- WP REST API Controller (https://wordpress.org/plugins/wp-rest-api-controller/) (go to settings > permalinks and set numeric)
- JWT Authentication for WP-API (https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) Follow the installation instructions (.htaccess and wp-config.php)

### BEST PRACTICES

- Do not use the native `<NuxtLink>` component linking public app pages from the private ones. Private pages are only rendered on client, so they dont include public pages payloads. It would render real data which might not be published already.
