## Blogs project
### Card Operation ([Using this API URL](https://blogsproject-fawn.vercel.app))

---

### Installation

Run the following command to install dependencies:

```bash
$ npm install

```
* Get login
    * On Postman:
        ```bash
       https://blogsproject-fawn.vercel.app/api/auth/login
        ```

* get register
    * On Postman:
        ```bash
        https://blogsproject-fawn.vercel.app/api/auth/register
        ```

* create blog
    * On Postman (Post method):
        ```bash
        https://blogsproject-fawn.vercel.app/api/blogs
* update blog
    * On Postman (patch method):
        ```bash
       https://blogsproject-fawn.vercel.app/67667c29b0386fc44d20d70e
        ```

* Delete blog with user
    * On Postman (DELETE method):
        ```bash
      https://blogsproject-fawn.vercel.app/api/blogs/6766c09f74f63c714ba7e823
        ```
* get all blog search with conditon
    * On Postman (get method):
        ```bash
         https://blogsproject-fawn.vercel.app/api/blogs/?search=come to go user deatils all my
        ```
* Delete blog by user
    * On Postman (delete method):
        ```bash
        https://blogsproject-fawn.vercel.app/api/blogs/6766c09f74f63c714ba7e823
        ```
* Delete blog by admin
    * On Postman (delete method):
        ```bash
        https://blogsproject-fawn.vercel.app/api/admin/blogs/67667c29b0386fc44d20d70e
        ```
* Blocked user by admin
    * On Postman (patch method):
        ```bash
        http://localhost:5000/api/admin/users/676590c4ebfd7e2717bc0d20/block
        ```


#### Note: 
### run local

Run locally:

```bash
$ npm run dev
