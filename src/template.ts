export
const Template = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-size: 12px">
  <div style="margin-bottom: 8px">
    <button onclick="start()">start</button>
    <button onclick="stop()">stop</button>
    <button onclick="_clear()">clear</button>
  </div>
  <ul style="margin: 0;padding: 0;list-style-type: none">
    {li}
  </ul>
  <script>
    function start() {
      fetch('/api/proxy/start', { method: 'POST' })
        .then(() => alert('started'));
    }
    function stop() {
      fetch('/api/proxy/stop', { method: 'POST' })
        .then(() => alert('stopped'));
    }
    function _clear() {
      fetch('/api/request/clear', { method: 'POST' })
        .then(() => location.reload());
    }
  </script>
</body>
</html>
`;
