import axios, { AxiosInstance } from 'axios'
import { BetterstackMonitor } from './Monitor';
import { isMonitor } from '../utils/types';

/* -------------------------------------------------------------------------- */

/**
 * BetterstackAPI is a class that interacts with the Betterstack API to manage monitors.
 *
 * @class
 */
export class BetterstackAPIClient {
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
        const returnData: BetterstackMonitor[] = [];
        data.data.forEach((v, _i) => {
            const monitor = new BetterstackMonitor(v.id, this)
            returnData.push(monitor)
        })
        return { status: ResponseStatus.success, monitors: returnData };
    }

    /**
     * Retrieves a specific monitor by its ID from the Betterstack API.
     * @async
     * 
     * @param {string} monitor_id - The ID of the monitor to retrieve.
     * @returns {Promise<SuccessfulMonitorReturn | UnsuccessfulResponse>} A promise that resolves to a successful or unsuccessful response.
     */

    public async getMonitor(monitor_id: string): Promise<BetterstackMonitor | UnsuccessfulResponse> {
        if (isMonitor(monitor_id)) {
            monitor_id = monitor_id.id
        }
        const monitor = new BetterstackMonitor(monitor_id, this)
        return monitor
    }

    /**
     * Gets the response times of a monitor from different or all regions
     * 
     * @async
     * 
     * @param {string} monitor_id
     * Id of the monitor
     * @param {'eu' | 'us'} region 
     * Defaults to sending all regions
     * @returns {Promise<any>}
     */

    public async getMonitorResponseTimes(monitor_id: string, region?: 'eu' | 'us') {
        if (isMonitor(monitor_id)) {
            monitor_id = monitor_id.id
        }
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
    /**
     * 
 * Gets the latest response time of a monitor from a region
 * @async
 * 
 * @param {string | BetterstackMonitor} monitor_id 
 * Id of the monitor
 * @param {'eu' | 'us'} region
 * Defaults to "us" 
 * @returns {Promise<any>}
 */

    public async getLatestMonitorResponseTime(monitor_id: string | BetterstackMonitor, region: 'eu' | 'us' = 'us') {
        if (isMonitor(monitor_id)) {
            monitor_id = monitor_id.id
        }
        const request = await this._api_url.get<GetMonitorResponseTime>(`/api/v2/monitors/${monitor_id}/response-times`);

        if (request.status !== 200) {
            return { status: ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        let return_data;
        switch (region) {
            case 'us': {
                return_data = data.data.attributes.regions.find((v) => v.region === region)?.response_times.at(-1)
                if (!return_data) {
                    return { status: ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            case 'eu': {
                return_data = data.data.attributes.regions.find((v) => v.region === region)?.response_times.at(-1)
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
     * Get the axios instance
     * 
     * @type {AxiosInstance}
     */
    get axios_instance(): AxiosInstance {
        return this._api_url
    }
}
