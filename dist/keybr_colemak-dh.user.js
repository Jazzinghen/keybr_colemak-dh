
// ==UserScript==
// @name        Colemak-DH layout converter
// @namespace   https://github.com/Jazzinghen
// @description Simple script to change the Colemak layout to Colemak-DH on Keybr.com
// @supportURL  https://github.com/Jazzinghen/keybr_colemak-dh/issues
// @match       https://www.keybr.com/*
// @icon        https://www.google.com/s2/favicons?domain=keybr.com
// @version     0.1.1
// @author      Michele Bianchi
// @require     https://cdn.jsdelivr.net/combine/npm/@violentmonkey/dom@2,npm/@violentmonkey/ui@0.7
// @grant       GM.getValue
// @grant       GM.setValue
// ==/UserScript==

(function () {
'use strict';

var stylesheet="/*! tailwindcss v2.2.19 | MIT License | https://tailwindcss.com*/\n\n/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */html{-webkit-text-size-adjust:100%;line-height:1.15;-moz-tab-size:4;tab-size:4}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;margin:0}hr{color:inherit;height:0}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}legend{padding:0}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:initial;background-image:none}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{font-family:inherit;line-height:inherit}*,:after,:before{border:0 solid;box-sizing:border-box}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}button{cursor:pointer}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{color:inherit;line-height:inherit;padding:0}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}*,:after,:before{--tw-border-opacity:1;border-color:rgba(229,231,235,var(--tw-border-opacity))}.style-module_table__YLiua{display:table}@keyframes style-module_spin__I7NnL{to{transform:rotate(1turn)}}@keyframes style-module_ping__H9cxL{75%,to{opacity:0;transform:scale(2)}}@keyframes style-module_pulse__4cbvw{50%{opacity:.5}}@keyframes style-module_bounce__sTNOx{0%,to{animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}*,:after,:before{--tw-shadow:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000}.style-module_col-dh_zone-a__SsIuH rect{fill:url(#key-zone-a)}.style-module_col-dh_zone-b__6Ele8 rect{fill:url(#key-zone-b)}";

// CSS for finger areas support
const style = document.createElement('style');
style.textContent = stylesheet;
document.head.append(style);
var FingerZone;

(function (FingerZone) {
  FingerZone["One"] = "col-dh_zone-a";
  FingerZone["Two"] = "col-dh_zone-b";
  FingerZone["None"] = "";
})(FingerZone || (FingerZone = {}));
// Some entries are remapped, but that's to fix the lables of the official Colemak mapping, which changes the label
// but not the attribute `data-key`


const KEYS_TO_REMAP = [// Top row
{
  from_data_key: 'KeyQ',
  to_data_key: 'KeyQ',
  to_text: 'Q',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyW',
  to_data_key: 'KeyW',
  to_text: 'W',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyE',
  to_data_key: 'KeyF',
  to_text: 'F',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyR',
  to_data_key: 'KeyP',
  to_text: 'P',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyT',
  to_data_key: 'KeyB',
  to_text: 'B',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyY',
  to_data_key: 'KeyJ',
  to_text: 'J',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyU',
  to_data_key: 'KeyL',
  to_text: 'L',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyI',
  to_data_key: 'KeyU',
  to_text: 'U',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyO',
  to_data_key: 'KeyY',
  to_text: 'Y',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyP',
  to_data_key: 'Semicolon',
  to_text: ';',
  zone: FingerZone.None
}, // Home row
{
  from_data_key: 'KeyA',
  to_data_key: 'KeyA',
  to_text: 'A',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyS',
  to_data_key: 'KeyR',
  to_text: 'R',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyD',
  to_data_key: 'KeyS',
  to_text: 'S',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyF',
  to_data_key: 'KeyT',
  to_text: 'T',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyG',
  to_data_key: 'KeyG',
  to_text: 'G',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyH',
  to_data_key: 'KeyM',
  to_text: 'M',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyJ',
  to_data_key: 'KeyN',
  to_text: 'N',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyK',
  to_data_key: 'KeyE',
  to_text: 'E',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyL',
  to_data_key: 'KeyI',
  to_text: 'I',
  zone: FingerZone.One
}, {
  from_data_key: 'Semicolon',
  to_data_key: 'KeyO',
  to_text: 'O',
  zone: FingerZone.Two
}, // Bottom row
{
  from_data_key: 'KeyZ',
  to_data_key: 'KeyX',
  to_text: 'X',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyX',
  to_data_key: 'KeyC',
  to_text: 'C',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyC',
  to_data_key: 'KeyD',
  to_text: 'D',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyV',
  to_data_key: 'KeyV',
  to_text: 'V',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyB',
  to_data_key: 'KeyZ',
  to_text: 'Z',
  zone: FingerZone.Two
}, {
  from_data_key: 'KeyN',
  to_data_key: 'KeyK',
  to_text: 'K',
  zone: FingerZone.One
}, {
  from_data_key: 'KeyM',
  to_data_key: 'KeyH',
  to_text: 'H',
  zone: FingerZone.One
}];

function find_key(root, key) {
  const key_element = root.querySelector(`svg[data-key='${key}']`);

  if (key_element == null) {
    throw new TypeError('The provided key was not a valid data-key entry!');
  }

  return key_element;
}

function remap_keys(root, mappings) {
  // We have to run this in two passes otherwise we risk to overwrite previous changes
  for (const map of mappings) {
    try {
      const key_element = find_key(root, map.from_data_key);
      key_element.setAttribute('data-key', `${map.from_data_key}_tmp`);
      const key_text = key_element.querySelector('text');

      if (key_text != null) {
        key_text.innerHTML = map.to_text;
      }
    } catch (e) {
      if (e instanceof TypeError) {
        console.warn(e);
      } else {
        throw e;
      }
    }
  }

  const url_components = document.URL.split('/');
  const last_url_component = url_components[url_components.length - 1];
  const is_profile_page = last_url_component.localeCompare('profile', undefined, {
    sensitivity: 'accent'
  }) != 0;

  for (const map of mappings) {
    try {
      const key_element = find_key(root, `${map.from_data_key}_tmp`);
      key_element.setAttribute('data-key', map.to_data_key);

      if (is_profile_page && map.zone != FingerZone.None) {
        key_element.classList.add(map.zone);
      }
    } catch (e) {
      if (e instanceof TypeError) {
        console.warn(e);
      } else {
        throw e;
      }
    }
  }
}

function find_keyboard() {
  const entry_point = document.getElementById('key-zone-a');

  if (entry_point == null) {
    throw new Error('Keyboard not found!');
  }

  let current_parent = entry_point.parentElement;

  while (current_parent != null && current_parent.tagName.localeCompare('svg', undefined, {
    sensitivity: 'accent'
  }) != 0) {
    current_parent = current_parent.parentElement;
  }

  if (current_parent == null) {
    throw new Error('Keyboard not found!');
  }

  for (const child of current_parent.children) {
    if (child.children.length > 2) {
      if (child.tagName.localeCompare('svg', undefined, {
        sensitivity: 'accent'
      }) == 0) {
        return child;
      }
    }
  }

  throw new Error('Keyboard not found!');
}

VM.observe(document.body, () => {
  if (KEYS_TO_REMAP == null) {
    console.error('No layout remap data available!');
    return false;
  }

  const node = document.querySelector(`svg[data-key=${KEYS_TO_REMAP[KEYS_TO_REMAP.length - 1].from_data_key}]`);

  if (node == null) {
    return false;
  }

  try {
    const keyboard_element = find_keyboard();

    if (keyboard_element == null) {
      return false;
    }

    remap_keys(keyboard_element, KEYS_TO_REMAP);
  } catch (e) {
    console.error(e);
  }

  return true;
});

})();
