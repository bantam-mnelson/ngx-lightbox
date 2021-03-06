"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var lightbox_event_service_1 = require("./lightbox-event.service");
var lightbox_overlay_component_1 = require("./lightbox-overlay.component");
describe('[ Unit - LightboxOverlayComponent ]', function () {
    var fixture;
    var lightboxEvent;
    var mockData;
    beforeEach(function () {
        mockData = {
            options: {
                fadeDuration: 1
            }
        };
    });
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [lightbox_overlay_component_1.LightboxOverlayComponent],
            providers: [lightbox_event_service_1.LightboxEvent]
        });
        fixture = testing_1.TestBed.createComponent(lightbox_overlay_component_1.LightboxOverlayComponent);
        // mock options and ref
        fixture.componentInstance.options = mockData.options;
        fixture.componentInstance.cmpRef = { destroy: jasmine.createSpy('spy') };
        fixture.detectChanges();
    });
    beforeEach(testing_1.inject([lightbox_event_service_1.LightboxEvent], function (lEvent) {
        lightboxEvent = lEvent;
    }));
    it('should init the component with correct styling', function () {
        expect(fixture.nativeElement.getAttribute('class')).toContain('lightboxOverlay animation fadeInOverlay');
        expect(fixture.nativeElement.getAttribute('style'))
            .toMatch(new RegExp("animation.*" + mockData.options.fadeDuration + "s"));
    });
    describe('{ method: close }', function () {
        it('should self destroy and broadcast event when component is closed', testing_1.fakeAsync(function () {
            spyOn(lightboxEvent, 'broadcastLightboxEvent').and.callThrough();
            fixture.componentInstance.close();
            expect(lightboxEvent.broadcastLightboxEvent).toHaveBeenCalledWith({ id: lightbox_event_service_1.LIGHTBOX_EVENT.CLOSE, data: null });
            testing_1.tick();
            fixture.detectChanges();
            expect(fixture.nativeElement.getAttribute('class')).toContain('lightboxOverlay animation fadeOutOverlay');
            testing_1.tick(mockData.options.fadeDuration * 1000 + 1);
            expect(fixture.componentInstance.cmpRef.destroy).toHaveBeenCalledTimes(1);
        }));
    });
    describe('{ method: ngOnDestroy }', function () {
        it('should unsubscribe event when destroy is called', function () {
            spyOn(fixture.componentInstance['_subscription'], 'unsubscribe').and.callFake(function () { });
            fixture.componentInstance.ngOnDestroy();
            expect(fixture.componentInstance['_subscription'].unsubscribe).toHaveBeenCalledTimes(1);
        });
    });
});
//# sourceMappingURL=lightbox-overlay.component.spec.js.map