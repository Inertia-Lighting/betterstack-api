interface ApiObject {
    id: string;
    type: string
}


enum ResponseStatus {
    success = 'success',
    error = 'error'
}

type MonitorType = 'status' | 'expected_status_code' | 'keyword' | 'keyword_absence' | 'ping' | 'tcp' | 'udp' | 'smtp' | 'pop' | 'imap' | 'dns' | 'playwright'

type MonitorStatus = 'up' | 'down' | 'validating' | 'paused' | 'pending' | 'maintenance'

/* -------------------------------------------------------------------------- */

interface MonitorRequestHeader {
    id: string;
    name: string;
    value: string
}

interface MonitorAttributes {
    url: string;
    pronounceable_name: string;
    monitor_type: MonitorType;
    monitor_group_id: string;
    last_checked_at: string;
    status: MonitorStatusm;
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
    request_headers: Array<MonitorRequestHeader>;
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

interface Monitor extends ApiObject {
    attributes: MonitorAttributes;
}

interface GetMonitorResponse {
    data: Monitor;
}

interface GetMonitorsResponse {
    data: Monitor[];
    pagination: {
        first?: string;
        last?: string;
        prev?: string;
        next?: string;
    };
}

interface MonitorRegionResponseTimes {
    at: string;
    response_time: number;
}

interface MonitorResponseRegions {
    region: string;
    response_times: MonitorRegionResponseTimes[];
}

interface MonitorResponseAttributes {
    regions: MonitorResponseRegions[];
}

interface MonitorResponseTime extends ApiObject {
    type: 'monitor_response_type';
    attributes: MonitorResponseAttributes;
}

interface GetMonitorResponseTime {
    data: MonitorResponseTime
}

/* -------------------------------------------------------------------------- */

interface UnsuccessfulResponse {
    status: ResponseStatus.error;
    message: string;
}

interface SuccessfulReturn {
    status: ResponseStatus.success;
}

interface SuccessfulMonitorReturn extends SuccessfulReturn {
    monitor: Monitor
}

interface SuccessfulMonitorsReturn extends SuccessfulReturn {
    monitors: BetterstackMonitor[];
}
