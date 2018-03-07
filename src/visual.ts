module powerbi.extensibility.visual {
    "use strict";
    export class ImageVisual implements IVisual {
        private target: HTMLElement;        
        private settings: VisualSettings;

        constructor(options: VisualConstructorOptions) {            
            this.target = options.element;            
        }

        public update(options: VisualUpdateOptions) {
            this.settings = ImageVisual.parseSettings(options && options.dataViews && options.dataViews[0]);
            
            while (this.target.firstChild) {
                this.target.removeChild(this.target.firstChild);
            }

            let image = options.dataViews[0].categorical.categories[0].values[0];
            if (image != null) {

                let imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container")
                
                let imageUrl = image.toString();
                
                let oImg = document.createElement("img");
                oImg.setAttribute("alt", "");
                oImg.setAttribute("src", imageUrl);
                document.body.appendChild(oImg);
                               
                if (this.settings.imageOptions.circle) {
                    oImg.classList.add("circle")                    
                }
                
                if (this.settings.imageOptions.borderWidth > 0) {
                    let desiredWidth = (options.viewport.width - (this.settings.imageOptions.borderWidth * 2)).toFixed(0);{
                        oImg.setAttribute("style", `width: ${desiredWidth}px; border-style: solid; border-width: ${this.settings.imageOptions.borderWidth}px; border-color: ${this.settings.imageOptions.borderColor}`);
                    }                    
                } else {
                    oImg.setAttribute("style", `width: ${options.viewport.width.toFixed(0)}px;`);                    
                }

                imageContainer.appendChild(oImg);
                this.target.appendChild(imageContainer);
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