define(["require", "exports"], function (require, exports) {
    "use strict";
    var ResizableViewModel = (function () {
        function ResizableViewModel(props) {
            this.props = props;
        }
        ResizableViewModel.prototype.onAfterRender = function (elements) {
            if (elements.length === 0) {
                console.error(this.props.nameOfComponent + " - Cannot perform size measurements due to no child elements being rendered");
                return;
            }
            this.props.resize = this.onResize.bind(this);
            this.elementToMeasure = elements[0].parentElement;
            window.addEventListener("resize", this.throttle(this.onResize.bind(this), 100));
            this.onResize();
        };
        ResizableViewModel.prototype.onResize = function () {
            if (this.elementToMeasure == null) {
                return;
            }
            var index = 0;
            var sizeOptions = this.props.sizeClasses;
            do {
                this.elementToMeasure.className = sizeOptions[index];
                index++;
            } while (index < sizeOptions.length &&
                this.elementToMeasure.offsetWidth < this.elementToMeasure.scrollWidth);
            if (this.elementToMeasure.offsetWidth < this.elementToMeasure.scrollWidth) {
                console.error(this.props.nameOfComponent + " - Smallest size is not small enough. { parentSize: " + this.elementToMeasure.offsetWidth + ", contentSize: " + this.elementToMeasure.scrollWidth + "}");
            }
        };
        ResizableViewModel.prototype.throttle = function (fn, time) {
            if (time === void 0) { time = 50; }
            var timer = null;
            var throttledFn = function () {
                if (timer == null) {
                    timer = setTimeout(function () {
                        fn();
                        timer = null;
                    }, time);
                }
            };
            return throttledFn;
        };
        return ResizableViewModel;
    }());
    exports.ResizableViewModel = ResizableViewModel;
});
//# sourceMappingURL=index.viewModel.js.map