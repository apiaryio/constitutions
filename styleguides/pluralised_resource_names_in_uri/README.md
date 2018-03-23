### Plural form URI template.
Applies to API Targets `Resource_URI_Template`

Validates if last literal part of URI template is in plural form.

#### Good Examples
##### URI is plurarised

Last part of the URI (`dogs`) is in plural form

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test/{id}/dogs]


### test post [GET]

+ Request (application/json)

```



#### Bad Examples
##### URI is not plurarised

Last part of the URI (`dog`) is not in plural form

Applies to API Target(s) `Resource_URI_Template`

```
FORMAT: 1A

# test

## test [/test/{id}/dog]


### test post [GET]

+ Request (application/json)

```

> Error: Last resource URI part "dog" is not in plural form.




