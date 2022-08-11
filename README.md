
<img align="right" width="150" height="150" src="https://media-exp1.licdn.com/dms/image/C4E0BAQF7BYCCZt5epw/company-logo_200_200/0?e=2159024400&v=beta&t=qUAFP9bUgBEEXGVQYpUXW1J_OiP8e0r4rFBpqp8OrxA">

# JS-07 - Fetch & Web Storage APIs

## https://replit.com/@SupTarr/Fetch-Exercise#index.html
## https://fetch-exercise.suptarr.repl.co/

 <br/>
 <br/>

 ## Example data
 ```
{
    "page": 1,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [...],
}    
 ```
 
 
 ## Part 1: Using the Axios

1. Try sending `GET` request to `https://reqres.in/api/data` and observe the response.
2. Each request will contain only 6 items. You will have to request multiple times to get all items.
3. Add `axios` script to `index.html`
    ```
   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    ```
4. Update `fetchColorsList` to use `axios` to get data from `https://reqres.in/api/data`. Remember, You should check the "total_pages" in the first request then make more request to get more items from other pages then put all in "allColors" variable.
5. If everything are correct, when go to `index.html` in browser. It should show all color in it.

        

 ## Part 2: Using the Web Storage API
1. Modify the *fetchColorsList* function so when the data is downloaded from the API, the colors list is stored using the local storage.
2. Implement the *loadColorsFromStorage* function so the color values are loaded from the local storage.
3. Open the developer tools and verify that the data is stored in the local storage.
4. Test your application without connection to the internet and verify that the colors list is loaded.

## Challenge Yourself
1. Add a clear button that removes all the elements from the list.
2. Add a load button that calls the *fetchColorsList* function and loads the colors again.
