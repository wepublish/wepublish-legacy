import fastify from 'fastify'

const server = fastify({
  logger: {prettyPrint: process.env.NODE_ENV != 'production'}
})

server.listen(3000, (err, address) => {
  if (err) throw err
  server.log.info(`Server listening on ${address}.`)
})
