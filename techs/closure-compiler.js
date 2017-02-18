var enb = require('enb'),
    compile = require('google-closure-compiler-js').compile,
    buildFlow = enb.buildFlow || require('enb/lib/build-flow'),
    File = require('enb-source-map/lib/file'),
    sourceMapUtils = require('enb-source-map/lib/utils');

module.exports = buildFlow.create()
    .name('closure-compiler')
    .target('target', '?.js')
    .defineRequiredOption('target')
    .defineRequiredOption('source')
    .defineOption('flags', {})
    .defineOption('sourcemap', false)
    .defineOption('compilationLevel', 'ADVANCED')
    .useSourceText('source')
    .builder(function (source) {
        var sourcemap = this._sourcemap,
            fileName = this._source,
            target = this._target,
            compiled = compile(Object.assign({
                jsCode: [{ src: source }],
                compilationLevel: this._compilationLevel,
                createSourceMap: sourcemap
            }, this._flags));

        return sourcemap ?
            renderWithSourceMaps(
                fileName,
                sourceMapUtils.joinContentAndSourceMap(compiled.compiledCode, compiled.sourceMap),
                target) :
            compiled.compiledCode;
    })
    .createTech();

function renderWithSourceMaps(fileName, content, target) {
    var targetFile = new File(target, { sourceMap: true, comment: 'block' });

    targetFile.writeFileContent(fileName, content);
    return targetFile.render();
}
