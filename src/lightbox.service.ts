import { Observable, Subject } from 'rxjs';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector
} from '@angular/core';
import { LightboxComponent } from './lightbox.component';
import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LIGHTBOX_EVENT, IAlbum, IEvent } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';

@Injectable()
export class Lightbox {
  private _documentRef: Document;
  private _event: any;
  private _deleteSrcSource: Subject<Object>;
  public deleteSrc$: Observable<Object>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private _applicationRef: ApplicationRef,
    private _lightboxConfig: LightboxConfig,
    private _lightboxEvent: LightboxEvent
  ) {
    this._documentRef = window.document;
    this._deleteSrcSource = new Subject<Object>();
    this.deleteSrc$ = this._deleteSrcSource.asObservable();
    this._event.subscription = this._lightboxEvent.lightboxEvent$
      .subscribe((event: IEvent) => this._onReceivedEvent(event));
  }

  open(album: Array<IAlbum>, curIndex = 0, options = {}): void {
    const overlayComponentRef = this._createComponent(LightboxOverlayComponent);
    const componentRef = this._createComponent(LightboxComponent);
    const newOptions = {};

    // broadcast open event
    this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.OPEN });
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
    setTimeout(() => {
      this._applicationRef.attachView(overlayComponentRef.hostView);
      this._applicationRef.attachView(componentRef.hostView);
      overlayComponentRef.onDestroy(() => {
        this._applicationRef.detachView(overlayComponentRef.hostView);
      });
      componentRef.onDestroy(() => {
        this._applicationRef.detachView(componentRef.hostView);
      });

      this._documentRef.querySelector('body').appendChild(overlayComponentRef.location.nativeElement);
      this._documentRef.querySelector('body').appendChild(componentRef.location.nativeElement);
    });
  }

  close(): void {
    if (this._lightboxEvent) {
      this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE });
    }
  }

  _createComponent(ComponentClass: any): ComponentRef<any> {
    const factory = this._componentFactoryResolver.resolveComponentFactory(ComponentClass);
    const component = factory.create(this._injector);

    return component;
  }

  private _onReceivedEvent(event: IEvent): void {
    switch (event.id) {
      case LIGHTBOX_EVENT.DELETE:
        this._deleteSrcSource.next(event.data);
        break;
      default:
        break;
    }
  }
}
