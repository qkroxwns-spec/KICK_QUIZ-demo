const BASE = 'http://localhost:3001/api/v1'

async function test(endpoint: string, expectedStatus = 200): Promise<void> {
  try {
    const res = await fetch(`${BASE}${endpoint}`)
    const ok = res.status === expectedStatus
    const icon = ok ? '[OK]' : '[FAIL]'
    console.log(`${icon} GET ${endpoint} -> ${res.status}${ok ? '' : ' (expected ' + expectedStatus + ')'}`)
    if (!ok) process.exitCode = 1
  } catch {
    console.log(`[FAIL] GET ${endpoint} -> NETWORK ERROR`)
    process.exitCode = 1
  }
}

async function testTransfer(): Promise<void> {
  try {
    const res = await fetch(`${BASE}/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: 'TEST', amount: 10000, memo: 'test' }),
    })
    const data = await res.json() as { txId?: string }
    const icon = res.status === 200 ? '[OK]' : '[FAIL]'
    console.log(`${icon} POST /transfer -> ${res.status} txId:${data.txId || 'N/A'}`)
    if (res.status !== 200) process.exitCode = 1
  } catch {
    console.log('[FAIL] POST /transfer -> NETWORK ERROR')
    process.exitCode = 1
  }
}

async function run(): Promise<void> {
  const endpoints = [
    '/dashboard', '/accounts', '/accounts/a1',
    '/transactions', '/transactions?type=deposit',
    '/user/profile', '/analysis/spending', '/analysis/trend',
    '/analysis/classify?q=test',
  ]
  for (const ep of endpoints) await test(ep)
  await testTransfer()
  console.log('\nTest complete.')
}

run()
