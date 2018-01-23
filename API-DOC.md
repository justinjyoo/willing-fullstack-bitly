# API Documentation

|Endpoint|Description|
|---|---|
|GET /v1/link|Retrieve original url of the short.ly link|
|POST /v1/link|Retrieve shortened hash URL|
|DELETE /v1/link|Delete URL from memory|
|GET /v1/allLinks|Retrieve all links currently stored|

## Retrieve original url of the short.ly link

```
GET /v1/link
```
### Example Response

```json
Status: 200 OK

{
    "longLink": "https://facebook.com"
}
```

## Retrieve shortened hash URL

```
POST /v1/link
```

### Input

|Name|Type|Description|
|---|---|---|
|url|string|Longform URL to delete.|

```json
{
  "url": "https://www.facebook.com"
}
```

### Example Response

```json
Status: 200 OK

{
    "addedLink": "https://short.ly/4pNGR",
    "linksList": {
        "https://wwww.facebook.com": "https://short.ly/4pNGR",
        "https://google.com": "https://short.ly/mBaRj"
    }
}
```

## Delete URL from memory

```
DELETE /v1/link
```

### Input

|Name|Type|Description|
|---|---|---|
|url|string|Longform URL to delete.|

```json
{
  "url": "https://www.facebook.com"
}
```

### Example Response

```json
Status: 200 OK

{
    "addedLink": "https://short.ly/4pNGR",
    "linksList": {
        "https://www.google.com": "https://short.ly/mBaRj"
    }
}
```

## Retrieve all links currently stored

```
GET /v1/allLinks
```

### Example Response

```json
Status: 200 OK

{
    "allLinks": {
        "https://facebook.com": "https://short.ly/4pNGR",
        "https://google.com": "https://short.ly/mBaRj"
    }
}
```


