
# Exploring HTTP

## Table of Contents
[Overview](#)<br>
[Methods and Status Codes](#)<br>
[Putting Stats Codes to Use](#)<br>
[HTTP Methods](#)<br>
[GET](#)<br>
[POST](#)<br>
[HEAD](#)<br>
[DELETE](#)<br>
[PUT](#)<br>
[Challenge](#)<br>

## Overview
This tutorial provides a basic overview of how HTTP and REST function. HTTP defines the protocol methods and REST defines how to use the protocol methods. When a web browser makes a request to a server, it is using HTTP protocol to communicate. The way the server communicates back to the client is defined by how the developer designed the REST interface.

As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.


## Methods and Status Codes

The HTTP protocol is vast and comprehensive due to the nature of the Internet. For the most part, modern implementations of REST is limited to a subset of methods and status codes. This article explores the how to use these methods and status codes to design what is called a `REST API`.

## Status Codes
TODO:

### 200 Level Status Codes
When you enter `http://google.com` into your browser's address bar and hit Return, the browser makes a request for a resource at that address. The server replies with an `HTTP Status` and `Content` if available. An example status is ```200 OK```. ```200 OK``` tells the browser the request was successfully handled. Another example: ```204 No Content```, tells the browser the server successfully processed the request but there is no content to return. 


### 400 Level Status Codes
The ```400``` class of status code is used to communicate errors caused by the browser. ```400 Bad Request``` tells the browser that the server is unable to process the request do to some error on the browser. This could be syntax errors, invalid file sizes, or malicious routing of requests.


### 500 Level Status Codes
The ```500``` class of status codes indicates the server encountered an error processing the request. This could be an error in your code that causes the script or crash resulting in an error on the server. ```500``` errors can be difficult to troubleshoot without verbose logging in your code.

## Putting Status Codes to Use
The status codes are used to signal different messages from your API. For example, The API route may be querying the database for a particular record, if the query returns zero results then we can send a ```404 Not Found ``` as the response. An API route that returns query results matching responds with ```200 OK``` along with the results in the reply.  This design pattern limits the amount of information being sent back and forth between the client and server.

## HTTP Methods
HTTP Methods are ```Verbs``` that define the interaction between client and the server. Each method has specific intended use cases per the ```RFC``` specification but liberties are often taken by inexperienced developers. 

## GET
One of the most common methods used by the client to request information is the ```GET``` method. The example below calls the ```example_route/user``` route passing the variables ```first_name``` and ```last_name```.
```console
example_route/user?first_name=John&last_name=Cobb
```
## POST
The POST method is used to send data to the server to create or update information.  The information ```POST```ed to the server is stored in the body of the ```HTTP``` request. ```POST``` method is used to create new records. The expected result of calling this method over and over results in many resources being created on the server. This is important as we get into comparing ```PUT``` and ```POST```. Repeating the example below would create many occurences of the user John Cobb with an email address of johnc@sictcs.edu.

```console
POST /example_route/user HTTP/1.1
Host: sictc.edu
last_name=Cobb&first_name=John&email=johnc@sictc.edu
```

## HEAD
```HEAD``` is typically used to determine what is going to be returned by the server. Our applications use the ```HEAD``` method to determine timestamp of files before downloading. For example, there is no need to download a ```1 gigabyte``` file from the server if the contents of the file are unchanged. Use the ```HEAD``` command on files that remain relatively static. 

## DELETE
```404``` Not Found.

## PUT
```PUT``` is generally used to update the state of a resource.  Repeated calls to the resource using  ```PUT``` result in the resource being unchanged. The ```W3C``` describes ```PUT``` as idempotent.

## Challenges:
No correct answer here but try to come up with a scenario where you would implement a ```PUT``` method in your ```API```.

## References
 - https://www.w3schools.com/tags/ref_httpmethods.asp
 - https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 - https://restfulapi.net/rest-put-vs-post/


## [Table of Contents](../README.md)

