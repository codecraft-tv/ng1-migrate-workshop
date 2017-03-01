import {OpaqueToken} from "@angular/core";
export const Toaster = new OpaqueToken("Toaster");

export function toasterServiceFactory(i: any) {
  return i.get('toaster');
}
export const toasterServiceProvider = {
  provide: Toaster,
  useFactory: toasterServiceFactory,
  deps: ['$injector']
};


export const UIRouterState = new OpaqueToken("UIRouterState");

export function uiRouterStateServiceFactory(i: any) {
  return i.get('$state');
}
export const uiRouterStateProvider = {
  provide: UIRouterState,
  useFactory: uiRouterStateServiceFactory,
  deps: ['$injector']
};


export const UIRouterStateParams = new OpaqueToken("UIRouterStateParams");

export function uiRouterStateParamsServiceFactory(i: any) {
  return i.get('$stateParams');
}
export const uiRouterStateParamsProvider = {
  provide: UIRouterStateParams,
  useFactory: uiRouterStateParamsServiceFactory,
  deps: ['$injector']
};