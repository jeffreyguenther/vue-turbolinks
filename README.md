# A Turbolinks Adapter for Vue components

vue-turbolinks is a package to allow you to easily add Vue.js components
to your Turbolinks powered apps. We handle the Turbolinks events to
properly setup and teardown your Vue components on the page.

>:warning: If you're using [vue-router](https://github.com/vuejs/vue-router) or another 
Javascript routing library, you don't need to use Turbolinks or this adapter. 
Turbolinks is meant to level up the traditional request-render cycle 
by loading the new page in the background and this adapter makes it possible
to use Vue components on pages rendered in this manner. If you've decided to
use a single-page app, you already have everything you need. :metal:

To use this in a Rails project with [webpacker](https://github.com/rails/webpacker) support,

``` bash
$ ./bin/yarn add vue-turbolinks
```

To use the mixin with the hello vue component created when you create a new
project with `rails new myapp --webpack=vue`. In your `app.vue` file:

```javascript
import TurbolinksAdapter from 'vue-turbolinks'
Vue.use(TurbolinksAdapter)

export default {
  data: function () {
    return {
      message: new Date
    }
  }
}
```

Or if you're just doing this in a regular Javascript file:

``` javascript
import TurbolinksAdapter from 'vue-turbolinks';
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  var vueapp = new Vue({
    el: "#hello",
    template: '<App/>',
    components: { App }
  });
});
```

### Running Vue only on specific pages

If you want your Vue app to run only on certain pages, you can
conditionally initialize the Vue app like so:

``` javascript
import TurbolinksAdapter from 'vue-turbolinks';
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  var element = document.getElementById("hello")
  if (element != null) {
    var vueapp = new Vue({
      el: element,
      template: '<App/>',
      components: { App }
    });
  }
});
```

Or you can use a library like [Punchbox](https://github.com/kieraneglin/punchbox) whose JS is available for the asset pipeline or on [NPM](https://www.npmjs.com/package/punchbox-js)
