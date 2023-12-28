/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    /^react-icons/,
    /^dayjs/,
    /^@mui\/*/,
    /^@dotenv\/*/,
    /^@emotion\/react/,
    /^@emotion\/styled/,
    /^@prisma\/client\/runtime\/library/,
  ],
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
      os: true,
      crypto: true,
    },
  },
};
