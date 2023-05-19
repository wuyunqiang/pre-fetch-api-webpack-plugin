module.exports = ({ types: t }) => {
  return {
    name: "transform-remove-consoles",
    visitor: {
      ExpressionStatement(path, state) {
        const expression = path.node.expression;
        if (expression && expression.name === "console") {
          path.remove();
        }
      },
      CallExpression(path, state){
        const calleePath = path.get('callee');
        if(calleePath && calleePath.matchesPattern('console', true)){
            path.remove()
        }
      },

    },
  };
};
