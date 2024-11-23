import css from "styled-jsx/css";

export default css`
  div :global(p) {
    margin-bottom: 1.2rem;
    font-size: 1rem;
  }
  div :global(h1) {
    margin-bottom: 1.5rem;
    line-height: 2;
    font-size: 2rem;
    font-weight: bold;
  }
  div :global(h2) {
    margin-bottom: 1.4rem;
    line-height: 1.9;
    font-size: 1.75rem;
    font-weight: bold;
  }
  div :global(h3) {
    margin-bottom: 1.3rem;
    line-height: 1.85;
    font-size: 1.5rem;
    font-weight: bold;
  }
  div :global(h4) {
    margin-bottom: 1.2rem;
    line-height: 1.8;
    font-size: 1.25rem;
    font-weight: bold;
  }
  div :global(h5) {
    margin-bottom: 1.1rem;
    line-height: 1.75;
    font-size: 1rem;
    font-weight: bold;
  }
  div :global(b),
  div :global(strong) {
    font-weight: bold;
  }
  div :global(blockquote) {
    border-left: 0.25rem solid #ddd;
    padding-left: 1.5rem;
    font-style: italic;
    margin: 1.5rem 0;
  }
  div :global(ul),
  div :global(ol) {
    margin-left: 2rem;
    margin-bottom: 1.5rem;
    list-style: disc;
  }
  div :global(li) {
    margin-bottom: 0.75rem;
  }
  div :global(i),
  div :global(em) {
    font-style: italic;
  }
  div :global(u) {
    text-decoration: underline;
  }
`;
