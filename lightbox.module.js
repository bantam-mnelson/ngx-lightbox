"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lightbox_service_1 = require("./lightbox.service");
var lightbox_component_1 = require("./lightbox.component");
var lightbox_config_service_1 = require("./lightbox-config.service");
var lightbox_event_service_1 = require("./lightbox-event.service");
var lightbox_overlay_component_1 = require("./lightbox-overlay.component");
var core_1 = require("@angular/core");
var LightboxModule = /** @class */ (function () {
    function LightboxModule() {
    }
    LightboxModule = __decorate([
        core_1.NgModule({
            declarations: [lightbox_overlay_component_1.LightboxOverlayComponent, lightbox_component_1.LightboxComponent],
            providers: [
                lightbox_service_1.Lightbox,
                lightbox_config_service_1.LightboxConfig,
                lightbox_event_service_1.LightboxEvent,
                lightbox_event_service_1.LightboxWindowRef
            ],
            entryComponents: [lightbox_overlay_component_1.LightboxOverlayComponent, lightbox_component_1.LightboxComponent]
        })
    ], LightboxModule);
    return LightboxModule;
}());
exports.LightboxModule = LightboxModule;
//# sourceMappingURL=lightbox.module.js.map