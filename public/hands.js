var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}


//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Canvas
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Canvas = function () {
    function Canvas(_ref) {var _this = this;var canvas = _ref.canvas,_ref$entities = _ref.entities,entities = _ref$entities === undefined ? [] : _ref$entities,pointer = _ref.pointer;_classCallCheck(this, Canvas);this.

























        setCanvasSize = function () {var _window =
            window,w = _window.innerWidth,h = _window.innerHeight;
            var w2 = w * _this.dpr;
            var h2 = h * _this.dpr;
            _this.canvas.width = w2;
            _this.canvas.height = h2;
            _this.canvas.style.width = 920 + 'px';
            _this.canvas.style.height = 500 + 'px';
            _this.bounds = new Bounds(0, 0, w2, h2);
        };this.

        addEntity = function (newEntity) {
            _this.entities = [].concat(_toConsumableArray(_this.entities), [newEntity]);
            return _this.entities.length - 1;
        };this.






        render = function () {
            // Main loop

            // Draw and Update items here.
            _this.entities.forEach(function (_ref2) {var draw = _ref2.draw,update = _ref2.update;
                draw(_this);
                update(_this);
            });

            ++_this.tick;
            window.requestAnimationFrame(_this.render);
        }; // setup a canvas
        this.canvas = canvas;this.dpr = window.devicePixelRatio || 1;this.ctx = canvas.getContext('2d');this.ctx.scale(this.dpr, this.dpr); // tick counter
        this.tick = 0; // entities to be drawn on the canvas
        this.entities = entities; // track mouse/touch movement
        this.pointer = pointer || null; // setup and run
        this.setCanvasSize();this.setupListeners();this.render();}_createClass(Canvas, [{ key: 'setupListeners', value: function setupListeners() {window.addEventListener('resize', this.setCanvasSize);} }, { key: 'removeEntity', value: function removeEntity(deleteIndex) {this.entities = this.entities.filter(function (el, i) {return i !== deleteIndex;});return this.entities;} }]);return Canvas;}(); //*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Entity
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var Entity = function Entity() {var _this2 = this;_classCallCheck(this, Entity);this.dpr = window.devicePixelRatio || 1;this.
    toValue = function (value) {return value * _this2.dpr;};this.
    draw = function () {};this.
    update = function () {};};



//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Background
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Background = function (_Entity) {_inherits(Background, _Entity);
    function Background(_ref3) {var color = _ref3.color;_classCallCheck(this, Background);var _this3 = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this));_this3.









        draw = function (context) {
            _this3.drawBg(context);
        };_this3.color = color;return _this3;}_createClass(Background, [{ key: 'drawBg', value: function drawBg(_ref4) {var ctx = _ref4.ctx,canvas = _ref4.canvas,bounds = _ref4.bounds;ctx.fillStyle = this.color;ctx.fillRect.apply(ctx, _toConsumableArray(bounds.params));} }]);return Background;}(Entity);


//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Cursor
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Cursor = function (_Entity2) {_inherits(Cursor, _Entity2);
    function Cursor(_ref5) {var color = _ref5.color,radius = _ref5.radius;_classCallCheck(this, Cursor);var _this4 = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this));_this4.







        draw = function (_ref6) {var ctx = _ref6.ctx,pointer = _ref6.pointer;
            ctx.strokeStyle = _this4.strokeStyle;
            ctx.lineWidth = _this4.lineWidth;
            ctx.beginPath();
            ctx.arc(
            pointer.position.x,
            pointer.position.y,
            _this4.radius,
            0,
            _this4.pi2,
            true);

            ctx.closePath();
            ctx.stroke();
        };_this4.radius = _this4.toValue(radius);_this4.pi2 = Math.PI * 2;_this4.lineWidth = _this4.toValue(2);_this4.strokeStyle = color;return _this4;}return Cursor;}(Entity);


//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Pointer
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Pointer = function () {
    function Pointer() {var _this5 = this;_classCallCheck(this, Pointer);this.






















































        update = function (_ref7) {var tick = _ref7.tick;
            _this5.modifier && _this5.modifier(_this5, tick);
        };this.dpr = window.devicePixelRatio || 1;this.delta;this.lastPosition = null;this.position = new Point(null, null);this.addListeners();}_createClass(Pointer, [{ key: 'delta', value: function delta() {return this.position.delta(this.lastPosition);} }, { key: 'addListeners', value: function addListeners() {var _this6 = this;['mousemove', 'touchmove'].forEach(function (event, touch) {window.addEventListener(event, function (e) {// move previous point
                    var _position = _this6.position,px = _position.x,py = _position.y; // disable the demo modifier if it's been added
                    if (_this6.modifier) {_this6.modifier = null;}if (touch) {e.preventDefault();var x = e.targetTouches[0].clientX * _this6.dpr;var y = e.targetTouches[0].clientY * _this6.dpr;if (!_this6.lastPosition) {_this6.lastPosition = new Point(x, y);} else {_this6.lastPosition.moveTo(px, py);}_this6.position.moveTo(x, y);} else {var _x = e.clientX * _this6.dpr;var _y = e.clientY * _this6.dpr;if (!_this6.lastPosition) {_this6.lastPosition = new Point(_x, _y);} else {_this6.lastPosition.moveTo(px, py);}_this6.position.moveTo(_x, _y);}}, false);});} }, { key: 'addPointerModifier', value: function addPointerModifier(modifier) {this.modifier = modifier;} }]);return Pointer;}();



//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Point
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Point = function () {
    function Point(x, y) {_classCallCheck(this, Point);
        this.x = x;
        this.y = y;
    }_createClass(Point, [{ key: 'clone', value: function clone()





        {
            return new Point(this.x, this.y);
        } }, { key: 'delta', value: function delta(

        point) {
            return [this.x - point.x, this.y - point.y];
        } }, { key: 'distance', value: function distance(

        point) {
            var dx = point.x - this.x;
            var dy = point.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        } }, { key: 'moveTo', value: function moveTo(

        x, y) {
            this.x = x;
            this.y = y;
            return this;
        } }, { key: 'move', value: function move(

        x, y) {
            this.x += x;
            this.y += y;
            return this;
        } }, { key: 'moveAtAngle', value: function moveAtAngle(

        angle, distance) {
            this.x += Math.cos(angle) * distance;
            this.y += Math.sin(angle) * distance;
            return this;
        } }, { key: 'applyVelocity', value: function applyVelocity(

        velocity) {
            this.x += velocity.vx;
            this.y += velocity.vy;
            return this;
        } }, { key: 'angleRadians', value: function angleRadians(

        point) {
            // radians = atan2(deltaY, deltaX)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x);
        } }, { key: 'angleDeg', value: function angleDeg(

        point) {
            // degrees = atan2(deltaY, deltaX) * (180 / PI)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x) * (180 / Math.PI);
        } }, { key: 'rotate', value: function rotate(

        origin, radians) {
            // rotate the point around a given origin point
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            this.x =
            cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
            this.y =
            cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
            return this;
        } }, { key: 'position', get: function get() {return [this.x, this.y];} }]);return Point;}();


//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// PointPhysics
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var DPR = window.devicePixelRatio || 1;
var MOUSE_STRENGTH = 0.25; // 0 - 1
var MOUSE_RADIUS = 100 * DPR;var

PointPhysics = function (_Point) {_inherits(PointPhysics, _Point);
    function PointPhysics(_ref8) {var x = _ref8.x,y = _ref8.y,mass = _ref8.mass,isFixed = _ref8.isFixed;_classCallCheck(this, PointPhysics);var _this7 = _possibleConstructorReturn(this, (PointPhysics.__proto__ || Object.getPrototypeOf(PointPhysics)).call(this,
        x, y));_initialiseProps.call(_this7);
        _this7.vx = 0; // velocity x
        _this7.vy = 0; // velocity y
        _this7.fx = 0; // force x
        _this7.fy = 0; // force y
        _this7.mass = mass;
        _this7.isFixed = isFixed;return _this7;
    }_createClass(PointPhysics, [{ key: 'applyForce', value: function applyForce(

        x, y) {
            this.fx += x;
            this.fy += y;
        } }, { key: 'applyForceFromMouse', value: function applyForceFromMouse(

        pointer) {
            var distance = this.distance(pointer.position);

            if (distance < MOUSE_RADIUS) {var _pointer$delta =
                pointer.delta(),_pointer$delta2 = _slicedToArray(_pointer$delta, 2),dx = _pointer$delta2[0],dy = _pointer$delta2[1];
                var power = (1 - distance / MOUSE_RADIUS) * MOUSE_STRENGTH;

                this.applyForce(dx * power, dy * power);
            }
        } }, { key: 'solveVelocity', value: function solveVelocity()

        {
            if (this.fx === 0 && this.fy === 0) return;

            // acceleration = force / mass;
            var ax = this.fx / this.mass;
            var ay = this.fy / this.mass;

            // velocity + acceleration
            this.vx += ax;
            this.vy += ay;

            this.x += this.vx;
            this.y += this.vy;

            // reset any applied forces
            this.fx = 0;
            this.fy = 0;
        } }]);return PointPhysics;}(Point);




















//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Body
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var _initialiseProps = function _initialiseProps() {var _this14 = this;this.update = function (_ref20) {var pointer = _ref20.pointer,tick = _ref20.tick;if (_this14.isFixed) return;_this14.applyForceFromMouse(pointer);_this14.solveVelocity();};this.draw = function (_ref21) {var ctx = _ref21.ctx;var x = _this14.x,y = _this14.y;ctx.fillStyle = 'white';ctx.lineWidth = 5;ctx.fillRect(x - 2, y - 2, 4, 4);ctx.beginPath();ctx.arc(x, y, 4, 0, Math.PI * 2, true);ctx.closePath();ctx.fill();};};var
Arm = function (_Entity3) {_inherits(Arm, _Entity3);
    function Arm(_ref9)







    {var width = _ref9.width,height = _ref9.height,position = _ref9.position,resolution = _ref9.resolution,color = _ref9.color,force = _ref9.force,holeColor = _ref9.holeColor;_classCallCheck(this, Arm);var _this8 = _possibleConstructorReturn(this, (Arm.__proto__ || Object.getPrototypeOf(Arm)).call(this));_this8.













































        drawShade = function (_ref10) {var ctx = _ref10.ctx;
            var g1 = _this8.spine[0];
            var g2 = _this8.spine[1];

            var dist = Math.floor(g1.distance(g2) / 2);
            var rad = g1.angleRadians(g2);var _g1$delta =
            g1.delta(g2),_g1$delta2 = _slicedToArray(_g1$delta, 2),dx = _g1$delta2[0],dy = _g1$delta2[1];

            var i = dist;
            while (i >= 0) {
                var n = i / dist;
                var x = lerp(g2.x, g1.x, n);
                var y = lerp(g2.y, g1.y, n);
                // ctx.fillStyle = 'red';
                // ctx.fillRect(x, y, 2, 2);
                ctx.fillStyle = _this8.color;
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.arc(x, y, _this8.width / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = _this8.holeColor;
                ctx.globalAlpha = n;
                ctx.beginPath();
                ctx.arc(x, y, _this8.width / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();

                ctx.globalAlpha = 1;
                i--;
            }
        };_this8.






















        draw = function (_ref11) {var ctx = _ref11.ctx;
            _this8.drawShade({ ctx: ctx });
            ctx.strokeStyle = _this8.color;
            ctx.lineWidth = _this8.width;
            ctx.lineCap = '';
            ctx.lineJoin = 'round';

            // spine
            ctx.beginPath();
            _this8.spine.forEach(function (point, i) {
                // skip first point, handled by drawShade
                if (i === 0) return;
                ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();

            // this.spine.forEach(p => p.draw({ ctx }));
        };_this8.

        update = function (context) {var
            tick = context.tick;
            var l = _this8.spine.length;
            _this8.sticks.forEach(function (stick) {return stick.update(context);});
            _this8.spine.forEach(function (point, i) {
                point.applyForce.apply(point, _toConsumableArray(_this8.force.position));
                var fx = _this8.toValue(Math.sin(i - tick / 3) * 0.055 * (l - i));
                point.applyForce(fx, 0);
                point.update(context);
            });
        };_this8.width = width;_this8.holeWidth = width * 1.5;_this8.holeHeight = width / 2;_this8.color = color;_this8.holeColor = holeColor;_this8.height = height;_this8.position = position;_this8.resolution = resolution;_this8.force = force;_this8.spine = [];_this8.sticks = [];_this8.constructSpine();return _this8;}_createClass(Arm, [{ key: 'constructSpine', value: function constructSpine() {var _this9 = this;var amount = this.height / this.resolution;var pointAmt = Math.round(amount);var offY = this.height / pointAmt;var x = this.position.x;for (var i = 0; i <= pointAmt; i++) {var y = this.position.y - offY * i;var point = new PointPhysics({ x: x, y: y, isFixed: i === 0, mass: 1.9 });this.spine.push(point);}this.sticks = this.spine.map(function (p, i) {if (i < pointAmt) {return new Stick({ p1: p, p2: _this9.spine[i + 1] });}}).filter(function (x) {return x;});} // drawShade = ({ ctx }) => {
        //     const g1 = this.spine[0];
        //     const g2 = this.spine[1];
        //     const dist = g1.distance(g2);
        //     const rad = g1.angleRadians(g2);
        //     ctx.save();
        //     ctx.translate(g1.x, g1.y);
        //     ctx.rotate(rad);
        //     ctx.fillStyle = this.color;
        //     ctx.beginPath();
        //     ctx.arc(dist, 0, this.width / 2, 0, Math.PI * 2, true);
        //     ctx.closePath();
        //     ctx.fill();
        //     const gradient = ctx.createLinearGradient(0, 0, dist, 0);
        //     gradient.addColorStop(1, this.color);
        //     gradient.addColorStop(0, this.holeColor);
        //     ctx.fillStyle = gradient;
        //     ctx.fillRect(0, this.width / -2, dist, this.width);
        //     ctx.restore();
        // };
    }]);return Arm;}(Entity); //*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// WavingArm
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var WavingArm = function (_Entity4) {_inherits(WavingArm, _Entity4);function WavingArm(_ref12) {var position = _ref12.position,width = _ref12.width,height = _ref12.height,color = _ref12.color,force = _ref12.force,isLeft = _ref12.isLeft,holeColor = _ref12.holeColor;_classCallCheck(this, WavingArm);var _this10 = _possibleConstructorReturn(this, (WavingArm.__proto__ || Object.getPrototypeOf(WavingArm)).call(this));_this10.


















        draw = function (_ref13) {var ctx = _ref13.ctx;
            _this10.hole.draw({ ctx: ctx });
            _this10.arm.draw({ ctx: ctx });
            _this10.hand.draw({ ctx: ctx });
        };_this10.

        update = function (context) {
            _this10.arm.update(context);
            _this10.hand.update();
        };_this10.resolution = _this10.toValue(window.innerHeight / 60);_this10.arm = new Arm({ color: color, holeColor: holeColor, width: width, height: height, position: position, force: force, resolution: _this10.resolution });var i = _this10.arm.spine.length - 1;_this10.hand = new Hand({ p1: _this10.arm.spine[i], p2: _this10.arm.spine[i - 1], isLeft: isLeft, width: width * 3.2 });_this10.hole = new Hole({ p1: _this10.arm.spine[0], p2: _this10.arm.spine[1], color: holeColor, width: width * 2, height: width / 2 });return _this10;}return WavingArm;}(Entity);



//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Stick
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Stick = function (_Entity5) {_inherits(Stick, _Entity5);
    function Stick(_ref14) {var p1 = _ref14.p1,p2 = _ref14.p2;_classCallCheck(this, Stick);var _this11 = _possibleConstructorReturn(this, (Stick.__proto__ || Object.getPrototypeOf(Stick)).call(this));_this11.









































        update = function () {
            if (_this11.p1.isFixed && _this11.p2.isFixed) return;
            _this11.solveLinks();
        };_this11.p1 = p1;_this11.p2 = p2;_this11.restingDist = p1.distance(p2);_this11.iterations = Array(2).fill(null); // more solutions per frame, more accurate
        return _this11;}_createClass(Stick, [{ key: 'solveLinks', value: function solveLinks() {// verlet relax constraints solution
            // solve multiple time for accuracy
            var restingDist = this.restingDist,p1 = this.p1,p2 = this.p2,iterations = this.iterations;iterations.forEach(function () {// console.log(restingDist);
                var currentDist = p1.distance(p2);var _p1$delta = p1.delta(p2),_p1$delta2 = _slicedToArray(_p1$delta, 2),diffX = _p1$delta2[0],diffY = _p1$delta2[1]; // difference scalar
                var diff = restingDist - currentDist;var percent = diff / currentDist / 2; // translation for each axis
                // pushed 1/2 the required distance to match their resting distances.
                var translateX = diffX * percent;var translateY = diffY * percent;if (p1.isFixed) {p2.move(-translateX * 2, -translateY * 2);p2.applyForce(-translateX * 2, -translateY * 2);} else if (p2.isFixed) {p1.move(translateX * 2, translateY * 2);p1.applyForce(translateX * 2, translateY * 2);} else {p1.move(translateX, translateY);p1.applyForce(translateX * 2, translateY * 2);p2.move(-translateX, -translateY);p2.applyForce(-translateX * 2, -translateY * 2);}});} }]);return Stick;}(Entity);var Hand = function (_Entity6) {_inherits(Hand, _Entity6);function Hand(_ref15) {var p1 = _ref15.p1,p2 = _ref15.p2,isLeft = _ref15.isLeft,width = _ref15.width;_classCallCheck(this, Hand);var _this12 = _possibleConstructorReturn(this, (Hand.__proto__ || Object.getPrototypeOf(Hand)).call(this));_this12.




























        draw = function (_ref16) {var ctx = _ref16.ctx;var
            h = _this12.h,w = _this12.w;
            var offX = w / 2.7;
            var offY = h / 1.2;
            var x = _this12.p1.x;
            var y = _this12.p1.y;
            ctx.save();
            ctx.translate(x, y);
            if (_this12.isLeft) {
                ctx.scale(-1, 1);
            }
            ctx.rotate(_this12.isLeft ? -_this12.theta : _this12.theta);
            // ctx.shadowColor = '#665b85'
            // ctx.shadowBlur = 0;
            // ctx.shadowOffsetX = this.toValue(10);
            // ctx.shadowOffsetY = this.toValue(-5);
            ctx.drawImage(_this12.canvas, -offX, -offY, w, h);
            ctx.restore();
        };_this12.

        update = function () {
            _this12.setAngle();
        };_this12.p2 = p2;_this12.p1 = p1;_this12.width = width;_this12.isLeft = isLeft;_this12.canvas = document.createElement('canvas');_this12.ctx = _this12.canvas.getContext('2d');_this12.image = document.createElement('img');_this12.image.onload = function (_ref17) {var _ref17$target = _ref17.target,height = _ref17$target.height,width = _ref17$target.width;var ratio = width / height;var w = _this12.width;var h = _this12.width / ratio; // set sizes
            _this12.h = _this12.canvas.height = _this12.image.height = h;_this12.w = _this12.canvas.width = _this12.image.width = w;_this12.drawHand();};_this12.image.src = hand;_this12.setAngle();return _this12;}_createClass(Hand, [{ key: 'setAngle', value: function setAngle() {this.theta = this.p1.angleRadians(this.p2) - Math.PI / 2;} }, { key: 'drawHand', value: function drawHand() {var h = this.h,w = this.w;this.ctx.drawImage(this.image, 0, 0, w, h);} }]);return Hand;}(Entity);


//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Bounds
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Bounds = function () {
    function Bounds(x, y, w, h) {_classCallCheck(this, Bounds);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        var hw = w / 2;
        var hh = h / 2;
        this.center = new Point(hw, hh);
        this.position = new Point(x, y);
    }_createClass(Bounds, [{ key: 'offsetOuter', value: function offsetOuter(





        offset) {var _params = _slicedToArray(
            this.params, 4),x = _params[0],y = _params[1],w = _params[2],h = _params[3];
            return new Bounds(
            x - offset,
            y - offset,
            w + offset * 2,
            h + offset * 2);

        } }, { key: 'offsetInner', value: function offsetInner(

        offset) {var _params2 = _slicedToArray(
            this.params, 4),x = _params2[0],y = _params2[1],w = _params2[2],h = _params2[3];
            return new Bounds(
            x + offset,
            y + offset,
            w - offset * 2,
            h - offset * 2);

        } }, { key: 'params', get: function get() {return [this.x, this.y, this.w, this.h];} }]);return Bounds;}();



//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Hole
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/
var
Hole = function (_Entity7) {_inherits(Hole, _Entity7);
    function Hole(_ref18) {var p1 = _ref18.p1,p2 = _ref18.p2,width = _ref18.width,height = _ref18.height,color = _ref18.color;_classCallCheck(this, Hole);var _this13 = _possibleConstructorReturn(this, (Hole.__proto__ || Object.getPrototypeOf(Hole)).call(this));_this13.


















        draw = function (_ref19) {var ctx = _ref19.ctx;
            ctx.fillStyle = _this13.color;
            ctx.beginPath();
            ctx.ellipse.apply(ctx, _toConsumableArray(_this13.ellipseParams));
            ctx.closePath();
            ctx.fill();
        };_this13.

        update = function (context) {};_this13.width = width;_this13.height = height;_this13.color = color;_this13.p1 = p1;_this13.p2 = p2;_this13.ellipseParams = [_this13.p1.x, _this13.p1.y, _this13.width, _this13.height, 0, Math.PI * 2, false];return _this13;}return Hole;}(Entity);




var hand = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/86839b1c7510ed54299b617e966fd386.svg';


var colors = [
'#d16060',
'#edb07b',
'#7bc4a2',
'#343a5b',
'#9b7bad',
'#a05065'];


var p1 = new Point(
window.innerWidth * .6 * DPR,
window.innerHeight * DPR * .9);


var p2 = new Point(
window.innerWidth * .4 * DPR,
window.innerHeight * DPR * .9);


var width = 30 * DPR;

var color = {
    bg: '#EDF8FF',
    pink: '#EA94BA',
    teal: '#72dbde',
    blue: '#6574ff',
    purple: '#665b85',
    cursor: '#2a2d32' };


// Kick off
new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [
    new Background({ color: '#fff'}),
    new WavingArm({
        position: p1,
        holeColor: color.purple,
        color: color.pink,
        width: window.innerWidth / 54 * DPR,
        height: window.innerHeight * 0.5 * DPR,
        force: new Point(-0.02, -0.2 * DPR),
        isLeft: true }),

    new WavingArm({
        position: p2,
        holeColor: color.purple,
        color: color.pink,
        width: window.innerWidth / 54 * DPR,
        height: window.innerHeight * 0.5 * DPR,
        force: new Point(0.02 * DPR, -0.2 * DPR) }),

    new Cursor({ color: color.cursor, radius: 10 })] });