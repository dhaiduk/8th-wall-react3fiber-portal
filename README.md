# RPR Portal Master

This React-Three/Fiber project is the main portal simulation.
 
###  Large Temporary Elevator Model 
The current HD elevator model is large, it causes a delay when clicking, but this elevator is to be reduced, and we aren't using it for long. We can swap to a low quality one when needed.

Note:  The main blocker to high quality models in AR is not directly the model size itself, it's the initial time taken for the first render of that model - after that, no problem.  This means, to use a large, HD portal can be done, but that there will need to be some counter-measures.  1)  You can make the model load in pieces (back wall floor/sides) which avoids the lengthy delay. 2) reduce the model - adjusting vertices and png quialities to find balance between speed/quality.  3)  You can cheat and simply display a welcome message to the user (after camera is open) so they cannot see the initial screen jump, although this can interfere with UX.

###  8th Wall + Fiber
This project is a combination of various 8th Wall and React projects, pulled together and updated to react-three/fiber (old = react-three-fiber).   

###  On-screen version
A rough scene to help debugging is shown by adding ?onscreen=y  for example  [https://127.0.0.1:8080/?onscreen=y](https://127.0.0.1:8080/?onscreen=y)  

###  Reading the source code

Most of the source code is related to XR8 camera processes.  So, the good stuff is in the 'Experience' folder and 'ExperienceOnScreen'.  The main part we use is called <SceneParts> and is found in the Experience folder referenced in XR3F.js.  Like so:

```
<mesh castShadow position={tapTarget} visible={!!tapTarget} ref={$box}>  
    <SceneParts/>   
</mesh> 
```

So, look inside sceneParts.js to find how it places the Elevator and sets the items to be displayed according to the floor number.

State management:  Uses zustand (by creator of R3F).  Look here: ```import useStore from './state'```

###  To Get up and running locally

```
yarn install (preferred to npm install)
npm run build 
```
Then:  Serve the build folder over https with your preferred tool.

... or you can use zapworks handy tool 'zapworks serve --lan' on the build folder.  To do that, run ```npm run serve``` then access https://192.168.1.64:8080 on your phone, or scan the handy QR code it produces.

### Different Portals:  
For tdebugging, two portals were used.  To change to the 'bad quality' portal, add portal=a to the url like: https://192.168.1.64:8080/?onscreen=y&portal=a
This will make it easy to swap models and better testing of measurements.  



### TODO:  
- Publish to URL:  Is it possible to publish (the build folder here) to a whitelist destination URL ?  That would be very useful to know if Android/ iOs status outside of local server.
- Video green screen removal
- iPhone iOs server/https issue
- Better World Tracking (bug fix required)



