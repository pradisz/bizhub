export default defineEventHandler((event) => {
  return proxyRequest(
    event,
    `${process.env.BASE_URL}/media/param/business/category`,
  )
})
