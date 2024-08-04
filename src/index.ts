import axios, { AxiosInstance } from 'axios'

/* -------------------------------------------------------------------------- */

/**
 * BetterstackAPI is a class that interacts with the Betterstack API to manage monitors.
 *
 * @class
 */
export class BetterstackAPI {
    /**
     * The API token used for authentication.
     * @private
     * @type {string}
     */
    private _api_token: string = '';

    /**
     * The Axios instance configured with the base URL and authorization header.
     * @private
     * @type {AxiosInstance}
     */
    private _api_url: AxiosInstance;

    /**
     * Creates an instance of BetterstackAPI.
     *
     * @constructor
     * @param {string} api_token - The API token for accessing the Betterstack API.
     */
    constructor(api_token: string) {
        this._api_token = api_token;
        this._api_url = axios.create({
            baseURL: 'https://uptime.betterstack.com',
            headers: {
                Authorization: `Bearer ${this._api_token}`
            }
        });
    }

    /**
     * Retrieves all monitors from the Betterstack API.
     * @async
     * 
     * @returns {Promise<SuccessfulMonitorsReturn | UnsuccessfulResponse>} A promise that resolves to a successful or unsuccessful response.
     */

    public async getMonitors(): Promise<SuccessfulMonitorsReturn | UnsuccessfulResponse> {
        const request = await this._api_url.get<GetMonitorsResponse>('/api/v2/monitors');

        if (request.status !== 200) {
            return { status: ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;

        return { status: ResponseStatus.success, monitors: data.data };
    }

    /**
     * Retrieves a specific monitor by its ID from the Betterstack API.
     * @async
     * 
     * @param {string} monitor_id - The ID of the monitor to retrieve.
     * @returns {Promise<SuccessfulMonitorReturn | UnsuccessfulResponse>} A promise that resolves to a successful or unsuccessful response.
     */

    public async getMonitor(monitor_id: string): Promise<SuccessfulMonitorReturn | UnsuccessfulResponse> {
        const request = await this._api_url.get<GetMonitorResponse>(`/api/v2/monitors/${monitor_id}`);

        if (request.status === 404) {
            return { status: ResponseStatus.error, message: 'The monitor was not found' };
        }

        if (request.status !== 200) {
            return { status: ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        return { status: ResponseStatus.success, monitor: data.data };
    }

/**
 * @async
 * 
 * @param {string} monitor_id 
 * @param {'eu' | 'us'} region 
 * @returns {Promise<any>}
 */
    
    public async getMonitorResponseTimes(monitor_id: string, region?: 'eu' | 'us') {
        const request = await this._api_url.get<GetMonitorResponseTime>(`/api/v2/monitors/${monitor_id}/response-times`);

        if (request.status !== 200) {
            return { status: ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        let return_data;
        switch (region) {
            case 'us': {
                return_data = data.data.attributes.regions.find((v) => v.region === region);
                if (!return_data) {
                    return { status: ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            case 'eu': {
                return_data = data.data.attributes.regions.find((v) => v.region === region);
                if (!return_data) {
                    return { status: ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            default: {
                return_data = data.data
                break;
            }
        }
        return { status: ResponseStatus.success, monitor: return_data };
    }
}
