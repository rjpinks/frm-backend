# The Shipping Docks Backend 

## Description

- I wanted to make another MERN app, to refresh myself on ideas after taking a coding hiatus.
- It is does all CRUD operations and posts the information on the screen. In otherwords, it interacts with the Apollo Server and can manipulate the data. Additionally it helped me refresh on authentication using JWT.
- It creates a community for people to discuss 3D printing and sell/request wares.
- This is a little place for people to post advertisments and wanted ads for 3D printers.
- Most of all, I learned the importance of organzing databases. I had a lot of problems accessing User.posts. I also learned about Next.js and it's differences between that and vanilla React. I also learned a lot about how queries/mutations need to work when they live on the same page.
- One serious issue I had while writing the frontend was problems with git. It was my own fault and it dominoed into other problems. It was just generally a bad time, so I need to focus more on good git habits.

## Installation

There are several packages that need to be installed, and they are all available in the package.json.

### These Include:
- apollo-server-express, bcrypt,
- express, graphql, jsonwebtoken
- mongodb, mongoose

## Usage

I totally forgot to show off the Media Querying!

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/9VuEHKy3U5c/0.jpg)](https://www.youtube.com/watch?v=9VuEHKy3U5c)

## Credits

I have to give some credit to ChatGPT. When I had direct questions about ApolloClient/MongoDB, it helped.

## Features

- You can add to each board by selecting the appropriate tab in the taskbar, and you can edit/delete your posts from Your Profile tab.
- Media Querying will adjust size for better formatting to a tablet.

## How to Contribute

Honestly User.posts needs to be comprised of IDs from the Post table, but that is not how I have it organized. I had to rewire by utilizing state in the front end to properly filter out the posts that I needed. This meant that I had to pull all data instead of just what I needed for that tab.