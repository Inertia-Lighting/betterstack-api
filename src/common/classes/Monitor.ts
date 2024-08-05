import { BetterstackAPIClient } from "./BetterstackAPIClient";

/**
 * Monitor of a Betterstack system
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
        this._monitor_id = monitor_id;
        this._api_client = api_client;
    }

    /**
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
        this._monitor_data = data.data;
        return { status: ResponseStatus.success, monitor: data.data };
    }

    /**
     * Gets the response times of a monitor from different or all regions
     * 
     * @async
     * 
     * @param {'eu' | 'us'} region 
     * Defaults to 'us'
     * @returns {Promise<any>}
     */
    public async getLatestResponseTime(region: 'eu' | 'us' = 'us'): Promise<any> {
        const request = await this._api_client.axios_instance.get<GetMonitorResponseTime>(`/api/v2/monitors/${this._monitor_id}/response-times`);

        if (request.status !== 200) {
            return { status: ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        let return_data;
        switch (region) {
            case 'us': {
                return_data = data.data.attributes.regions.find(v => v.region === region)?.response_times.at(-1);
                if (!return_data) {
                    return { status: ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            case 'eu': {
                return_data = data.data.attributes.regions.find(v => v.region === region)?.response_times.at(-1);
                if (!return_data) {
                    return { status: ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            default: {
                break;
            }
        }
        return { status: ResponseStatus.success, monitor: return_data };
    }

    /**
     * Gets the latest response time of a monitor from a region
     * 
     * @async
     * 
     * @param {'eu' | 'us'} [region]
     * Defaults to "us"
     * @returns {Promise<any>}
     */
    public async getAllResponseTimes(region?: 'eu' | 'us'): Promise<any> {
        const request = await this._api_client.axios_instance.get<GetMonitorResponseTime>(`/api/v2/monitors/${this._monitor_id}/response-times`);

        if (request.status !== 200) {
            return { status: ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        let return_data;
        switch (region) {
            case 'us': {
                return_data = data.data.attributes.regions.find(v => v.region === region);
                if (!return_data) {
                    return { status: ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            case 'eu': {
                return_data = data.data.attributes.regions.find(v => v.region === region);
                if (!return_data) {
                    return { status: ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            default: {
                return_data = data.data;
                break;
            }
        }
        return { status: ResponseStatus.success, monitor: return_data };
    }

    /**
     * Get the original Betterstack API Client
     * 
     * @type {BetterstackAPIClient}
     */
    get api(): BetterstackAPIClient {
        return this._api_client;
    }

    /**
     * Get the ID of the monitor
     * 
     * @type {string}
     */
    get id(): string {
        return this._monitor_id;
    }

    /**
     * Get the cached data of the monitor
     * 
     * @type {Monitor | undefined}
     */
    get data(): Monitor | undefined {
        return this._monitor_data;
    }
}
