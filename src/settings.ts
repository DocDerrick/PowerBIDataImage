module powerbi.extensibility.visual {
    "use strict";
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

    export class VisualSettings extends DataViewObjectsParser {
        public imageOptions: imageSettings = new imageSettings();
      }

    export class imageSettings {   
        public circle: boolean = false;  
        public borderColor: string = "#fff";
        public borderWidth: number = 5;        
     }
}
