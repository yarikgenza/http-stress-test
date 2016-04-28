# http-stress-test

Simply node.js http-stress-test utility.

Usage

1. Install dependencies (chalk) <br>
  <code>npm i</code>
  
2. Edit config.js file. <br>
  <code>var config = {
    siteUrl: "http://yourSiteUrl.com"
  }
  </code>
  
3. Run test <br>
  <code>node htest</code>
  
4. To stop test, enter *Ctrl + C*

**Use only for tests**

Advanced settings:
  
  **You can edit number of requests.** <br>
  Junt change a steps const. <br>
  <code>const steps = [10, 100, 300, 1000, 5000, 10000, 25000...]</code>
