export default ({ app }) => {
  app.$auth.onRedirect((to, from) => {
    if (app.router.app.$route.query.token) return from;
    if (to.includes('/')) {
      return `${to}/`;
      // Because otherwise the selected locale prefix (e.g. '/en') is dropped from the target url by `app.localePath()`
    }
    return app.localePath(to);
  });
};
