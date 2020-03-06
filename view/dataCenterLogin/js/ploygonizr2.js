


/** 
 * @author 
 * @lastEdit: yxFang
 * @created 20-03-06
 * @edited  20-03-06
 */

(function($){
    $.fn.polygonizr = function(options){
        var defaults = {
            // How long to pause in between new node-movements.
            restNodeMovements: 1,
            // When the cluster updates, this sets speed of nodes.
            duration: 3,
            // Define the maximum distance to move nodes.
            nodeMovementDistance: 100,
            // The number of node nodes to print out.
            numberOfNodes: 25,
            // The number of dots, unconnected to any other nodes, floating arround.
            numberOfUnconnectedNode: 25,
            // Connects passing free nodes if within the distance as specified in ConnectUnconnectedNodesDistance.
            ConnectUnconnectedNodes: true,
            // The distance between unconnected nodes to connect to each other.
            ConnectUnconnectedNodesDistance: 150,
            // Define the maximume size of each node dot.
            nodeDotSize: 2.5,
            // Sets the ease mode of the movement: linear, easeIn, easeOut, easeInOut, accelerateDecelerate.
            nodeEase: "easeOut",
            // If true, the nodes will descend into place on load.
            nodeFancyEntrance: false,
            // Makes the cluster forms an ellipse inspired formation, random if true.
            randomizePolygonMeshNetworkFormation: true,
            // Define a formula for how to initialize each node dot's position.
            specifyPolygonMeshNetworkFormation: null,
            // Number of relations between nodes.
            nodeRelations: 3,
            // The FPS for the whole canvas.
            animationFps: 30,
            // Sets the color of the node dots in the network (RGB).
            nodeDotColor: "240, 255, 250",
            // Sets the color of the node lines in the network (RGB).
            nodeLineColor: "240, 255, 250",
            // Sets the color of the filled triangles in the network (RGB).
            nodeFillColor: "240, 255, 250",
            // Sets the alpha level for the colors (1-0).
            nodeFillAlpha: 0.5,
            // Sets the alpha level for the lines (1-0).
            nodeLineAlpha: 0.5,
            // Sets the alpha level for the dots (1-0).
            nodeDotAlpha: 1.0,
            // A numberic value (0-1) defining the ods of showing the cooridnates for where a new node destination will end.
            nodeDotPrediction: 0,
            // Defines if the triangles in the network should be shown.
            nodeFillSapce: true,
            // If true, the animation is allowed to go outside the definde canvas space.
            nodeOverflow: true,
            // Define if the active animation should glow or not (not CPU friendly).
            nodeGlowing: false,
            // Define the canvas size and css position.
            canvasWidth: $(this).width(),
            canvasHeight: $(this).height(),
            canvasPosition: "absolute",
            canvasTop: "auto",
            canvasBottom: "auto",
            canvasRight: "auto",
            canvasLeft: "auto"
        };

        var settings = $.extend({}, defaults, options);
        //合并两个设置

        // return this.each(function(){
        //     // Create a new canvas element and append it to the current object.
        //     var m_this = $(this);
        //     var canvasElement = document.createElement('canvas');
        //     canvasElement.width = settings.canvasWidth;
        //     canvasElement.height = settings.canvasHeight;
        //     canvasElement.style.position = settings.canvasPosition;
        //     canvasElement.style.top = settings.canvasTop;
        //     canvasElement.style.bottom = settings.canvasBottom;
        //     canvasElement.style.right = settings.canvasRight;
        //     canvasElement.style.left = settings.canvasLeft;
        //     m_this.append(canvasElement);

        //      // Setup canvas, context and define variable for nodes.
        //      var ctx = canvasElement.getContext('2d');
        //      var nodes = [];

        //      // Start setting up node nodes.
        //     setupClusterNodes();

        //     // Start animations.
        //     startNodeAnimations();

        //     ////////////////////////////////////
        //     // Manages setting up the nodes. //
        //     ////////////////////////////////////
        //      function setupClusterNodes(){
        //         for (let i = 0; i < settings.numberOfNodes + settings.numberOfUnconnectedNode; i++) {
        //            debugger
        //         }
        //      }

        //     ////////////////////////////////
        //     // Start the frame animation. //
        //     ////////////////////////////////
        //      function startNodeAnimations(){
                
        //      }

        //      function draw(){
        //          ctx.clearRect(0, 0, settings.canvasWidth, setttings.canvasHeight);
        //          for(var i in nodes){
        //             drawLines(nodes[i]);
        //             drawCircle(nodex[i]);
        //          }
        //      }

        //      function drawLines(node){

        //      }

        // })

    };
}(jQuery));