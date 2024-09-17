```html
<dyte-participant-tile class="dyte-el">
  <dyte-name-tag class="dyte-el">
    <dyte-audio-visualizer class="dyte-el" slot="start"></dyte-audio-visualizer>
  </dyte-name-tag>
</dyte-participant-tile>

<script>
  const elements = document.getElementsByClassName('dyte-el');
  for (const el of elements) {
    el.participant = meeting.self;
  }
</script>
```

You can change the `name-tag-position` to any of the supported values
and change the placement of audio-visualizer in name-tag as well.

```html
<dyte-participant-tile class="dyte-el" name-tag-position="bottom-center">
  <dyte-name-tag class="dyte-el">
    <dyte-audio-visualizer class="dyte-el" slot="end"></dyte-audio-visualizer>
  </dyte-name-tag>
</dyte-participant-tile>

<script>
  const elements = document.getElementsByClassName('dyte-el');
  for (const el of elements) {
    el.participant = meeting.self;
  }
</script>
```

It also has a few variants.

```html
<dyte-participant-tile class="dyte-el" variant="gradient">
  <dyte-name-tag class="dyte-el">
    <dyte-audio-visualizer class="dyte-el" slot="start"></dyte-audio-visualizer>
  </dyte-name-tag>
</dyte-participant-tile>

<script>
  const elements = document.getElementsByClassName('dyte-el');
  for (const el of elements) {
    el.participant = meeting.self;
  }
</script>
```