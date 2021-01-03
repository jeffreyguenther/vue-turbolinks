# A Turbolinks & Hotwire Adapter for Vue components

![npm vue-turbolinks package version](https://img.shields.io/npm/v/vue-turbolinks.svg)
![npm vue-turbolinks package downloads](https://img.shields.io/npm/dt/vue-turbolinks.svg)
![npm vue-turbolinks license](https://img.shields.io/github/license/jeffreyguenther/vue-turbolinks.svg)

vue-turbolinks is a package to allow you to easily add Vue.js components
to your Turbolinks & Hotwire powered apps. We handle the events to
properly setup and teardown your Vue components on the page.

#### Supported Libraries

* [Hotwire's Turbo.js](https://turbo.hotwire.dev/)
* [Turbolinks](https://github.com/turbolinks/turbolinks)

>:warning: If you're using [vue-router](https://github.com/vuejs/vue-router) or another
Javascript routing library, you don't need to use Turbolinks or this adapter.
Turbolinks is meant to level up the traditional request-render cycle
by loading the new page in the background and this adapter makes it possible
to use Vue components on pages rendered in this manner. If you've decided to
use a single-page app, you already have everything you need. :metal:

To use this in a Rails project with [webpacker](https://github.com/rails/webpacker) support:

``` bash
$ ./bin/yarn add vue-turbolinks
```

To use the mixin, include it where you setup your component.
For example, if you used `rails new myapp --webpack=vue` to create your project using
webpacker, you'll include it in your `hello_vue.js` file:

### Mixin Option 1: Global

``` javascript
import TurbolinksAdapter from 'vue-turbolinks';
Vue.use(TurbolinksAdapter);

document.addEventListener('turbo:load', () => {
  const vueapp = new Vue({
    el: "#hello",
    template: '<App/>',
    components: { App }
  });
});
```

### Mixin Option 2: Single Component

``` javascript
import { turbolinksAdapterMixin } from 'vue-turbolinks';

document.addEventListener('turbo:load', () => {
  const vueapp = new Vue({
    el: "#hello",
    template: '<App/>',
    mixins: [turbolinksAdapterMixin],
    components: { App }
  });
});
```

### Running Vue only on specific pages

If you want your Vue component to run only on certain pages, you can
conditionally initialize it:

``` javascript
import TurbolinksAdapter from 'vue-turbolinks';
Vue.use(TurbolinksAdapter);

document.addEventListener('turbo:load', () => {
  const element = document.getElementById("hello");

  if (element != null) {
    const vueapp = new Vue({
      el: element,
      template: '<App/>',
      components: { App }
    });
  }
});
```

Or you can use a library like [Punchbox](https://github.com/kieraneglin/punchbox) whose JS is available for the asset pipeline or on [NPM](https://www.npmjs.com/package/punchbox-js).

### Options

You can pass in `destroyEvent` if you would like to customize which event Vue is torn down on. By default, this uses `turbo:before-cache` or `turbolinks:before-cache`.

`Vue.use(TurbolinksAdapter, { destroyEvent: 'turbo:before-cache' });`

### A note on transitions

If a `$root` component's **root node** is a Vue `<transition>` then calling the `$destroy` method may fail, throwing `NoModificationAllowedError: Failed to set the 'outerHTML' property on 'Element'` errors on the next `turbo:visit` event. To prevent this, wrap the `transition` in a DOM element:

Instead of:
```html
<template>
  <transition name="my-transition">
    <div v-if="ui_state.show" class="modal">
...
```

do:

```html
<template>
  <div>
    <transition name="my-transition">
      <div v-if="ui_state.show" class="modal">
...
```

