// CSS for finger areas support
import styles, { stylesheet } from './style.module.css';

const style = document.createElement('style');
style.textContent = stylesheet;
document.head.append(style);

enum FingerZone {
  One = 'col-dh_zone-a',
  Two = 'col-dh_zone-b',
  None = '',
}
class KeyRemap {
  from_data_key: string;
  to_data_key: string;
  to_text: string;
  zone: FingerZone;

  constructor(from: string, data: string, text: string, zone: FingerZone) {
    this.from_data_key = from;
    this.to_data_key = data;
    this.to_text = text;
    this.zone = zone;
  }
}

// QWERTY to Colemak-dh remap definition
// Some entries are remapped, but that's to fix the lables of the official Colemak mapping, which changes the label
// but not the attribute `data-key`

const KEYS_TO_REMAP: KeyRemap[] = [
  // Top row
  {
    from_data_key: 'KeyQ',
    to_data_key: 'KeyQ',
    to_text: 'Q',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyW',
    to_data_key: 'KeyW',
    to_text: 'W',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyE',
    to_data_key: 'KeyF',
    to_text: 'F',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyR',
    to_data_key: 'KeyP',
    to_text: 'P',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyT',
    to_data_key: 'KeyB',
    to_text: 'B',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyY',
    to_data_key: 'KeyJ',
    to_text: 'J',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyU',
    to_data_key: 'KeyL',
    to_text: 'L',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyI',
    to_data_key: 'KeyU',
    to_text: 'U',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyO',
    to_data_key: 'KeyY',
    to_text: 'Y',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyP',
    to_data_key: 'Semicolon',
    to_text: ';',
    zone: FingerZone.None,
  },
  // Home row
  {
    from_data_key: 'KeyA',
    to_data_key: 'KeyA',
    to_text: 'A',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyS',
    to_data_key: 'KeyR',
    to_text: 'R',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyD',
    to_data_key: 'KeyS',
    to_text: 'S',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyF',
    to_data_key: 'KeyT',
    to_text: 'T',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyG',
    to_data_key: 'KeyG',
    to_text: 'G',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyH',
    to_data_key: 'KeyM',
    to_text: 'M',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyJ',
    to_data_key: 'KeyN',
    to_text: 'N',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyK',
    to_data_key: 'KeyE',
    to_text: 'E',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyL',
    to_data_key: 'KeyI',
    to_text: 'I',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'Semicolon',
    to_data_key: 'KeyO',
    to_text: 'O',
    zone: FingerZone.Two,
  },
  // Bottom row
  {
    from_data_key: 'KeyZ',
    to_data_key: 'KeyX',
    to_text: 'X',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyX',
    to_data_key: 'KeyC',
    to_text: 'C',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyC',
    to_data_key: 'KeyD',
    to_text: 'D',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyV',
    to_data_key: 'KeyV',
    to_text: 'V',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyB',
    to_data_key: 'KeyZ',
    to_text: 'Z',
    zone: FingerZone.Two,
  },
  {
    from_data_key: 'KeyN',
    to_data_key: 'KeyK',
    to_text: 'K',
    zone: FingerZone.One,
  },
  {
    from_data_key: 'KeyM',
    to_data_key: 'KeyH',
    to_text: 'H',
    zone: FingerZone.One,
  },
];

function find_key(root: Element, key: string): Element {
  const key_element = root.querySelector(`svg[data-key='${key}']`);

  if (key_element == null) {
    throw new TypeError('The provided key was not a valid data-key entry!');
  }

  return key_element;
}

function remap_keys(root: Element, mappings: ReadonlyArray<KeyRemap>) {
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

  const url_components: string[] = document.URL.split('/');
  const last_url_component: string = url_components[url_components.length - 1];
  console.log('Current url: %s; URL end: %s', document.URL, last_url_component);
  const is_profile_page =
    last_url_component.localeCompare('profile', undefined, {
      sensitivity: 'accent',
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

function find_keyboard(): Element {
  const entry_point = document.getElementById('key-zone-a');
  if (entry_point == null) {
    throw new Error('Keyboard not found!');
  }

  let current_parent = entry_point.parentElement;
  while (
    current_parent != null &&
    current_parent.tagName.localeCompare('svg', undefined, {
      sensitivity: 'accent',
    }) != 0
  ) {
    current_parent = current_parent.parentElement;
  }

  if (current_parent == null) {
    throw new Error('Keyboard not found!');
  }

  for (const child of current_parent.children) {
    if (child.children.length > 2) {
      if (
        child.tagName.localeCompare('svg', undefined, {
          sensitivity: 'accent',
        }) == 0
      ) {
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

  const node = document.querySelector(
    `svg[data-key=${KEYS_TO_REMAP[KEYS_TO_REMAP.length - 1].from_data_key}]`
  );

  if (node != null) {
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
  } else {
    return false;
  }
});
