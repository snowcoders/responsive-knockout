define(["require", "exports", "knockout", "./index.viewModel", "text!./index.html", "text!./index.css"], function (require, exports, ko, indexVM) {
    "use strict";
    var indexHtml = require('text!./index.html');
    var indexCss = require('text!./index.css');
    var controlName = 'stocktrader-index';
    var link = document.createElement("style");
    link.type = "text/css";
    link.innerHTML = indexCss;
    document.getElementsByTagName("head")[0].appendChild(link);
    if (!ko.components.isRegistered(controlName)) {
        ko.components.register(controlName, {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    var element = componentInfo.element;
                    if (element.classList) {
                        element.classList.add(controlName);
                    }
                    else {
                        element.className += ' ' + controlName;
                    }
                    if (indexVM != null) {
                        return new indexVM.ResponsiveViewModel(params);
                    }
                    else {
                        return null;
                    }
                }
            },
            template: indexHtml
        });
    }
    return indexVM;
});
//# sourceMappingURL=index.component.js.map