### Validates proper combinations of request method and response status code.
Applies to API Targets `Action`

Possible combinations are:
   - 200: GET, DELETE, PATCH
   - 201: POST
   - 202: POST, DELETE, PATCH
   - 206: GET


#### Good Examples
##### Good combination of request method and response status code

201 response status code is allowed for POST request

Applies to API Target(s) `Action`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "id": 1
        }

+ Response 201 (application/json)

        {
            "id": 1
        }

```



#### Bad Examples
##### Bad combination of request method and response status code

200 response status code is not allowed for POST request

Applies to API Target(s) `Action`

```
FORMAT: 1A

# test

## test [/test]


### test post [POST]

+ Request (application/json)

        {
            "id": 1
        }

+ Response 200 (application/json)

        {
            "id": 1
        }

```

> Error: No valid combination of status code and method. Valid combinations are:
  - 200: GET, DELETE, PATCH
  - 201: POST
  - 202: POST, DELETE, PATCH
  - 206: GET


##### Bad combination of request method and response status code

201 response status code is not allowed for GET request

Applies to API Target(s) `Action`

```
FORMAT: 1A

# test

## test [/test]


### test post [GET]

+ Request (application/json)

+ Response 201 (application/json)

        {
            "id": 1
        }

```

> Error: No valid combination of status code and method. Valid combinations are:
  - 200: GET, DELETE, PATCH
  - 201: POST
  - 202: POST, DELETE, PATCH
  - 206: GET





