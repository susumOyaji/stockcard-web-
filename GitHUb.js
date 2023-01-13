const userId = "js-primer-example";




const URL ='https://www.yahoo.co.jp';
//const URL = 'https://jsonplaceholder.typicode.com/photos';
//const URL ="https://qiita.com/api/v2/items"
//const URL = "https://finance.yahoo.co.jp/quote/%5EDJI";



/*
fetch(URL)
  .then(response => response.json())
  .then(postDate => console.log(postDate))
  .catch(err => console.error(err));
*/

  const getPostData = async () => {
    const response = await fetch(URL);
    const postsData = await response.json();
    console.log(postsData);
  };
  //getPostData();


  (async () => {
    const response = await fetch(URL);
    console.log(response.status); 
    const postsData = await response.json();
    console.log(postsData);
    document.querySelector("#demoShow").innerTEXT = postsData;
    
  })();












fetch(URL)
    .then(response => {
        console.log(response.status); 
        // エラーレスポンスが返されたことを検知する
        if (!response.ok) {
            console.error("エラーレスポンス", response);
        } else {
            return response.json().then(userInfo => {
                console.log(userInfo);
            });
        }
    })
    
    .then((content) => {
           
        //document.getElementById("demoShow").innerHTML = content.slice(0, 10);
        //document.querySelector("#demoShow").innerHTML = "content";
      })
    
    .catch(error => {
        console.error(error);
    });




    function loadContent () {
        // (A) FETCH "DUMMY.HTML"
        fetch(URL)
       
        // (B) RETURN THE RESULT AS TEXT
        .then((result) => {
          if (result.status != 200) { throw new Error("Bad Server Response"); }
          return result.json();
        })
       
        // (C) PUT LOADED CONTENT INTO <DIV>
        .then((result) => {
           
          //document.getElementById("demoShow").innerHTML = content.slice(0, 10);
          document.querySelector("#demoShow").innerHTML = result.response;
        })
       
        // (D) HANDLE ERRORS - OPTIONAL
        .catch((error) => { console.log(error); });
      }
      //loadContent ();
/*
    {
        "login": "js-primer-example",
        "id": 20484824,
        "node_id": "MDQ6VXNlcjIwNDg0ODI0",
        "avatar_url": "https://avatars.githubusercontent.com/u/20484824?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/js-primer-example",
        "html_url": "https://github.com/js-primer-example",
        "followers_url": "https://api.github.com/users/js-primer-example/followers",
        "following_url": "https://api.github.com/users/js-primer-example/following{/other_user}",
        "gists_url": "https://api.github.com/users/js-primer-example/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/js-primer-example/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/js-primer-example/subscriptions",
        "organizations_url": "https://api.github.com/users/js-primer-example/orgs",
        "repos_url": "https://api.github.com/users/js-primer-example/repos",
        "events_url": "https://api.github.com/users/js-primer-example/events{/privacy}",
        "received_events_url": "https://api.github.com/users/js-primer-example/received_events",
        "type": "User",
        "site_admin": false,
        "name": "js-primer example",
        "company": null,
        "blog": "",
        "location": "Japan",
        "email": null,
        "hireable": null,
        "bio": null,
        "twitter_username": null,
        "public_repos": 1,
        "public_gists": 0,
        "followers": 1,
        "following": 0,
        "created_at": "2016-07-16T02:25:34Z",
        "updated_at": "2016-07-16T02:32:30Z"
      }
      */