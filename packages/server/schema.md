# API Definitions:

### GET /page/:user

Returns all the page data under that user
200: Success, data in body
404: User not found
503: MongoDB Error/Internal Server Error

### POST /user/signin

Attempts to login a user with a `username` and `password`, setting Authorization cookie w/ JWT
200: Auth good and cookie set
400: Badly formatted credentials
401: Incorrect credentials
503: MongoDB Error/ISA

### POST /user/signup

Takes in a `username`, `password`, `avatar` URI, and `categories` list
Creates a new user and associated page, sets Authorization cookie
200: User created, page either created or exists
400: Bad params
409: Username has been already taken
503: MongoDB Error/ISA

### POST /user/validate

Validates a user’s Authorization cookie
200: Authorization good, name in body
401: Bad token stored in cookie or no cookie, cookie unset
503: ISA

### POST /page/color

Sets a `color` for the authorized user, in hex form (“#FFFFFF”)
200: Color was set
400: Bad params
401: Unauthorized/Bad authorization
503: ISA

### POST /page/title

Sets a `title` string for the authorized user, minimum length of 1
200: Title was set, returns title in body data
400: Bad params
401: Unauthorized/Bad auth
503: ISA

### POST /page/avatar

Sets the `avatar` URI for the authorized user, min len of 1
200: Avatar was set, returns avatar URI in body data
400: Bad params
401: Unauthorized/Bad auth
503: ISA

### POST /page/categories

Adds a new category to the authorized user’s page with a `name` string and a `color` hex string
200: Category was created, returns new category with it’s \_id in body data
400: Bad params
401: Unauthorized/Bad auth
503: ISA

### POST /page/categories/:id

Updates either a `name` string or a `color` hex string for the authorized user’s category with \_id :id
200: Category was updated, returns new category in body data
400: Bad params
401: Unauthorized/Bad auth
404: Category id not found
503: ISA

### DELETE /page/categories/:id

Deletes a category from the authorized user’s page. Does not delete the links in that category, but nullifies their category values
200: Category was deleted
401: Unauthorized/Bad auth
404: Category id not found
503: ISA

### POST /page/links

Adds a new link to a page with a string `name`, a string `url`, and a nullable string `category` with the category \_id or null if not categorized.
200: Added successfully, returns link with \_id in body data
400: Bad params
401: Unauthorized/bad auth
503: ISA

### POST /page/links/:id

Edits a specific link with its \_id for an authorized user
200: Edited successfully, returns back new link in body data
400: Bad params
401: Unauthorized/bad auth
404: Link id not found
503: ISA

### DELETE /page/links/:id

Deletes a specific link by its \_id for an authorized user
200: Link deleted
401: Unauthorized/bad auth
404: Link id not found
503: ISA

# Schemas:

## Users:

- `username` - string - the username of the user. Should be at least 3 characters and unique
- `password` - string - the hashed and salted password of the user. Unhashed password should be at least 6 chars

## Pages:

- `owner` - string - the username of the user who owns the page
- `color` - string - the hex color of the background of the page. Defaults to “#FFFFFF”
- `title` - string - the title of the page. Defaults to username of the owner of the page. Should be at least one character
- `avatar` - string - the avatar image to use for the page. Probably just a URI for one of the default profile photos
- `categories` - array of objects - the page’s associated categories
  - `name` - string - the display name of the category. Should be at least one character
  - `color` - string - the hex color code of the category color. Defaults to “#FFFFFF”
- `links` - array of objects - the page’s links
  - `name` - string - the display name for the link. Can be empty, if it is just display link URL on page.
  - `url` - string - the URL of the link
  - `category` - nullable string - the associated category \_id for the link. If null, link is not in a category.
