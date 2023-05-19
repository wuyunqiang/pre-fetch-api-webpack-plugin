module.exports = ({ types: t }) => {
  return {
    visitor: {
      VariableDeclaration(path) {
        const declaration = path.node.declarations[0];
        if (
          declaration.id.name === "name" &&
          declaration.init.value === "wyq"
        ) {
          const property = t.objectProperty(
            t.stringLiteral("address"),
            t.stringLiteral("shanghai")
          );
          const property1 = t.objectProperty(
            t.stringLiteral("name"),
            t.stringLiteral("wyq")
          );
          const obj = t.objectExpression([property, property1]);
          path.insertAfter(
            t.variableDeclaration("var", [
              t.variableDeclarator(t.identifier("info"), obj),
            ])
          );
          path.remove();
        }
      },
    },
  };
};
