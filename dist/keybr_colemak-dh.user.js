
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
// @grant       none
// ==/UserScript==

(function () {
'use strict';

var css_248z = ".col-dh_zone-a rect{fill:url(#key-zone-a)}.col-dh_zone-b rect{fill:url(#key-zone-b)}";

const style = document.createElement('style');
style.textContent = css_248z;
document.head.append(style);
var FingerZone;

(function (FingerZone) {
  FingerZone["One"] = "col-dh_zone-a";
  FingerZone["Two"] = "col-dh_zone-b";
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
  zone: undefined
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
      key_text.innerHTML = map.to_text;
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
  console.log('Current url: %s; URL end: %s', document.URL, last_url_component);
  const is_profile_page = last_url_component.localeCompare('profile', undefined, {
    sensitivity: 'accent'
  }) != 0;

  for (const map of mappings) {
    try {
      const key_element = find_key(root, `${map.from_data_key}_tmp`);
      key_element.setAttribute('data-key', map.to_data_key);

      if (is_profile_page && map.zone != null) {
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
  let current_parent = entry_point.parentElement;

  while (current_parent.tagName.localeCompare('svg', undefined, {
    sensitivity: 'accent'
  }) != 0) {
    current_parent = current_parent.parentElement;
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
  const node = document.querySelector(`svg[data-key=${KEYS_TO_REMAP.at(-1).from_data_key}]`);

  if (node) {
    let keyboard_element = undefined;

    try {
      keyboard_element = find_keyboard();
    } catch (e) {
      console.error(e);
    }

    if (keyboard_element == null) {
      return false;
    }

    remap_keys(keyboard_element, KEYS_TO_REMAP);
    return true;
  }
});

})();
