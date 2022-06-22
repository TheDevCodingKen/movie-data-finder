This repository contains the source code for my Movie Data Finder Express server with Morgan logging and Axios.

The purpose of this project was to create a server that would make requests to the OMDB API and show the user the selected movie data. If a previous request was made for the same movie, then the data would be retrieved from the cache instead of making the API call again.

Steps Taken:

1. Created a server using the Express framework
2. Logged all incoming requests with the morgan logging library
3. Created an .env file to store my API key
4. Accepted requests for the Open Movie DataBase (OMDB) API
5. Made the requests to the OMDB using the Axios library
6. Cached, or stored, the responses for subsequent requests
7. Ensured the data is updated at least once a day

Contents of this site are © Copyright 2022 TheDevCodingKen. All rights reserved.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
