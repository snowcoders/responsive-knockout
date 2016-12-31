import * as ko from 'knockout';

export interface IResponsiveViewModelProps {
    nameOfComponent: string;
    sizeClasses: string[];
    // Function provided to the caller so that if something changes (e.g. data) this Responsive can be notified of the change
    resize?: () => void;
}

export class ResponsiveViewModel {
    private props: IResponsiveViewModelProps;

    private elementToMeasure: HTMLElement;

    constructor(props: IResponsiveViewModelProps) {
        this.props = props;
    }

    private onAfterRender(elements: HTMLElement[]): void {
        if (elements.length === 0) {
            console.error(this.props.nameOfComponent + " - Cannot perform size measurements due to no child elements being rendered");
            return;
        }

        this.props.resize = this.onResize.bind(this);

        this.elementToMeasure = elements[0].parentElement;

        window.addEventListener("resize", this.throttle(this.onResize.bind(this), 100));
        this.onResize();
    }

    private onResize(): void {
        if (this.elementToMeasure == null) {
            return;
        }

        // size classes from largest to smallest
        var index = 0;
        let sizeOptions = this.props.sizeClasses;

        do {
            // Note: We do not use a knockout observable as they do not refresh immediately
            this.elementToMeasure.className = sizeOptions[index];
            index++;
        } while (index < sizeOptions.length &&
            this.elementToMeasure.offsetWidth < this.elementToMeasure.scrollWidth);

        if (this.elementToMeasure.offsetWidth < this.elementToMeasure.scrollWidth) {
            console.error(this.props.nameOfComponent + " - Smallest size is not small enough. { parentSize: " + this.elementToMeasure.offsetWidth + ", contentSize: " + this.elementToMeasure.scrollWidth + "}");
        }
    }

    private throttle(fn: (...args: any[]) => void, time: number = 50): (...args: any[]) => void {
        let timer: number = null;
        let throttledFn = () => {
            if (timer == null) {
                timer = setTimeout(() => {
                    fn();
                    timer = null;
                }, time);
            }
        };

        return throttledFn;
    }
}
