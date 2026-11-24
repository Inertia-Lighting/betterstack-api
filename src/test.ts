import { BetterstackAPIClient, BetterstackMonitor } from '@/../dist/index.cjs'

const client = new BetterstackAPIClient('1YubjX9qXGaKgxUbHiLnZPJi');

(async () => {
    const result = await client.getMonitor('2389524')
    if (result instanceof BetterstackMonitor) {
        const db: BetterstackMonitor = result
        console.log(await db.fetchData())
    } else {
        console.error('Failed to fetch monitor:', result)
    }
})()