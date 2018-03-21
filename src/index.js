const TYPE = 'objectFromEntries';

function objectFromEntriesPlugin({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(path, { file }) {
          file.set(TYPE, false);
        },
        exit(path, state) {
          const { file, opts } = state;

          const objectFromEntriesId = file.get(TYPE);
          if (!objectFromEntriesId && !path.scope.hasBinding(opts)) return;

          if (objectFromEntriesId) {
            const arr = t.identifier('arr');

            const declare = t.functionExpression(
              objectFromEntriesId,
              [arr],
              t.BlockStatement([
                t.variableDeclaration('var', [
                  t.variableDeclarator(
                    t.identifier('fromEntries'),
                    t.objectExpression([]),
                  ),
                ]),

                t.forStatement(
                  t.variableDeclaration('var', [
                    t.variableDeclarator(t.identifier('k'), t.numericLiteral(0)),
                  ]),
                  t.binaryExpression(
                    '<',
                    t.identifier('k'),
                    t.memberExpression(
                      t.identifier('arr'),
                      t.identifier('length'),
                    ),
                  ),
                  t.unaryExpression('++', t.identifier('k')),

                  t.BlockStatement([
                    t.variableDeclaration('var', [
                      t.variableDeclarator(
                        t.identifier('array'),
                        t.memberExpression(
                          t.identifier('arr'),
                          t.identifier('k'),
                          true,
                        ),
                      ),
                    ]),

                    t.expressionStatement(t.assignmentExpression(
                      '=',
                      t.memberExpression(
                        t.identifier('fromEntries'),
                        t.memberExpression(
                          t.identifier('array'),
                          t.identifier('0'),
                          true,
                        ),
                        true,
                      ),
                      t.memberExpression(
                        t.identifier('array'),
                        t.numericLiteral(1),
                        true,
                      ),
                    )),
                  ]),
                ),

                t.returnStatement(t.identifier('fromEntries')),
              ]),
            );

            path.node.body.unshift(declare);
          }
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
