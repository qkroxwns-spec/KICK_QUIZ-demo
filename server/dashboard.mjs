import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 8787
const MIME = {
  '.html': 'text/html;charset=utf-8',
  '.css': 'text/css;charset=utf-8',
  '.js': 'application/javascript;charset=utf-8',
  '.json': 'application/json;charset=utf-8',
  '.svg': 'image/svg+xml',
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)

  // API: state.json
  if (url.pathname === '/api/state') {
    if (req.method === 'PUT') {
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', () => {
        fs.writeFileSync(path.resolve('ops/state.json'), body, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
        res.end(JSON.stringify({ ok: true }))
      })
      return
    }
    const state = fs.readFileSync(path.resolve('ops/state.json'), 'utf-8')
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8', 'Access-Control-Allow-Origin': '*' })
    res.end(state)
    return
  }

  // Serve dashboard HTML
  let filePath = url.pathname === '/' ? '/dashboard.html' : url.pathname
  if (filePath.endsWith('/')) filePath += 'index.html'
  filePath = path.resolve('.' + filePath)

  try {
    const ext = path.extname(filePath)
    const content = fs.readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(content)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' })
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Pipeline Dashboard: http://localhost:${PORT}`)
})
