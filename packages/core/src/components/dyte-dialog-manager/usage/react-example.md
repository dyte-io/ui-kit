```jsx live
function Example() {
  const [states, setStates] = useState({});

  const setState = (s) => setStates((states) => ({ ...states, ...s }));

  return (
    <Row>
      <DyteButton onClick={() => setState({ activeSettings: true })}>
        Show Settings
      </DyteButton>
      <DyteButton onClick={() => setState({ activeLeaveConfirmation: true })}>
        Show Leave Confirmation
      </DyteButton>
      <DyteButton
        onClick={() =>
          setState({
            activePermissionsMessage: { enabled: true, kind: 'audio' },
          })
        }
      >
        Show Permissions Troubleshooting UI
      </DyteButton>
      <DyteButton onClick={() => setState({ activeRemoteAccessManager: true })}>
        Show Remote Access Manager
      </DyteButton>
      <DyteDialogManager
        meeting={meeting}
        states={states}
        onDyteStateUpdate={(e) => setState(e.detail)}
      />
    </Row>
  );
}
```
