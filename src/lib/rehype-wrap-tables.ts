type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

export function rehypeWrapTables() {
  return (tree: HastNode) => {
    wrapTables(tree);
  };
}

function wrapTables(node: HastNode) {
  if (!node.children) return;

  node.children = node.children.map((child) => {
    if (child.type === "element" && child.tagName === "table") {
      return {
        type: "element",
        tagName: "div",
        properties: {
          className: ["table-scroll"],
          role: "region",
          ariaLabel: "Scrollable table",
          tabIndex: 0,
        },
        children: [child],
      };
    }

    wrapTables(child);
    return child;
  });
}
