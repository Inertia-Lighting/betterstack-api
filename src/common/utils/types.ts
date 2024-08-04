import { BetterstackMonitor } from "../classes/Monitor"

export function isMonitor(obj: unknown): obj is BetterstackMonitor {
    return obj instanceof BetterstackMonitor
}