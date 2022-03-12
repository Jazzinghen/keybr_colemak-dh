"use strict";

class KeyRemap {
  from_data_key: string;
  to_data_key: string;
  to_text: string;
}

// QWERTY to Colemak-dh remap definition
// Some entries are remapped, but that's to fix the lables of the official Colemak mapping, which changes the label
// but not the attribute `data-key`
const KEYS_TO_REMAP: KeyRemap[] = [
  // Top row
  { from_data_key: 'KeyQ', to_data_key: 'KeyQ', to_text: 'Q' },
  { from_data_key: 'KeyW', to_data_key: 'KeyW', to_text: 'W' },
  { from_data_key: 'KeyE', to_data_key: 'KeyF', to_text: 'F' },
  { from_data_key: 'KeyR', to_data_key: 'KeyP', to_text: 'P' },
  { from_data_key: 'KeyT', to_data_key: 'KeyB', to_text: 'B' },
  { from_data_key: 'KeyY', to_data_key: 'KeyJ', to_text: 'J' },
  { from_data_key: 'KeyU', to_data_key: 'KeyL', to_text: 'L' },
  { from_data_key: 'KeyI', to_data_key: 'KeyU', to_text: 'U' },
  { from_data_key: 'KeyO', to_data_key: 'KeyY', to_text: 'Y' },
  { from_data_key: 'KeyP', to_data_key: 'Semicolon', to_text: ';' },
  // Home row
  { from_data_key: 'KeyA', to_data_key: 'KeyA', to_text: 'A' },
  { from_data_key: 'KeyS', to_data_key: 'KeyR', to_text: 'R' },
  { from_data_key: 'KeyD', to_data_key: 'KeyS', to_text: 'S' },
  { from_data_key: 'KeyF', to_data_key: 'KeyT', to_text: 'T' },
  { from_data_key: 'KeyG', to_data_key: 'KeyG', to_text: 'G' },
  { from_data_key: 'KeyH', to_data_key: 'KeyM', to_text: 'M' },
  { from_data_key: 'KeyJ', to_data_key: 'KeyN', to_text: 'N' },
  { from_data_key: 'KeyK', to_data_key: 'KeyE', to_text: 'E' },
  { from_data_key: 'KeyL', to_data_key: 'KeyI', to_text: 'I' },
  { from_data_key: 'Semicolon', to_data_key: 'KeyO', to_text: 'O' },
  // Bottom row
  { from_data_key: 'KeyZ', to_data_key: 'KeyX', to_text: 'X' },
  { from_data_key: 'KeyX', to_data_key: 'KeyC', to_text: 'C' },
  { from_data_key: 'KeyC', to_data_key: 'KeyD', to_text: 'D' },
  { from_data_key: 'KeyV', to_data_key: 'KeyV', to_text: 'V' },
  { from_data_key: 'KeyB', to_data_key: 'KeyZ', to_text: 'Z' },
  { from_data_key: 'KeyN', to_data_key: 'KeyK', to_text: 'K' },
  { from_data_key: 'KeyM', to_data_key: 'KeyH', to_text: 'H' },
];

function find_key(root: Element, key: string): Element {
  let key_element = root.querySelector(`svg[data-key='${key}']`);

  if (key_element == null) {
    throw new TypeError('The provided key was not a valid data-key entry!');
  }

  return key_element
}

function remap_keys(root: Element, mappings: ReadonlyArray<KeyRemap>) {
  // We have to run this in two passes otherwise we risk to overwrite previous changes
  for (let map of mappings) {
    try {
      let key_element = find_key(root, map.from_data_key);
      key_element.setAttribute('data-key', `${map.from_data_key}_tmp`);
      let key_text = key_element.querySelector('text');
      key_text.innerHTML = map.to_text;
    }
    catch (e) {
      if (e instanceof TypeError) {
        console.warn(e);
      } else {
        throw(e);
      }
    }
  };

  for (let map of mappings) {
    try {
      let key_element = find_key(root, `${map.from_data_key}_tmp`);
      key_element.setAttribute('data-key', map.to_data_key);
    }
    catch (e) {
      if (e instanceof TypeError) {
        console.warn(e);
      } else {
        throw(e);
      }
    }
  };
};


function find_keyboard(): Element {
  const entry_point = document.getElementById("key-zone-a");
  let current_parent = entry_point.parentElement;
  while (current_parent.tagName.localeCompare('svg', undefined, {sensitivity: 'accent'}) != 0) {
    current_parent = current_parent.parentElement;
  };

  for (let child of current_parent.children) {
    if (child.children.length > 2) {
      console.log(child);
      console.log(`And it's ${child.children.length} long!`);
      console.log(child.children);
      if (child.tagName.localeCompare('svg', undefined, {sensitivity: 'accent'}) == 0) {
        console.log('It\'s an SVG!');
        return child;
      }
    }
  }

  throw new Error('Keyboard not found!');
};

VM.observe(document.body, () => {
  const node = document.querySelector(`svg[data-key=${KEYS_TO_REMAP.at(-1).from_data_key}]`);
  if (node) {
    console.log(node);
    let keyboard_element: Element = undefined;
    try {
      keyboard_element = find_keyboard();
    } catch (e) {
      console.error(e);
    };

    if (keyboard_element == null) {
      return false;
    }

    remap_keys(keyboard_element, KEYS_TO_REMAP);

    return true;
  }
});
