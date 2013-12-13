ninja-slider
============

### How to

#### Default
```
$("#mySlider").ninjaSlider();

```

#### Custom config
Parameters:
 * `loop`: to loop or not to loop (default: false).
 * `switchSelector`: selector of DOM element who is gonna fire the swtich event.
 * `speed`: interval speed (default: 2000).

```
$("#mySlider").ninjaSlider({
    speed: 5000,
    loop: true,
    switchSelector: ".ninja-sldr-fire a"
});

```

### Live example
Here is a small live example:[example](http://juanmaaguero.com.ar/project/ninja-slider/).

----------
### Author
Juan Manuel Aguero: [web](http://juanmaaguero.com.ar/).

----------
Distributed under the [MIT License][mit].  