export default ({ attributes, children }) => {
  return (
    <div {...attributes} className="app1">
      {children}
      <iframe
        title="airtable"
        className="airtable-embed"
        src="https://airtable.com/embed/shrqo2dPA6cOYm5Rx?backgroundColor=gray"
        frameBorder="0"
        onmousewheel=""
        width="100%"
        height="533"
        style={{
          background: 'transparent',
          border: '1px solid #ccc',
        }}
      />
    </div>
  )
}
