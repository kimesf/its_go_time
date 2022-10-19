onmessage = (e) => {
  const ms = e.data

  setTimeout(() => {
    postMessage('done')
  }, ms)
}