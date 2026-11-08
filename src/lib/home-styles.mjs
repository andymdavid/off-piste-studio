import { parse, generate, walk } from 'css-tree';

// Shared styles serve many routes. On the homepage, omit only selectors
// explicitly restricted to another body page type; retain interactive states,
// themes, media queries and generic rules even if loading coverage misses them.
export function homeStyles(css) {
  const ast = parse(css);
  walk(ast, {
    visit: 'Rule',
    enter(rule, item, list) {
      if (rule.prelude?.type !== 'SelectorList') return;
      rule.prelude.children.forEach((selector, selectorItem, selectors) => {
        let body = false;
        let otherPage = false;
        selector.children.forEach(node => {
          if (node.type === 'Combinator') body = false;
          if (node.type === 'TypeSelector' && node.name === 'body') body = true;
          if (body && node.type === 'AttributeSelector' && node.name.name === 'data-page-type'
            && node.matcher === '=' && ['String', 'Identifier'].includes(node.value?.type)
            && (node.value.value ?? node.value.name) !== 'duplicate-home') otherPage = true;
        });
        if (otherPage) selectors.remove(selectorItem);
      });
      if (rule.prelude.children.isEmpty) list.remove(item);
    },
  });
  return generate(ast);
}
