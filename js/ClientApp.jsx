const ce = React.createElement;

const myTitle = function(props) {
  return ce('div', null, ce('h1', null, props.title));
};

const myfirstComponent = function() {
  return ce(
    'div',
    { id: 'my-first-component' },
    ce(myTitle, { title: 'Hey' }),
    ce(myTitle, { title: "It's " }),
    ce(myTitle, { title: 'Me' }),
    ce(myTitle, { title: 'Yo' }),
    ce(myTitle, { title: 'Hector' }),
    ce(myTitle, { title: 'Aiden' })
  );
};

ReactDOM.render(ce(myfirstComponent), document.getElementById('app'));
