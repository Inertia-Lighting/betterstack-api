import axios, { AxiosInstance } from 'axios'
import { BetterstackMonitor } from './Monitor.js';
import { BetterstackAPI } from "@/types/index.js";

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

    private resolveMonitorId(monitor_id: string | BetterstackMonitor): string {
        return monitor_id instanceof BetterstackMonitor ? monitor_id.id : monitor_id;
    }

    /**
     * Retrieves all monitors from the Betterstack API.
     * @async
     * 
     * @returns {Promise<BetterstackAPI.SuccessfulMonitorsReturn | BetterstackAPI.UnsuccessfulResponse>} A promise that resolves to a successful or unsuccessful response.
     */

    public async getMonitors(): Promise<BetterstackAPI.SuccessfulMonitorsReturn | BetterstackAPI.UnsuccessfulResponse> {
        const request = await this._api_url.get<BetterstackAPI.GetMonitorsResponse>('/api/v2/monitors');

        if (request.status !== 200) {
            return { status: BetterstackAPI.ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        const returnData: BetterstackMonitor[] = [];
        data.data.forEach((v, _i) => {
            const monitor = new BetterstackMonitor(v.id, this)
            returnData.push(monitor)
        })
        return { status: BetterstackAPI.ResponseStatus.success, monitors: returnData };
    }

    /**
     * Retrieves a specific monitor by its ID from the Betterstack API.
     * @async
     * 
    * @param {string | BetterstackMonitor} monitor_id - The ID of the monitor to retrieve.
     * @returns {Promise<SuccessfulMonitorReturn | BetterstackAPI.UnsuccessfulResponse>} A promise that resolves to a successful or unsuccessful response.
     */

    public async getMonitor(monitor_id: string | BetterstackMonitor): Promise<BetterstackMonitor | BetterstackAPI.UnsuccessfulResponse> {
        const checked_monitor_id = this.resolveMonitorId(monitor_id)
        const monitor = new BetterstackMonitor(checked_monitor_id, this)
        return monitor
    }

    /**
     * Gets the response times of a monitor from different or all regions
     * 
     * @async
     * 
     * @param {string | BetterstackMonitor} monitor_id
     * Id of the monitor
     * @param {'eu' | 'us'} region 
     * Defaults to sending all regions
     * @returns {Promise<{ status: BetterstackAPI.ResponseStatus; message: string; monitor?: undefined; }>}
     */



    public async GetMonitorResponseTimes(monitor_id: string | BetterstackMonitor, region?: 'eu' | 'us'): Promise<{ status: BetterstackAPI.ResponseStatus; message?: string; monitor?: BetterstackAPI.MonitorResponseTime | BetterstackAPI.MonitorResponseRegions; }> {
        const checked_monitor_id = this.resolveMonitorId(monitor_id)
        const request = await this._api_url.get<BetterstackAPI.GetMonitorResponseTime>(`/api/v2/monitors/${checked_monitor_id}/response-times`);

        if (request.status !== 200) {
            return { status: BetterstackAPI.ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        let return_data;
        switch (region) {
            case 'us': {
                return_data = data.data.attributes.regions.find((v) => v.region === region);
                if (!return_data) {
                    return { status: BetterstackAPI.ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            case 'eu': {
                return_data = data.data.attributes.regions.find((v) => v.region === region);
                if (!return_data) {
                    return { status: BetterstackAPI.ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            default: {
                return_data = data.data
                break;
            }
        }
         return { status: BetterstackAPI.ResponseStatus.success, monitor: return_data };
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
 * @returns {Promise<{ status: BetterstackAPI.ResponseStatus; monitor: BetterstackAPI.MonitorRegionResponseTimes | undefined; message?: undefined; }>}
 */

    public async getLatestMonitorResponseTime(monitor_id: string | BetterstackMonitor, region: 'eu' | 'us' = 'us'): Promise<{ status: BetterstackAPI.ResponseStatus; monitor?: BetterstackAPI.MonitorRegionResponseTimes | undefined; message?: string; }> {
        const checked_monitor_id = this.resolveMonitorId(monitor_id)
        const request = await this._api_url.get<BetterstackAPI.GetMonitorResponseTime>(`/api/v2/monitors/${checked_monitor_id}/response-times`);

        if (request.status !== 200) {
            return { status: BetterstackAPI.ResponseStatus.error, message: 'There was an error making the request' };
        }

        const data = request.data;
        let return_data;
        switch (region) {
            case 'us': {
                return_data = data.data.attributes.regions.find((v) => v.region === region)?.response_times.at(-1)
                if (!return_data) {
                    return { status: BetterstackAPI.ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            case 'eu': {
                return_data = data.data.attributes.regions.find((v) => v.region === region)?.response_times.at(-1)
                if (!return_data) {
                    return { status: BetterstackAPI.ResponseStatus.error, message: `There was an error getting the ${region} region` };
                }
                break;
            }
            default: {
                break;
            }
        }
        return { status: BetterstackAPI.ResponseStatus.success, monitor: return_data };
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
