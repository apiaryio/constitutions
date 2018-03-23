### URI templates are dash separated and lowercased
Applies to API Targets `Resource_URI_Template`

Validates if literal parts of the URI templates are dash separated and lowercased. It expects no underscores and capital characters.

#### Good Examples
##### Dash separated and lowercased

Literal parts of the URI templates are dash separated and lowercased

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test-dash-and-lowercased/{id}]


### test post [GET]

+ Request (application/json)

```



#### Bad Examples
##### Not dash separated

Literal parts of the URI templates are not dash separated

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test_not_dash/{id}]


### test post [GET]

+ Request (application/json)

```

> Error: Uri part "/test_not_dash/" is not lowercased or dash separated.

##### Not dash lowercased

Literal parts of the URI templates are not dash lowercased

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test-Not-LoweRcased/{id}]


### test post [GET]

+ Request (application/json)

```

> Error: Uri part "/test-Not-LoweRcased/" is not lowercased or dash separated.




