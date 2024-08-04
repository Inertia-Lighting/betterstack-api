## Classes

<dl>
<dt><a href="#BetterstackAPIClient">BetterstackAPIClient</a></dt>
<dd><p>BetterstackAPI is a class that interacts with the Betterstack API to manage monitors.</p>
</dd>
<dt><a href="#BetterstackMonitor">BetterstackMonitor</a></dt>
<dd><p>Monitor of a Betterstack system</p>
</dd>
</dl>

<a name="BetterstackAPIClient"></a>

## BetterstackAPIClient
BetterstackAPI is a class that interacts with the Betterstack API to manage monitors.

**Kind**: global class  

* [BetterstackAPIClient](#BetterstackAPIClient)
    * [new BetterstackAPIClient(api_token)](#new_BetterstackAPIClient_new)
    * [.axios_instance](#BetterstackAPIClient+axios_instance) : <code>AxiosInstance</code>
    * [.getMonitors()](#BetterstackAPIClient+getMonitors) ⇒ <code>Promise.&lt;(SuccessfulMonitorsReturn\|UnsuccessfulResponse)&gt;</code>
    * [.getMonitor(monitor_id)](#BetterstackAPIClient+getMonitor) ⇒ <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code>
    * [.getMonitorResponseTimes(monitor_id, region)](#BetterstackAPIClient+getMonitorResponseTimes) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getLatestMonitorResponseTime(monitor_id, region)](#BetterstackAPIClient+getLatestMonitorResponseTime) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_BetterstackAPIClient_new"></a>

### new BetterstackAPIClient(api_token)
Creates an instance of BetterstackAPI.


| Param | Type | Description |
| --- | --- | --- |
| api_token | <code>string</code> | The API token for accessing the Betterstack API. |

<a name="BetterstackAPIClient+axios_instance"></a>

### betterstackAPIClient.axios\_instance : <code>AxiosInstance</code>
Get the axios instance

**Kind**: instance property of [<code>BetterstackAPIClient</code>](#BetterstackAPIClient)  
<a name="BetterstackAPIClient+getMonitors"></a>

### betterstackAPIClient.getMonitors() ⇒ <code>Promise.&lt;(SuccessfulMonitorsReturn\|UnsuccessfulResponse)&gt;</code>
Retrieves all monitors from the Betterstack API.

**Kind**: instance method of [<code>BetterstackAPIClient</code>](#BetterstackAPIClient)  
**Returns**: <code>Promise.&lt;(SuccessfulMonitorsReturn\|UnsuccessfulResponse)&gt;</code> - A promise that resolves to a successful or unsuccessful response.  
<a name="BetterstackAPIClient+getMonitor"></a>

### betterstackAPIClient.getMonitor(monitor_id) ⇒ <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code>
Retrieves a specific monitor by its ID from the Betterstack API.

**Kind**: instance method of [<code>BetterstackAPIClient</code>](#BetterstackAPIClient)  
**Returns**: <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code> - A promise that resolves to a successful or unsuccessful response.  

| Param | Type | Description |
| --- | --- | --- |
| monitor_id | <code>string</code> | The ID of the monitor to retrieve. |

<a name="BetterstackAPIClient+getMonitorResponseTimes"></a>

### betterstackAPIClient.getMonitorResponseTimes(monitor_id, region) ⇒ <code>Promise.&lt;any&gt;</code>
Gets the response times of a monitor from different or all regions

**Kind**: instance method of [<code>BetterstackAPIClient</code>](#BetterstackAPIClient)  

| Param | Type | Description |
| --- | --- | --- |
| monitor_id | <code>string</code> | Id of the monitor |
| region | <code>&#x27;eu&#x27;</code> \| <code>&#x27;us&#x27;</code> | Defaults to sending all regions |

<a name="BetterstackAPIClient+getLatestMonitorResponseTime"></a>

### betterstackAPIClient.getLatestMonitorResponseTime(monitor_id, region) ⇒ <code>Promise.&lt;any&gt;</code>
Gets the latest response time of a monitor from a region

**Kind**: instance method of [<code>BetterstackAPIClient</code>](#BetterstackAPIClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| monitor_id | <code>string</code> \| [<code>BetterstackMonitor</code>](#BetterstackMonitor) |  | Id of the monitor |
| region | <code>&#x27;eu&#x27;</code> \| <code>&#x27;us&#x27;</code> | <code>us</code> | Defaults to "us" |

<a name="BetterstackMonitor"></a>

## BetterstackMonitor
Monitor of a Betterstack system

**Kind**: global class  

* [BetterstackMonitor](#BetterstackMonitor)
    * [new BetterstackMonitor(monitor_id, api_client)](#new_BetterstackMonitor_new)
    * [.api](#BetterstackMonitor+api) : [<code>BetterstackAPIClient</code>](#BetterstackAPIClient)
    * [.id](#BetterstackMonitor+id) : <code>string</code>
    * [.data](#BetterstackMonitor+data) : <code>Monitor</code> \| <code>undefined</code>
    * [.fetchData()](#BetterstackMonitor+fetchData) ⇒ <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code>

<a name="new_BetterstackMonitor_new"></a>

### new BetterstackMonitor(monitor_id, api_client)
Set monitor id and the original api client


| Param | Type |
| --- | --- |
| monitor_id | <code>string</code> | 
| api_client | [<code>BetterstackAPIClient</code>](#BetterstackAPIClient) | 

<a name="BetterstackMonitor+api"></a>

### betterstackMonitor.api : [<code>BetterstackAPIClient</code>](#BetterstackAPIClient)
Get the original Betterstack API Client

**Kind**: instance property of [<code>BetterstackMonitor</code>](#BetterstackMonitor)  
<a name="BetterstackMonitor+id"></a>

### betterstackMonitor.id : <code>string</code>
Get the ID of the monitor

**Kind**: instance property of [<code>BetterstackMonitor</code>](#BetterstackMonitor)  
<a name="BetterstackMonitor+data"></a>

### betterstackMonitor.data : <code>Monitor</code> \| <code>undefined</code>
Get the cached data of the monitor

**Kind**: instance property of [<code>BetterstackMonitor</code>](#BetterstackMonitor)  
<a name="BetterstackMonitor+fetchData"></a>

### betterstackMonitor.fetchData() ⇒ <code>Promise.&lt;(SuccessfulMonitorReturn\|UnsuccessfulResponse)&gt;</code>
Fetch the data from the monitor

**Kind**: instance method of [<code>BetterstackMonitor</code>](#BetterstackMonitor)  
