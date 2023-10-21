
# Reddit Clone

Clone Reddit using Sprinng Boot And React.




## Tech Stack

**Client:** React 18.2.0, NextJs 13.4, Zustan, React Query, Antd, TailwindCSS,...

**Server:** MySQL, Java, Spring Boot 3.1.1, JPA, Mapstruct, Lombok, Oauth2 Resource Server,...


## Features

- **Authentication**: Signup, Sign in, Verify Token, Refresh Token, Logout.
- **Subreddit**: creating subreddit, get subreddit by id, get all subreddit.
- **Post**: creating post, get post by id, get all post, get all post by subreddit, get all post by username.
- **Comment**: create comment, get all comments by post, get all comment by username.
- **Vote**: upvote and downvote a post.


## API Reference

#### Auth APIs

| Method | URL     | Parameter                | Description
| :-------- | :------- | :------------------------- | :---------- |
| `GET` | `/api/v1/auth/signup` | `requestBody` - email, username and password. | Signup and receive and verification token.|
| `GET` | `/api/v1/auth/accountVerification/{token}` | `token` - The verification token that receive via email. | To active, the user need to verify the account after registration.|
| `POST` | `/api/v1/auth/login` |  | |
| `POST` | `/api/v1/auth/refresh-token` |  | |
| `POST` | `/api/v1/auth//logout` |  | |

#### Users APIs

| Method | URL     | Parameter                | Description
| :-------- | :------- | :------------------------- | :---------- |
| `GET` | `/api/v1/users/{id}` | |Get user by id |
| `GET` | `/api/v1/users/me` | | Get current login user|

#### Subreddits APIs

| Method | URL     | Parameter                | Description
| :-------- | :------- | :------------------------- | :---------- |
| `GET` | `/api/v1/subreddits` | |Get all subreddits |
| `GET` | `/api/v1/subreddits/{id}` | | Get subreddit by id|
| `POST` | `/api/v1/subreddits` | | Create subreddit|

#### Posts APIs

| Method | URL     | Parameter                | Description
| :-------- | :------- | :------------------------- | :---------- |
| `GET` | `/api/v1/posts` | |Get all posts |
| `GET` | `/api/v1/posts/{id}` | | Get post by id|
| `GET` | `/api/v1/posts/subreddit/{id}` | | Get post by subreddit id|
| `GET` | `/api/v1/posts/user/{username}` | | Get post by username|
| `POST` | `/api/v1/posts` | | Create post|

#### Comments APIs

| Method | URL     | Parameter                | Description
| :-------- | :------- | :------------------------- | :---------- |
| `GET` | `/api/v1/comments/posts/{id}` | | Get comments by post id|
| `GET` | `/api/v1/comments/user/{username}` | | Get comments by username|
| `POST` | `/api/v1/comments` | | Create comment|

#### Votes APIs

| Method | URL     | Parameter                | Description
| :-------- | :------- | :------------------------- | :---------- |
| `POST` | `/api/v1/votes` | | Up/Down vote|




## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the frontend project directory

```bash
  cd redditclone-frontend
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```



## Environment Variables

**frontend environment variables**

To run this project, you will need to add the following environment variables to your .env file of frontend source

`NEXT_PUBLIC_API_URL`=http://localhost:8080

**server environment variables**

`db_username`: your mysql database username

`db_password`: your mysql database password

Your mailtrap username and password:

`mail_username`: your mailtrap username

`mail_password`: your mailtrap password


## Screenshots
### Home Page

![Screenshot 2023-10-21 at 12 14 01 PM](https://github.com/thanhtungle73/reddit-clone/assets/59435436/00c959b8-73a0-4ffd-bd8f-d623ac68ff52)

### Post Detail Page

![Screenshot 2023-10-21 at 12 19 30 PM](https://github.com/thanhtungle73/reddit-clone/assets/59435436/9c8d7905-0ebc-4b36-b82a-072b002102f9)

### Create Post

![Screenshot 2023-10-21 at 12 45 26 PM](https://github.com/thanhtungle73/reddit-clone/assets/59435436/0e9b7ead-c8ea-402b-9bdd-2ce1b5831728)


### Subbredit List & Create Subbredit

![Screenshot 2023-10-21 at 12 45 54 PM](https://github.com/thanhtungle73/reddit-clone/assets/59435436/a940e10a-3ba9-483c-8a9e-035128375948)

### User Profile & Post, Comment Management

![Screenshot 2023-10-21 at 12 50 42 PM](https://github.com/thanhtungle73/reddit-clone/assets/59435436/f3603dc5-08b2-4383-bcd4-6845e843f0eb)


