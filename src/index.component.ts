/// <amd-dependency path="text!./index.html" />
/// <amd-dependency path="text!./index.css" />

// external dependencies
import * as ko from 'knockout';

// dependencies for this control specifically
import * as indexVM from './index.viewModel';
var indexHtml = require('text!./index.html');
var indexCss = require('text!./index.css');

let controlName = 'snowcoders-responsive';

// load the css for the component
var link = document.createElement("style");
link.type = "text/css";
link.innerHTML = indexCss;
document.getElementsByTagName("head")[0].appendChild(link);

// actually register the component with the html
if (!ko.components.isRegistered(controlName)) {
    ko.components.register(controlName, {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                let element = componentInfo.element as HTMLElement;
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

export = indexVM;