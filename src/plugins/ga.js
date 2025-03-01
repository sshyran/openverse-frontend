import stringToBoolean from '~/utils/string-to-boolean'
import GoogleAnalytics from '~/analytics/google-analytics'

/* eslint-disable */
export default ({ app }) => {
  // Exit early if analytics is diasabled
  if (!stringToBoolean(process.env.enableGoogleAnalytics)) {
    return
  }

  /*
   ** Include Google Analytics Script
   */
  ;(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    ;(i[r] =
      i[r] ||
      function () {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )
  /*
   ** Set the current page
   */
  ga('create', process.env.googleAnalyticsUA, 'auto')

  // Initialize helper
  const analytics = GoogleAnalytics()

  /*
   ** Every time the route changes (fired on initialization too)
   */
  app.router.afterEach((to, _) => {
    analytics.sendPageView(to)
  })
}
