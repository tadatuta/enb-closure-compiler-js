require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-string'))
    .should();

var mock = require('mock-fs'),
    FileList = require('enb/lib/file-list'),
    MockNode = require('mock-enb/lib/mock-node'),
    loadDirSync = require('mock-enb/utils/dir-utils').loadDirSync,
    closureCompilerTech = require('../../techs/closure-compiler');

describe('closure-compiler', function () {
    afterEach(function () {
        mock.restore();
    });

    it('must optimize JS', function () {
        var bundle = {
                'bundle.pre.js': [
                    'function hello(name) {',
                    '    alert("Hello, " + name);',
                    '}',
                    '',
                    'hello("New user")'
                ].join('\n')
            },
            reference = 'alert("Hello, New user");';

        return build(bundle, {
            source: '?.pre.js',
            target: 'js'
        }).spread(function (content) {
            content.should.be.equal(reference);
        });
    });

    it('must support custom flags', function () {
        var bundle = {
                'bundle.pre.js': [
                    'function hello(name) {',
                    '    alert("Hello, " + name);',
                    '}',
                    '',
                    'hello("New user")'
                ].join('\n')
            },
            reference = 'function hello(a){alert("Hello, "+a)}hello("New user");';

        return build(bundle, {
            source: '?.pre.js',
            target: 'js',
            flags: {
                compilationLevel: 'SIMPLE'
            }
        }).spread(function (content) {
            content.should.be.equal(reference);
        });
    });

    it('must generate sourcemap', function () {
        var bundle = {
            'bundle.pre.js': [
                'function hello(name) {',
                '    alert("Hello, " + name);',
                '}',
                '',
                'hello("New user")'
            ].join('\n')
        };

        return build(bundle, {
            source: '?.pre.js',
            target: 'js',
            sourcemap: true
        }).spread(function (content) {
            content.should.match(/sourceMappingURL/);
        });
    });
});

function build(bundleDir, options, isNeedRequire) {
    mock({
        blocks: {},
        bundle: bundleDir
    });

    var bundle = new MockNode('bundle'),
        fileList = new FileList(),
        testFunc;

    fileList.addFiles(loadDirSync('blocks'));

    bundle.provideTechData('?.files', fileList);

    testFunc = isNeedRequire ? bundle.runTechAndRequire : bundle.runTechAndGetContent;

    return testFunc.call(bundle, closureCompilerTech, options);
}
