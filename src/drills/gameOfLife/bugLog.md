# Bugs

1. When importing `chai-enzyme` the module for React can't be found and an error is thrown

   >Confirmed by removing all other testing packages

   >Attempted to research peerDependencies to see if these could be configured to allow for the module to be seen

   >added module sourceType to babel compiler

   >I am going to continue testing without chai-enzyme until I am able to fix this. 

2. <strike>Because style sheets are being imported directly into the modules testing is getting stuck on the first class definition</strike

   >Will need to compile styles with SASS and then import these in the header to be able to continue testing components.

   >Fixed by moving the import for the css file directly onto the index.js component. Since I'm not actively testing this base component the tests pass the css failures.

3. When viewing virtual-dom tree unknown components show up. This most likely has to do with something in the router being defined incorrectly.

   >[elaboration on exact](https://www.techiediaries.com/react-router-dom-v4/)

   >[react-router-dom docs](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/basic-components.md)
