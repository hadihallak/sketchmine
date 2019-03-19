import * as ts from 'typescript';
import chalk from 'chalk';
import { Logger } from '@sketchmine/node-helpers';

const log = new Logger();

/**
 * Get the name from any node
 * @param node Any Node
 */
export function getSymbolName(node: any): string | undefined {
  if (!node) {
    return '';
  }

  // node is a StringLiteral
  if (node.literal && node.literal.kind === ts.SyntaxKind.StringLiteral) {
    return node.literal.text;
  }
  // node is a StringLiteral
  if (node.kind && node.kind === ts.SyntaxKind.StringLiteral) {
    return node.text;
  }
  // node is a Identifier
  if (node.kind && node.kind === ts.SyntaxKind.Identifier) {
    return node.text;
  }

  if (
    node.name && node.name.kind === ts.SyntaxKind.Identifier ||
    node.name && node.name.kind === ts.SyntaxKind.StringLiteral
  ) {
    return node.name.text;
  }
  // node is a TypeReference
  if (node.typeName && node.kind === ts.SyntaxKind.TypeReference) {
    return node.typeName.text;
  }

  // call expression
  if (node.expression && node.expression.kind === ts.SyntaxKind.Identifier) {
    return node.expression.text;
  }

  switch (node.kind) {
    case ts.SyntaxKind.VariableStatement:
      return getSymbolName(node.declarationList);
    case ts.SyntaxKind.VariableDeclarationList:
      return node.declarations.map(declaration => getSymbolName(declaration)).join(', ');
    // call expression that does not match the if case before.
    case ts.SyntaxKind.CallExpression:
    case ts.SyntaxKind.ObjectLiteralExpression:
    case ts.SyntaxKind.ArrayLiteralExpression:
    case ts.SyntaxKind.FunctionType:
    case ts.SyntaxKind.IndexSignature:
    case ts.SyntaxKind.ConstructorType:
      // Array or Object Literal expressions can't have a name!
      return;
    default:
      // tslint:disable-next-line: max-line-length
      log.warning(chalk`Unsupported Syntax kind {bgBlue  <${ts.SyntaxKind[node.kind]}> } {grey – function getSymbolName(node)}`);
  }
}
