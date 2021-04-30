 # Exploring HTTP
 
## Table of Contents
[Overview](#overview)<br>
[Methods and Status Codes](#methods-and-status-codes)<br>
[200 Level Status Codes](#200-level-status-codes)<br>
[200 OK](#200-ok)<br>
[204 No Content](#204-no-content)<br>
[300 Level Status Codes](#300-level-status-codes)<br>
[400 Level Status Codes](#400-level-status-codes)<br>
[500 Level Status Codes](#500-level-status-codes)<br>
[Putting Status Codes to Use](#putting-status-codes-to-use)<br>
[HTTP Methods](#http-methods)<br>
[GET](#get)<br>
[POST](#post)<br>
[HEAD](#head)<br>
[PUT](#put)<br>
[Challenges](#challenges)<br>
[References](#references)<br>
 
 
## Overview
This tutorial provides a basic overview of HTTP and REST function protocols. Chances are if you have been in software development or computer classes for a time, both of these acronyms have been discussed in your class. Although they get used in the same context, HTTP and REST are two different concepts.
 
HTTP defines the protocol methods and REST defines how to use the protocol methods through design principles. To put into perspective, when a web browser makes a request to a server, it's communicating using HTTP protocol. The server communicates back to the client is defined by how the developer designed the REST interface.
 
The functionality protocol which includes HTTP is usually the GET and POST methods. GET is the most common that users handle, such as requesting to view a website when they type the URL in the address bar. Calling the HTTP POST method is when a user is changing data on a form or "creating" new resources. The most typical form of a post method would be when a user is changing their password.
 
REST, short for REpresentational State Transfer, is more of an architectural style for building out systems to make more efficient API calls. When using REST constraints, the principles are designed to have the client request documents from the server, the server should be stateless, and emphasis on caching the response.
 
 
As always, the knowledge you learn from this section can be implemented when you are designing your software. Echoing back the correct status code for the user can keep them informed when an unresponsive page cannot load.
 
 
## Methods and Status Codes
 
The HTTP protocol is a vast, comprehensive list due to the nature of the Internet. For the most part, modern implementations of REST are limited to a subset of methods and status codes. Some of these codes listed below you may have encountered before (404 Not Found). This article explores how to use these methods and status codes to design what is called a `REST API`.
 
## 200 Level Status Codes
 
200 level status codes represent successful responses on an http request. This is what a user will usually see but may not understand. Each time you do a search, general or specific, you’re technically making a request to have such website information being brought to you. Depending on your search, you usually will get a successful HTTP response.
 
For example, you may ask for www.mlbtraderumors.com when you hit enter in the search bar. The HTTP request will then take the information request. The request for the information will come back as an http response. Depending on what was typed in, if the page exists, and a couple of other factors will determine the success.
 
### 200 OK
 
The `200 OK` means the request to the website has been accepted. The request gets processed and delivers you the information on the page, depending on the link address. The most common for users is a GET request (you ask for the website, you are then taken to the website).
 
When you enter `http://google.com` into your browser's address bar and hit Return, the browser makes a request for a resource at that address. The server replies with an <b>HTTP Status</b> and <b>Content<b> if available. An example status is `200 OK`. `200 OK` tells the browser the request was successfully handled.
 
200 also involves specific requests that have various payloads. These include the following.
 
- GET
- HEAD
- POST
- PUT
- DELETE
- OPTIONS
 
We will get more into this at the bottom of the tutorial.
 
 
## 204 No content
 
Another example: ```204 No Content```, tells the browser the server successfully processed the request but there is no content to return.
 
An easy way you can think of a 204 No Content situation is when working on a file online. When you click save, the document saves where its current status is. However the user does not get any other information back from the server.
 
## 300 Status Codes
 
The 300 level status codes refer to redirection loops when making a request. There's a couple of names for it. The most common names for redirection are URL redirection and URL forwarding. The redirect is to help keep anyone wanting access to a website without taking everything down. This can result in either temporary redirects or permanent redirects.
 
`301 Moved Permanently` means the URL has been moved to a new permanent link. Chances are, if you are on the screen, it will have the new link listed. Clicking on it should take you to the new site.
 
`307 Temporary Redirect` literally means that this URL is temporarily unavailable at the time. This could mean the website is down for maintenance or is undergoing some troubleshooting. There may be a temporary link that can take them to the previous version of the website or may just redirect time.
 
`308 Permanent Redirect` means that URL has also been redirected to a new URL. Any more requests should have to go to this new redirect.
 
Now 301 and 308 seem to have similar responses. So what's the difference? 301 allows the request method to go from POST (sending data or updating data)to GET (request information from a resource). 308 Does not allow the method to change from POST to GET.
 
 
## 400 Level Status Codes
 
The `400` class of status code is used to communicate errors caused by the browser. There are quite a few 400 status codes that exist, but we will cover the most common ones you will see. There's probably a good chance you've encountered them before reading on this document.
 
`400 Bad Request` tells the browser that the server is unable to process the request due to some error on the browser. This could be syntax errors, invalid file sizes, or malicious routing of requests.
 
`401 Unauthorized` means the server is asking for credentials to continue. This is common when trying to access content locked behind a login needing authentication. Client's can repeat this request as long as they have an acceptable authorization header field.
 
`403 Forbidden` is a response when the client does not have access to the content being requested. The client's identity is known to the server, but the server is refusing to give access. A situation like this could be if you have a user who has a known login to an account, but can only access so much in a field.
 
Pretend that you have a low-level guest account for an employee called Amanda and a high-level admin account for another employee called Belle who work in a financial institution. Amanda and Belle both have login access into their accounts and can see the same links for various resources . However, Amanda, if Amanda makes a request to see information regarding sensitive account information, she may have to enter her account information again. Even if she succeeds, the server would refuse access for her. In contrast, Belle is known on the server, but can see the information due to her privileges.
 
`404 Not Found` is probably the most common status code you have encountered. Depending on certain links you click, the content there or page either doesn't exist or never did.  In various cases, 404 errors have been used for 403 error statuses if the 403 error doesn't want to describe the error. The server would simply pretend that information doesn't exist for the current account.
 
`408 Request Timeout` refers to an idle connection to a server. Sort of similar like when you leave your client on, but leave the home screen idle. After a short amount of time, you may have to provide your credentials or authentication status.
 
Many times, this is the status code you get when you are logged into a financial institution. Some banks have tight windows on how long you can be logged in while inactive.
 
`409 Conflict` comes into play when the HTTP request is valid but the server doesn't go through with the execution. When these cases occur, it can range from version conflicts and uploading resources to a directory that doesn't exist. It can also occur when removing a resource at the root but it still contains data (like deleting a folder full of pictures).
 
409 errors usually require a specific message that comes across due to the vague nature of just saying `409 Conflict`. Just as explained in the paragraph above, this can also lead to suggestions for how to solve the error if it occured from a user error.
 
`429 Too many requests` means the user has put in too many requests within a limited amount of time. This is also called rate limiting.
 
The best example is when you are logging into a private account of yours. Let's say you type in an incorrect password 4 times in a row. Because of the invalidation, the account may be locked out and not tried by your public IP address for about 15 minutes.
 
Such requests can be activated if someone is using a brute force attempt on the same account. Bad actors using malicious bot activity may also cause this status code to activate.
 
`451 Unavailable for Legal Reasons` happens when a website is seized or is found in violation with the law. You could type in the web address and be met with various screens saying this domain has been seized.
 
## 500 Level Status Codes
 
The 500 class of status codes indicates the server encountered an error processing the request. In other words, the error is coming on the server side, not the user side. This could be an error in your code that causes the script or crash resulting in an error on the server. 500 errors can be difficult to troubleshoot without verbose logging in your code.
 
Some of the most common 500 status codes we have listed are briefly described below.
 
`500 Internal Server Error` is a generic response from the server trying to process the request. Unfortunately, this status code represents something wrong with the request on the server end, but the error is unknown.
 
`502 Bad Gateway` is when the server is working as a gateway or a proxy server. When the server is working to grab a response to the http request given, it will send the request to an upstream server. The upstream server then gives an invalid response that doesn't make sense to the proxy server
 
`503 Service Unavailable` is when the server is not able to process a request. What usually causes this is the server may be handling more requests than it can process or is going through required maintenance.
 
You may have encountered this problem when being on Amazon during Cyber Monday. Generally, the site gets so overwhelmed with requests and users trying to make purchases that they cannot continue with their next order. Users tend to have to resume their session 7 times during Cyber Monday.
 
`504 Gateway Timeout` is when the server is being used as a gateway or proxy sending requests to another backend server. The backend server may be getting the requests but not giving a response in time for the proxy server. This can happen if a network connection for the servers is down or slow. It can also happen when the gateway server has too short of a timeout duration.
 
## Putting Status Codes to Use
The status codes are used to signal different messages from your API. It's best to always get as specific as possible with your status error codes to come back. It will save time on troubleshooting.
 
For example, The API route may be querying a database for a particular record, if the query returns zero results then we can send a `404 Not Found ` as the appropriate response.
 
An API route that returns query results matching responds with `200 OK` along with the results in the reply.  This design pattern limits the amount of information being sent back and forth between the client and server, thus increasing efficiency.
 
## HTTP Methods
HTTP Methods are verbs that define the interaction between client and the server. Each method has specific intended use cases per the `RFC``specification but liberties are often taken by inexperienced developers. Most of the time this is just due to a lack of knowledge of the correct protocols. Overtime, as you practice and gain your skills, you will know which HTTP methods need to be implemented. We will go over these in the next section below.
 
## GET
One of the most common methods used by the client to request information is the `GET` method. When a GET method is implemented, the user is requesting to see data from a specific resource. Let's take a look at the example below.
 
```console
example_route/user?first_name=John&last_name=Cobb
```
The example above calls the `example_route/user` route. Now while this route is being called, it's passing the variables `first_name` and `last_name` to get a response. In this case, we are hoping to get a response for the user John Cobb. This could result in a successful message or a number of errors depending how the route is set up.
 
## POST
The POST method is used to send data to the server to create or update information.  The information `POST`ed to the server is stored in the body of the HTTP request. Most POST methods allow for small transfers of information to be carried over to the server. Let's look at the example POST method below.
 
```console
POST /example_route/user HTTP/1.1
Host: sictc.edu
last_name=Cobb&first_name=John&email=johnc@sictc.edu
```
Our example `POST` method is used to create new records. The expected result of calling this method over and over results in many resources being created on the server, overloading and sl;woing down the server. This is important as we get into comparing `PUT` and `POST` since there are some similarities. Repeating the example below would create many occurences of the user John Cobb with an email address of johnc@sictcs.edu.
 
## HEAD
`HEAD` is typically used to determine what is going to be returned by the server. Our applications use the `HEAD` method to determine timestamp of files before downloading. For example, there is no need to download a 1 gigabyte file from the server if the contents of the file are unchanged. Use the `HEAD` command on files that remain relatively static.
 
We can also see how a head looks like from the example below. Look what responds back when put in a HEAD request for mlb.com
 
```console
curl -I http://www.mlb.com
HTTP/1.1 301 Moved Permanently
Server: AkamaiGHost
Content-Length: 0
Location: https://www.mlb.com/
Date: Tue, 09 Feb 2021 17:51:52 GMT
Connection: keep-alive
```
When you make a HEAD request, you will get a response back that is similar like a GET request, with the only difference being you will not get a body that comes along with it. You can see this from the example from above. We are able to get the servername the website is hosted on, the connection if it has a timeout mechanism. In this case, mlb.com does not.
 
## PUT
`PUT` is generally used to update the state of a resource. The W3C describes `PUT` as idempotent where the `POST` method is not. What idempotent means is repeated calls to the resource using  `PUT` result in the resource being unchanged. In contrast, repeated calls using `POST` will have consequences on the server side. Although each `POST` will be the exact same, the server will treat clone `POST` requests as a new request,  siphoning off server resources.

## Challenges:
No correct answer here but try to come up with a scenario where you would implement a ```PUT``` method in your ```API```.

## References
 - https://www.w3schools.com/tags/ref_httpmethods.asp
 - https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 - https://restfulapi.net/rest-put-vs-post/
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
 - https://rapidapi.com/blog/api-glossary/post/
 - https://www.digitalocean.com/community/tutorials/how-to-troubleshoot-common-http-error-codes
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 - https://www.cloudflare.com/learning/bots/what-is-rate-limiting/
 - https://www.eurovps.com/blog/400-errors/
 - https://www.oreilly.com/content/how-a-restful-api-server-reacts-to-requests/
 - https://kinsta.com/blog/http-status-codes/
 - https://moz.com/learn/seo/http-status-codes
 

## [Table of Contents](../README.md)

<details><summary>Tutorial List</summary>
<br>

### Prep

[Raspberry Pi Prep](/prep/README.md)<br>

### Linux - WSl setup

[Operating System (Linux)](linux/README.md)<br>
[Toggle Raspberry Pi led light](linux/embed/README.md)<br>
[Autoboot Services](linux/embed/sysd/README.md)<br>

### Database

[(Part 1) Database (MySQL)](db/README.md)<br>
[(Part 2)  Tables, Querys, and SQL](db/README2.md)<br>
[(Part 3)  Working with Relations](db/README3.md)<br>
[(Part 4) Putting it all together](db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](db/MYSQLTZ.md)<br>

### Web

[Getting Started with Node](web/README.md)<br>
[(Overview) Getting Started with Node](web/README)<br>
[(Part 1) Web API (Node)](web/api/js/src/iotapi/README.md)<br>
[(Part 2) Web API (Node)](web/api/js/src/iotapi/README2.md)<br>
[(Part 3) Web API (Node)](web/api/js/src/iotapi/README3.md)<br>
[(Part 4) Web API (Node)](web/api/js/src/iotapi/README4.md)<br>
[(Part 5) Web API (Node)](web/api/js/src/iotapi/README5.md)<br>

### UX

[Angular (Web Framework)](web/ux/README.md)<br>
[Angular (Web Framework) (Part 1)](web/ux/README2.md)<br>
[Angular (Web Framework) (Part 2)](web/ux/README3.md)<br>
[Angular (Web Framework) (Part 3)](web/ux/README4.md)<br>

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

### Cryptography

[Crypto](web/CRYPTO.md)<br>

</details>
