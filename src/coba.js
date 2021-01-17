Div(
  {
    class: 'header1 font-bold',
  },
  [
    A(),
    P(),
    data =>
      P(
        {
          class: `${data.class}`,
        },
        []
      ),
    Div(
      {
        class: 'header1 font-bold',
      },
      [
        A('this is a a link', { href: 'https://www.google.com' }),
        P('this is a paragraph'),
        P(
          {
            class: props => `${props.class}`,
          },
          [
            BlockQuote({
              class: 'inline not-heavy',
            }),
            Button({}),
          ]
        ),
      ]
    ),
  ]
);

<div>
  <a></a>
  <p></p>
  {data => <p class={data.class}></p>}
  
</div>;
