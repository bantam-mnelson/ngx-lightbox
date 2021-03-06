"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var lightbox_component_1 = require("./lightbox.component");
var lightbox_config_service_1 = require("./lightbox-config.service");
var lightbox_event_service_1 = require("./lightbox-event.service");
var lightbox_overlay_component_1 = require("./lightbox-overlay.component");
var Lightbox = /** @class */ (function () {
    function Lightbox(_componentFactoryResolver, _injector, _applicationRef, _lightboxConfig, _lightboxEvent) {
        var _this = this;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._injector = _injector;
        this._applicationRef = _applicationRef;
        this._lightboxConfig = _lightboxConfig;
        this._lightboxEvent = _lightboxEvent;
        this._documentRef = window.document;
        this._deleteSrcSource = new rxjs_1.Subject();
        this.deleteSrc$ = this._deleteSrcSource.asObservable();
        this._event.subscription = this._lightboxEvent.lightboxEvent$
            .subscribe(function (event) { return _this._onReceivedEvent(event); });
    }
    Lightbox.prototype.open = function (album, curIndex, options) {
        var _this = this;
        if (curIndex === void 0) { curIndex = 0; }
        if (options === void 0) { options = {}; }
        var overlayComponentRef = this._createComponent(lightbox_overlay_component_1.LightboxOverlayComponent);
        var componentRef = this._createComponent(lightbox_component_1.LightboxComponent);
        var newOptions = {};
        // broadcast open event
        this._lightboxEvent.broadcastLightboxEvent({ id: lightbox_event_service_1.LIGHTBOX_EVENT.OPEN });
        Object.assign(newOptions, this._lightboxConfig, options);
        // attach input to lightbox
        componentRef.instance.album = album;
        componentRef.instance.currentImageIndex = curIndex;
        componentRef.instance.options = newOptions;
        componentRef.instance.cmpRef = componentRef;
        // attach input to overlay
        overlayComponentRef.instance.options = newOptions;
        overlayComponentRef.instance.cmpRef = overlayComponentRef;
        // FIXME: not sure why last event is broadcasted (which is CLOSED) and make
        // lightbox can not be opened the second time.
        // Need to timeout so that the OPEN event is set before component is initialized
        setTimeout(function () {
            _this._applicationRef.attachView(overlayComponentRef.hostView);
            _this._applicationRef.attachView(componentRef.hostView);
            overlayComponentRef.onDestroy(function () {
                _this._applicationRef.detachView(overlayComponentRef.hostView);
            });
            componentRef.onDestroy(function () {
                _this._applicationRef.detachView(componentRef.hostView);
            });
            _this._documentRef.querySelector('body').appendChild(overlayComponentRef.location.nativeElement);
            _this._documentRef.querySelector('body').appendChild(componentRef.location.nativeElement);
        });
    };
    Lightbox.prototype.close = function () {
        if (this._lightboxEvent) {
            this._lightboxEvent.broadcastLightboxEvent({ id: lightbox_event_service_1.LIGHTBOX_EVENT.CLOSE });
        }
    };
    Lightbox.prototype._createComponent = function (ComponentClass) {
        var factory = this._componentFactoryResolver.resolveComponentFactory(ComponentClass);
        var component = factory.create(this._injector);
        return component;
    };
    Lightbox.prototype._onReceivedEvent = function (event) {
        switch (event.id) {
            case lightbox_event_service_1.LIGHTBOX_EVENT.DELETE:
                this._deleteSrcSource.next(event.data);
                break;
            default:
                break;
        }
    };
    Lightbox = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.Injector,
            core_1.ApplicationRef,
            lightbox_config_service_1.LightboxConfig,
            lightbox_event_service_1.LightboxEvent])
    ], Lightbox);
    return Lightbox;
}());
exports.Lightbox = Lightbox;
//# sourceMappingURL=lightbox.service.js.map