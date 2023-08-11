export default defineEventHandler((event) => {
  return proxyRequest(event, `${process.env.BASE_URL}/business/parent/all`)
})
