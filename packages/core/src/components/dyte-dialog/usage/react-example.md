```jsx live
function Example() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <DyteButton onClick={() => setShowDialog(true)}>Show Dialog</DyteButton>
      <DyteDialog open={showDialog} onDyteDialogClose={() => setShowDialog(false)}>
        <div
          style={{
            width: '512px',
            backgroundColor: '#000',
            color: '#fff',
            padding: 12,
            borderRadius: 8,
          }}
        >
          <h3>Hello!</h3>
          <p style={{ marginBottom: 0 }}>This is some text inside dialog!</p>
        </div>
      </DyteDialog>
    </div>
  );
}
```
