import { app } from './app.js'

if (!process.env.VERCEL) {
  app.listen(process.env.PORT ?? 3000)
}

export default app
