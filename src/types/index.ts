import type { BetterstackMonitor } from "@/common/classes/Monitor";

export namespace BetterstackAPI {
    export interface ApiObject {
        id: string;
        type: string
    }


    export enum ResponseStatus {
        success = 'success',
        error = 'error'
    }

    export type MonitorType = 'status' | 'expected_status_code' | 'keyword' | 'keyword_absence' | 'ping' | 'tcp' | 'udp' | 'smtp' | 'pop' | 'imap' | 'dns' | 'playwright'

    export type MonitorStatus = 'up' | 'down' | 'validating' | 'paused' | 'pending' | 'maintenance'

    /* -------------------------------------------------------------------------- */

    export interface MonitorRequestHeader {
        id: string;
        name: string;
        value: string
    }

    export interface MonitorAttributes {
        url: string;
        pronounceable_name: string;
        monitor_type: MonitorType;
        monitor_group_id: string;
        last_checked_at: string;
        status: MonitorStatus;
        required_keyword?: string;
        verify_ssl: boolean;
        check_frequency: number;
        call: boolean;
        sms: boolean;
        email: boolean;
        push: boolean;
        team_wait: number;
        http_method: string;
        request_timeout: number;
        recovery_period: number;
        request_headers: MonitorRequestHeader[];
        request_body: string;
        paused_at: string;
        created_at: string;
        updated_at: string;
        ssl_expiration: number;
        domain_expiration: number;
        regions: string[];
        port: string;
        confirmation_period: number;
        expected_status_codes: number[];
        maintenance_days: string[];
        maintenance_from?: string;
        maintenance_to?: string;
        maintenance_timezone?: string;
    }

    export interface Monitor extends ApiObject {
        attributes: MonitorAttributes;
    }

    export interface GetMonitorResponse {
        data: Monitor;
    }

    export interface GetMonitorsResponse {
        data: Monitor[];
        pagination: {
            first?: string;
            last?: string;
            prev?: string;
            next?: string;
        };
    }

    export interface MonitorRegionResponseTimes {
        at: string;
        response_time: number;
    }

    export interface MonitorResponseRegions {
        region: string;
        response_times: MonitorRegionResponseTimes[];
    }

    export interface MonitorResponseAttributes {
        regions: MonitorResponseRegions[];
    }

    export interface MonitorResponseTime extends ApiObject {
        type: 'monitor_response_type';
        attributes: MonitorResponseAttributes;
    }

    export interface GetMonitorResponseTime {
        data: MonitorResponseTime
    }

    /* -------------------------------------------------------------------------- */

    export interface UnsuccessfulResponse {
        status: ResponseStatus.error;
        message: string;
    }

    export interface SuccessfulReturn {
        status: ResponseStatus.success;
    }

    export interface SuccessfulMonitorReturn extends SuccessfulReturn {
        monitor: Monitor
    }

    export interface SuccessfulMonitorsReturn extends SuccessfulReturn {
        monitors: BetterstackMonitor[];
    }

}
