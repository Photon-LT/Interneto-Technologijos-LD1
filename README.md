# Yet Another Codeforces Visualizer

## Description
Codeforces is a website that hosts competitive programming contests. While the site has lots of various programming problems from various computer science topics, users dont have much built-in tools to visualize their progress. "Yet Another Codeforces Visualizer" - is a website that makes various diagrams to better visualize codeforcews.com users progress, areas where they excel and where they should train. It also allows users to track their friends progress, comment on their profiles.  

## Entity definition
<br> Yet Another Codeforces Visualizer user  
<br> username  regex [a-zA-Z0-9]+  
<br> id - sha-2 hash  
<br> Registration date  YYYY.MM.DD 
<br> Profile data edition date YYYY.MM.DD  
<br> friends (array of existing codeforces handles)  
<br> about me (string, utf8, < 1MB)  
<br> universities finished (array utf8,  < 1MB )  
<br> codeforces handle (string (existing one))  
<br> email (string of form xxx@yyy.zzz)  

## API definition
App will use these methods from codeforces API:  
  
<br> user.status - Returns submissions of specified user.  
<br> user.rating - Returns rating history of the specified user.  
<br> problemset.problems - Returns all problems from problemset. Problems can be filtered by tags.  
<br> contest.standings - Returns the description of the contest and the requested part of the standings.  
<br> contest.status - Returns submissions for specified contest. Optionally can return submissions of specified user.  
<br> (...)  


 - GET /api/1/user/:userId/ - returns the specified user  
   - 400 {error: 'user  with id: ${userId} does not exist'}   
 - GET /api/1/user/:userId/friends/:startsWith - returns the specified user`s friends as array, starting from   
   - 400 {error: 'user  with id: ${userId} does not exist'}   
 - DELETE /api/1/user/:userId/friends/remove/:friendUserCodeforcesHandle - remove specific user from users friends   
   - 400 {error: 'user  with id: ${userId} does not exist'}   
   - 400 {error: '${friendUserCodeforcesHandle} does not exist on codeforces'    
 - POST /api/1/user/:userId/friends/add/:friendUserId - add specified user to users friends   
   - 400 {error: 'user  with id: ${userId} does not exist'}    
   - 400 {error: 'user  with id: ${friendsUserId} does not exist'}    
    
   - 500 - {error: 'internal server error'}   

## UI definition
<br><a href="https://wireframe.cc/6QxSlU">Vireframes</a>
