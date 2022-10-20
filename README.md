# Stimulus Multiselect controller
Multiselect component built on the back of stimulus and html select tag. Works with static imbedded json inside html, preloaded items from server and searching remotely.

![multiselect](https://user-images.githubusercontent.com/31761693/196924970-eb19e850-62f9-4af0-ab2d-488bde0a9ea9.gif)

## Installation

If you are using a js bundler with `node_modules` support (such as esbuild, rollup.js or Webpack) install the package from npm:

```plain
yarn add stimulus-multiselect
```

If you're using [importmap-rails](https://github.com/rails/importmap-rails), you'll need to pin `stimulus-multiselect`:

```plain
./bin/importmap pin stimulus-multiselect
```

## Usage

Load your stimulus application as usual and the register the multiselect
controller with it:

```javascript
import { Application } from '@hotwired/stimulus'
import { Multiselect } from 'stimulus-multiselect'

const application = Application.start()
application.register('multiselect', Multiselect)
```

### Remote search

To use the multiselect as a remote search component, you need some the following markup:

```html
<div data-controller="multiselect" data-multiselect-search-url-value="/cars" data-placeholder="Search for cars...">
  <select multiple="multiple" class="multiselect__hidden" data-multiselect-target="hidden" name="form[test_ids][]" id="form_test_ids"></select>
</div>
```

The component makes a request to the data-multiselect-search-url to fetch results for the contents of the input field. The server must answer with a json array:

```json
[
  {
    "value": "toyota",
    "text": "Jaris 🚗"
  },
  {
    "value": "ambulance",
    "text": "Ambulance 🚑"
  },
  {
    "value": "police",
    "text": "Police 🚓"
  },
  {
    "value": "taxi",
    "text": "Taxi 🚕"
  },
  {
    "value": "truck",
    "text": "Truck 🚚"
  }
]
```

Note: each object has to contain `value` and `text`. The server will receive a `q` query param that represents the search term. Another query param sent while searching is the `preselects` param that contains a set of already selected values in the multiselect (a string separated by a comma ",").

### Preload

To preload items after rendering the page, you need some the following markup:

```html
<div data-controller="multiselect" data-multiselect-preload-url-value="/cars" data-placeholder="Search for cars...">
  <select multiple="multiple" class="multiselect__hidden" data-multiselect-target="hidden" name="form[test_ids][]" id="form_test_ids"></select>
</div>
```

With this setup the component will search through the already preloaded components. In order to search remotely as well as preloading components we just need to add the `data-multiselect-search-url-value` attribute.

Note: the server response for the preload url needs to provide a json array just like in the example above.

### Static collection

It is possible to use the `data-multiselect-items-value` attribute to load static json data. This is especially useful when your html is being preprocessed before being served (Rails ERB or as a React snippet - `data-multiselect-items-value="<%= @cars.to_json %>"`).

```html
<div data-controller="multiselect" data-multiselect-items-value='[{ "value": "cuckoo", "text": "Cuckoo 🐦"}, { "value": "macaw", "text": "Macaw 🦜"}, { "value": "rooster", "text": "Rooster 🐓"}]' data-placeholder="Search for birds...">
  <select multiple="multiple" class="multiselect__hidden" data-multiselect-target="hidden" name="form[test_ids][]" id="form_test_ids"></select>
</div>
```

## Good to know

- The initial html markup contains a hidden select which serves as a hook for any forms that contain the multiselect. This select will reflect all changes on the multiselect. As an additional helper, if the multiselect is used outside of Stimulus scope, it is possible to get all the selected values via the `values` property:

```js
document.getElementById("multiselect_id").values
```

- The multiselect comes with a .css file with some styles but feel free to change it when using it in your app.

TODO: Explain addable

### Accessibility

- Arrow navigation on the elements in the dropdown
- Selecting elements with Enter key
- Close dropdown on Escape
- If search is empty Backspace deletes the last item


## Events

- `multiselect-change` whenever an element is added or removed
- `multiselect-removed` whenever an element is removed. This event contains the value of the removed element in the events `detail` under `id`:

```javascript
myFunction(event) {
  console.log(event.detail.id) // Should print the value of the item removed - 13
}
```

- `multiselect-added` whenever an element is added. This event contains the added object in the events `detail` under `item`:

```javascript
myFunction(event) {
  console.log(event.detail.item) // Should print the added object - { "value": "test", "text": "Test" }
}
```
- `multiselect-addable` If the addable url is added to the multiselect when the search provides no results a link appears. Pressing this link fires this event. You can use this event as a hook to decide how you want to handle adding a non-existing element to the multiselect.

## Examples

The current examples are contained in the [examples folder](https://github.com/WizardComputer/stimulus-multiselect/tree/main/examples). You can use the included http-server to test the examples.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/WizardComputer/stimulus-multiselect. Any contributions or suggestions are wellcome and will be considered. Please read the [Contributor Covenant code of conduct](https://www.contributor-covenant.org/).

## Releasing

1. Update the version number in `package.json`. Try to follow semantic versioning guidelines as much as possible.

2. Publish the package to npmjs.com with `yarn run release`

## License

This package is available as open source under the terms of the MIT License.
