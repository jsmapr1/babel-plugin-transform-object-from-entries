const TYPE = 'objectFromEntries';

function objectFromEntriesPlugin({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(path, { file }) {
          file.set(TYPE, false);
        },
        exit(path, { file, opts }) {
          const objectFromEntriesId = file.get(TYPE);

          if (!objectFromEntriesId && !path.scope.hasBinding(opts)) return;

          const obj = t.identifier('obj');

          const declare = t.functionExpression(
            objectFromEntriesId,
            [obj],
            t.blockStatement([
              t.variableDeclaration('var', [
                t.variableDeclarator(
                  t.identifier('fromEntries'),
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier('key'),
                      t.stringLiteral('value'),
                    ),
                  ]),
                ),
              ]),

              t.returnStatement(t.identifier('fromEntries')),
            ]),
          );

          path.node.body.unshift(declare);
        },
      },
      CallExpression(path, { file }) {
        if (
          path.get('callee').matchesPattern('Object.fromEntries') &&
          !file.get(TYPE)
        ) {
          file.set(TYPE, path.scope.generateUidIdentifier(TYPE));
        }
        path.node.callee = file.get(TYPE);
      },
    },
  };
}

module.exports = objectFromEntriesPlugin;
