/**
 * Set up a robots.txt
 *
 * @module @rikvermeulen/middlewares-robots-txt
 * @access public
 * @since 1.0.0
 */

module.exports = (disallowAll = false, extraDisallowRules = []) => {
  console.info(
    `[ROBOTS.TXT] Enabled! Disallow All: ${
      disallowAll ? "Enabled" : "Disabled"
    }, Extra Disallow Rules: ${JSON.stringify(extraDisallowRules)}`
  );
  console.info(`[ROBOTS.TXT] Exposed: /robots.txt`);

  /**
   * Check if disallowAll is correct
   */
  if (typeof disallowAll === "undefined" || typeof disallowAll !== "boolean") {
    console.error("[ROBOTS.TXT] disallowAll is not correct");
  }

  /**
   * Check if extraDisallowRules is correct
   */
  if (
    typeof extraDisallowRules === "undefined" ||
    !Array.isArray(extraDisallowRules)
  ) {
    console.error("[ROBOTS.TXT] extraDisallowRules is not correct");
  }

  return (req, res, next) => {
    console.log(req, res);
    if (req.originalUrl.indexOf("robots.txt") !== -1) {
      const userAgent = "User-agent: *";
      const sitemap = `Sitemap: ${req.protocol}://${req.headers.host}/sitemap.xml`;

      const defaultDisallowRules = [
        ...(disallowAll
          ? ["Disallow: /"]
          : ["Disallow: /api/", "Disallow: /fonts/"]),
      ];

      res.type("text/plain");
      res.send(
        `${userAgent}\n${[...defaultDisallowRules, ...extraDisallowRules].join(
          "\n"
        )}\n${sitemap}`
      );
    } else {
      next();
    }
  };
};
