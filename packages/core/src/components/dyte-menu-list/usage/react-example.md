```jsx live
<Row style={{ padding: '52px 0 0 0' }}>
  <DyteMenu placement="top">
    <DyteButton slot="trigger">Top Menu</DyteButton>
    <DyteMenuList>
      <DyteMenuItem onClick={() => alert('You clicked: alert()')}>
        alert()
      </DyteMenuItem>
    </DyteMenuList>
  </DyteMenu>

  {/* This menu will be placed at top due to less space */}
  <DyteMenu placement="bottom">
    <DyteButton slot="trigger">Bottom Menu</DyteButton>
    <DyteMenuList>
      <DyteMenuItem onClick={() => alert('You clicked: alert()')}>
        alert()
      </DyteMenuItem>
    </DyteMenuList>
  </DyteMenu>
</Row>
```
