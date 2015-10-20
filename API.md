# API documentation

**List Jobs**
----
  Lists all current jobs that are scheduled

* **URL**

    /jobs

* **Method:**

  `GET`

* **URL Params**

  **Required:**

  None

* **Data Params**

  None


* **Success Response:**

    * **Code:** 200<br/>
      **Content:** `{ }`


* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/jobs",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
