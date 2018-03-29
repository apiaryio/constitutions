### DELETE request must not have a body
Applies to API Targets `Action`

Checks if response to DELETE request contains body

#### Good Examples
##### No body pasyload in response

The response to DELETE request does not contain body.

Applies to API Target(s) `Action`

```
FORMAT: 1A

# API Projects

## Projects [/projects/{projectId}]

### Remove a Project [DELETE]

+ Response 204

```



#### Bad Examples
##### Body pasyload in response

The response to DELETE request does contain body.

Applies to API Target(s) `Action`

```
FORMAT: 1A

# API Projects

## Projects [/projects/{projectId}]

### Remove a Project [DELETE]

+ Request (application/json)

        {
            id: 1
        }

+ Response 204

```

> Error: DELETE request must not have a body.




