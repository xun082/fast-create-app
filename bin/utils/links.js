export const links = new Map([
  ["React-Ts", "https://gitee.com/arcsiny/template.git"],
]);

export const fileTypeTemplate = new Map([
  ["component", "react.ejs"],
  ["page", "react.ejs"],
  ["redux", "redux.ejs"],
  ["axios", "axios.ejs"],
]);

export function fileTypeLinks(suffix, filename = "index.js") {
  return new Map([
    ["component", [`src/components/${filename}`, `index.${suffix}sx`]],
    ["page", [`src/pages/${filename}`, `index.${suffix}sx`]],
    ["redux", [`src/store/modules`, `${filename}.${suffix}s`]],
    ["axios", [`src/services`, `${filename}.${suffix}s`]],
    ["redux-entry", [`src/modules`, `index.${suffix}s`]],
  ]);
}
