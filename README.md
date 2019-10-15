# THREE.JS SPINNING ORB


Usage:
1. Include JS files in HTML document:
    1.     <script src="./js/three.js"></script>
    2.     <script src="./js/OrbitControls.js"></script>
    3.     <script src="./js/main.js"></script>
2. create a div with an id where you want to include the orb
3. Go to the main.js and in settings object set the element you just created.
    ```javascript
        let settings = {
            element: document.getElementById('orb'),
            ...
        }
    ```
4. Orb should render
5. Preview is available at: https://rokzabukovec.github.io./