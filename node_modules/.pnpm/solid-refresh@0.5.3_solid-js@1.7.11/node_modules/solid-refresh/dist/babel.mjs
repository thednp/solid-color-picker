import path from 'path';
import * as t from '@babel/types';
import _generator from '@babel/generator';
import { addNamed } from '@babel/helper-module-imports';

function forEach(arr, callback) {
    for (let i = 0, len = arr.length; i < len; i += 1) {
        if (callback(arr[i], i)) {
            break;
        }
    }
}
function map(arr, callback) {
    const values = [];
    for (let i = 0, len = arr.length; i < len; i += 1) {
        values[i] = callback(arr[i], i);
    }
    return values;
}

/**
 * Copyright (c) 2019 Jason Dent
 * https://github.com/Jason3S/xxhash
 */
const PRIME32_1 = 2654435761;
const PRIME32_2 = 2246822519;
const PRIME32_3 = 3266489917;
const PRIME32_4 = 668265263;
const PRIME32_5 = 374761393;
function toUtf8(text) {
    const bytes = [];
    for (let i = 0, n = text.length; i < n; ++i) {
        const c = text.charCodeAt(i);
        if (c < 0x80) {
            bytes.push(c);
        }
        else if (c < 0x800) {
            bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
        }
        else if (c < 0xd800 || c >= 0xe000) {
            bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
        }
        else {
            const cp = 0x10000 + (((c & 0x3ff) << 10) | (text.charCodeAt(++i) & 0x3ff));
            bytes.push(0xf0 | ((cp >> 18) & 0x7), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
        }
    }
    return new Uint8Array(bytes);
}
/**
 *
 * @param buffer - byte array or string
 * @param seed - optional seed (32-bit unsigned);
 */
function xxHash32(buffer, seed = 0) {
    buffer = typeof buffer === 'string' ? toUtf8(buffer) : buffer;
    const b = buffer;
    /*
          Step 1. Initialize internal accumulators
          Each accumulator gets an initial value based on optional seed input. Since the seed is optional, it can be 0.
          ```
              u32 acc1 = seed + PRIME32_1 + PRIME32_2;
              u32 acc2 = seed + PRIME32_2;
              u32 acc3 = seed + 0;
              u32 acc4 = seed - PRIME32_1;
          ```
          Special case : input is less than 16 bytes
          When input is too small (< 16 bytes), the algorithm will not process any stripe. Consequently, it will not
          make use of parallel accumulators.
          In which case, a simplified initialization is performed, using a single accumulator :
          u32 acc  = seed + PRIME32_5;
          The algorithm then proceeds directly to step 4.
      */
    let acc = (seed + PRIME32_5) & 0xffffffff;
    let offset = 0;
    if (b.length >= 16) {
        const accN = [
            (seed + PRIME32_1 + PRIME32_2) & 0xffffffff,
            (seed + PRIME32_2) & 0xffffffff,
            (seed + 0) & 0xffffffff,
            (seed - PRIME32_1) & 0xffffffff
        ];
        /*
                Step 2. Process stripes
                A stripe is a contiguous segment of 16 bytes. It is evenly divided into 4 lanes, of 4 bytes each.
                The first lane is used to update accumulator 1, the second lane is used to update accumulator 2, and so on.
                Each lane read its associated 32-bit value using little-endian convention.
                For each {lane, accumulator}, the update process is called a round, and applies the following formula :
                ```
                accN = accN + (laneN * PRIME32_2);
                accN = accN <<< 13;
                accN = accN * PRIME32_1;
                ```
                This shuffles the bits so that any bit from input lane impacts several bits in output accumulator.
                All operations are performed modulo 2^32.
                Input is consumed one full stripe at a time. Step 2 is looped as many times as necessary to consume
                the whole input, except the last remaining bytes which cannot form a stripe (< 16 bytes). When that
                happens, move to step 3.
            */
        const b = buffer;
        const limit = b.length - 16;
        let lane = 0;
        for (offset = 0; (offset & 0xfffffff0) <= limit; offset += 4) {
            const i = offset;
            const laneN0 = b[i + 0] + (b[i + 1] << 8);
            const laneN1 = b[i + 2] + (b[i + 3] << 8);
            const laneNP = laneN0 * PRIME32_2 + ((laneN1 * PRIME32_2) << 16);
            let acc = (accN[lane] + laneNP) & 0xffffffff;
            acc = (acc << 13) | (acc >>> 19);
            const acc0 = acc & 0xffff;
            const acc1 = acc >>> 16;
            accN[lane] = (acc0 * PRIME32_1 + ((acc1 * PRIME32_1) << 16)) & 0xffffffff;
            lane = (lane + 1) & 0x3;
        }
        /*
                Step 3. Accumulator convergence
                All 4 lane accumulators from previous steps are merged to produce a single remaining accumulator
                of same width (32-bit). The associated formula is as follows :
                ```
                acc = (acc1 <<< 1) + (acc2 <<< 7) + (acc3 <<< 12) + (acc4 <<< 18);
                ```
            */
        acc =
            (((accN[0] << 1) | (accN[0] >>> 31)) +
                ((accN[1] << 7) | (accN[1] >>> 25)) +
                ((accN[2] << 12) | (accN[2] >>> 20)) +
                ((accN[3] << 18) | (accN[3] >>> 14))) &
                0xffffffff;
    }
    /*
          Step 4. Add input length
          The input total length is presumed known at this stage. This step is just about adding the length to
          accumulator, so that it participates to final mixing.
          ```
          acc = acc + (u32)inputLength;
          ```
      */
    acc = (acc + buffer.length) & 0xffffffff;
    /*
          Step 5. Consume remaining input
          There may be up to 15 bytes remaining to consume from the input. The final stage will digest them according
          to following pseudo-code :
          ```
          while (remainingLength >= 4) {
              lane = read_32bit_little_endian(input_ptr);
              acc = acc + lane * PRIME32_3;
              acc = (acc <<< 17) * PRIME32_4;
              input_ptr += 4; remainingLength -= 4;
          }
          ```
          This process ensures that all input bytes are present in the final mix.
      */
    const limit = buffer.length - 4;
    for (; offset <= limit; offset += 4) {
        const i = offset;
        const laneN0 = b[i + 0] + (b[i + 1] << 8);
        const laneN1 = b[i + 2] + (b[i + 3] << 8);
        const laneP = laneN0 * PRIME32_3 + ((laneN1 * PRIME32_3) << 16);
        acc = (acc + laneP) & 0xffffffff;
        acc = (acc << 17) | (acc >>> 15);
        acc = ((acc & 0xffff) * PRIME32_4 + (((acc >>> 16) * PRIME32_4) << 16)) & 0xffffffff;
    }
    /*
          ```
          while (remainingLength >= 1) {
              lane = read_byte(input_ptr);
              acc = acc + lane * PRIME32_5;
              acc = (acc <<< 11) * PRIME32_1;
              input_ptr += 1; remainingLength -= 1;
          }
          ```
      */
    for (; offset < b.length; ++offset) {
        const lane = b[offset];
        acc = acc + lane * PRIME32_5;
        acc = (acc << 11) | (acc >>> 21);
        acc = ((acc & 0xffff) * PRIME32_1 + (((acc >>> 16) * PRIME32_1) << 16)) & 0xffffffff;
    }
    /*
          Step 6. Final mix (avalanche)
          The final mix ensures that all input bits have a chance to impact any bit in the output digest,
          resulting in an unbiased distribution. This is also called avalanche effect.
          ```
          acc = acc xor (acc >> 15);
          acc = acc * PRIME32_2;
          acc = acc xor (acc >> 13);
          acc = acc * PRIME32_3;
          acc = acc xor (acc >> 16);
          ```
      */
    acc = acc ^ (acc >>> 15);
    acc = (((acc & 0xffff) * PRIME32_2) & 0xffffffff) + (((acc >>> 16) * PRIME32_2) << 16);
    acc = acc ^ (acc >>> 13);
    acc = (((acc & 0xffff) * PRIME32_3) & 0xffffffff) + (((acc >>> 16) * PRIME32_3) << 16);
    acc = acc ^ (acc >>> 16);
    // turn any negatives back into a positive number;
    return acc < 0 ? acc + 4294967296 : acc;
}

// https://github.com/babel/babel/issues/15269
let generator;
if (typeof _generator !== 'function') {
    generator = _generator.default;
}
else {
    generator = _generator;
}
const CWD = process.cwd();
function getFile(filename) {
    return path.relative(CWD, filename);
}
// This is just a Pascal heuristic
// we only assume a function is a component
// if the first character is in uppercase
function isComponentishName(name) {
    return name[0] >= 'A' && name[0] <= 'Z';
}
function isESMHMR(bundler) {
    // The currently known ESM HMR implementations
    // esm - the original ESM HMR Spec
    // vite - Vite's implementation
    return bundler === 'esm' || bundler === 'vite';
}
// Source of solid-refresh (for import)
const SOLID_REFRESH_MODULE = 'solid-refresh';
// Exported names from solid-refresh that will be imported
const IMPORTS = {
    registry: '$$registry',
    refresh: '$$refresh',
    component: '$$component',
    context: '$$context',
    decline: '$$decline'
};
function getSolidRefreshIdentifier(state, path, name) {
    const target = `${name}`;
    const current = state.hooks.get(target);
    if (current) {
        return current;
    }
    const newID = addNamed(path, name, SOLID_REFRESH_MODULE);
    state.hooks.set(target, newID);
    return newID;
}
function getHotIdentifier(state) {
    const bundler = state.opts.bundler;
    // vite/esm uses `import.meta.hot`
    if (isESMHMR(bundler)) {
        return t.memberExpression(t.memberExpression(t.identifier('import'), t.identifier('meta')), t.identifier('hot'));
    }
    // webpack 5 uses `import.meta.webpackHot`
    // rspack does as well
    if (bundler === 'webpack5' || bundler === 'rspack-esm') {
        return t.memberExpression(t.memberExpression(t.identifier('import'), t.identifier('meta')), t.identifier('webpackHot'));
    }
    // `module.hot` is the default.
    return t.memberExpression(t.identifier('module'), t.identifier('hot'));
}
function generateViteRequirement(state, statements, pathToHot) {
    if (state.opts.bundler === 'vite') {
        // Vite requires that the owner module has an `import.meta.hot.accept()` call
        statements.push(t.expressionStatement(t.callExpression(t.memberExpression(pathToHot, t.identifier('accept')), [])));
    }
}
function getHMRDeclineCall(state, path) {
    var _a;
    const pathToHot = getHotIdentifier(state);
    const statements = [
        t.expressionStatement(t.callExpression(getSolidRefreshIdentifier(state, path, IMPORTS.decline), [
            t.stringLiteral((_a = state.opts.bundler) !== null && _a !== void 0 ? _a : 'standard'),
            pathToHot
        ]))
    ];
    generateViteRequirement(state, statements, pathToHot);
    const hmrDeclineCall = t.blockStatement(statements);
    return t.ifStatement(pathToHot, hmrDeclineCall);
}
function getStatementPath(path) {
    if (t.isStatement(path.node)) {
        return path;
    }
    if (path.parentPath) {
        return getStatementPath(path.parentPath);
    }
    return null;
}
const REGISTRY = 'REGISTRY';
function createRegistry(state, path) {
    var _a;
    const current = state.hooks.get(REGISTRY);
    if (current) {
        return current;
    }
    const program = path.scope.getProgramParent();
    const identifier = program.generateUidIdentifier(REGISTRY);
    program.push({
        id: identifier,
        kind: 'const',
        init: t.callExpression(getSolidRefreshIdentifier(state, path, IMPORTS.registry), [])
    });
    const pathToHot = getHotIdentifier(state);
    const statements = [
        t.expressionStatement(t.callExpression(getSolidRefreshIdentifier(state, path, IMPORTS.refresh), [
            t.stringLiteral((_a = state.opts.bundler) !== null && _a !== void 0 ? _a : 'standard'),
            pathToHot,
            identifier
        ]))
    ];
    generateViteRequirement(state, statements, pathToHot);
    program.path.pushContainer('body', [
        t.ifStatement(pathToHot, t.blockStatement(statements))
    ]);
    state.hooks.set(REGISTRY, identifier);
    return identifier;
}
function createSignatureValue(node) {
    const code = generator(node);
    const result = xxHash32(code.code).toString(16);
    return result;
}
function isForeignBinding(source, current, name) {
    if (source === current) {
        return true;
    }
    if (current.scope.hasOwnBinding(name)) {
        return false;
    }
    if (current.parentPath) {
        return isForeignBinding(source, current.parentPath, name);
    }
    return true;
}
function isInTypescript(path) {
    let parent = path.parentPath;
    while (parent) {
        if (t.isTypeScript(parent.node) && !t.isExpression(parent.node)) {
            return true;
        }
        parent = parent.parentPath;
    }
    return false;
}
function getBindings(path) {
    const identifiers = new Set();
    path.traverse({
        Expression(p) {
            // Check identifiers that aren't in a TS expression
            if (t.isIdentifier(p.node) && !isInTypescript(p) && isForeignBinding(path, p, p.node.name)) {
                identifiers.add(p.node.name);
            }
            // for the JSX, only use JSXMemberExpression's object
            // as a foreign binding
            if (t.isJSXElement(p.node) && t.isJSXMemberExpression(p.node.openingElement.name)) {
                let base = p.node.openingElement.name;
                while (t.isJSXMemberExpression(base)) {
                    base = base.object;
                }
                if (isForeignBinding(path, p, base.name)) {
                    identifiers.add(base.name);
                }
            }
        }
    });
    return map([...identifiers], value => t.identifier(value));
}
const IMPORT_IDENTITIES = [
    { name: 'createContext', source: 'solid-js' },
    { name: 'createContext', source: 'solid-js/web' },
    { name: 'render', source: 'solid-js/web' },
    { name: 'hydrate', source: 'solid-js/web' }
];
function getImportSpecifierName(specifier) {
    if (t.isIdentifier(specifier.imported)) {
        return specifier.imported.name;
    }
    return specifier.imported.value;
}
function captureIdentifiers(state, path) {
    path.traverse({
        ImportDeclaration(p) {
            if (p.node.importKind === 'value') {
                forEach(IMPORT_IDENTITIES, id => {
                    if (p.node.source.value === id.source) {
                        forEach(p.node.specifiers, specifier => {
                            if (t.isImportSpecifier(specifier) && getImportSpecifierName(specifier) === id.name) {
                                state.imports.identifiers.set(specifier.local, id);
                            }
                            else if (t.isImportNamespaceSpecifier(specifier)) {
                                state.imports.namespaces.set(specifier.local, id);
                            }
                        });
                    }
                });
            }
        }
    });
}
function unwrapExpression(node, key) {
    if (key(node)) {
        return node;
    }
    if (t.isParenthesizedExpression(node) ||
        t.isTypeCastExpression(node) ||
        t.isTSAsExpression(node) ||
        t.isTSSatisfiesExpression(node) ||
        t.isTSNonNullExpression(node) ||
        t.isTSTypeAssertion(node) ||
        t.isTSInstantiationExpression(node)) {
        return unwrapExpression(node.expression, key);
    }
    return undefined;
}
function isValidCallee(state, path, { callee }, target) {
    if (t.isV8IntrinsicIdentifier(callee)) {
        return false;
    }
    const trueCallee = unwrapExpression(callee, t.isIdentifier);
    if (trueCallee) {
        const binding = path.scope.getBindingIdentifier(trueCallee.name);
        if (binding) {
            const result = state.imports.identifiers.get(binding);
            if (result && result.name === target) {
                return true;
            }
        }
        return false;
    }
    if (t.isMemberExpression(callee) && !callee.computed && t.isIdentifier(callee.property)) {
        const trueObject = unwrapExpression(callee.object, t.isIdentifier);
        if (trueObject) {
            const binding = path.scope.getBinding(trueObject.name);
            return (binding &&
                state.imports.namespaces.has(binding.identifier) &&
                callee.property.name === target);
        }
    }
    return false;
}
function checkValidRenderCall(path) {
    let currentPath = path.parentPath;
    while (currentPath) {
        if (t.isProgram(currentPath.node)) {
            return true;
        }
        if (!t.isStatement(currentPath.node)) {
            return false;
        }
        currentPath = currentPath.parentPath;
    }
    return false;
}
function fixRenderCalls(state, path) {
    path.traverse({
        ExpressionStatement(p) {
            const trueCallExpr = unwrapExpression(p.node.expression, t.isCallExpression);
            if (trueCallExpr &&
                checkValidRenderCall(p) &&
                (isValidCallee(state, p, trueCallExpr, 'render') ||
                    isValidCallee(state, p, trueCallExpr, 'hydrate'))) {
                // Replace with variable declaration
                const id = p.scope.generateUidIdentifier('cleanup');
                p.replaceWith(t.variableDeclaration('const', [t.variableDeclarator(id, p.node.expression)]));
                const pathToHot = getHotIdentifier(state);
                p.insertAfter(t.ifStatement(pathToHot, t.expressionStatement(t.callExpression(t.memberExpression(pathToHot, t.identifier('dispose')), [id]))));
                p.skip();
            }
        }
    });
}
function wrapComponent(state, path, identifier, component, original = component) {
    const statementPath = getStatementPath(path);
    if (statementPath) {
        const registry = createRegistry(state, statementPath);
        const hotName = t.stringLiteral(identifier.name);
        const componentCall = getSolidRefreshIdentifier(state, statementPath, IMPORTS.component);
        const properties = [];
        if (state.filename && original.loc) {
            const filePath = getFile(state.filename);
            properties.push(t.objectProperty(t.identifier('location'), t.stringLiteral(`${filePath}:${original.loc.start.line}:${original.loc.start.column}`)));
        }
        if (state.granular) {
            properties.push(t.objectProperty(t.identifier('signature'), t.stringLiteral(createSignatureValue(component))));
            const dependencies = getBindings(path);
            if (dependencies.length) {
                properties.push(t.objectProperty(t.identifier('dependencies'), t.objectExpression(map(dependencies, id => t.objectProperty(id, id, false, true)))));
            }
            return t.callExpression(componentCall, [
                registry,
                hotName,
                component,
                t.objectExpression(properties)
            ]);
        }
        return t.callExpression(componentCall, [
            registry,
            hotName,
            component,
            ...(properties.length ? [t.objectExpression(properties)] : [])
        ]);
    }
    return component;
}
function wrapContext(state, path, identifier, context) {
    const statementPath = getStatementPath(path);
    if (statementPath) {
        const registry = createRegistry(state, statementPath);
        const hotName = t.stringLiteral(identifier.name);
        const contextCall = getSolidRefreshIdentifier(state, statementPath, IMPORTS.context);
        return t.callExpression(contextCall, [registry, hotName, context]);
    }
    return context;
}
function solidRefreshPlugin() {
    return {
        name: 'Solid Refresh',
        pre() {
            this.hooks = new Map();
            this.processed = false;
            this.granular = false;
            this.imports = {
                identifiers: new Map(),
                namespaces: new Map()
            };
        },
        visitor: {
            Program(path, state) {
                var _a;
                let shouldReload = false;
                const comments = state.file.ast.comments;
                if (comments) {
                    for (let i = 0; i < comments.length; i++) {
                        const comment = comments[i].value;
                        if (/^\s*@refresh granular\s*$/.test(comment)) {
                            state.granular = true;
                            break;
                        }
                        if (/^\s*@refresh skip\s*$/.test(comment)) {
                            state.processed = true;
                            break;
                        }
                        if (/^\s*@refresh reload\s*$/.test(comment)) {
                            state.processed = true;
                            shouldReload = true;
                            path.pushContainer('body', getHMRDeclineCall(state, path));
                            break;
                        }
                    }
                }
                captureIdentifiers(state, path);
                if (!shouldReload && ((_a = state.opts.fixRender) !== null && _a !== void 0 ? _a : true)) {
                    fixRenderCalls(state, path);
                }
            },
            ExportNamedDeclaration(path, state) {
                if (state.processed) {
                    return;
                }
                const decl = path.node.declaration;
                // Check if declaration is FunctionDeclaration
                if (t.isFunctionDeclaration(decl) &&
                    !(decl.generator || decl.async) &&
                    // Might be component-like, but the only valid components
                    // have zero or one parameter
                    decl.params.length < 2) {
                    // Check if the declaration has an identifier, and then check
                    // if the name is component-ish
                    if (decl.id && isComponentishName(decl.id.name)) {
                        path.node.declaration = t.variableDeclaration('const', [
                            t.variableDeclarator(decl.id, wrapComponent(state, path, decl.id, t.functionExpression(decl.id, decl.params, decl.body), decl))
                        ]);
                    }
                }
            },
            VariableDeclarator(path, state) {
                var _a, _b;
                if (state.processed) {
                    return;
                }
                const grandParentNode = (_b = (_a = path.parentPath) === null || _a === void 0 ? void 0 : _a.parentPath) === null || _b === void 0 ? void 0 : _b.node;
                // Check if the parent of the VariableDeclaration
                // is either a Program or an ExportNamedDeclaration
                if (t.isProgram(grandParentNode) || t.isExportNamedDeclaration(grandParentNode)) {
                    const identifier = path.node.id;
                    const init = path.node.init;
                    if (!init || !t.isIdentifier(identifier)) {
                        return;
                    }
                    if (isComponentishName(identifier.name)) {
                        const trueFuncExpr = unwrapExpression(init, t.isFunctionExpression) ||
                            unwrapExpression(init, t.isArrowFunctionExpression);
                        // Check for valid FunctionExpression or ArrowFunctionExpression
                        if (trueFuncExpr &&
                            // Must not be async or generator
                            !(trueFuncExpr.async || trueFuncExpr.generator) &&
                            // Might be component-like, but the only valid components
                            // have zero or one parameter
                            trueFuncExpr.params.length < 2) {
                            path.node.init = wrapComponent(state, path, identifier, trueFuncExpr);
                        }
                    }
                    // For `createContext` calls
                    const trueCallExpr = unwrapExpression(init, t.isCallExpression);
                    if (trueCallExpr && isValidCallee(state, path, trueCallExpr, 'createContext')) {
                        path.node.init = wrapContext(state, path, identifier, trueCallExpr);
                    }
                }
            },
            FunctionDeclaration(path, state) {
                if (state.processed) {
                    return;
                }
                if (!(t.isProgram(path.parentPath.node) || t.isExportDefaultDeclaration(path.parentPath.node))) {
                    return;
                }
                const decl = path.node;
                // Check if declaration is FunctionDeclaration
                if (
                // Check if the declaration has an identifier, and then check
                decl.id &&
                    // if the name is component-ish
                    isComponentishName(decl.id.name) &&
                    !(decl.generator || decl.async) &&
                    // Might be component-like, but the only valid components
                    // have zero or one parameter
                    decl.params.length < 2) {
                    const replacement = wrapComponent(state, path, decl.id, t.functionExpression(decl.id, decl.params, decl.body), decl);
                    if (t.isExportDefaultDeclaration(path.parentPath.node)) {
                        path.replaceWith(replacement);
                    }
                    else {
                        path.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(decl.id, replacement)]));
                    }
                }
            }
        }
    };
}

export { solidRefreshPlugin as default };
