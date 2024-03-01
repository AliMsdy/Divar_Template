import { lazy } from "react";

// this function is more generic and used for both named export and default export components
// export function lazyLoad(path, namedExport) {
//   return lazy(() => {
//     const promise = import(path);
//     if (!namedExport) {
//       // for default exports
//       return promise;
//     } else {
//       // for named exports
//       return promise.then((module) => ({ default: module[namedExport] }));
//     }
//   });
// }
// this is only for named export
// export function lazyLoad(path, moduleName) {
//   return lazy(() => {
//     const promise = import(`../pages/${path}.jsx`);
//     return promise.then((module) => ({
//       default: module[moduleName ? moduleName : path],
//     }));
//   });
// }
export function lazyLoad(path, moduleName) {
  return lazy(() => {
    const promise = import(path);
    return promise.then((module) => ({
      default: module[moduleName],
    }));
  });
}
