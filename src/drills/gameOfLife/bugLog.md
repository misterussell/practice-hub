# Bugs

1. When importing `chai-enzyme` the module for React can't be found and an error is thrown

   >Confirmed by removing all other testing packages

   >Attempted to research peerDependencies to see if these could be configured to allow for the module to be seen

   >added module sourceType to babel compiler

2. Because style sheets are being imported directly into the modules testing is getting stuck on the first class definition

   >Will need to compile styles with SASS and then import these in the header to be able to continue testing components.

3. When viewing virtual-dom tree unknown components show up. This most likely has to do with something in the router being defined incorrectly.

   >[elaboration on exact](https://www.techiediaries.com/react-router-dom-v4/)

   >[react-router-dom docs](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/basic-components.md)
