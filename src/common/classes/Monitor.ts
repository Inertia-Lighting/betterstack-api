import { BetterstackAPIClient } from "./BetterstackAPIClient";

/**
 * Monitor of a Betterstack system
 * 
 * 
 * @class
 */
export class BetterstackMonitor {
    /**
     * @private
     * @type {string}
     */
    private _monitor_id: string;
    /**
     * @private
     * @type {BetterstackAPIClient}
     */
    private _api_client: BetterstackAPIClient;
    /**
     * @private
     * @type {Monitor | undefined}
     */
    private _monitor_data: Monitor | undefined;


    /**
     * Set monitor id and the original api client
     * 
     * @constructor
     * 
     * @param {string} monitor_id
     * @param {BetterstackAPIClient} api_client 
     */
    constructor(monitor_id: string, api_client: BetterstackAPIClient) {
        this._monitor_id = monitor_id
        this._api_client = api_client
    }

    /**
     * 
     * Fetch the data from the monitor
     * 
     * @returns {Promise<SuccessfulMonitorReturn | UnsuccessfulResponse>}
     */
    public async fetchData(): Promise<SuccessfulMonitorReturn | UnsuccessfulResponse> {
        const request = await this._api_client.axios_instance.get<GetMonitorResponse>(`/api/v2/monitors/${this._monitor_id}`);
        
        if (request.status === 404) {
            return { status: ResponseStatus.error, message: 'The monitor was not found' };
        }

        if (request.status !== 200) {
            return { status: ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        this._monitor_data = data.data
        return { status: ResponseStatus.success, monitor: data.data };
    }

    /**
     * Get the original Betterstack API Client
     * 
     * @type {BetterstackAPIClient}
     */

    get api(): BetterstackAPIClient {
        return this._api_client
    }
    
    /**
     * Get the ID of the monitor
     * 
     * @type {string}
     */
    get id(): string {
        return this._monitor_id
    }
    /**
     * Get the cached data of the monitor
     * 
     * @type {Monitor | undefined}
     */
    get data(): Monitor | undefined {
        return this._monitor_data
    }

}