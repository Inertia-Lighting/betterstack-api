<a name="BetterstackAPI"></a>

## BetterstackAPI
BetterstackAPI is a class that interacts with the Betterstack API to manage monitors.

**Kind**: global class  

* [BetterstackAPI](#BetterstackAPI)
    * [new BetterstackAPI(api_token)](#new_BetterstackAPI_new)
    * [.getMonitors()](#BetterstackAPI+getMonitors) ⇒ <code>Promise.&lt;(SuccessfulMonitorsReturn\|UnsuccessfulResponse)&gt;</code>
    * [.getMonitor(monitor_id)](#BetterstackAPI+getMonitor) ⇒ <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code>
    * [.getMonitorResponseTimes(monitor_id, region)](#BetterstackAPI+getMonitorResponseTimes) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getLatestMonitorResponseTime(monitor_id, region)](#BetterstackAPI+getLatestMonitorResponseTime) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_BetterstackAPI_new"></a>

### new BetterstackAPI(api_token)
Creates an instance of BetterstackAPI.


| Param | Type | Description |
| --- | --- | --- |
| api_token | <code>string</code> | The API token for accessing the Betterstack API. |

<a name="BetterstackAPI+getMonitors"></a>

### betterstackAPI.getMonitors() ⇒ <code>Promise.&lt;(SuccessfulMonitorsReturn\|UnsuccessfulResponse)&gt;</code>
Retrieves all monitors from the Betterstack API.

**Kind**: instance method of [<code>BetterstackAPI</code>](#BetterstackAPI)  
**Returns**: <code>Promise.&lt;(SuccessfulMonitorsReturn\|UnsuccessfulResponse)&gt;</code> - A promise that resolves to a successful or unsuccessful response.  
<a name="BetterstackAPI+getMonitor"></a>

### betterstackAPI.getMonitor(monitor_id) ⇒ <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code>
Retrieves a specific monitor by its ID from the Betterstack API.

**Kind**: instance method of [<code>BetterstackAPI</code>](#BetterstackAPI)  
**Returns**: <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code> - A promise that resolves to a successful or unsuccessful response.  

| Param | Type | Description |
| --- | --- | --- |
| monitor_id | <code>string</code> | The ID of the monitor to retrieve. |

<a name="BetterstackAPI+getMonitorResponseTimes"></a>

### betterstackAPI.getMonitorResponseTimes(monitor_id, region) ⇒ <code>Promise.&lt;any&gt;</code>
Gets the response times of a monitor from different or all regions

**Kind**: instance method of [<code>BetterstackAPI</code>](#BetterstackAPI)  

| Param | Type | Description |
| --- | --- | --- |
| monitor_id | <code>string</code> | Id of the monitor |
| region | <code>&#x27;eu&#x27;</code> \| <code>&#x27;us&#x27;</code> | Defaults to sending all regions |

<a name="BetterstackAPI+getLatestMonitorResponseTime"></a>

### betterstackAPI.getLatestMonitorResponseTime(monitor_id, region) ⇒ <code>Promise.&lt;any&gt;</code>
Gets the latest response time of a monitor from a region

**Kind**: instance method of [<code>BetterstackAPI</code>](#BetterstackAPI)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| monitor_id | <code>string</code> |  | Id of the monitor |
| region | <code>&#x27;eu&#x27;</code> \| <code>&#x27;us&#x27;</code> | <code>us</code> | Defaults to "us" |

