/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    "use strict";
    export class DataImageVisual implements IVisual {
        private target: HTMLElement;        
        private settings: VisualSettings;

        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);
            this.target = options.element;            
        }

        public update(options: VisualUpdateOptions) {
            this.settings = DataImageVisual.parseSettings(options && options.dataViews && options.dataViews[0]);
            console.log('Visual update', options);

            while (this.target.firstChild) {
                this.target.removeChild(this.target.firstChild);
            }

            let image = options.dataViews[0].categorical.categories[0].values[0];
            if (image != null) {
                
                let imageUrl = image.toString();
                console.log(imageUrl);

                let oImg = document.createElement("img");
                oImg.setAttribute('src', imageUrl);
                oImg.setAttribute('alt', '');                
                document.body.appendChild(oImg);

                let style = "";
                
                if (this.settings.imageOptions.circle) {
                    style = style + "border-radius: 50%;";
                }
                
                if (this.settings.imageOptions.borderWidth > 0) {
                    style = style + "border-style: solid; border-width: " + this.settings.imageOptions.borderWidth + "px; border-color: " + this.settings.imageOptions.borderColor;
                }

                oImg.setAttribute('style', style);
                this.target.appendChild(oImg);
            } else {
                console.log('Image was null');
            }            
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            
            let objectName = options.objectName;
            let objectEnumeration: VisualObjectInstance[] = [];
            switch (objectName) {
                case 'imageOptions':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {                            
                            borderColor: this.settings.imageOptions.borderColor,
                            borderWidth: this.settings.imageOptions.borderWidth,
                            circle: this.settings.imageOptions.circle
                        },
                        validValues: {                            
                            borderWidth: {
                                numberRange: {
                                    min: 0,
                                    max: 20
                                }
                            }
                        },
                        selector: null
                    });
                    break;
            };

            return objectEnumeration;
        }
    }
}