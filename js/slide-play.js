var SlidePlayVideo;
(function (SlidePlayVideo) {
    var Utils = (function () {
        function Utils() {
            this.canvas = document.getElementById("canvas2");
            this.video = document.getElementById("video");
            this.ctx = this.canvas.getContext("2d");
        }
        Utils.prototype.hasClassName = function (obj, name) {
            return obj.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)"));
        };
        Utils.prototype.addClassName = function (obj, name) {
            if (!this.hasClassName(obj, name)) {
                obj.className = "" + name;
            }
        };
        Utils.prototype.removeClassName = function (obj, name) {
            if (this.hasClassName(obj, name)) {
                var reg = new RegExp("(\\s|^)" + name + "(\\s|$)");
                obj.className = obj.className.replace(reg, '');
            }
        };
        Utils.prototype.toggleClassName = function (obj, name) {
            if (this.hasClassName(obj, name)) {
                this.removeClassName(obj, name);
            }
            else {
                this.addClassName(obj, name);
            }
        };
        //   绘制视频
        Utils.prototype.start = function () {
            var _this = this;
            var play = function () {
                //this.offsetCtx.drawImage(this.video,0,0);
                _this.ctx.drawImage(_this.video, 0, 0);
                requestAnimationFrame(play);
            };
            requestAnimationFrame(play);
            this.video.autoplay = true;
            this.video.load();
        };
        return Utils;
    }());
    SlidePlayVideo.Utils = Utils;
    // 绘制滑动图像类
    var Slider = (function () {
        function Slider(min, max, value) {
            this.min = (min === undefined) ? 0 : min;
            this.max = (max === undefined) ? 350 : max;
            this.value = (value === undefined) ? 10 : value;
            this.x = 0;
            this.y = 0;
            this.isDragging = false;
        }
        //    绘制遮罩图片
        Slider.prototype.drawVideo = function (ctx) {
            var _this = this;
            var utils = new Utils();
            var image = new Image();
            ctx.translate(this.value, this.min);
            image.onload = function () {
                ctx.drawImage(image, 10, 0, 60, 60);
            };
            image.src = "./assetr/p1_bar.png";
            var canvas = document.getElementById("canvas");
            var canvasOffset = document.getElementById("canvas");
            var canvasOffsetX = canvasOffset.offsetLeft;
            var canvasOffsetY = canvasOffset.offsetWidth;
            ctx.font = "20pt Arial";
            ctx.fillStyle = "#fff";
            ctx.strokeStyle = "#fff";
            ctx.fillText("滑动来接听电话", canvas.width / 2 - 80, canvas.height / 2 + 10);
            ctx.strokeText("滑动来接听电话", canvas.width / 2 - 80, canvas.height / 2 + 10);
            var handletouchStart = function (e) {
                _this.x = parseInt(e.touches[0].clientX) - canvasOffsetX;
                _this.isDragging = true;
            };
            var handleTouchMouse = function (e) {
                _this.x = parseInt(e.touches[0].clientX) - canvasOffsetX;
                if (_this.isDragging) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, _this.x, 0, 60, 60);
                    try {
                        if (_this.x > _this.max) {
                            var page1 = document.getElementById("page1");
                            page1.style.display = "none";
                            var page2 = document.getElementById("page2");
                            page2.style.display = "flex";
                            page2.style.visibility = "visible";
                            utils.addClassName(page2, "animation");
                            utils.start();
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                // this.isDragging = false;
            };
            var handleTouchEnd = function (e) {
                _this.x = canvasOffsetX;
                _this.isDragging = false;
                if ((_this.x < _this.max) || (_this.x < 0)) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    var image_1 = new Image();
                    image_1.onload = function () {
                        ctx.drawImage(image_1, 10, 0, 60, 60);
                    };
                    image_1.src = "./assetr/p1_bar.png";
                    ctx.font = "20pt Arial";
                    ctx.fillStyle = "#fff";
                    ctx.strokeStyle = "#fff";
                    ctx.fillText("滑动来接听电话", canvas.width / 2 - 80, canvas.height / 2 + 10);
                    ctx.strokeText("滑动来接听电话", canvas.width / 2 - 80, canvas.height / 2 + 10);
                }
            };
            canvas.addEventListener("touchstart", handletouchStart, false);
            canvas.addEventListener("touchmove", handleTouchMouse, false);
            canvas.addEventListener("touchend", handleTouchEnd, false);
        };
        return Slider;
    }());
    var SliderVideo = (function () {
        function SliderVideo() {
            this.slider = new Slider();
        }
        SliderVideo.prototype.drawImage = function () {
            this.canvas = document.getElementById("canvas");
            var ctx = this.canvas.getContext("2d");
            this.slider.drawVideo(ctx);
        };
        return SliderVideo;
    }());
    SlidePlayVideo.SliderVideo = SliderVideo;
})(SlidePlayVideo || (SlidePlayVideo = {}));
window.onload = function () {
    var a = new SlidePlayVideo.SliderVideo();
    a.drawImage();
    //let b = new SlidePlayVideo.Utils().start();
};
